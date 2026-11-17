import { Camera, HeartPulse, Leaf, Music2, UsersRound } from 'lucide-react'

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Buscar opciones', href: '#buscar' },
  { label: 'Ejemplos rápidos', href: '#ejemplos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Planes para comercios', href: '#planes' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Camera },
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: UsersRound },
  { label: 'TikTok', href: 'https://www.tiktok.com/', Icon: Music2 },
]

export function SiteFooter() {
  return (
    <footer id="contacto" className="border-t border-emerald-900/10 bg-[#0f3d2e] text-lime-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-lime-100 text-emerald-950">
                <Leaf aria-hidden="true" className="size-5" />
              </span>
              <span className="font-heading text-xl font-bold">NutriCampus</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-lime-50/75">
              Información para elegir opciones de alimentación saludable y económica alrededor de tu campus. No vendemos comida.
            </p>
            <p className="mt-4 text-sm font-medium text-lime-50/85">Created by Carolina Mendieta</p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Explora</h2>
            <nav aria-label="Enlaces del pie de página" className="mt-4 flex flex-col items-start gap-3">
              {footerLinks.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-lime-50/75 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Conversemos</h2>
            <p className="mt-4 text-sm leading-6 text-lime-50/75">¿Tienes un comercio cerca de la USIL? Escríbenos para conocer los planes.</p>
            <a href="mailto:comercios@nutricampus.pe" className="mt-3 inline-block text-sm font-semibold text-lime-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
              comercios@nutricampus.pe
            </a>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`NutriCampus en ${label}`} className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lime-50 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-lime-50/85">
            <HeartPulse aria-hidden="true" className="size-4 text-lime-300" />
            Alineado al ODS 3 · Salud y bienestar
          </p>
          <p className="text-xs leading-5 text-lime-50/60">Precios, distancias y opciones mostradas son referenciales para esta demostración.</p>
        </div>
      </div>
    </footer>
  )
}
