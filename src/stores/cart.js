import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const produitsPanier = ref([])

    function addProduct(product) {
        const existeDeja = produitsPanier.value.some(p => p.nom === product.nom)
        
        if (!existeDeja) {
            produitsPanier.value.push({...product, quantite: 1})
        }else{
            produitsPanier.value = produitsPanier.value.map((p) => {
            if (p.nom === product.nom) {
                p.quantite = p.quantite + 1
            }
            return p
            })
        }
    }

    return {
        produitsPanier,
        addProduct,
    }
})