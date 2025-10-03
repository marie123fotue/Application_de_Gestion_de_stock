<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-product'])

function supprimer() {
  emit('delete-product', props.product)
}
</script>

<template>
  <div class="relative w-[260px] h-[220px] bg-white my-2 rounded shadow overflow-hidden p-2">
    <!-- Bouton delete positionné en haut à droite -->
    <button @click="supprimer"
      class="absolute top-2 right-2 text-red-600 hover:text-red-800 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Contenu du produit -->
    <div class="flex gap-4">
      <div class="w-[100px] h-[150px] flex items-center justify-center">
        <img :src="product.photo" alt="Produit" class="max-h-[140px] object-contain" />
      </div>
      <div class="flex flex-col justify-center gap-2 w-full">
        <p class="text-[12px] px-1.5 text-gray-700 font-semibold font-Montserrat" :title="product.nom">
          {{ product.nom }}
        </p>
        <p class="ml-2 font-bold text-[18px] text-gray-700">
          {{ product.prix }} FCFA
        </p>
      </div>
    </div>

    <!-- Contrôle de quantité -->
    <div class="flex items-center justify-between mt-3 px-2">
      <!-- Bouton + -->
      <button class="bg-amber-400 text-white p-1 rounded hover:bg-amber-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <!-- Input quantité -->
      <input type="number" min="1" placeholder="1"
        class="w-[50px] text-center border border-gray-400 rounded px-1 py-0.5">

      <!-- Bouton – -->
      <button class="bg-amber-400 text-white p-1 rounded hover:bg-amber-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </button>
    </div>
  </div>
</template>
