<template >
    <div v-if="CartStore.produitsPanier.length === 0">
        <div class="flex flex-col bg-white rounded-lg z-50  gap-2 ">
            <panierVide />
         
        </div>
    </div>
 <div v-else class="flex ">

      <div class="md:w-1/2 bg-white shadow-xl rounded-xl p-4 flex flex-col justify-center items-center">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Détail des Articles ({{ CartStore.produitsPanier.length }})</h2>
        
        <div class="max-h-[600px]    overflow-y-auto pr-1 space-y-4">
          <ComposantDetailpanier 
            v-for="(product, index) in CartStore.produitsPanier" 
            :key="index" 
            :product="product" 
            @delete-product="supprimerProduit"
            @increase-quantity="augmenterQuantite"
            @decrease-quantity="diminuerQuantite"
          />
        </div>
          <div>
            <router-link to="/accueil" class="text-blue-950  text-[15px] font-bold underline duration-300">Retournez
                l'accueil 👌</router-link>
        </div>
      </div>

      <div class="md:w-1/3 h-fit bg-gray-50 shadow-xl rounded-xl p-5 border border-gray-200 sticky top-4">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Résumé de la commande</h2>
        
        <div class="space-y-3">
          <div class="flex justify-between text-gray-600">
            <span class="text-sm">Sous-total des articles:</span>
            <span class="font-medium">{{ CartStore.prixTotal }} FCFA</span>
          </div>

          <div class="flex justify-between text-gray-600 border-b pb-3">
            <span class="text-sm">Frais de livraison:</span>
            <span class="font-medium text-green-600">Gratuit</span> 
          </div>

          <div class="flex justify-between text-lg font-bold pt-3">
            <span>Total:</span>
            <span class="text-amber-600">{{ CartStore.prixTotal }} FCFA</span> 
          </div>
        </div>

        <button class="mt-6 bg-[#F7D036] hover:bg-[#E0B82B] text-black font-semibold p-3 rounded-lg w-full transition duration-300 shadow-md">
          Passer la commande
        </button>
      </div>

</div>
</template>

<script setup>
import ComposantDetailpanier from '@/components/composantDetailpanier.vue'
import panierVide from '@/components/panierVide.vue'
import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()

</script>
