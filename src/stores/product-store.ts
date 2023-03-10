import { Product, Category } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import config from '../config'
import { Notify } from 'quasar';

interface ExtendedProduct extends Product {
  quantity: number,
}

export const useProductStore = defineStore('productStore', () => {

  const products = ref<ExtendedProduct[]>()
  const categories = ref<Category[]>()

  async function loadProducts() {
    // produkty
    const products_response = await axios.get(config.backendUrl + '/product')
    if (!products_response.data) {
      Notify.create({
        type: 'negative',
        message: 'Nepodařilo se načíst produkty'
      })
    }
    const category_response = await axios.get(config.backendUrl + '/product/category')
    if (!category_response.data) {
      Notify.create({
        type: 'negative',
        message: 'Nepodařilo se načíst kategorie'
      })
    }

    products.value = products_response.data;
    categories.value = category_response.data;
  }


  return {
    products,
    loadProducts,
  };
});
