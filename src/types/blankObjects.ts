import { User, Address } from './dbTypes';
import { reactive } from 'vue';

export default {
  blankUser: reactive({
    nazev_firmy: '',
    password: '',
    ico: '',
    dic: '',
    tel: '',
    email: '',
    address: {
      mesto: '',
      ulice: '',
      cislo_popis: '',
      cislo_orient: '',
      psc: '',
    } as Address,
  } as User)
}
