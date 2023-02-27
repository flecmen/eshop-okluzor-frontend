
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
}

/**
 * Model User
 *
 */
export type User = {
  id: number
  nazev_firmy: string
  ico: string
  dic: string
  password: string
  email: string | null
  tel: string | null
  addressId: number
  role: Role
  address: Address
  branch?: Branch[]
}

/**
 * Model Branch
 *
 */
export type Branch = {
  id: number
  userId: number
  branch_name: string | null
  email: string | null
  tel: string | null
  addressId: number
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
  time_of_creation: Date
  status: Order_status
  note: string | null
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
  priceAtOrder: number
}


export enum Orientace {
  PRAVY,
  LEVY,
  UNI
}

export enum Barva {
  PRIRODNI,
  SVETLE_RUZOVA,
  CERVENA,
  FIALOVA,
  MODRA,
  ZELENA,
  TYRKYSOVA,
  ZLUTA
}

export enum Typ {
  naplastovy,
  latkovy,
  prisavkovy,
  ocni_kryti,
}

export enum Typ_prisavkove {
  A,
  B,
  C
}

export enum Velikost {
  S,
  L
}

export enum Order_status {
  na_ceste,
  odelsano,
  dokonceno
}
export enum Role {
  'Admin',
  'Customer'
}
