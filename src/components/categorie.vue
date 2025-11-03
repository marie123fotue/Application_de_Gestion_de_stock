<template>
  <!-- Modal de catégorie -->
  <div class="flex flex-col fixed inset-0 gap-4 h-screen w-[240px] bg-white border-0 rounded-xl shadow-2xl z-50 overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between py-2 bg-[#000A2B] w-full h-[70px] px-4">
      <div class="flex justify-between items-center gap-1">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
        <p class="text-[15px] font-semibold text-amber-100">{{ userStore.user?.nom }}</p>
        <div
          class="text-[12px] px-2 font-semibold text-black flex justify-center items-center border-none p-1 rounded-[18px] shadow-xl bg-white hover:bg-gray-200">
          Se Connecter
        </div>
      </div>
      <!-- Icône de fermeture -->
      <div class="text-gray-300">
        <button @click="$emit('close-categorie')" class="mt-4 text-white px-2 py-1 rounded hover:bg-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-4 font-bold">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Section des catégories -->
    <div class="flex-1 overflow-y-auto px-4 py-2">
      <h3 class="text-lg font-bold text-gray-800 mb-4">Catégories</h3>
      
      <!-- Message de chargement -->
      <div v-if="loading" class="text-center py-4">
        <p class="text-gray-500">Chargement des catégories...</p>
      </div>
      
      <!-- Message d'erreur -->
      <div v-else-if="error" class="text-center py-4">
        <p class="text-red-500">{{ error }}</p>
      </div>
      
      <!-- Liste des catégories -->
      <ul v-else-if="categoriesdb.length > 0" class="flex flex-col gap-2">
        <li 
          v-for="cat in categoriesdb" 
          :key="cat.id"
          @click="selectCategory(cat)"
          class="flex items-center gap-2 px-3 py-3 text-gray-700 font-medium rounded-lg text-left hover:bg-amber-100 hover:shadow-md cursor-pointer transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
          {{ cat.nom }}
        </li>
      </ul>
      
      <!-- Message si aucune catégorie -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500 italic">Aucune catégorie disponible</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserCustomerStore } from '@/stores/user'
import axios from 'axios'

const categoriesdb = ref([])
const loading = ref(false)
const error = ref(null)
const userStore = useUserCustomerStore()

// Définir les événements émis
const emit = defineEmits(['close-categorie', 'categorie-chosen'])

onMounted(async () => {

  axios.get('http://127.0.0.1:8000/api/categories').then((repons)=>{
    categoriesdb.value=repons.data
  })

})

function selectCategory(cat) {
  console.log('📂 Catégorie sélectionnée:', cat)
  emit('categorie-chosen', cat)
  emit('close-categorie')
}
</script>

<style scoped>
/* Animation d'apparition du modal */
.modal-enter-active, .modal-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.modal-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>