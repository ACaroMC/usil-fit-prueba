import type { Merchant } from './data'

const K1 = 1.5
const B = 0.75
const FEATURED_RANKING_BOOST = 0.18
const STOP_WORDS = new Set([
  'a', 'al', 'algo', 'alrededor', 'al', 'con', 'cerca', 'como', 'de', 'del', 'donde', 'el', 'en',
  'es', 'esta', 'este', 'la', 'las', 'lo', 'los', 'mi', 'para', 'por', 'que', 'quiero', 'un', 'una',
  'unos', 'unas', 'y', 'o', 'menos', 'mas', 'hasta', 's', 'soles', 'costo', 'precio', 'buscar',
])
const ZONE_WORDS = new Set(['usil', 'lima', 'molina', 'fontana', 'campus', 'avenida', 'av'])
const SYNONYMS: Record<string, string[]> = {
  almuerzo: ['menu', 'dia'],
  cena: ['ligero', 'ensalada'],
  economico: ['barato', 'menu', 'accesible'],
  barata: ['barato', 'menu', 'accesible'],
  barato: ['economico', 'menu', 'accesible'],
  pescado: ['ceviche', 'salmon', 'proteina'],
  ceviche: ['pescado', 'proteina'],
  cevichon: ['pescado', 'ceviche'],
  proteina: ['pollo', 'pescado', 'salmon', 'carne'],
  proteico: ['pollo', 'pescado', 'proteina'],
  vegetariano: ['vegetariana', 'verduras', 'vegetales'],
  vegetariana: ['vegetariano', 'verduras', 'vegetales'],
  vegano: ['vegetariano', 'verduras', 'vegetales'],
  saludable: ['balanceado', 'ligero', 'verduras'],
  ligera: ['ligero', 'baja', 'grasa'],
  ligero: ['ligera', 'baja', 'grasa'],
  ensalada: ['verduras', 'fresco'],
  wrap: ['vegetariano', 'verduras'],
  smoothie: ['bebida', 'fruta'],
}

export type RankedMerchant = Merchant & { semanticScore: number }
export type ParsedSearch = {
  zoneTerms: string[]
  objectiveTerms: string[]
  maxPrice?: number
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(value: string) {
  return normalizeText(value).match(/[a-z0-9]+/g) ?? []
}

export function parseSearchQuery(query: string): ParsedSearch {
  const normalized = normalizeText(query)
  const priceMatch = normalized.match(/(?:menos de|por debajo de|hasta|maximo|max)\s*(?:s\s*)?(\d+(?:[.,]\d+)?)/)
  const sourceTerms = tokenize(query)
  const zoneTerms = [...new Set(sourceTerms.filter((word) => ZONE_WORDS.has(word)))]
  const objectiveTerms = new Set<string>()

  for (const word of sourceTerms) {
    if (STOP_WORDS.has(word) || ZONE_WORDS.has(word) || /^\d+$/.test(word)) continue
    objectiveTerms.add(word)
    for (const synonym of SYNONYMS[word] ?? []) objectiveTerms.add(synonym)
  }

  return {
    zoneTerms,
    objectiveTerms: [...objectiveTerms],
    maxPrice: priceMatch ? Number(priceMatch[1].replace(',', '.')) : undefined,
  }
}

function bm25Score(queryTerms: string[], document: string[], corpus: string[][]) {
  if (queryTerms.length === 0) return 0

  const averageLength = corpus.reduce((sum, entry) => sum + entry.length, 0) / Math.max(corpus.length, 1)
  const documentLength = document.length
  let score = 0

  for (const term of new Set(queryTerms)) {
    const termFrequency = document.filter((word) => word === term).length
    if (termFrequency === 0) continue
    const documentFrequency = corpus.filter((entry) => entry.includes(term)).length
    const inverseDocumentFrequency = Math.log(
      1 + (corpus.length - documentFrequency + 0.5) / (documentFrequency + 0.5),
    )
    const denominator = termFrequency + K1 * (1 - B + B * (documentLength / Math.max(averageLength, 1)))
    score += inverseDocumentFrequency * ((termFrequency * (K1 + 1)) / denominator)
  }

  return score
}

function planBoost(merchant: Merchant) {
  return merchant.plan === 'basic' ? 0 : FEATURED_RANKING_BOOST
}

export function searchMerchants(query: string, merchants: Merchant[]): RankedMerchant[] {
  const criteria = parseSearchQuery(query)
  const documents = merchants.map((merchant) =>
    tokenize(`${merchant.name} ${merchant.dish} ${merchant.healthyType} ${merchant.tags.join(' ')} ${merchant.neighborhood}`),
  )
  const locationDocuments = merchants.map((merchant) =>
    tokenize(`${merchant.neighborhood} Av. La Fontana La Molina USIL Lima campus`),
  )
  const scored = merchants
    .map((merchant, index) => {
      const objectiveScore = bm25Score(criteria.objectiveTerms, documents[index], documents)
      const zoneScore = bm25Score(criteria.zoneTerms, locationDocuments[index], locationDocuments)
      const hasCriteria = criteria.objectiveTerms.length > 0 || criteria.zoneTerms.length > 0
      const matchesCriteria = objectiveScore > 0 || zoneScore > 0
      const distanceScore = 1 / (1 + merchant.distanceMeters / 800)
      const score = (hasCriteria ? objectiveScore + zoneScore * 0.35 : distanceScore) + planBoost(merchant)

      return { merchant, score, matchesCriteria }
    })
    .filter(({ merchant, matchesCriteria }) => {
      const matchesPrice = criteria.maxPrice === undefined || merchant.minPrice <= criteria.maxPrice
      return matchesPrice && (criteria.objectiveTerms.length === 0 && criteria.zoneTerms.length === 0 || matchesCriteria)
    })
    .sort((a, b) => b.score - a.score || a.merchant.distanceMeters - b.merchant.distanceMeters)

  const maxScore = Math.max(...scored.map(({ score }) => score), 1)
  return scored.map(({ merchant, score }) => ({
    ...merchant,
    semanticScore: Math.max(1, Math.round((score / maxScore) * 100)),
  }))
}
