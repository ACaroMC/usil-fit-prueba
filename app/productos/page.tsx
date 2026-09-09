import type { Metadata } from 'next'
import { ProductsExplorer } from '@/components/products-explorer'
import { categories, type CategoryId } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Productos · USIL Fit',
  description: 'Explora alimentos saludables, busca en lenguaje natural y filtra por categoría.',
}

const validCategories = new Set(categories.map((c) => c.id))

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const initialCategory =
    categoria && validCategories.has(categoria as CategoryId)
      ? (categoria as CategoryId)
      : 'all'

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">Menú</span>
        <h1 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Productos saludables
        </h1>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Busca en lenguaje natural con nuestro motor BM25 o filtra por categoría para encontrar tu
          opción ideal.
        </p>
      </header>

      <ProductsExplorer initialCategory={initialCategory} />
    </div>
  )
}
