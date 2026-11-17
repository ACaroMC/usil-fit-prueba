'use client'

import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const slides = [
  { image: '/nutricampus/protein-bowl.png', alt: 'Bowl de pollo, quinua y vegetales frescos', title: 'Bowls que sí llenan', place: 'Av. La Fontana · a 3 min de la USIL' },
  { image: '/nutricampus/ceviche.png', alt: 'Ceviche peruano con camote, cebolla y cilantro', title: 'Pescado fresco, cerca', place: 'La Molina · a 4 min de la USIL' },
  { image: '/nutricampus/menu-del-dia.png', alt: 'Menú del día con pescado, arroz y ensalada', title: 'Menú del día', place: 'Av. La Fontana · a 5 min de la USIL' },
  { image: '/nutricampus/smoothie.png', alt: 'Smoothie verde de kiwi, espinaca y limón', title: 'Un break natural', place: 'La Molina · a 6 min de la USIL' },
  { image: '/nutricampus/snacks.png', alt: 'Mix de frutos secos y semillas para un snack', title: 'Snacks para seguir', place: 'Av. La Fontana · a 3 min de la USIL' },
  { image: '/nutricampus/wrap.png', alt: 'Wrap integral vegetariano con vegetales y palta', title: 'Fresco, práctico, rico', place: 'La Molina · a 7 min de la USIL' },
]

export function FoodCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const shouldPause = isHovered || isFocused || isPaused

  const handleCarouselApi = useCallback((carouselApi: CarouselApi) => setApi(carouselApi), [])

  useEffect(() => {
    if (!api) return
    const syncActiveIndex = () => setActiveIndex(api.selectedScrollSnap())
    syncActiveIndex()
    api.on('select', syncActiveIndex)
    api.on('reInit', syncActiveIndex)
    return () => {
      api.off('select', syncActiveIndex)
      api.off('reInit', syncActiveIndex)
    }
  }, [api])

  useEffect(() => {
    if (!api || shouldPause) return
    const timer = window.setInterval(() => api.scrollNext(), 4000)
    return () => window.clearInterval(timer)
  }, [api, shouldPause])

  return (
    <section
      aria-label="Ideas de comida cerca de la USIL"
      className="mx-auto mt-10 max-w-7xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false)
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0f3d2e]/80">A un paso del campus</p>
          <p className="mt-1 text-sm font-semibold text-[#0f3d2e]">Ideas saludables cerca de la USIL</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            aria-pressed={isPaused}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#0f3d2e]/20 bg-[#fffbeb] text-[#0f3d2e] shadow-sm transition hover:scale-105 hover:bg-[#ffd60a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
          >
            {isPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </div>

      <Carousel
        setApi={handleCarouselApi}
        opts={{ loop: true, align: 'start', slidesToScroll: 1 }}
        aria-label="Ideas saludables de comercios cerca de la USIL"
        className="px-1"
      >
        <CarouselContent className="-ml-4">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.image} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4" aria-label={`${index + 1} de ${slides.length}`}>
              <article className="group h-full overflow-hidden rounded-3xl border border-[#0f3d2e]/10 bg-[#fffbeb] shadow-[0_18px_42px_-30px_rgba(15,61,46,0.65)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_-26px_rgba(15,61,46,0.6)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority={index === 0}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#ffd60a] px-3 py-1 text-[11px] font-extrabold text-[#0f3d2e] shadow-sm">Idea saludable</span>
                </div>
                <div className="flex h-28 flex-col justify-between gap-2 p-4">
                  <h3 className="font-heading text-base font-bold leading-tight text-[#0f3d2e]">{slide.title}</h3>
                  <p className="text-xs font-medium leading-5 text-[#0f3d2e]/80">{slide.place}</p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label="Elegir posición del carrusel" aria-live="polite">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Mostrar imagen ${index + 1}: ${slide.title}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] ${activeIndex === index ? 'w-8 bg-[#ff3d81]' : 'w-2.5 bg-[#0f3d2e]/25 hover:bg-[#0f3d2e]/50'}`}
          />
        ))}
        <span className="sr-only" aria-live="polite">Imagen {activeIndex + 1} de {slides.length}</span>
      </div>
    </section>
  )
}
