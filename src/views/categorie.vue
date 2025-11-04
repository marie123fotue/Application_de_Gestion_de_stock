<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">


    <!-- En-tête avec titre et bouton retour -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Gestion des Catégories</h1>
      <router-link to="/accueil"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
        <span>← Retour à l'accueil</span>
      </router-link>
    </div>

    <!-- Barre de recherche -->
    <div class="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center justify-between gap-2 flex-wrap">
      <div class="relative flex-1 min-w-[200px]">
        <input v-model="searchQuery" type="text" placeholder="🔍 Rechercher..."
          class="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Formulaire -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-3xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">Ajouter / Modifier une catégorie</h2>
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div>
          <label class="block mb-1 font-semibold">
            Nom : <span class="text-red-500">*</span>
          </label>
          <input v-model="form.nom" type="text" :class="[
            'w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2',
            validationErrors.nom ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          ]" />
          <p v-if="validationErrors.nom" class="text-red-500 text-sm mt-1">
            {{ validationErrors.nom }}
          </p>
        </div>

        <div>
          <label class="block mb-1 font-semibold">Description :</label>
          <textarea v-model="form.description" rows="3" :class="[
            'w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2',
            validationErrors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          ]"></textarea>
          <p v-if="validationErrors.description" class="text-red-500 text-sm mt-1">
            {{ validationErrors.description }}
          </p>
        </div>

        <div class="flex justify-end gap-2 mt-4 flex-wrap">
          <button type="submit" :disabled="isLoading"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-semibold transition">
            {{ isLoading ? 'Chargement...' : (editingIndex === null ? 'Ajouter' : 'Modifier') }}
          </button>
          <button v-if="editingIndex !== null" type="button" @click="resetForm"
            class="text-red-500 hover:text-red-600 font-semibold px-4 py-2 rounded-lg">
            Annuler
          </button>
        </div>
      </form>
    </div>
    <!-- Notifications Toast -->
    <div v-if="notification.show" :class="[
      'fixed top-4 right-4 z-50 mb-3 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300',
      notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    ]">
      <div class="flex items-start gap-3">
        <span v-if="notification.type === 'success'" class="text-2xl">✓</span>
        <span v-else class="text-2xl">⚠️</span>
        <div class="flex-1">
          <p class="font-semibold">{{ notification.message }}</p>
          <ul v-if="notification.errors && notification.errors.length > 0" class="mt-2 text-sm list-disc list-inside">
            <li v-for="(error, idx) in notification.errors" :key="idx">{{ error }}</li>
          </ul>
        </div>
        <button @click="notification.show = false" class="text-white hover:text-gray-200">✕</button>
      </div>
    </div>

    <!-- Version mobile (cartes) -->
    <div class="block md:hidden">
      <div v-for="(categorie, index) in categoriebd" :key="categorie.id" class="border-b last:border-b-0 p-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <h3 class="font-semibold text-lg">{{ categorie.nom }}</h3>
            <p class="text-gray-600">{{ categorie.description }}</p>
          </div>
        </div>
        <div class="flex justify-center items-center gap-4 mt-3">
          <button @click="editCategorie(index)"
            class="flex w-[150px] py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-md transition">
            ✏️ Modifier
          </button>
          <button @click="deleteCategorie(index)"
            class="flex justify-center items-center w-[150px] gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-2 rounded-md transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>Supprimer
          </button>
        </div>
      </div>
      <div v-if="filteredCategories && filteredCategories.length === 0" class="text-center text-gray-500 py-8">
        Aucun produit trouvé
      </div>
    </div>

    <!-- Tableau responsive -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">Nom</th>
            <th class="px-4 py-3 text-left font-semibold">Description</th>
            <th class="px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in filteredCategories" :key="cat.id" class="border-t hover:bg-gray-50 transition">
            <td class="px-4 py-3">{{ cat.nom }}</td>
            <td class="px-4 py-3">{{ cat.description }}</td>
            <td class="px-4 py-3 flex justify-center gap-2">
              <div class="flex justify-center items-center gap-4 mt-3">
                <button @click="editCategorie(index)"
                  class="w-full sm:w-auto py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-md transition">
                  ✏️ Modifier
                </button>
                <button @click="deleteCategorie(index)"
                  class="w-full sm:w-auto py-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-md transition flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>Supprimer
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredCategories && filteredCategories.length === 0">
            <td colspan="3" class="text-center py-8 text-gray-500">
              Aucune catégorie pour le moment
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const categoriebd = ref([])
const searchQuery = ref('')
const form = ref({ nom: '', description: '' })
const editingIndex = ref(null)
const validationErrors = ref({})
const isLoading = ref(false)
const notification = ref({
  show: false,
  type: 'success',
  message: '',
  errors: []
})

// Fonction pour afficher les notifications
function showNotification(type, message, errors = []) {
  notification.value = {
    show: true,
    type,
    message,
    errors
  }

  // Fermer automatiquement après 5 secondes
  setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

// Charger les catégories
onMounted(async () => {
  try {
    const reponse = await axios.get('http://127.0.0.1:8000/api/categories')
    // Gérer la réponse avec ou sans structure {success, data}
    if (reponse.data.success && reponse.data.data) {
      categoriebd.value = reponse.data.data
    } else if (Array.isArray(reponse.data)) {
      categoriebd.value = reponse.data
    }
  } catch (err) {
    console.error('Erreur:', err)
    showNotification('error', 'Erreur lors du chargement des catégories')
  }
})

// Filtre
const filteredCategories = computed(() => {
  if (!categoriebd.value || !Array.isArray(categoriebd.value)) return []
  if (!searchQuery.value) return categoriebd.value
  const q = searchQuery.value.toLowerCase()
  return categoriebd.value.filter(c =>
    c.nom?.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q)
  )
})

async function handleSubmit() {
  // Réinitialiser les erreurs
  validationErrors.value = {}


  // Nettoyer les données (enlever les espaces avant/après)
  const data = {
    nom: form.value.nom?.trim() || '',
    description: form.value.description?.trim() || ''
  }
}
if (editingIndex.value === null) {
  // AJOUT
  axios.post('http://127.0.0.1:8000/api/categories', data).then((res) => {
    categoriebd.value.push(res.data.data || res.data)
    showNotification('success', 'Catégorie ajoutée avec succès')
    resetForm()
  }).catch((err) => {
    const errorMessages = []
    Object.keys(err.response.data.errors).forEach(key => {
      // Prendre le premier message d'erreur pour chaque champ
      validationErrors.value[key] = err.response.data.errors[key][0]
      // Ajouter tous les messages pour la notification
      errorMessages.push(...err.response.data.errors[key])
    })

    showNotification('error', 'Erreur de validation', errorMessages)

  })

}

else {
  // MODIFICATION
  const id = categoriebd.value[editingIndex.value]?.id
  if (!id) return 

  axios.put(`http://127.0.0.1:8000/api/categories/${id}`, data), then((res) => {
      const id = categoriebd.value[editingIndex.value]?.id
  if (!id) return
    categoriebd.value[editingIndex.value] = res.data.data || res.data
    showNotification('success', 'Catégorie modifiée avec succès')
    resetForm()
  }).catch((err) => {
    const errorMessages = []
    Object.keys(err.response.data.errors).forEach(key => {
      // Prendre le premier message d'erreur pour chaque champ
      validationErrors.value[key] = err.response.data.errors[key][0]
      // Ajouter tous les messages pour la notification
      errorMessages.push(...err.response.data.errors[key])
    })
    showNotification('error', 'Erreur de validation', errorMessages)

  })
}


function editCategorie(index) {
  const cat = categoriebd.value[index]
  form.value = { nom: cat.nom, description: cat.description }
  editingIndex.value = index
  validationErrors.value = {} // Réinitialiser les erreurs
}

async function deleteCategorie(index) {
  const cat = categoriebd.value[index]
  if (!confirm(`Êtes-vous sûr de vouloir supprimer "${cat.nom}" ?`)) return

  try {
    await axios.delete(`http://127.0.0.1:8000/api/categories/${cat.id}`)

    categoriebd.value.splice(index, 1)
    if (editingIndex.value === index) resetForm()
    showNotification('success', 'Catégorie supprimée avec succès')

  } catch (err) {
    console.error('Erreur:', err)
    if (err.response && err.response.data) {
      showNotification('error', err.response.data.message || 'Erreur lors de la suppression')
    } else {
      showNotification('error', 'Erreur de connexion')
    }
  }
}

function resetForm() {
  form.value = { nom: '', description: '' }
  editingIndex.value = null
  validationErrors.value = {}
}
</script>