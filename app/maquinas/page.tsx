import type { Metadata } from 'next'
import { MachineCard } from '@/components/machine_card'
import { machines } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Máquinas · USIL Fit',
  description: 'Localiza las máquinas expendedoras inteligentes USIL Fit dentro del campus.',
}

export default function MaquinasPage() {
  const active = machines.filter((m) => m.status === 'available').length

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
          Ubicaciones
        </span>
        <h1 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Encuentra tu máquina USIL Fit
        </h1>
        <p className="max-w-xl text-pretty text-muted-foreground">
          {active} de {machines.length} máquinas disponibles ahora mismo en el campus. Consulta el
          stock y la distancia aproximada.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  )
}
