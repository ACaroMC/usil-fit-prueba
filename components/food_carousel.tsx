'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

const slides = [
  { image: '/nutricampus/protein-bowl.png', alt: 'Bowl de pollo, quinua y vegetales frescos', title: 'Bowls que sí llenan', place: 'Av. La Fontana · a 3 min de la USIL' },
  { image: '/nutricampus/ceviche.png', alt: 'Ceviche peruano con camote, cebolla y cilantro', title: 'Pescado fresco, cerca', place: 'La Molina · a 4 min de la USIL' },
  { image: '/nutricampus/menu-del-dia.png', alt: 'Menú del día con pescado, arroz y ensalada', title: 'Menú del día', place: 'Av. La Fontana · a 5 min de la USIL' },
  { image: '/nutricampus/smoothie.png', alt: 'Smoothie verde de kiwi, espinaca y limón', title: 'Un break natural', place: 'La Molina · a 6 min de la USIL' },
  { image: '/nutricampus/snacks.png', alt: 'Mix de frutos secos y semillas para un snack', title: 'Snacks para seguir', place: 'Av. La Fontana · a 3 min de la USIL' },
  { image: '/nutricampus/wrap.png', alt: 'Wrap integral vegetariano con vegetales y palta', title: 'Fresco, práctico, rico', place: 'La Molina · a 7 min de la USIL' },
]

export function FoodCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const shouldPause = isHovered || isFocused || isPaused

  useEffect(() => {
    if (shouldPause) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [shouldPause])

  function moveBy(amount: number) {
    setActiveIndex((current) => (current + amount + slides.length) % slides.length)
  }

  const visibleSlides = Array.from({ length: 3 }, (_, offset) => slides[(activeIndex + offset) % slides.length])

  return (
    <section
      aria-label="Ideas de comida cerca de la USIL"
      aria-roledescription="carrusel"
      className="mx-auto mt-10 max-w-6xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false)
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900/80">A un paso del campus</p>
          <p className="mt-1 text-sm font-medium text-emerald-950">Un vistazo a lo que podrías encontrar</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => moveBy(-1)}
            aria-label="Mostrar opciones anteriores"
            className="flex size-9 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            className="flex size-9 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            {isPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => moveBy(1)}
            aria-label="Mostrar más opciones"
            className="flex size-9 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visibleSlides.map((slide, index) => (
          <article key={`${activeIndex}-${slide.image}`} className="animate-[carousel-in_450ms_ease-out] overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-[0_12px_35px_-28px_rgba(20,83,45,0.55)]">
            <div className="relative h-48 overflow-hidden">
              <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 31vw" className="object-cover transition duration-500 hover:scale-105" priority={activeIndex === 0 && index === 0} />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-emerald-950 shadow-sm">Idea saludable</span>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <h3 className="font-heading text-sm font-semibold text-emerald-950">{slide.title}</h3>
              <span className="text-right text-[11px] leading-4 text-emerald-950/80">{slide.place}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Elegir imagen del carrusel">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Mostrar imagen ${index + 1}: ${slide.title}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${activeIndex === index ? 'w-7 bg-emerald-700' : 'w-2.5 bg-emerald-900/20 hover:bg-emerald-900/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
