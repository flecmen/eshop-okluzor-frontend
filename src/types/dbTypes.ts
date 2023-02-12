export interface Address {
  id: number
  mesto: string
  ulice: string
  cislo_popis: string
  cislo_orient: string
  psc: string
  user: User
  branch: Branch
}

export interface User {
  id: number
  nazev_firmy: string
  password: string
  ico: string
  dic: string
  tel: string
  email: string
  branch: Branch
  address: Address
  order: Order[]
}

export interface Branch {
  id: number
  tel: string
  email: string
  address: Address
  user: User
  order: Order[]
}

export interface Category {
  id: number
  name: string
  description: string
  image: ImageData
  products: Product[]
}

export interface Product {
  id: number
  category: Category
  nazev: string
  vyrobce: string
  popis: string
  cena: number
  obrazek: ImageData
  dph: number
  typ: Typ
  //náplasťové
  pocet_kusu_v_baleni: number
  rozmery: string
  //látkové
  s_obrazkem: boolean
  orientace: Orientace
  //přísavkové
  barva: Barva
  typ_prisavkove: Typ_prisavkove
  //oční krytí
  velikost: Velikost
  //other
  Order_item: Order_item[]
}

export interface Order {
  id: number
  user: User
  branch: Branch
  created_at: Date
  status: Order_status
  note: string
  order_items: Order_item[]
}

export interface Order_item {
  id: number
  order: Order
  product: Product
  quantity: number
}

enum Orientace {
  PRAVY,
  LEVY,
  UNI
}

enum Barva {
  PRIRODNI,
  SVETLE_RUZOVA,
  CERVENA,
  FIALOVA,
  MODRA,
  ZELENA,
  TYRKYSOVA,
  ZLUTA
}

enum Typ {
  naplastovy,
  latkovy,
  prisavkovy,
  ocni_kryti,
}

enum Typ_prisavkove {
  A,
  B,
  C
}

enum Velikost {
  S,
  L
}

enum Order_status {
  na_ceste,
  odelsano,
  dokonceno
}
