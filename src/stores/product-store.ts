import { Product, Category, New_order } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import config from '../config'
import { Notify } from 'quasar';
import blankObjects from 'src/types/blankObjects';

export const useProductStore = defineStore('productStore', () => {

  const products = ref<Product[]>()
  const categories = ref<Category[]>()
  const newOrder = ref<New_order>(JSON.parse(JSON.stringify(blankObjects.blankOrder)) as New_order)

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

  function getProduct(productId: number) {
    return products.value?.find(p => p.id === productId);
  }

  async function resetNewOrder() {
    newOrder.value = JSON.parse(JSON.stringify(blankObjects.blankOrder));
  }

  function getItem(productId: number) {
    return newOrder.value.order_items.find(i => i.productId === productId)
  }

  function addOrderItem(productId: number) {
    if (!getItem(productId)) {
      newOrder.value.order_items.push({
        productId: productId,
        quantity: 1,
        priceAtOrder: (getProduct(productId))?.price as number,
      })
    }
  }


  return {
    products,
    loadProducts,
    getProduct,
    newOrder,
    resetNewOrder,
    getItem,
    addOrderItem,
  };
});
