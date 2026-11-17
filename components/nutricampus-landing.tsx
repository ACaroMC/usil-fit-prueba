'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Clock3, HeartPulse, Loader2, MapPin, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { MerchantCards } from '@/components/cards'
import { FoodCarousel } from '@/components/food_carousel'
import { Plans } from '@/components/plans'
import { SearchBar } from '@/components/search_bar'
import { SiteFooter } from '@/components/site_footer'
import { SiteHeader } from '@/components/site_header'
import { merchants } from '@/lib/data'
import { searchMerchants, type RankedMerchant } from '@/lib/semantic_search'

const initialResults = searchMerchants('', merchants)

export function NutriCampusLanding() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RankedMerchant[]>(initialResults)
  const [searchedQuery, setSearchedQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (searchTimer.current !== null) window.clearTimeout(searchTimer.current)
  }, [])

  function runSearch(nextQuery: string) {
    setQuery(nextQuery)
    setIsLoading(true)
    if (searchTimer.current !== null) window.clearTimeout(searchTimer.current)
    searchTimer.current = window.setTimeout(() => {
      setResults(searchMerchants(nextQuery, merchants))
      setSearchedQuery(nextQuery.trim())
      setIsLoading(false)
      window.requestAnimationFrame(() => {
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }, 650)
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#FFFBEB] via-[#ECFCCB] to-[#BBF7D0]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-56 size-80 rounded-full bg-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#86EFAC] bg-white px-4 py-2 text-xs font-bold text-[#0F3D2E] shadow-sm sm:text-sm">
                <MapPin aria-hidden="true" className="size-4 text-[#15803d]" />
                USIL · Av. La Fontana 550, La Molina
              </span>
              <h1 className="mx-auto mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f3d2e] sm:text-5xl lg:text-6xl">
                Haz match con tu <span className="text-[#C2410C]">almuerzo saludable</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base font-medium leading-7 text-[#14532D] sm:text-lg sm:leading-8">
                NutriCampus te muestra los comercios cerca de la USIL que se ajustan a tu presupuesto y a lo que quieres comer.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#buscar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#C2410C] px-6 text-sm font-extrabold text-white shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0F3D2E]/30">
                  Encuentra tu próximo almuerzo
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-4 py-2 text-xs font-bold text-[#14532D] sm:text-sm">
                  <ShieldCheck aria-hidden="true" className="size-4 text-[#15803d]" />
                  Recomendaciones, no ventas
                </span>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-[#15803D] sm:text-sm">
                <span className="inline-flex items-center gap-2"><Sparkles aria-hidden="true" className="size-4 text-[#15803d]" />Búsqueda inteligente</span>
                <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-[#15803d]" />Cerca de tu campus</span>
                <span className="inline-flex items-center gap-2"><HeartPulse aria-hidden="true" className="size-4 text-[#15803d]" />Opciones para sentirte bien</span>
              </div>
            </div>

            <FoodCarousel />
          </div>
        </section>

        <section id="buscar" className="scroll-mt-24 bg-[#fffbeb] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-7 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#15803d]">Tu antojo, tus criterios</span>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#0f3d2e] sm:text-4xl">¿Qué se te antoja hoy?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#0f3d2e]/80 sm:text-base">
                Cuéntanos qué buscas. Comparamos tipo de comida, objetivo y cercanía para recomendarte opciones.
              </p>
            </div>
            <SearchBar query={query} onQueryChange={setQuery} onSearch={runSearch} />
          </div>
        </section>

        <section id="resultados" className="scroll-mt-24 bg-[#fffbeb] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#15803d]">Opciones para ti</span>
                <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#0f3d2e] sm:text-4xl">
                  Tus matches
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0f3d2e]/80">
                  {searchedQuery ? <>Coincidencias para <span className="font-semibold text-[#0f3d2e]">“{searchedQuery}”</span></> : 'Comercios de la zona con alternativas para distintos antojos y presupuestos.'}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3.5 py-2 text-xs font-medium text-[#0f3d2e]/75">
                <Clock3 aria-hidden="true" className="size-4 text-[#15803d]" />
                Distancias aproximadas desde el campus
              </span>
            </div>

            {isLoading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-900/10 bg-white text-center">
                <Loader2 aria-hidden="true" className="size-8 animate-spin text-[#15803d]" />
                <p role="status" className="font-medium text-[#0f3d2e]">Realizando búsqueda en la base de datos</p>
              </div>
            ) : (
              <MerchantCards merchants={results} />
            )}
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#0f3d2e]/80">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#15803d]" />
              NutriCampus informa y recomienda. Los precios, platos y distancias son referenciales; confirma los detalles directamente con cada comercio.
            </p>
          </div>
        </section>

        <section id="planes" className="scroll-mt-24 bg-gradient-to-b from-[#a3e635]/50 via-[#fffbeb] to-[#4ade80]/35 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#15803d]">Para comercios</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#0f3d2e] sm:text-4xl">Haz que te encuentren</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-[#0f3d2e]/85 sm:text-base">
                Llega a los estudiantes de la USIL que buscan comer saludable cerca del campus.
              </p>
            </div>
            <Plans />
            <p className="mt-7 text-center text-sm font-bold leading-6 text-[#0f3d2e]">Primer mes gratis en los planes Destacado y Premium. Sin contrato, cancela cuando quieras.</p>
            <p className="mt-2 text-center text-xs font-medium text-[#0f3d2e]/75">Pago con Yape, Plin o tarjeta · Precios referenciales para esta demostración</p>
          </div>
        </section>

        <section className="bg-[#fffbeb] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2rem] bg-emerald-950 px-6 py-8 text-lime-50 shadow-[0_24px_70px_-35px_rgba(20,83,45,0.5)] sm:px-10 sm:py-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-lime-100">
                <HeartPulse aria-hidden="true" className="size-4" />
                ODS 3 · Salud y bienestar
              </span>
              <h2 className="mt-4 max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">Pequeñas decisiones que suman a tu bienestar.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-lime-50/75">Encontrar opciones más saludables cerca de la universidad puede hacer más fácil cuidarte, incluso en los días más ocupados.</p>
            </div>
            <a href="#buscar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-lime-100 px-5 text-sm font-bold text-[#0f3d2e] transition hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-200/40">
              Explorar opciones
              <Search aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
