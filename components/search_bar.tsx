'use client'

import { Search } from 'lucide-react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const examples = [
  'algo alto en proteína',
  'un snack menor a S/8',
  'un almuerzo saludable',
  'algo vegetariano',
  'una opción económica',
]

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onExample,
  className,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onExample?: (value: string) => void
  className?: string
}) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className={cn('w-full', className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-[0_18px_50px_-30px_rgba(40,122,85,0.55)] ring-1 ring-border sm:flex-row sm:items-center"
      >
        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="size-5 shrink-0 text-brand-dark" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="¿Qué quieres comer? Ej. algo alto en proteína y económico"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Buscar alimentos saludables"
          />
        </div>
        <Button type="submit" className="h-11 rounded-xl px-6 text-sm">
          Buscar
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Prueba:</span>
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onExample?.(example)}
            className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
