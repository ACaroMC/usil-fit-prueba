export type CategoryId =
  | 'bowls'
  | 'snacks'
  | 'bebidas'
  | 'proteina'
  | 'economicos'
  | 'vegetarianos'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  tags: CategoryId[]
  calories: number
  protein: number
  carbs: number
  fat: number
  description: string
  ingredients: string[]
  characteristics: string[]
  conservation: string
  available: boolean
  machineId: string
}

export type Category = {
  id: CategoryId
  name: string
  description: string
  icon: string
}

export type Machine = {
  id: string
  code: string
  location: string
  status: 'available' | 'offline'
  productsCount: number
  stock: number
  distance: number
  productIds: string[]
}

export const categories: Category[] = [
  {
    id: 'bowls',
    name: 'Bowls',
    description: 'Comidas completas y balanceadas',
    icon: 'Salad',
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Bocados rápidos entre clases',
    icon: 'Cookie',
  },
  {
    id: 'bebidas',
    name: 'Bebidas saludables',
    description: 'Hidrátate de forma natural',
    icon: 'CupSoda',
  },
  {
    id: 'proteina',
    name: 'Alto en proteína',
    description: 'Energía para tu día activo',
    icon: 'Dumbbell',
  },
  {
    id: 'economicos',
    name: 'Económicos',
    description: 'Opciones amigables con tu bolsillo',
    icon: 'Wallet',
  },
  {
    id: 'vegetarianos',
    name: 'Vegetarianos',
    description: 'Basado en plantas y rico en sabor',
    icon: 'Sprout',
  },
]

export const categoryLabels: Record<CategoryId, string> = {
  bowls: 'Bowls',
  snacks: 'Snacks',
  bebidas: 'Bebidas saludables',
  proteina: 'Alto en proteína',
  economicos: 'Económicos',
  vegetarianos: 'Vegetarianos',
}

export const products: Product[] = [
  {
    id: 'bowl-pollo',
    name: 'Bowl de pollo y verduras',
    price: 14.9,
    image: '/products/bowl-pollo.png',
    category: 'Bowls',
    tags: ['bowls', 'proteina'],
    calories: 420,
    protein: 28,
    carbs: 38,
    fat: 14,
    description:
      'Bowl equilibrado con pechuga de pollo a la plancha, arroz integral y vegetales frescos. Ideal para un almuerzo saludable y saciante entre clases.',
    ingredients: ['Pechuga de pollo', 'Arroz integral', 'Brócoli', 'Zanahoria', 'Palta', 'Aderezo de yogurt'],
    characteristics: ['Alto en proteína', 'Bajo en grasa', 'Almuerzo saludable', 'Saciante'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-03',
  },
  {
    id: 'yogurt-granola',
    name: 'Yogurt con granola',
    price: 7.5,
    image: '/products/yogurt-granola.png',
    category: 'Snacks',
    tags: ['snacks', 'vegetarianos'],
    calories: 210,
    protein: 12,
    carbs: 28,
    fat: 5,
    description:
      'Yogurt griego natural con granola artesanal y frutos rojos. Un snack cremoso, alto en proteína y perfecto para recargar energía.',
    ingredients: ['Yogurt griego', 'Granola de avena', 'Arándanos', 'Miel', 'Semillas de chía'],
    characteristics: ['Alto en proteína', 'Snack saludable', 'Vegetariano', 'Fuente de calcio'],
    conservation: 'Consumir dentro de 48 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-01',
  },
  {
    id: 'snack-energetico',
    name: 'Snack energético de proteína',
    price: 6.5,
    image: '/products/snack-energetico.png',
    category: 'Snacks',
    tags: ['snacks', 'proteina', 'economicos'],
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 6,
    description:
      'Barra energética alta en proteína con avena, mantequilla de maní y cacao. Económica, práctica y perfecta antes o después del gimnasio.',
    ingredients: ['Avena', 'Proteína de suero', 'Mantequilla de maní', 'Cacao', 'Dátiles'],
    characteristics: ['Alto en proteína', 'Económico', 'Energético', 'Portátil'],
    conservation: 'Consumir preferentemente antes de 3 meses',
    available: true,
    machineId: 'usilfit-02',
  },
  {
    id: 'ensalada-quinua',
    name: 'Ensalada César con quinua',
    price: 12.9,
    image: '/products/ensalada-quinua.png',
    category: 'Bowls',
    tags: ['bowls', 'vegetarianos'],
    calories: 350,
    protein: 18,
    carbs: 30,
    fat: 16,
    description:
      'Ensalada fresca con quinua andina, lechuga romana, crutones integrales y aderezo césar ligero. Una opción vegetariana llena de sabor.',
    ingredients: ['Quinua', 'Lechuga romana', 'Crutones integrales', 'Queso parmesano', 'Aderezo césar ligero'],
    characteristics: ['Vegetariano', 'Fuente de fibra', 'Almuerzo saludable', 'Fresco'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-03',
  },
  {
    id: 'wrap-pavo',
    name: 'Wrap integral de pavo',
    price: 11.5,
    image: '/products/wrap-pavo.png',
    category: 'Bowls',
    tags: ['bowls', 'proteina'],
    calories: 390,
    protein: 24,
    carbs: 34,
    fat: 12,
    description:
      'Wrap de tortilla integral relleno de pechuga de pavo, vegetales frescos y hummus. Un almuerzo saludable y fácil de llevar.',
    ingredients: ['Tortilla integral', 'Pechuga de pavo', 'Hummus', 'Espinaca', 'Tomate', 'Pepino'],
    characteristics: ['Alto en proteína', 'Almuerzo saludable', 'Portátil', 'Bajo en grasa'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: false,
    machineId: 'usilfit-01',
  },
  {
    id: 'batido-verde',
    name: 'Batido verde detox',
    price: 8.9,
    image: '/products/batido-verde.png',
    category: 'Bebidas saludables',
    tags: ['bebidas', 'vegetarianos'],
    calories: 160,
    protein: 6,
    carbs: 28,
    fat: 3,
    description:
      'Smoothie natural de espinaca, manzana verde, piña y jengibre. Refrescante, vegetariano y cargado de vitaminas.',
    ingredients: ['Espinaca', 'Manzana verde', 'Piña', 'Jengibre', 'Agua de coco'],
    characteristics: ['Vegetariano', 'Detox', 'Bebida saludable', 'Rico en vitaminas'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-02',
  },
  {
    id: 'agua-coco',
    name: 'Agua de coco natural',
    price: 5.0,
    image: '/products/agua-coco.png',
    category: 'Bebidas saludables',
    tags: ['bebidas', 'economicos'],
    calories: 90,
    protein: 1,
    carbs: 21,
    fat: 0,
    description:
      'Agua de coco 100% natural, sin azúcar añadida. La forma más económica y refrescante de hidratarte durante el día.',
    ingredients: ['Agua de coco natural'],
    characteristics: ['Económico', 'Bebida saludable', 'Hidratante', 'Sin azúcar añadida'],
    conservation: 'Consumir preferentemente antes de 2 meses',
    available: true,
    machineId: 'usilfit-01',
  },
  {
    id: 'bowl-lentejas',
    name: 'Bowl vegano de lentejas',
    price: 13.5,
    image: '/products/bowl-lentejas.png',
    category: 'Bowls',
    tags: ['bowls', 'vegetarianos', 'proteina'],
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 9,
    description:
      'Bowl vegano con lentejas guisadas, camote asado, palta y quinua. Alto en proteína vegetal y fibra para mantenerte activo.',
    ingredients: ['Lentejas', 'Camote', 'Quinua', 'Palta', 'Espinaca', 'Aderezo de limón'],
    characteristics: ['Vegetariano', 'Vegano', 'Alto en proteína', 'Rico en fibra'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-03',
  },
  {
    id: 'mix-frutos-secos',
    name: 'Mix de frutos secos',
    price: 7.0,
    image: '/products/mix-frutos-secos.png',
    category: 'Snacks',
    tags: ['snacks', 'economicos', 'proteina'],
    calories: 200,
    protein: 8,
    carbs: 15,
    fat: 13,
    description:
      'Mezcla energética de almendras, nueces, pasas y arándanos deshidratados. Un snack económico, práctico y alto en energía.',
    ingredients: ['Almendras', 'Nueces', 'Pasas', 'Arándanos deshidratados', 'Semillas de girasol'],
    characteristics: ['Económico', 'Snack saludable', 'Energético', 'Fuente de grasas buenas'],
    conservation: 'Consumir preferentemente antes de 4 meses',
    available: true,
    machineId: 'usilfit-02',
  },
  {
    id: 'sandwich-huevo',
    name: 'Sándwich integral de huevo',
    price: 6.9,
    image: '/products/sandwich-huevo.png',
    category: 'Snacks',
    tags: ['snacks', 'economicos', 'proteina'],
    calories: 300,
    protein: 16,
    carbs: 32,
    fat: 10,
    description:
      'Sándwich de pan integral con huevo, tomate y hojas verdes. Una opción económica, saludable y saciante para cualquier momento.',
    ingredients: ['Pan integral', 'Huevo', 'Tomate', 'Lechuga', 'Palta'],
    characteristics: ['Económico', 'Alto en proteína', 'Almuerzo saludable', 'Saciante'],
    conservation: 'Consumir dentro de 24 horas · Refrigerado',
    available: true,
    machineId: 'usilfit-01',
  },
]

export const machines: Machine[] = [
  {
    id: 'usilfit-01',
    code: 'USIL Fit #01',
    location: 'Pabellón Central',
    status: 'available',
    productsCount: 14,
    stock: 62,
    distance: 45,
    productIds: ['yogurt-granola', 'wrap-pavo', 'agua-coco', 'sandwich-huevo'],
  },
  {
    id: 'usilfit-02',
    code: 'USIL Fit #02',
    location: 'Cafetería Norte',
    status: 'available',
    productsCount: 9,
    stock: 38,
    distance: 80,
    productIds: ['snack-energetico', 'batido-verde', 'mix-frutos-secos'],
  },
  {
    id: 'usilfit-03',
    code: 'USIL Fit #03',
    location: 'Biblioteca',
    status: 'available',
    productsCount: 12,
    stock: 51,
    distance: 120,
    productIds: ['bowl-pollo', 'ensalada-quinua', 'bowl-lentejas'],
  },
  {
    id: 'usilfit-04',
    code: 'USIL Fit #04',
    location: 'Complejo Deportivo',
    status: 'offline',
    productsCount: 0,
    stock: 0,
    distance: 210,
    productIds: [],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getMachineById(id: string): Machine | undefined {
  return machines.find((m) => m.id === id)
}

export type Recommendation = {
  id: string
  title: string
  subtitle: string
  icon: string
  productIds: string[]
}

export const recommendations: Recommendation[] = [
  {
    id: 'energia',
    title: 'Para tener energía',
    subtitle: 'Recarga pilas entre clases',
    icon: 'Zap',
    productIds: ['snack-energetico', 'mix-frutos-secos', 'batido-verde'],
  },
  {
    id: 'proteina',
    title: 'Alto en proteína',
    subtitle: 'Ideal para días activos',
    icon: 'Dumbbell',
    productIds: ['bowl-pollo', 'wrap-pavo', 'yogurt-granola'],
  },
  {
    id: 'economicas',
    title: 'Opciones económicas',
    subtitle: 'Cuida tu bolsillo',
    icon: 'Wallet',
    productIds: ['agua-coco', 'sandwich-huevo', 'mix-frutos-secos'],
  },
  {
    id: 'saludable',
    title: 'Alimentación saludable',
    subtitle: 'Balance y bienestar',
    icon: 'Leaf',
    productIds: ['ensalada-quinua', 'bowl-lentejas', 'batido-verde'],
  },
]
