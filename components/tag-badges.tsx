import { Salad, Cookie, CupSoda, Dumbbell, Wallet, Sprout, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { categoryLabels, type CategoryId } from '@/lib/products'

export const TAG_ICONS: Record<CategoryId, LucideIcon> = {
  bowls: Salad,
  snacks: Cookie,
  bebidas: CupSoda,
  proteina: Dumbbell,
  economicos: Wallet,
  vegetarianos: Sprout,
}

export function ProductTags({ tags, max }: { tags: CategoryId[]; max?: number }) {
  const shown = typeof max === 'number' ? tags.slice(0, max) : tags
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tag) => {
        const Icon = TAG_ICONS[tag]
        return (
          <Badge key={tag} variant="secondary" className="gap-1">
            <Icon />
            {categoryLabels[tag]}
          </Badge>
        )
      })}
    </div>
  )
}
