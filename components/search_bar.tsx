'use client'

import type { FormEvent } from 'react'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const quickSearches = [
  'Almuerzo saludable cerca de la USIL por menos de S/ 15',
  'Opciones de pescado y ceviche cerca de la USIL',
  'Cena ligera y baja en grasa cerca de la USIL',
]

type CampusSearchProps = {
  query: string
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
}

type ProductSearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onExample?: (value: string) => void
  className?: string
}

type SearchBarProps = CampusSearchProps | ProductSearchProps

export function SearchBar(props: SearchBarProps) {
  if ('query' in props) return <CampusSearchBar {...props} />
  return <ProductSearchBar {...props} />
}

function CampusSearchBar({ query, onQueryChange, onSearch }: CampusSearchProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(query)
  }

  function runExample(example: string) {
    onQueryChange(example)
    onSearch(example)
  }

  return (
    <div className="rounded-[1.75rem] border border-emerald-900/10 bg-white p-4 shadow-[0_20px_70px_-35px_rgba(20,83,45,0.35)] sm:p-6">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="campus-search">¿Qué te gustaría encontrar?</label>
        <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-emerald-900/15 bg-[#fffef8] px-4 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
          <Search aria-hidden="true" className="size-5 shrink-0 text-emerald-700" />
          <input
            id="campus-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault()
            }}
            placeholder="Quiero un almuerzo alto en proteína cerca de la USIL por menos de S/ 15"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-emerald-950 outline-none placeholder:text-emerald-900/75 sm:text-base"
          />
        </div>
        <button type="submit" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 font-semibold text-orange-950 shadow-sm transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30">
          Buscar
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </form>

      <div id="ejemplos" className="mt-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/80">
          <Sparkles aria-hidden="true" className="size-4 text-emerald-600" />
          Prueba una búsqueda
        </div>
        <div className="flex flex-wrap gap-2">
          {quickSearches.map((example) => (
            <button key={example} type="button" onClick={() => runExample(example)} className="rounded-full border border-emerald-900/15 bg-lime-50 px-3.5 py-2 text-left text-xs font-medium leading-snug text-emerald-950 transition hover:border-emerald-600/50 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 sm:text-sm">
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductSearchBar({ value, onChange, onSubmit, onExample, className }: ProductSearchProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-[0_18px_50px_-30px_rgba(40,122,85,0.55)] ring-1 ring-border sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 px-3">
          <Search aria-hidden="true" className="size-5 shrink-0 text-brand-dark" />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault()
            }}
            placeholder="¿Qué quieres comer? Ej. algo alto en proteína y económico"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Buscar alimentos saludables"
          />
        </div>
        <Button type="submit" className="h-11 rounded-xl px-6 text-sm">Buscar</Button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Prueba:</span>
        {quickSearches.map((example) => (
          <button key={example} type="button" onClick={() => onExample?.(example)} className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary">
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
