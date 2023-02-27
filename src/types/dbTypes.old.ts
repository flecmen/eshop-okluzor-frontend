/**
 * Model Address
 *
 */
export type Address = {
  id: number
  mesto: string
  ulice: string
  cislo_popis: string | null
  cislo_orient: string | null
  psc: string
  userId?: number
  branchId?: number
}

/**
 * Model User
 *
 */
export type User = {
  id: number
  nazev_firmy: string
  password: string
  ico: string
  dic: string
  tel: string
  email: string
  addressId: number
  address: Address
  branch: Branch[]
  role: Role
}

/**
 * Model Branch
 *
 */
export type Branch = {
  id: number
  userId: number
  branch_name?: string
  addressId: number
  tel?: string
  email?: string
  address: Address
}

/**
 * Model Category
 *
 */
export type Category = {
  id: number
  name: string
  description: string
  image: Buffer
}

/**
 * Model Product
 *
 */
export type Product = {
  id: number
  nazev: string
  vyrobce: string
  popis: string
  cena: number
  obrazek: Buffer
  dph: number
  typ: Typ
  pocet_kusu_v_baleni: number
  rozmery: string
  s_obrazkem: boolean
  orientace: Orientace
  barva: Barva
  typ_prisavkove: Typ_prisavkove
  velikost: Velikost
  categoryId: number
}

/**
 * Model Order
 *
 */
export type Order = {
  id: number
  userId: number
  branchId: number
  created_at: Date
  status: Order_status
  note: string
}

/**
 * Model Order_item
 *
 */
export type Order_item = {
  id: number
  orderId: number
  productId: number
  quantity: number
}\feed\subscriptions

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
enum Role {
  'Admin',
  'Customer'
}
