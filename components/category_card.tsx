import Link from 'next/link'
import {
  Salad,
  Cookie,
  CupSoda,
  Dumbbell,
  Wallet,
  Sprout,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Category } from '@/lib/products'

const ICONS: Record<string, LucideIcon> = {
  Salad,
  Cookie,
  CupSoda,
  Dumbbell,
  Wallet,
  Sprout,
}

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = ICONS[category.icon] ?? Salad
  return (
    <Card className="group/cat cursor-pointer justify-between gap-4 p-5 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(40,122,85,0.5)]">
      <Link href={`/productos?categoria=${category.id}`} className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-brand-dark transition-colors group-hover/cat:bg-primary group-hover/cat:text-primary-foreground">
            <Icon className="size-6" />
          </span>
          <ArrowUpRight className="size-5 text-muted-foreground/50 transition-colors group-hover/cat:text-brand-dark" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading text-base font-semibold">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
        <span className="text-xs font-medium text-brand-dark">
          {count} {count === 1 ? 'producto' : 'productos'}
        </span>
      </Link>
    </Card>
  )
}
