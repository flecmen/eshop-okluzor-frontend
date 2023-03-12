import { User, Address, Branch, Payment_method, New_order, New_order_item } from './dbTypes';

export default {
  blankUser: JSON.parse(JSON.stringify({
    nazev_firmy: '',
    password: '',
    ico: '',
    dic: '',
    tel: '',
    email: '',
    payment_method: Payment_method.prevodem,
    address: {
      mesto: '',
      ulice: '',
      cislo_popis: '',
      cislo_orient: '',
      psc: '',
    } as Address,
    branch: [] as Branch[]
  } as User)),
  blankBranch: JSON.parse(JSON.stringify({
    tel: '',
    email: '',
    branch_name: '',
    plati_postovne: true,
    address: {
      mesto: '',
      ulice: '',
      cislo_popis: '',
      cislo_orient: '',
      psc: '',
    } as Address
  } as Branch)),
  blankOrder: JSON.parse(JSON.stringify({
    userId: '',
    branchId: '',
    note: '',
    order_items: [] as New_order_item[],
  })) as New_order
}
