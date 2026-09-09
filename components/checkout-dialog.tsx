'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CheckCircle2, Minus, Plus, Smartphone, CreditCard, PackageCheck } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

type PaymentMethod = 'yape' | 'plin' | 'tarjeta'

const methods: { id: PaymentMethod; label: string; icon: typeof Smartphone }[] = [
  { id: 'yape', label: 'Yape', icon: Smartphone },
  { id: 'plin', label: 'Plin', icon: Smartphone },
  { id: 'tarjeta', label: 'Tarjeta', icon: CreditCard },
]

export function CheckoutDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [method, setMethod] = useState<PaymentMethod>('yape')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setQuantity(1)
      setMethod('yape')
      setDone(false)
    }
  }, [open])

  const total = product.price * quantity

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
              <CheckCircle2 className="size-9" />
            </span>
            <div className="space-y-1">
              <DialogTitle className="text-xl">¡Compra realizada con éxito!</DialogTitle>
              <DialogDescription className="text-sm">
                Tu producto está listo para ser recogido.
              </DialogDescription>
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl bg-brand-light/70 p-3 text-left">
              <PackageCheck className="size-5 shrink-0 text-brand-dark" />
              <p className="text-sm text-brand-dark">
                Acércate a la máquina <strong>USIL Fit</strong> y recoge tu pedido usando tu código
                de estudiante.
              </p>
            </div>
            <Button className="h-10 w-full rounded-xl" onClick={() => onOpenChange(false)}>
              Entendido
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirmar compra</DialogTitle>
              <DialogDescription>Revisa tu pedido antes de pagar.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                width={56}
                height={56}
                className="size-14 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">S/{product.price.toFixed(2)} c/u</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                >
                  <Minus />
                </Button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full"
                  onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                  aria-label="Aumentar cantidad"
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Método de pago</p>
              <div className="grid grid-cols-3 gap-2">
                {methods.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMethod(id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition-all',
                      method === id
                        ? 'border-primary bg-secondary text-secondary-foreground ring-2 ring-primary/30'
                        : 'border-border bg-card text-foreground/70 hover:border-primary/40',
                    )}
                  >
                    <Icon className="size-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  {product.name} × {quantity}
                </span>
                <span>S/{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-brand-dark">S/{total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="h-11 w-full rounded-xl text-sm" onClick={() => setDone(true)}>
              Confirmar compra
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
