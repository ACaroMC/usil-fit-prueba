import type { Metadata } from 'next'
import Image from 'next/image'
import { User, ShoppingBag, Heart, Flame, HeartPulse, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product_card'
import { getProductById } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Mi perfil · USIL Fit',
  description: 'Tu resumen de bienestar, favoritos y compras recientes en USIL Fit.',
}

const stats = [
  { icon: ShoppingBag, label: 'Compras', value: '24' },
  { icon: Flame, label: 'Kcal promedio', value: '320' },
  { icon: Heart, label: 'Favoritos', value: '3' },
]

const favorites = ['bowl-pollo', 'yogurt-granola', 'batido-verde']
const history = [
  { id: 'snack-energetico', date: 'Hoy · 10:24', machine: 'USIL Fit #02' },
  { id: 'ensalada-quinua', date: 'Ayer · 13:05', machine: 'USIL Fit #03' },
  { id: 'agua-coco', date: '12 mar · 09:15', machine: 'USIL Fit #01' },
]

export default function PerfilPage() {
  const favoriteProducts = favorites
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      {/* Profile header */}
      <Card className="mb-8 gap-0 overflow-hidden py-0 ring-border">
        <div className="h-24 bg-gradient-to-r from-brand-dark to-primary" />
        <CardContent className="flex flex-col items-center gap-4 px-6 pb-6 text-center sm:flex-row sm:text-left">
          <span className="-mt-12 flex size-20 items-center justify-center rounded-3xl bg-card text-brand-dark ring-4 ring-card shadow-sm">
            <User className="size-9" />
          </span>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold">María Fernanda Rojas</h1>
            <p className="text-sm text-muted-foreground">Código U20231458 · Administración</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <HeartPulse className="size-3.5" />
            Miembro USIL Fit
          </Badge>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="flex-row items-center gap-4 p-5 ring-border">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-brand-dark">
              <Icon className="size-6" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold leading-none">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Favorites */}
      <section className="mb-12">
        <h2 className="mb-5 font-heading text-xl font-semibold">Tus favoritos</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Order history */}
      <section>
        <h2 className="mb-5 font-heading text-xl font-semibold">Compras recientes</h2>
        <Card className="divide-y divide-border p-0 ring-border">
          {history.map((order) => {
            const product = getProductById(order.id)
            if (!product) return null
            return (
              <div key={order.id + order.date} className="flex items-center gap-4 p-4">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  width={52}
                  height={52}
                  className="size-13 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.date} · {order.machine}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-brand-dark">
                    S/{product.price.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2 className="size-3.5 text-primary" />
                    Recogido
                  </span>
                </div>
              </div>
            )
          })}
        </Card>
      </section>
    </div>
  )
}
