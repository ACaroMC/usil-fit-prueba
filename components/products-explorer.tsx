'use client'

import { useRef, useState } from 'react'
import { Loader2, SearchX, X } from 'lucide-react'
import { SearchBar } from '@/components/search_bar'
import { ProductCard } from '@/components/product_card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { categories, products, type CategoryId } from '@/lib/products'
import { searchProducts, type SearchResult } from '@/lib/bm25_search'

type Filter = CategoryId | 'all'

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </div>
  )
}

export function ProductsExplorer({ initialCategory = 'all' }: { initialCategory?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialCategory)
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searching = results !== null || loading

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

  function clearSearch() {
    setQuery('')
    setSubmitted('')
    setResults(null)
    setLoading(false)
  }

  const filtered =
    filter === 'all' ? products : products.filter((p) => p.tags.includes(filter))

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

      {!searching && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            Todos
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              onClick={() => setFilter(cat.id)}
            >
              {cat.name}
            </FilterChip>
          ))}
        </div>
      )}

      {loading && (
        <div className="space-y-5">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <Loader2 className="size-4 animate-spin" />
            Buscando opciones saludables para ti...
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {!loading && results && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
              <span className="font-medium text-foreground">“{submitted}”</span>
              {results.length > 0 && ' · ordenados por relevancia BM25'}
            </p>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={clearSearch}>
              <X />
              Limpiar búsqueda
            </Button>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(({ product, score }) => (
                <ProductCard key={product.id} product={product} score={score} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-card p-12 text-center ring-1 ring-border">
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-brand-dark">
                <SearchX className="size-7" />
              </span>
              <p className="max-w-sm text-sm text-muted-foreground">
                No encontramos opciones para tu búsqueda. Prueba con otra descripción.
              </p>
            </div>
          )}
        </div>
      )}

      {!searching && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-card text-foreground/70 ring-1 ring-border hover:bg-secondary/60',
      )}
    >
      {children}
    </button>
  )
}
