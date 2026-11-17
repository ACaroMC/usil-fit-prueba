import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { merchantPlans } from '@/lib/plans'

export function Plans() {
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-3">
      {merchantPlans.map((plan) => (
        <article
          key={plan.id}
          className={`relative flex flex-col rounded-3xl border p-6 shadow-[0_12px_40px_-32px_rgba(20,83,45,0.5)] sm:p-7 ${
            plan.highlighted
              ? 'border-emerald-700 bg-gradient-to-br from-lime-100 via-emerald-50 to-emerald-200 ring-2 ring-emerald-700/20 lg:-translate-y-2'
              : 'border-emerald-900/10 bg-white'
          }`}
        >
          {plan.badge && (
            <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <Sparkles aria-hidden="true" className="size-3.5" />
              {plan.badge}
            </span>
          )}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-xl font-bold text-emerald-950">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-emerald-950/80">{plan.description}</p>
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-2 text-emerald-950">
            <span className="font-heading text-4xl font-bold tracking-tight">
              {plan.price === 0 ? 'Gratis' : `S/ ${plan.price}`}
            </span>
            {plan.price > 0 && <span className="text-sm text-emerald-950/80">al mes</span>}
          </div>
          <ul className="mt-6 flex flex-col gap-3 border-t border-emerald-900/10 pt-5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-emerald-950/85">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/80 text-emerald-800">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:comercios@nutricampus.pe?subject=${encodeURIComponent(`Información del plan ${plan.name} de NutriCampus`)}`}
            className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-700/25 ${
              plan.highlighted
                ? 'bg-orange-500 text-orange-950 hover:bg-orange-400'
                : 'border border-emerald-900/15 bg-white text-emerald-950 hover:bg-emerald-50'
            }`}
          >
            Suscribirme
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </article>
      ))}
    </div>
  )
}
