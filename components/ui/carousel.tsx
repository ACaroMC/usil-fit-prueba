'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  orientation: 'horizontal' | 'vertical'
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('Carousel components must be used inside <Carousel>.')
  return context
}

function Carousel({
  opts,
  plugins,
  orientation = 'horizontal',
  setApi,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  React.useEffect(() => {
    if (api) setApi?.(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }
    updateScrollState()
    api.on('select', updateScrollState)
    api.on('reInit', updateScrollState)
    return () => {
      api.off('select', updateScrollState)
      api.off('reInit', updateScrollState)
    }
  }, [api])

  const value = React.useMemo(
    () => ({ carouselRef, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }),
    [carouselRef, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  )

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carrusel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="diapositiva"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0',
        orientation === 'horizontal' ? 'basis-full pl-4' : 'basis-full pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel()
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Mostrar opciones anteriores"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        'rounded-full border-[#0f3d2e]/20 bg-[#fffbeb] text-[#0f3d2e] shadow-sm hover:bg-[#a3e635] hover:text-[#0f3d2e]',
        orientation === 'horizontal'
          ? 'absolute left-2 top-1/2 -translate-y-1/2'
          : 'absolute left-1/2 top-2 -translate-x-1/2 rotate-90',
        className,
      )}
      {...props}
    >
      <ArrowLeft aria-hidden="true" />
    </Button>
  )
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext, orientation } = useCarousel()
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Mostrar más opciones"
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        'rounded-full border-[#0f3d2e]/20 bg-[#fffbeb] text-[#0f3d2e] shadow-sm hover:bg-[#a3e635] hover:text-[#0f3d2e]',
        orientation === 'horizontal'
          ? 'absolute right-2 top-1/2 -translate-y-1/2'
          : 'absolute bottom-2 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      {...props}
    >
      <ArrowRight aria-hidden="true" />
    </Button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
export type { CarouselApi }
