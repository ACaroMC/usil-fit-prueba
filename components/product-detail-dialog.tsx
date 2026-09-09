'use client'

import Image from 'next/image'
import { Heart, MapPin, CalendarClock, AlertCircle, Flame, Beef, Wheat, Droplet } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductTags } from '@/components/tag-badges'
import { getMachineById, products, type Product } from '@/lib/products'

function NutritionStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/60 p-3 text-center">
      <Icon className="size-5 text-brand-dark" />
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
  onBuy,
}: {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onBuy: () => void
}) {
  const machine = getMachineById(product.machineId)
  const alternatives = products
    .filter(
      (p) => p.id !== product.id && p.available && p.tags.some((t) => product.tags.includes(t)),
    )
    .slice(0, 3)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            width={512}
            height={288}
            className="h-44 w-full rounded-xl object-cover"
          />
          <div className="flex items-start justify-between gap-3 pt-1">
            <DialogTitle className="text-xl">{product.name}</DialogTitle>
            <span className="shrink-0 font-heading text-xl font-semibold text-brand-dark">
              S/{product.price.toFixed(2)}
            </span>
          </div>
          <ProductTags tags={product.tags} />
          <DialogDescription className="pt-1 leading-relaxed">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        {!product.available && (
          <div className="flex gap-2.5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0" />
            <p>Este producto se agotó. Te mostramos alternativas similares.</p>
          </div>
        )}

        <div>
          <h4 className="mb-2 text-sm font-semibold">Información nutricional</h4>
          <div className="grid grid-cols-4 gap-2">
            <NutritionStat icon={Flame} label="kcal" value={`${product.calories}`} />
            <NutritionStat icon={Beef} label="proteína" value={`${product.protein}g`} />
            <NutritionStat icon={Wheat} label="carbos" value={`${product.carbs}g`} />
            <NutritionStat icon={Droplet} label="grasas" value={`${product.fat}g`} />
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold">Ingredientes</h4>
          <div className="flex flex-wrap gap-1.5">
            {product.ingredients.map((ing) => (
              <Badge key={ing} variant="outline">
                {ing}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 rounded-xl bg-muted/50 p-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarClock className="size-4 shrink-0 text-brand-dark" />
            <span>{product.conservation}</span>
          </div>
          {machine && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-brand-dark" />
              <span>
                Disponible en <strong className="text-foreground">{machine.code}</strong> ·{' '}
                {machine.location}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${product.available ? 'bg-primary' : 'bg-destructive'}`}
            />
            <span className={product.available ? 'text-brand-dark' : 'text-destructive'}>
              {product.available ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>

        {!product.available && alternatives.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Alternativas similares</h4>
            <div className="space-y-2">
              {alternatives.map((alt) => (
                <div key={alt.id} className="flex items-center gap-3 rounded-xl bg-card p-2 ring-1 ring-border">
                  <Image
                    src={alt.image || '/placeholder.svg'}
                    alt={alt.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{alt.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {alt.calories} kcal · {alt.protein}g proteína
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-brand-dark">
                    S/{alt.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="h-11 flex-1 rounded-xl"
            disabled={!product.available}
            onClick={onBuy}
          >
            Comprar ahora
          </Button>
          <Button
            variant="outline"
            className="h-11 flex-1 rounded-xl"
            onClick={() => toast.success('Agregado a favoritos', { description: product.name })}
          >
            <Heart />
            Agregar a favoritos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
