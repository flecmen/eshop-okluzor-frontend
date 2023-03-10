import { Order_item } from './dbTypes';

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
  payment_method: Payment_method
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
  plati_postovne: boolean
}

/**
 * Model Category
 *
 */
export type Category = {
  id: number
  name: string
  description: string
  image_path: string | null
}

/**
 * Model Product
 *
 */
export type Product = {
  id: number
  name: string
  manufacturer: string
  description: string
  price: number
  image_path: string | null
  dph: number
  categoryId: number
  pocet_kusu_v_baleni: number | null
  rozmery: string | null
  s_obrazkem: boolean | null
  orientace: Orientace | null
  barva_latkove: Barva_latkove | null
  obrazek_latkove: Obrazek_latkove | null
  barva_prisavkove: Barva_prisavkove | null
  typ_prisavkove: Typ_prisavkove | null
  velikost: Velikost | null
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
  order_items: Order_item[]
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
  PRAVY = 'pravý',
  LEVY = 'levý',
  UNI = 'univerzální',
}

export enum Barva_latkove {
  ZLUTA = 'žlutá',
  ZELENA = 'zelená',
  SVETLE_MODRA = 'světle modrá',
  TMAVE_MODRA = 'tmavě modrá',
  FIALOVA = 'fialová',
  CERVENA = 'červená',
  RUZOVA = 'růžová',
  SVETLE_RUZOVA = 'světle růžová',
  TELOVA = 'tělová'
};

export enum Barva_prisavkove {
  PRIRODNI = 'přírodní',
  SVETLE_RUZOVA = 'světle růžová',
  CERVENA = 'červená',
  FIALOVA = 'fialová',
  MODRA = 'modrá',
  ZELENA = 'zelená',
  TYRKYSOVA = 'tyrkysová',
  ZLUTA = 'žlutá',
}

export enum Obrazek_latkove {
  BERUSKA = 'beruška',
  MOTYLE = 'motýl',
  KVETINY = 'květiny',
  FOTBALOVY_MIC = 'fotbalová míč',
  PLAZOVY_MIC = 'plážový míč',
  PAVUCINA = 'pavučina',
  MIMON_HRANATY = 'mimoň – hranatý',
  MIMON_DVE_OCI = 'mimoň – dvě oči',
  MIMON_KULATY = 'mimoň – kulatý',
  AUTO = 'auto',
  DINO = 'dino',
  KITTY = 'kočka',
  PIRAT = 'pirát',
  LETADLO = 'letadlo',
  PONY = 'poník',
  SRDCE = 'srdce'
};

export enum Typ {
  naplastovy = 'Náplasťový',
  latkovy = 'Látkový',
  prisavkovy = 'Přísavkový',
  ocni_kryti = 'Oční krytí',
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
  objednano = 'objednáno',
  odelsano = 'odesláno',
  dokonceno = 'dokončeno',
  zaplaceno = 'zaplaceno'
}
export enum Role {
  'Admin',
  'Customer'
}
export enum Payment_method {
  dobirka = 'dobírka',
  prevodem = 'převodem',
  hotove = 'hotově'
};
