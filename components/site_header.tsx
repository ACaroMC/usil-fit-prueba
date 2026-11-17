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
    <header className="sticky top-0 z-40 border-b border-[#0f3d2e]/10 bg-[#fffbeb]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#15803d] text-[#ffd60a] shadow-sm">
            <Leaf aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-lg font-bold leading-tight tracking-tight text-[#0f3d2e] sm:text-xl">NutriCampus</span>
            <span className="block text-[9px] font-medium leading-3 text-[#0f3d2e]/80 sm:text-[11px]">Come rico y estudia mejor</span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-[#0f3d2e]/75 transition hover:bg-[#a3e635]/35 hover:text-[#0f3d2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
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
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#0f3d2e]/15 bg-[#fffbeb] text-[#0f3d2e] transition hover:bg-[#a3e635]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] lg:hidden"
        >
          {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      <nav id="mobile-navigation" aria-label="Navegación móvil" hidden={!isMenuOpen} className="border-t border-[#0f3d2e]/10 bg-[#fffbeb] px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#0f3d2e] transition hover:bg-[#a3e635]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
