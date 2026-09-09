import Link from 'next/link'
import { HeartPulse, UtensilsCrossed, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductSearch } from '@/components/product-search'
import { CategoryCard } from '@/components/category_card'
import { ProductCard } from '@/components/product_card'
import { MachineCard } from '@/components/machine_card'
import { RecommendationCard } from '@/components/recommendation_card'
import { categories, products, machines, recommendations } from '@/lib/products'

export default function HomePage() {
  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [cat.id, products.filter((p) => p.tags.includes(cat.id)).length]),
  )
  const featured = products.slice(0, 6)
  const previewMachines = machines.slice(0, 3)

  return (
    <div>
      {/* Hero + smart search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-light via-background to-background">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sky/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-20 size-64 rounded-full bg-teal-muted/40 blur-3xl" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-xs font-semibold text-brand-dark ring-1 ring-border">
              <HeartPulse className="size-3.5" />
              ODS 3 · Salud y Bienestar
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Come saludable. Ahorra tiempo. Cuida tu bienestar.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Encuentra alimentos saludables, rápidos y accesibles dentro del campus.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button className="h-11 rounded-xl px-6 text-sm" render={<Link href="/productos" />}>
                <UtensilsCrossed />
                Ver productos
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-xl px-6 text-sm"
                render={<Link href="/maquinas" />}
              >
                <MapPin />
                Encontrar una máquina
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <ProductSearch />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-4 py-16 sm:px-6">
        {/* Categories */}
        <section>
          <SectionHeading
            eyebrow="Explora"
            title="Categorías saludables"
            subtitle="Encuentra justo lo que tu cuerpo necesita hoy."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                count={categoryCounts[category.id] ?? 0}
              />
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section>
          <SectionHeading
            eyebrow="Menú"
            title="Productos destacados"
            subtitle="Opciones frescas listas para recoger en tu máquina más cercana."
            action={{ label: 'Ver todos', href: '/productos' }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Machines */}
        <section>
          <SectionHeading
            eyebrow="Ubicaciones"
            title="Encuentra tu máquina USIL Fit"
            subtitle="Máquinas expendedoras inteligentes distribuidas por todo el campus."
            action={{ label: 'Ver máquinas', href: '/maquinas' }}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {previewMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <SectionHeading
            eyebrow="Para ti"
            title="Recomendado para ti"
            subtitle="Selecciones pensadas para tu día como estudiante."
            action={{ label: 'Ver más', href: '/recomendaciones' }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </section>

        {/* ODS 3 */}
        <section>
          <div className="grid items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-dark to-primary p-8 text-primary-foreground md:grid-cols-[1.5fr_1fr] md:p-12">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
                <HeartPulse className="size-3.5" />
                USIL Fit y el ODS 3
              </span>
              <h2 className="text-balance font-heading text-2xl font-bold sm:text-3xl">
                Bienestar estudiantil, un snack saludable a la vez
              </h2>
              <p className="max-w-lg text-pretty leading-relaxed text-primary-foreground/85">
                Promovemos el acceso a opciones de alimentación saludable y práctica para contribuir
                al bienestar de los estudiantes.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/10 p-6 text-center ring-1 ring-primary-foreground/20">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-foreground text-brand-dark">
                <HeartPulse className="size-7" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold">ODS 3</p>
              <p className="text-sm text-primary-foreground/85">Salud y Bienestar</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
          {eyebrow}
        </span>
        <h2 className="text-balance font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="max-w-xl text-pretty text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-dark transition-colors hover:text-primary"
        >
          {action.label}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}
