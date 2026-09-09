import { products, type Product } from './products'

/**
 * BM25 full-text ranking for USIL Fit products.
 * Kept intentionally free of any UI concerns: it only consumes the product
 * dataset and returns ranked matches. The interface layer renders the result.
 */

const K1 = 1.5
const B = 0.75

const STOPWORDS = new Set([
  'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'a',
  'en', 'con', 'para', 'por', 'que', 'algo', 'del', 'al', 'lo', 'su', 'sus',
  'me', 'quiero', 'comer', 'busco', 'una', 'opcion', 'opciones', 'quisiera',
  'dame', 'muestrame', 'necesito', 'tener', 'ser', 'es', 'muy', 'mas', 'menos',
])

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

/**
 * Build a searchable document for a product. Higher-signal fields (name and
 * characteristics) are repeated so they carry more weight in the ranking.
 */
function buildDocument(product: Product): string {
  return [
    product.name,
    product.name,
    product.category,
    product.description,
    product.ingredients.join(' '),
    product.characteristics.join(' '),
    product.characteristics.join(' '),
  ].join(' ')
}

type IndexedDoc = {
  product: Product
  tokens: string[]
  termFreq: Map<string, number>
  length: number
}

const indexedDocs: IndexedDoc[] = products.map((product) => {
  const tokens = tokenize(buildDocument(product))
  const termFreq = new Map<string, number>()
  for (const token of tokens) {
    termFreq.set(token, (termFreq.get(token) ?? 0) + 1)
  }
  return { product, tokens, termFreq, length: tokens.length }
})

const avgDocLength =
  indexedDocs.reduce((sum, doc) => sum + doc.length, 0) / (indexedDocs.length || 1)

const docFreq = new Map<string, number>()
for (const doc of indexedDocs) {
  for (const term of doc.termFreq.keys()) {
    docFreq.set(term, (docFreq.get(term) ?? 0) + 1)
  }
}

const totalDocs = indexedDocs.length

function idf(term: string): number {
  const n = docFreq.get(term) ?? 0
  // BM25 idf with +1 smoothing to keep scores non-negative.
  return Math.log(1 + (totalDocs - n + 0.5) / (n + 0.5))
}

export type SearchResult = {
  product: Product
  score: number
}

/**
 * Parse an optional maximum price out of natural-language queries such as
 * "un snack menor a S/8" or "algo por menos de 10 soles".
 */
function extractMaxPrice(query: string): number | null {
  const normalized = query.toLowerCase().replace(/s\/\s*/g, 's/')
  const match = normalized.match(
    /(?:menor a|menos de|hasta|bajo|maximo|max|por)\s*s?\/?\s*(\d+(?:\.\d+)?)/,
  )
  if (match) return Number.parseFloat(match[1])
  return null
}

/**
 * Rank products against a natural-language query using BM25.
 * Results are sorted from most to least relevant and only include matches
 * with a positive score.
 */
export function searchProducts(query: string): SearchResult[] {
  const maxPrice = extractMaxPrice(query)
  const queryTerms = tokenize(query)

  const scored = indexedDocs.map((doc) => {
    let score = 0
    for (const term of queryTerms) {
      const tf = doc.termFreq.get(term)
      if (!tf) continue
      const numerator = tf * (K1 + 1)
      const denominator = tf + K1 * (1 - B + B * (doc.length / avgDocLength))
      score += idf(term) * (numerator / denominator)
    }

    // Price constraint acts as a relevance boost / gate on top of BM25.
    if (maxPrice !== null) {
      if (doc.product.price <= maxPrice) {
        score += 2
      } else {
        score = 0
      }
    }

    return { product: doc.product, score: Number(score.toFixed(2)) }
  })

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
}
