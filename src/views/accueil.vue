<template>
  <RouterView />

  <!-- NAVBAR FIXE -->
  <div class="w-full h-[80px] text-white bg-[#000A2B] fixed z-30 flex justify-between items-center px-4 md:px-8">
    <!-- Logo + Burger -->
    <div class="flex items-center gap-4">
      <button @click="toggleCategories" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Logo />
    </div>

    <!-- Barre de recherche (desktop uniquement) -->
    <div class="hidden lg:flex items-center gap-2">
      <input type="text" placeholder="Que recherchez-vous ?" class="bg-gray-200 rounded px-4 py-2 w-64">
      <button class="bg-amber-100 text-black px-4 py-2 rounded hover:bg-amber-200">Rechercher</button>
    </div>

    <!-- Menu desktop -->
    <div class="hidden md:flex items-center gap-6">
      <RouterLink to="/produit" class="hover:text-amber-200">Produit</RouterLink>
      <RouterLink to="/categorie" class="hover:text-amber-200">Categorie</RouterLink>
      <RouterLink to="/panierProduit" class="hover:text-amber-200">Panier</RouterLink>
      <div class="flex items-center gap-2">
        <img src="..." class="w-8 h-8 rounded-full" />
        <span>{{ CartStore.produitsPanier?.length || 0 }}</span>
      </div>
      <div class="flex items-center gap-1">
        <RouterLink to="/">
          <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </RouterLink>
        <span class="text-amber-100">Bienvenue, {{ userStore.user?.nom || 'Invité' }}</span>
      </div>
    </div>

    <!-- Bouton menu mobile -->
    <button @click="toggleMobileMenu" class="md:hidden">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <!-- MENU MOBILE MODAL -->
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-end md:hidden">
    <div class="w-2/3 bg-[#000A2B] text-white p-6 space-y-4">
      <button @click="toggleMobileMenu" class="text-right w-full text-white text-xl">✕</button>
      <RouterLink to="/produit" class="block text-lg hover:text-amber-200">Produit</RouterLink>
      <RouterLink to="/categorie" class="block text-lg hover:text-amber-200">Categorie</RouterLink>
      <RouterLink to="/panierProduit" class="block text-lg hover:text-amber-200">Panier</RouterLink>
      <div class="flex items-center gap-2 mt-4">
        <img src="..." class="w-8 h-8 rounded-full" />
        <span class="text-amber-100 font-bold">{{ CartStore.produitsPanier?.length || 0 }}</span>
      </div>
      <div class="text-amber-100">Bienvenue, {{ userStore.user?.nom || 'Invité' }}</div>
    </div>
  </div>

  <!-- CONTENU PRINCIPAL -->
  <div class="mt-[100px] px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto">
      <Divs v-for="(product, index) in CartStore.produits" :key="index" :product="product" @add-product="addProduct" />
    </div>
  </div>

  <!-- MODALES -->
  <div v-if="isCategoriesOpen" class="fixed inset-0 z-50 flex">
    <Categorie @close-categorie="toggleCategories" />
    <div @click="toggleCategories" class="opacity-38 bg-black backdrop-blur-[0.8px] w-full"></div>
  </div>

  <div v-if="isDetailPanierOpen" class="fixed inset-0 z-50 flex">
    <div @click="toggleDetailPanier" class="opacity-38 bg-black w-full"></div>
    <DetailPanier :produitsPanier="CartStore.produitsPanier" @closeDetailPanier="toggleDetailPanier"
      @update-produitsPanier="handleUpdatePanier" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Logo from '@/components/logo.vue'
import Divs from '@/components/divs.vue'
import Categorie from '@/components/categorie.vue'
import DetailPanier from '@/components/detailPanier.vue'
import { useCartStore } from '@/stores/cart'
import { useUserCustomerStore } from '@/stores/user'

const CartStore = useCartStore()
const userStore = useUserCustomerStore()

const isCategoriesOpen = ref(false)
const isDetailPanierOpen = ref(false)
const isMobileMenuOpen = ref(false)

const toggleCategories = () => isCategoriesOpen.value = !isCategoriesOpen.value
const toggleDetailPanier = () => isDetailPanierOpen.value = !isDetailPanierOpen.value
const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value

function handleUpdatePanier(nouveauPanier) {
  CartStore.produitsPanier.value = nouveauPanier
}

function addProduct(product) {
  CartStore.addProduct(product)
  toggleDetailPanier()
}

function watchingProduit(modalRef) {
  watch(modalRef, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
}
watchingProduit(isCategoriesOpen)
watchingProduit(isDetailPanierOpen)
watchingProduit(isMobileMenuOpen)
</script>
