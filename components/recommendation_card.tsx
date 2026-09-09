import Image from 'next/image'
import Link from 'next/link'
import { Zap, Dumbbell, Wallet, Leaf, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getProductById, type Recommendation } from '@/lib/products'

const ICONS: Record<string, LucideIcon> = { Zap, Dumbbell, Wallet, Leaf }

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const Icon = ICONS[recommendation.icon] ?? Leaf
  const items = recommendation.productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <Card className="group/rec justify-between gap-4 p-5 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(40,122,85,0.5)]">
      <Link href="/recomendaciones" className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon className="size-5" />
          </span>
          <ArrowUpRight className="size-5 text-muted-foreground/50 transition-colors group-hover/rec:text-brand-dark" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-base font-semibold">{recommendation.title}</h3>
          <p className="text-sm text-muted-foreground">{recommendation.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            {items.slice(0, 3).map((item) => (
              <Image
                key={item.id}
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                width={36}
                height={36}
                className="size-9 rounded-full object-cover ring-2 ring-card"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-brand-dark">{items.length} opciones</span>
        </div>
      </Link>
    </Card>
  )
}
