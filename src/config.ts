import { Address } from './types/dbTypes';
import dotenv from 'dotenv'

dotenv.config();

export default {
  backendUrl: process.env['BackendUrl'],
  regex_email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  formatAddress: (address: Address) => {
    // use template literals to construct formatted string
    let formatted = `${address.mesto}, ${address.ulice} `;
    // use ternary operator to check if both strings are not null and show slash accordingly
    formatted += address.cislo_popis && address.cislo_orient ? `${address.cislo_popis}/${address.cislo_orient}` : `${address.cislo_popis}${address.cislo_orient}`;
    // add comma and postal code
    formatted += `, ${address.psc}`;
    return formatted;
  }
}
