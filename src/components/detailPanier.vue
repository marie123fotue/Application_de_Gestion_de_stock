<script setup>
import ComposantDetailpanier from '@/components/composantDetailpanier.vue'

import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()

// ✅ Déclarer tous les événements utilisés, y compris 'close-DetailPanier'
const emit = defineEmits(['update:produitsPanier', 'close-DetailPanier'])

//CORRECTION MAJEURE: NE PAS modifier la prop (props.produitsPanier.splice).
// On crée un nouveau tableau et on l'émet.
function supprimerProduit(produit) {
  const nouveauPanier = props.produitsPanier.filter(p => p.nom !== produit.nom);
  
  // Émet le nouveau tableau pour que le composant parent mette à jour sa variable.
  emit('update:produitsPanier', nouveauPanier);
}



</script>


<template>
        <div class="flex flex-col w-[280px] h-[720px] rounded-[10px] bg-white shadow font-Montserrat">
          <div
            class="flex justify-between items-center w-full h-[50px] bg-gray-100 px-2 text-black hover:bg-amber-100 p-1">
            <p class="font-semibold">Detail de votre Panier</p>
            <button @click="$emit('close-DetailPanier')" class="p-2 py-1 rounded hover:bg-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto ">
            <ComposantDetailpanier v-for="(product, index) in CartStore.produitsPanier" :key="index" :product="product"
              @delete-product="supprimerProduit" />
          </div>

          <div class="border-t px-2 py-3 bg-white">
            <p class="font-bold text-[18px] text-gray-700">Total: {{ CartStore.prixTotal }} FCFA</p>
            <button ></button>
            <RouterLink to="/panierProduit" class="bg-[#F7D036] p-1 rounded-[5px] w-full mt-2"> Passer la commande</RouterLink>
          </div>
        </div>
        
    
    
</template>
