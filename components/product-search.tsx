'use client'

import { useRef, useState } from 'react'
import { Loader2, SearchX } from 'lucide-react'
import { SearchBar } from '@/components/search_bar'
import { ProductCard } from '@/components/product_card'
import { Skeleton } from '@/components/ui/skeleton'
import { searchProducts, type SearchResult } from '@/lib/bm25_search'

function ResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </div>
  )
}

export function ProductSearch() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function runSearch(q: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    setSubmitted(trimmed)
    setLoading(true)
    setResults(null)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setResults(searchProducts(trimmed))
      setLoading(false)
    }, 700)
  }

  return (
    <div className="space-y-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => runSearch(query)}
        onExample={(ex) => {
          setQuery(ex)
          runSearch(ex)
        }}
      />

      {loading && (
        <div className="space-y-5">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <Loader2 className="size-4 animate-spin" />
            Buscando opciones saludables para ti...
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ResultSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {!loading && results && results.length > 0 && (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
            <span className="font-medium text-foreground">“{submitted}”</span> · ordenados por
            relevancia BM25
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ product, score }) => (
              <ProductCard key={product.id} product={product} score={score} />
            ))}
          </div>
        </div>
      )}

      {!loading && results && results.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-card p-12 text-center ring-1 ring-border">
          <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-brand-dark">
            <SearchX className="size-7" />
          </span>
          <div className="space-y-1">
            <p className="font-heading text-lg font-semibold">Sin resultados</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              No encontramos opciones para tu búsqueda. Prueba con otra descripción.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
