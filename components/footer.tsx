import Link from 'next/link'
import { Leaf } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Máquinas', href: '/maquinas' },
  { label: 'Recomendaciones', href: '/recomendaciones' },
  { label: 'Mi perfil', href: '/perfil' },
]

const socials = ['Instagram', 'Facebook', 'TikTok']

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-brand-light/50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="font-heading text-lg font-semibold text-brand-dark">USIL Fit</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Alimentación saludable, rápida y accesible para estudiantes. Contribuyendo al ODS 3:
            Salud y Bienestar.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Navegación</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Síguenos</h3>
          <div className="flex flex-wrap gap-2">
            {socials.map((label) => (
              <span
                key={label}
                className="rounded-full bg-card px-3.5 py-1.5 text-xs font-medium text-brand-dark ring-1 ring-border transition-colors hover:bg-secondary"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} USIL Fit · Salud y bienestar en tu campus
        </p>
      </div>
    </footer>
  )
}
