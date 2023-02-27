import { User, Address, Branch } from './dbTypes';
import { ref } from 'vue';

export default {
  blankUser: ref({
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
    branch: [] as Branch[]
  } as User),
  blankBranch: ref({
    tel: '',
    email: '',
    branch_name: '',
    address: {
      mesto: '',
      ulice: '',
      cislo_popis: '',
      cislo_orient: '',
      psc: '',
    } as Address
  } as Branch)
}
