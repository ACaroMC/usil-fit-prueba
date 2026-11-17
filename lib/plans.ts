export type MerchantPlanOption = {
  id: 'basic' | 'featured' | 'premium'
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export const merchantPlans: MerchantPlanOption[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 0,
    description: 'Una forma sencilla de que estudiantes te encuentren.',
    features: ['Perfil de tu comercio', 'Hasta 3 platos listados', 'Información de ubicación'],
  },
  {
    id: 'featured',
    name: 'Destacado',
    price: 49,
    description: 'Más visibilidad para tus mejores opciones.',
    features: ['Menú completo', 'Badge Destacado', 'Prioridad en los resultados'],
    highlighted: true,
    badge: 'Más elegido',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    description: 'Conecta con estudiantes y conoce el alcance de tu perfil.',
    features: [
      'Todo lo incluido en Destacado',
      'Promociones con avisos a estudiantes',
      'Estadísticas de visitas',
    ],
  },
]
