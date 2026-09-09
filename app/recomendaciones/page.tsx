import type { Metadata } from 'next'
import { Zap, Dumbbell, Wallet, Leaf, type LucideIcon } from 'lucide-react'
import { ProductCard } from '@/components/product_card'
import { getProductById, recommendations } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Recomendaciones · USIL Fit',
  description: 'Selecciones de alimentos saludables pensadas para tu día como estudiante.',
}

const ICONS: Record<string, LucideIcon> = { Zap, Dumbbell, Wallet, Leaf }

export default function RecomendacionesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
          Para ti
        </span>
        <h1 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Recomendado para ti
        </h1>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Combinaciones saludables para cada momento de tu jornada universitaria.
        </p>
      </header>

      <div className="space-y-12">
        {recommendations.map((rec) => {
          const Icon = ICONS[rec.icon] ?? Leaf
          const items = rec.productIds
            .map((id) => getProductById(id))
            .filter((p): p is NonNullable<typeof p> => Boolean(p))

          return (
            <section key={rec.id}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-semibold">{rec.title}</h2>
                  <p className="text-sm text-muted-foreground">{rec.subtitle}</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
