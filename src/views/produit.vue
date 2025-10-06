<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Gestion des Produits</h1>

    <!-- Formulaire d'ajout / modification -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6 mb-10">
      <!-- Nom du produit -->
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Nom du produit :</label>
        <input
          v-model="form.nom"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Prix -->
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Prix :</label>
        <input
          v-model="form.prix"
          type="number"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Stock -->
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Stock :</label>
        <input
          v-model="form.stock"
          type="number"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <!-- Catégorie -->
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Catégorie :</label>
        <select
          v-model="form.categorie"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Sélectionnez une catégorie</option>
          <option v-for="cat in categorieStore.categoriesProduit" :key="cat" :value="cat">
            {{ cat.nom }}
          </option>
        </select>
      </div>

      <!-- Description -->
      <div class="flex flex-col md:col-span-2">
        <label class="font-semibold mb-1">Description :</label>
        <textarea
          v-model="form.description"
          rows="4"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Image -->
      <div class="flex flex-col">
        <label class="font-semibold mb-1">Image :</label>
        <input
          type="file"
          @change="handleImageUpload"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
        <div v-if="form.preview" class="mt-2">
          <img :src="form.preview" alt="Aperçu image" class="w-32 h-32 object-cover rounded-md border border-gray-200" />
        </div>
      </div>

      <!-- Boutons -->
      <div class="md:col-span-2 flex justify-end items-center gap-4 mt-4">
            <router-link to="/accueil" class="text-blue-900  text-[15px] font-bold underline duration-300">Retournez  l'accueil 👌</router-link>

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"  @add-categorie="addcategorie"
        >
          {{ editingIndex === null ? 'Ajouter le produit' : 'Modifier le produit' }}
        </button>

        <button
          v-if="editingIndex !== null"
          type="button"
          @click="resetForm"
          class="text-red-500 hover:text-red-600 font-semibold transition duration-200"
        >
          Annuler
        </button>
      </div>
    </form>

    <!-- Tableau des produits -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left px-4 py-2">Image</th>
            <th class="text-left px-4 py-2">Nom</th>
            <th class="text-left px-4 py-2">Prix</th>
            <th class="text-left px-4 py-2">Stock</th>
            <th class="text-left px-4 py-2">Catégorie</th>
            <th class="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(produit, index) in categorieStore.produitsPanier" :key="index" class="border-t">
            <td class="px-4 py-2">
              <img :src="produit.preview" alt="" class="w-16 h-16 object-cover rounded" />
            </td>
            <td class="px-4 py-2">{{ produit.nom }}</td>
            <td class="px-4 py-2">{{ produit.prix }} FCFA</td>
            <td class="px-4 py-2">{{ produit.stock }}</td>
            <td class="px-4 py-2">{{ produit.categorie }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button @click="editProduit(index)" class="text-blue-600 hover:underline">Modifier</button>
              <button @click="deleteProduit(index)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
          <tr v-if="categorieStore.produitsPanier.length === 0">
            <td colspan="6" class="text-center text-gray-500 py-4">Aucun produit pour le moment</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const categorieStore = useCartStore()

const form = ref({
  nom: '',
  prix: '',
  stock: '',
  categorie: '',
  description: '',
  image: null,
  preview: null,
})

const editingIndex = ref(null)

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.image = file
    form.value.preview = URL.createObjectURL(file)
  }
}

function handleSubmit() {
  const produitData = { ...form.value }

  if (editingIndex.value === null) {
    categorieStore.produitsPanier.push(produitData)
  } else {
    categorieStore.produitsPanier[editingIndex.value] = produitData
  }

  resetForm()
}

function editProduit(index) {
  const produit = categorieStore.produitsPanier[index]
  form.value = { ...produit }
  editingIndex.value = index
}

function deleteProduit(index) {
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    categorieStore.produitsPanier.splice(index, 1)
  }
}

function resetForm() {
  form.value = {
    nom: '',
    prix: '',
    stock: '',
    categorie: '',
    description: '',
    image: null,
    preview: null,
  }
  editingIndex.value = null
}
</script>
