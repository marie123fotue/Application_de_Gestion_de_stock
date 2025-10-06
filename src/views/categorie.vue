<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Gestion des Catégories</h1>

    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg p-6 mb-8 grid gap-4">
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Nom de la catégorie :</label>
        <input
          v-model="form.nom"
          type="text"
          required
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-semibold mb-1">Description :</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div class="flex justify-end gap-4 mt-2">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          {{ editingIndex === null ? 'Ajouter la catégorie' : 'Modifier la catégorie' }}
        </button>

        <button
          v-if="editingIndex !== null"
          type="button"
          @click="resetForm"
          class="text-red-500 hover:text-red-600 font-semibold"
        >
          Annuler
        </button>
      </div>
    </form>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left px-4 py-2">Nom</th>
            <th class="text-left px-4 py-2">Description</th>
            <th class="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in categories" :key="index" class="border-t">
            <td class="px-4 py-2">{{ cat.nom }}</td>
            <td class="px-4 py-2">{{ cat.description }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button @click="editCategorie(index)" class="text-blue-600 hover:underline">Modifier</button>
              <button @click="deleteCategorie(index)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center text-gray-500 py-4">Aucune catégorie pour le moment</td>
          </tr>
        </tbody>
      </table>
      <router-link to="/accueil" class="text-blue-950  text-[15px] font-bold underline duration-300">Retournez
                l'accueil 👌</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Liste des catégories locales (tu peux les remplacer par celles du store si nécessaire)

const categories = ref([])

const form = ref({
  nom: '',
  description: '',
})

const editingIndex = ref(null)

function handleSubmit() {
  const data = { ...form.value }

  if (editingIndex.value === null) {
    categories.value.push(data)
  } else {
    categories.value[editingIndex.value] = data
  }

  resetForm()
}

function editCategorie(index) {
  const cat = categories.value[index]
  form.value = { ...cat }
  editingIndex.value = index
}

function deleteCategorie(index) {
  if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
    categories.value.splice(index, 1)
    if (editingIndex.value === index) {
      resetForm()
    }
  }
}

function resetForm() {
  form.value = {
    nom: '',
    description: '',
  }
  editingIndex.value = null
}
</script>
