<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête avec titre et bouton retour -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Gestion des Produits</h1>
        <router-link 
          to="/accueil" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
          <span>← Retour à l'accueil</span>
        </router-link>
      </div>

      <!-- Barre de recherche -->
      <div class="bg-white shadow-md rounded-lg p-4 mb-6">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Rechercher un produit par nom, prix ou catégorie..."
            class="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <p class="text-sm text-gray-500 mt-2">{{ filteredProduits.length }} produit(s) trouvé(s)</p>
      </div>

      <!-- Formulaire d'ajout / modification -->
      <form @submit.prevent="handleSubmit"
        class="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
        
        <h2 class="text-xl font-semibold mb-4">
          {{ editingIndex === null ? '➕ Ajouter un produit' : '✏️ Modifier le produit' }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div class="flex flex-col">
            <label class="font-semibold mb-1 text-sm md:text-base">Nom du produit :</label>
            <input v-model="form.nom" type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="flex flex-col">
            <label class="font-semibold mb-1 text-sm md:text-base">Prix (FCFA) :</label>
            <input v-model="form.prix" type="number" step="0.01"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="flex flex-col">
            <label class="font-semibold mb-1 text-sm md:text-base">Catégorie :</label>
            <select v-model="form.categorie_id"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required>
              <option value="">Sélectionnez une catégorie</option>
              <option v-for="cat in categorieStore.categoriesProduit" :key="cat.id" :value="cat.id">
                {{ cat.nom }}
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="font-semibold mb-1 text-sm md:text-base">Photo :</label>
            <input type="file" @change="handleImageUpload"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-sm" />
            <div v-if="form.preview" class="mt-2">
              <img :src="form.preview" alt="Aperçu image"
                class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md border border-gray-200" />
            </div>
          </div>

          <div class="flex flex-col md:col-span-2">
            <label class="font-semibold mb-1 text-sm md:text-base">Description :</label>
            <textarea v-model="form.description" rows="3"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-6">
          <button type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200 order-1">
            {{ editingIndex === null ? 'Ajouter le produit' : 'Modifier le produit' }}
          </button>

          <button v-if="editingIndex !== null" type="button" @click="resetForm"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-md transition duration-200 order-2">
            Annuler
          </button>
        </div>
      </form>

      <!-- Messages de chargement et d'erreur -->
      <div v-if="loading" class="text-center py-8 bg-white rounded-lg shadow-md">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="text-gray-600 mt-2">Chargement des produits...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 bg-white rounded-lg shadow-md">
        <p class="text-red-600">{{ error }}</p>
        <button @click="loadProduits" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Réessayer
        </button>
      </div>

      <!-- Tableau des produits -->
      <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Version mobile (cartes) -->
        <div class="block md:hidden">
          <div v-for="(produit, index) in filteredProduits" :key="produit.id" 
            class="border-b last:border-b-0 p-4">
            <div class="flex gap-4">
              <img 
                :src="produit.photo || '/images/default-product.png'" 
                alt="" 
                class="w-20 h-20 object-cover rounded"
                @error="handleImageError($event)" 
              />
              <div class="flex-1">
                <h3 class="font-semibold text-lg">{{ produit.nom }}</h3>
                <p class="text-blue-600 font-bold">{{ formatPrice(produit.prix) }} FCFA</p>
                <span v-if="produit.categorie" class="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ produit.categorie.nom }}
                </span>
                <span v-else class="text-gray-400 italic text-sm">Non catégorisé</span>
              </div>
            </div>
            <div class="flex gap-2 mt-3">
              <button @click="editProduit(index)" 
                class="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold py-2 rounded-md transition">
                ✏️ Modifier
              </button>
              <button @click="deleteProduit(index)" 
                class="flex-1 bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-2 rounded-md transition">
                🗑️ Supprimer
              </button>
            </div>
          </div>
          <div v-if="filteredProduits.length === 0" class="text-center text-gray-500 py-8">
            Aucun produit trouvé
          </div>
        </div>

        <!-- Version desktop (tableau) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Image</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Nom</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Prix</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Catégorie</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produit, index) in filteredProduits" :key="produit.id" class="border-t hover:bg-gray-50">
                <td class="px-4 py-3">
                  <img 
                    :src="produit.photo || '/images/default-product.png'" 
                    alt="" 
                    class="w-16 h-16 object-cover rounded"
                    @error="handleImageError($event)" 
                  />
                </td>
                <td class="px-4 py-3 font-medium">{{ produit.nom }}</td>
                <td class="px-4 py-3 text-blue-600 font-semibold">{{ formatPrice(produit.prix) }} FCFA</td>
                <td class="px-4 py-3">
                  <span v-if="produit.categorie" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {{ produit.categorie.nom }}
                  </span>
                  <span v-else class="text-gray-400 italic">Non catégorisé</span>
                </td>
                <td class="px-4 py-3">
               <div class="flex justify-center items-center gap-4 mt-3">
                <button @click="editProduit(index)"
                  class="w-full sm:w-auto py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-md transition">
                  ✏️ Modifier
                </button>
                <button @click="deleteProduit(index)"
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
              <tr v-if="filteredProduits.length === 0">
                <td colspan="5" class="text-center text-gray-500 py-8">
                  Aucun produit trouvé
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

const categorieStore = useCartStore()
const produitbd = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')

const form = ref({
  nom: '',
  prix: '',
  categorie_id: '',
  description: '',
  photo: null,
  preview: null,
})

const editingIndex = ref(null)
const editingId = ref(null)

// Filtre de recherche
const filteredProduits = computed(() => {
  if (!searchQuery.value) return produitbd.value
  
  const query = searchQuery.value.toLowerCase()
  return produitbd.value.filter(produit => {
    const nomMatch = produit.nom?.toLowerCase().includes(query)
    const prixMatch = produit.prix?.toString().includes(query)
    const categorieMatch = produit.categorie?.nom?.toLowerCase().includes(query)
    return nomMatch || prixMatch || categorieMatch
  })
})

onMounted(async () => {
  await loadProduits()
})

async function loadProduits() {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/produits')
    produitbd.value = response.data
  } catch (err) {
    console.error('❌ Erreur:', err)
    error.value = 'Impossible de charger les produits.'
  } finally {
    loading.value = false
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.photo = file
    form.value.preview = URL.createObjectURL(file)
  }
}

function handleImageError(event) {
  event.target.src = '/images/default-product.png'
}

function formatPrice(prix) {
  if (!prix) return '0'
  return parseFloat(prix).toLocaleString('fr-FR')
}

async function createProduct() {
  // ✅ CORRECTION: Ne plus vérifier si la catégorie est vide
  if (!form.value.nom || !form.value.prix) {
    alert('⚠️ Veuillez remplir tous les champs obligatoires')
    return
  }

  try {
    const data = {
      nom: form.value.nom,
      prix: parseFloat(form.value.prix),
      description: form.value.description || '',
    }

    // ✅ N'ajouter categorie_id que s'il est défini
    if (form.value.categorie_id) {
      data.categorie_id = parseInt(form.value.categorie_id)
    }

    await axios.post('http://127.0.0.1:8000/api/produits', data)
    
    await loadProduits()
    resetForm()
    alert('✅ Produit créé avec succès !')
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data)
    alert('❌ Erreur: ' + (error.response?.data?.message || error.message))
  }
}

async function updateProduct() {
  if (!form.value.nom || !form.value.prix) {
    alert('⚠️ Veuillez remplir tous les champs obligatoires')
    return
  }

  try {
    const data = {
      nom: form.value.nom,
      prix: parseFloat(form.value.prix),
      description: form.value.description || '',
    }

    // ✅ N'ajouter categorie_id que s'il est défini
    if (form.value.categorie_id) {
      data.categorie_id = parseInt(form.value.categorie_id)
    }

    await axios.put(`http://127.0.0.1:8000/api/produits/${editingId.value}`, data)
    
    await loadProduits()
    resetForm()
    alert('✅ Produit modifié avec succès !')
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data)
    alert('❌ Erreur: ' + (error.response?.data?.message || error.message))
  }
}

function handleSubmit() {
  if (editingIndex.value === null) {
    createProduct()
  } else {
    updateProduct()
  }
}

function editProduit(index) {
  const produit = filteredProduits.value[index]
  const originalIndex = produitbd.value.findIndex(p => p.id === produit.id)
  
  form.value = {
    nom: produit.nom,
    prix: produit.prix,
    categorie_id: produit.categorie_id ? String(produit.categorie_id) : '',
    description: produit.description || '',
    photo: null,
    preview: produit.photo || null,
  }
  
  editingIndex.value = originalIndex
  editingId.value = produit.id
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function deleteProduit(index) {
  const produit = filteredProduits.value[index]

  if (!confirm(`Voulez-vous vraiment supprimer "${produit.nom}" ?`)) {
    return
  }

  try {
    await axios.delete(`http://127.0.0.1:8000/api/produits/${produit.id}`)
    await loadProduits()
    alert('✅ Produit supprimé avec succès !')
  } catch (error) {
    console.error('❌ Erreur:', error)
    alert('❌ Erreur lors de la suppression')
  }
}

function resetForm() {
  form.value = {
    nom: '',
    prix: '',
    categorie_id: '',
    description: '',
    photo: null,
    preview: null,
  }
  editingIndex.value = null
  editingId.value = null
}
</script>