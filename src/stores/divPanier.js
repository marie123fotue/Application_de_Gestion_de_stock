import { defineStore } from "pinia"
import { ref } from "vue"
import { computed } from "vue"
export const useDivPanierstore = defineStore("divPanier", () => {
    const produitsPanier = ref([])

    const prixTotal = ref(null)
    function totalprice() {
          prixTotal=  computed(() => {
            return produitsPanier.reduce((total, produit) => {
                // Calcul sécurisé (prix * quantité)
                const prix = parseFloat(produit.prix)
                const quantite = parseInt(produit.quantite)
                return total + (prix * quantite);
            }, 0).toFixed(2);
        });
        return prixTotal


    }
    return{
        produitsPanier,
        prixTotal,
    }

})
