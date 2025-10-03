<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-product'])

// Supprimer le produit on utilise les emits lorsque l'on veut delcrer une fonction que c'est le composant parent qui utilisera
function supprimer() {
  emit('delete-product', props.product)
}

// Augmenter / diminuer la quantité
function augmenter() {
  props.product.quantite++
}

function diminuer() {
  if (props.product.quantite > 1) {
    props.product.quantite--
  }
}
</script>


<template>
  <div class="w-[260px] h-[220px] bg-white my-2 rounded shadow overflow-hidden p-1">
    <div class="w-[260px] inset-0 flex justify-end">

      <!-- Bouton delete -->
      <button @click="supprimer" class=" top-2 right-2 text-red-600 hover:text-red-800 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Contenu du produit -->
    <div class="flex  justify-between items-center  gap-2">
      <!-- image -->
      <div class="w-[100px] h-[150px] flex  flex-col items-center justify-center">
        <img :src="product.photo" alt="Produit" class="max-h-[140px] object-contain" />
        <p class="text-[16px] px-1.5 text-black font-semibold font-Montserrat">
          x {{ product.quantite }}
        </p>
      </div>
      <!-- nom -->
      <div class="flex flex-col justify-center gap-2 w-full">
        <p class="text-[12px] px-1.5 text-gray-700 font-semibold font-Montserrat" :title="product.nom">
          {{ product.nom }}
        </p>
        <!-- prix x quantite -->
        <p class="ml-2 font-bold text-[18px] text-center  text-gray-500">
          {{ product.prix * product.quantite }} FCFA
        </p>
        <!-- prix -->
        <p class="ml-2 font-bold text-[18px] text-gray-700">
          {{ product.prix }} FCFA
        </p>
      </div>
    </div>

    <!-- Contrôle de quantité -->
    <div class="flex items-center justify-between mt-3 px-2">
      <button @click="augmenter"
        class=" bg-[#F7D036] text-white p-1 rounded hover:bg-amber-400 duration-300 hover:rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <input type="number" min="1" v-model="product.quantite"
        class="w-[50px] text-center border border-gray-400 rounded px-1 py-0.5">

      <button @click="diminuer" class="bg-[#F7D036] text-white p-1 rounded  hover:bg-amber-400 hover:rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </button>
    </div>
  </div>
</template>
