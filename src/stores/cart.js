import PanierProduit from "@/views/panierProduit.vue";
import { defineStore } from "pinia";
import { ref, computed } from "vue"; //  N'oubliez pas d'importer 'computed'

export const useCartStore = defineStore("cart", () => {
    
    // STATE (état)
    const produitsPanier = ref([])
const categoriesProduit = ref([
    "Riz parfumé & tendre",
    "Spaghetti gourmet",
    "Huile raffinée de qualité",
    "Vin savoureux & raffiné",
    "Lait nourrissant & crémeux",
    "Biscuits croustillants",
    "Douceurs sucrées",
    "Soin dentaire Colgate",
    "Produits doux pour bébé",
    "Jus frais & vitaminé"
])

function demanderSuppression(productId) {
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    supprimerProduit(productId);
  }
}

function supprimerProduit(productId) {
  CartStore.supprimerDuPanier(productId);
}
function diminuer(){
    if(produitsPanier.quantite>1){
       PanierProduit.quantite--
    }
  
}
function augmenter(){
   PanierProduit.quantite++
}


    // GETTER (Calculé)
    //  Définissez prixTotal comme un computed
    const prixTotal = computed(() => {
        // ACCÈS CORRECT À LA VALEUR DU REF : produitsPanier.value
        return produitsPanier.value.reduce((total, produit) => {
            // Calcul sécurisé (prix * quantité)
            const prix = parseFloat(produit.prix) || 0;
            const quantite = parseInt(produit.quantite) || 0;
            return total + (prix * quantite);
        }, 0).toFixed(2);
    });

    // ACTIONS (Méthodes de modification de l'état)
    function addProduct(product) {
        const existeDeja = produitsPanier.value.find(p => p.nom === product.nom)
        
        if (!existeDeja) {
            // Ajout du produit avec une quantité initiale de 1
            produitsPanier.value.push({...product, quantite: 1})
        } else {
            // Si le produit existe, augmentez sa quantité
            existeDeja.quantite++
        }
        // Le prixTotal est mis à jour automatiquement grâce au 'computed'
    }

    

    return {
        produitsPanier,
        addProduct,     
        prixTotal, 
        supprimerProduit,
        diminuer,
        augmenter,
        demanderSuppression,
        categoriesProduit,
    }
})