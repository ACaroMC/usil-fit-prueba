import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { merchantPlans } from '@/lib/plans'

export function Plans() {
  return (
    <div className="grid items-stretch gap-6 pt-3 lg:grid-cols-3">
      {merchantPlans.map((plan) => {
        const card = (
          <div className="flex h-full flex-col rounded-[1.35rem] bg-[#fffbeb] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[#0f3d2e]">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#0f3d2e]/80">{plan.description}</p>
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-2 text-[#0f3d2e]">
              <span className="font-heading text-4xl font-extrabold tracking-tight">
                {plan.price === 0 ? 'Gratis' : `S/ ${plan.price}`}
              </span>
              {plan.price > 0 && <span className="text-sm font-semibold text-[#0f3d2e]/75">al mes</span>}
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-[#0f3d2e]/15 pt-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-5 text-[#0f3d2e]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a3e635]/65 text-[#0f3d2e]">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            {plan.payback && <p className="mt-5 text-xs font-bold text-[#9d174d]">{plan.payback}</p>}
            <a
              href={`mailto:comercios@nutricampus.pe?subject=${encodeURIComponent(`Información del plan ${plan.name} de NutriCampus`)}`}
              className={`mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold transition duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15803d]/30 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-[#ff6a00] to-[#ff3d81] text-[#0f3d2e] shadow-[0_10px_24px_-12px_rgba(255,61,129,0.65)]'
                  : 'border border-[#0f3d2e]/20 bg-white text-[#0f3d2e] hover:bg-[#a3e635]/40'
              }`}
            >
              {plan.buttonLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )

        return plan.highlighted ? (
          <article key={plan.id} className="relative rounded-3xl bg-gradient-to-br from-[#22c55e] via-[#a3e635] to-[#ff3d81] p-[2px] shadow-[0_28px_60px_-32px_rgba(15,61,46,0.55)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_32px_70px_-32px_rgba(15,61,46,0.65)] lg:scale-[1.04]">
            <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ffd60a] px-3.5 py-1.5 text-xs font-extrabold text-[#0f3d2e] shadow-md">
              <Sparkles aria-hidden="true" className="size-3.5" />
              {plan.badge}
            </span>
            {card}
          </article>
        ) : (
          <article key={plan.id} className="relative rounded-3xl border border-[#0f3d2e]/10 bg-[#fffbeb] shadow-[0_20px_48px_-34px_rgba(15,61,46,0.6)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(15,61,46,0.6)]">
            {card}
          </article>
        )
      })}
    </div>
  )
}
