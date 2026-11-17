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
        <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-lime-100 via-emerald-50 to-emerald-200/70">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-white/50 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-56 size-80 rounded-full bg-lime-300/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-950 shadow-sm sm:text-sm">
                <MapPin aria-hidden="true" className="size-4 text-emerald-700" />
                USIL · Av. La Fontana 550, La Molina
              </span>
              <h1 className="mx-auto mt-6 max-w-4xl text-balance font-heading text-4xl font-bold leading-[1.08] tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
                Come rico. <span className="text-emerald-700">Estudia mejor.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-emerald-950/75 sm:text-lg sm:leading-8">
                Encuentra comida saludable, rica y a buen precio a pocos minutos de tu campus. Tu tiempo entre clases también cuenta.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#buscar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 text-sm font-bold text-orange-950 shadow-md shadow-orange-900/10 transition hover:-translate-y-0.5 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30">
                  Encuentra tu próximo almuerzo
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-950/80 sm:text-sm">
                  <ShieldCheck aria-hidden="true" className="size-4 text-emerald-700" />
                  Recomendaciones, no ventas
                </span>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-emerald-950/80 sm:text-sm">
                <span className="inline-flex items-center gap-2"><Sparkles aria-hidden="true" className="size-4 text-emerald-700" />Búsqueda inteligente</span>
                <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-emerald-700" />Cerca de tu campus</span>
                <span className="inline-flex items-center gap-2"><HeartPulse aria-hidden="true" className="size-4 text-emerald-700" />Opciones para sentirte bien</span>
              </div>
            </div>

            <FoodCarousel />
          </div>
        </section>

        <section id="buscar" className="scroll-mt-24 bg-[#fefce8] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-7 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Tu antojo, tus criterios</span>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">¿Qué se te antoja hoy?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-emerald-950/80 sm:text-base">
                Cuéntanos qué buscas. Comparamos tipo de comida, objetivo y cercanía para recomendarte opciones.
              </p>
            </div>
            <SearchBar query={query} onQueryChange={setQuery} onSearch={runSearch} />
          </div>
        </section>

        <section id="resultados" className="scroll-mt-24 bg-[#fefce8] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Opciones para ti</span>
                <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
                  {searchedQuery ? 'Resultados de búsqueda' : 'Cerca de la USIL'}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-950/80">
                  {searchedQuery ? <>Coincidencias para <span className="font-semibold text-emerald-950">“{searchedQuery}”</span></> : 'Comercios de la zona con alternativas para distintos antojos y presupuestos.'}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3.5 py-2 text-xs font-medium text-emerald-950/75">
                <Clock3 aria-hidden="true" className="size-4 text-emerald-700" />
                Distancias aproximadas desde el campus
              </span>
            </div>

            {isLoading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-900/10 bg-white text-center">
                <Loader2 aria-hidden="true" className="size-8 animate-spin text-emerald-700" />
                <p role="status" className="font-medium text-emerald-950">Realizando búsqueda en la base de datos</p>
              </div>
            ) : (
              <MerchantCards merchants={results} />
            )}
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-emerald-950/80">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-700" />
              NutriCampus informa y recomienda. Los precios, platos y distancias son referenciales; confirma los detalles directamente con cada comercio.
            </p>
          </div>
        </section>

        <section id="planes" className="scroll-mt-24 bg-gradient-to-b from-emerald-50 to-lime-100/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Para comercios</span>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">Haz que te encuentren</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-950/80 sm:text-base">
                Comparte tu menú con estudiantes que buscan opciones ricas, nutritivas y cerca de la USIL.
              </p>
            </div>
            <Plans />
            <p className="mt-6 text-center text-xs font-medium text-emerald-950/80">Pago con Yape, Plin o tarjeta · Planes y precios referenciales para esta demostración</p>
          </div>
        </section>

        <section className="bg-[#fefce8] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2rem] bg-emerald-950 px-6 py-8 text-lime-50 shadow-[0_24px_70px_-35px_rgba(20,83,45,0.5)] sm:px-10 sm:py-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-lime-100">
                <HeartPulse aria-hidden="true" className="size-4" />
                ODS 3 · Salud y bienestar
              </span>
              <h2 className="mt-4 max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">Pequeñas decisiones que suman a tu bienestar.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-lime-50/75">Encontrar opciones más saludables cerca de la universidad puede hacer más fácil cuidarte, incluso en los días más ocupados.</p>
            </div>
            <a href="#buscar" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-lime-100 px-5 text-sm font-bold text-emerald-950 transition hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-200/40">
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
