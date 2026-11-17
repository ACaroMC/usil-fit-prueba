export type MerchantPlanOption = {
  id: 'basic' | 'featured' | 'premium'
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  buttonLabel: string
  payback?: string
}

export const merchantPlans: MerchantPlanOption[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 0,
    description: 'Tu perfil listo para que te encuentren.',
    features: [
      'Perfil con nombre, dirección, horario y distancia a la USIL',
      'Hasta 3 platos con foto, precio y etiqueta saludable',
      'Aparece en búsquedas en posición estándar',
      'Sin badge ni prioridad',
    ],
    buttonLabel: 'Empezar gratis',
  },
  {
    id: 'featured',
    name: 'Destacado',
    price: 19,
    description: 'Más visibilidad para tus mejores opciones.',
    features: [
      'Todo lo del plan Básico',
      'Menú completo sin límite de platos',
      'Badge Destacado y prioridad en resultados',
      'Etiquetas: alta en proteína, vegetariana y baja en grasa',
      'Contacto directo por llamada o WhatsApp',
    ],
    highlighted: true,
    badge: 'Más elegido',
    buttonLabel: 'Suscribirme',
    payback: 'Se paga solo con 4 clientes nuevos al mes',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39,
    description: 'La máxima visibilidad y estadísticas para crecer.',
    features: [
      'Todo lo del plan Destacado',
      'Promociones con notificaciones push y por correo',
      'Estadísticas de visitas y clics al perfil',
      'Máxima prioridad cuando coincides con una búsqueda',
    ],
    buttonLabel: 'Suscribirme',
    payback: 'Se paga solo con 8 clientes nuevos al mes',
  },
]
