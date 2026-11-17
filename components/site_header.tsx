'use client'

import { useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Buscar', href: '#buscar' },
  { label: 'Ejemplos', href: '#ejemplos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' },
]

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#fefce8]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-lime-100 shadow-sm">
            <Leaf aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-lg font-bold leading-tight tracking-tight text-emerald-950 sm:text-xl">NutriCampus</span>
            <span className="block text-[9px] font-medium leading-3 text-emerald-950/80 sm:text-[11px]">Come rico y estudia mejor</span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-emerald-950/75 transition hover:bg-emerald-900/5 hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/15 bg-white text-emerald-950 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 lg:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      <nav id="mobile-navigation" aria-label="Navegación móvil" hidden={!isMenuOpen} className="border-t border-emerald-900/10 bg-[#fefce8] px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
