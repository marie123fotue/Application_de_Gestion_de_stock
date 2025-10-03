<script setup>
import ComposantDetailpanier from '@/components/composantDetailpanier.vue'

const props = defineProps({
  produitsPanier: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:produitsPanier'])

function supprimerProduit(produit) {
  const index = props.produitsPanier.findIndex(p => p.nom === produit.nom)
  if (index !== -1) {
    props.produitsPanier.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex flex-col w-[280px] h-[600px] rounded-[10px] bg-white shadow font-Montserrat">
    <!-- Titre -->
    <div class="flex justify-between items-center w-full h-[50px] bg-gray-100 px-2 text-black hover:bg-amber-100 p-1">
      <p class="font-semibold">Detail de votre Panier</p>
      <button @click="$emit('close-DetailPanier')" class="p-2 py-1 rounded hover:bg-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="size-6 font-bold">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Liste des produits avec scroll -->
    <div class="flex-1 overflow-y-auto ">
      <ComposantDetailpanier
        v-for="(product, index) in props.produitsPanier"
        :key="index"
        :product="product"
        @delete-product="supprimerProduit"
      />
    </div>

    <!-- Total et bouton -->
    <div class="border-t px-2 py-3 bg-white">
      <p class="font-bold text-[18px] text-gray-700">Total:.....FCFA</p>
      <button class="bg-[#F7D036] p-1 rounded-[5px] w-full mt-2">Passer la commande</button>
    </div>
  </div>
</template>
