'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Flame, Beef, Sparkles } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductTags } from '@/components/tag-badges'
import { ProductDetailDialog } from '@/components/product-detail-dialog'
import { CheckoutDialog } from '@/components/checkout-dialog'
import type { Product } from '@/lib/products'

export function ProductCard({ product, score }: { product: Product; score?: number }) {
  const [detailOpen, setDetailOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      <Card className="group/product gap-0 py-0 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(40,122,85,0.5)]">
        <div className="relative">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            width={400}
            height={240}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover/product:scale-105"
          />
          {typeof score === 'number' && (
            <Badge className="absolute left-2 top-2 gap-1 bg-brand-dark shadow-sm">
              <Sparkles />
              BM25 {score.toFixed(2)}
            </Badge>
          )}
          <Badge
            variant={product.available ? 'secondary' : 'destructive'}
            className="absolute right-2 top-2 gap-1 bg-card/90 backdrop-blur"
          >
            <span
              className={`size-1.5 rounded-full ${product.available ? 'bg-primary' : 'bg-destructive'}`}
            />
            {product.available ? 'Disponible' : 'Agotado'}
          </Badge>
        </div>

        <CardHeader className="gap-2 px-4 pt-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-pretty leading-snug">{product.name}</CardTitle>
            <span className="shrink-0 font-heading text-lg font-semibold text-brand-dark">
              S/{product.price.toFixed(2)}
            </span>
          </div>
          <ProductTags tags={product.tags} max={2} />
        </CardHeader>

        <CardContent className="px-4 pt-3">
          <div className="flex gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 py-1.5 text-xs font-medium">
              <Flame className="size-3.5 text-brand-dark" />
              {product.calories} kcal
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 py-1.5 text-xs font-medium">
              <Beef className="size-3.5 text-brand-dark" />
              {product.protein}g proteína
            </span>
          </div>
        </CardContent>

        <CardFooter className="mt-4 gap-2 bg-transparent px-4 pb-4">
          <Button
            variant="outline"
            className="h-9 flex-1 rounded-xl"
            onClick={() => setDetailOpen(true)}
          >
            Ver detalles
          </Button>
          <Button
            className="h-9 flex-1 rounded-xl"
            disabled={!product.available}
            onClick={() => setCheckoutOpen(true)}
          >
            Comprar
          </Button>
        </CardFooter>
      </Card>

      <ProductDetailDialog
        product={product}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onBuy={() => {
          setDetailOpen(false)
          setCheckoutOpen(true)
        }}
      />
      <CheckoutDialog product={product} open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  )
}
