import { ArrowUpRight, BadgeCheck, MapPin, Sparkles, Utensils } from 'lucide-react'
import type { RankedMerchant } from '@/lib/semantic_search'

function formatDistance(meters: number) {
  return meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1).replace('.', ',')} km`
}

export function MerchantCards({ merchants }: { merchants: RankedMerchant[] }) {
  if (merchants.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-emerald-900/20 bg-white/70 px-6 py-12 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-lime-100 text-emerald-800">
          <Utensils aria-hidden="true" className="size-5" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-[#0f3d2e]">Aún no encontramos coincidencias</h3>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[#0f3d2e]/80">
          Prueba con otra comida, objetivo nutricional o rango de precio. Seguimos sumando opciones cerca de la USIL.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {merchants.map((merchant) => {
        const isSubscribed = merchant.plan !== 'basic'
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${merchant.name}, ${merchant.neighborhood}, La Molina, Lima`)}`

        return (
          <article
            key={merchant.id}
            className="group flex h-full flex-col rounded-3xl border border-emerald-900/10 bg-white p-5 shadow-[0_10px_35px_-28px_rgba(20,83,45,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_-28px_rgba(20,83,45,0.45)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold leading-tight text-[#0f3d2e]">{merchant.name}</h3>
                  {isSubscribed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ffd60a] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#0f3d2e]">
                      <BadgeCheck aria-hidden="true" className="size-3.5" />
                      Destacado
                    </span>
                  )}
                  {merchant.plan === 'premium' && (
                    <span className="rounded-full bg-[#ff3d81]/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#9d174d]">
                      Premium
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-[#0f3d2e]/85">{merchant.dish}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffd60a]/65 to-[#a3e635]/65 text-[#0f3d2e]">
                <Utensils aria-hidden="true" className="size-4" />
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#a3e635]/45 px-3 py-1.5 text-xs font-semibold text-[#0f3d2e]">{merchant.healthyType}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-[#fffdf2] p-3.5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0f3d2e]/80">Precio aprox.</p>
                <p className="mt-1 text-sm font-bold text-[#0f3d2e]">S/ {merchant.minPrice}–{merchant.maxPrice}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0f3d2e]/80">Desde la USIL</p>
                <p className="mt-1 text-sm font-bold text-[#0f3d2e]">~{formatDistance(merchant.distanceMeters)}</p>
              </div>
            </div>

            <div className="mt-auto pt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-[#0f3d2e]/75">Coincidencia con tu búsqueda</span>
                <span className="font-extrabold text-[#9d174d]">{merchant.semanticScore}% de match</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-[#0f3d2e]/15"
                role="progressbar"
                aria-label={`Coincidencia de ${merchant.semanticScore}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={merchant.semanticScore}
              >
                <div className="h-full rounded-full bg-gradient-to-r from-[#22c55e] via-[#a3e635] to-[#ff3d81] transition-[width] duration-500" style={{ width: `${merchant.semanticScore}%` }} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#0f3d2e]/80">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {merchant.neighborhood}
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 underline-offset-4 transition hover:text-[#0f3d2e] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  aria-label={`Ver ubicación de ${merchant.name} en Google Maps`}
                >
                  Cómo llegar
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
              {isSubscribed && (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#0f3d2e]/80">
                  <Sparkles aria-hidden="true" className="size-3.5 text-emerald-700" />
                  Prioridad de visibilidad por suscripción
                </p>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}
