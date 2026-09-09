'use client'

import { useState } from 'react'
import { MapPin, Navigation, Package, Boxes, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getProductById, type Machine } from '@/lib/products'

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-2">
      <Icon className="size-4 shrink-0 text-brand-dark" />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">{value}</span>
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

export function MachineCard({ machine }: { machine: Machine }) {
  const [open, setOpen] = useState(false)
  const online = machine.status === 'available'
  const machineProducts = machine.productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <>
      <Card className="gap-0 py-0 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(40,122,85,0.5)]">
        <CardHeader className="gap-2 px-5 pt-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-brand-dark">
                <MapPin className="size-5" />
              </span>
              <div>
                <CardTitle className="font-heading">{machine.code}</CardTitle>
                <p className="text-sm text-muted-foreground">{machine.location}</p>
              </div>
            </div>
            <Badge variant={online ? 'secondary' : 'destructive'} className="gap-1">
              <span className={`size-1.5 rounded-full ${online ? 'bg-primary' : 'bg-destructive'}`} />
              {online ? 'Disponible' : 'Fuera de servicio'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-5 pt-4">
          {online ? (
            <div className="grid grid-cols-3 gap-2">
              <Stat icon={Package} label="productos" value={`${machine.productsCount}`} />
              <Stat icon={Boxes} label="en stock" value={`${machine.stock}`} />
              <Stat icon={Navigation} label="distancia" value={`${machine.distance} m`} />
            </div>
          ) : (
            <div className="flex gap-2.5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="size-5 shrink-0" />
              <p>Esta máquina no está disponible actualmente.</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="mt-4 bg-transparent px-5 pb-5">
          <Button
            className="h-9 w-full rounded-xl"
            variant={online ? 'default' : 'outline'}
            disabled={!online}
            onClick={() => setOpen(true)}
          >
            Ver productos
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{machine.code}</DialogTitle>
            <DialogDescription>
              {machine.location} · {machine.distance} m de distancia
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {machineProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.calories} kcal · {product.protein}g proteína
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-brand-dark">
                  S/{product.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
