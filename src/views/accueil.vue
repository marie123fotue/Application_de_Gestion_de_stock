<template>
  <RouterView />

  <!-- NAVBAR FIXE -->
  <nav class="w-full h-[70px] md:h-[85px] text-white bg-[#000A2B] fixed top-0 left-0 z-50 shadow-lg">
    <div class="h-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">

      <!-- Logo + Burger Menu Mobile -->
      <div class="flex items-center gap-3 md:gap-4">
        <button @click="toggleCategories" class="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Menu catégories">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Logo />
      </div>

      <!-- Barre de recherche (desktop uniquement) -->
      <div class="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
        <input v-model="searchTerm" @input="rechercherProduits" placeholder="Que recherchez-vous ?"
          class="bg-white text-gray-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-400">
        <button @click="rechercherProduits"
          class="bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors font-medium whitespace-nowrap">
          Rechercher
        </button>
      </div>

      <!-- Menu desktop -->
      <div class="hidden md:flex items-center gap-4 lg:gap-6">
        <RouterLink to="/produit" class="hover:text-amber-400 transition-colors font-medium">
          Produits
        </RouterLink>
        <RouterLink to="/categorie" class="hover:text-amber-400 transition-colors font-medium">
          Catégories
        </RouterLink>

        <!-- Panier avec badge -->
        <button @click="toggleDetailPanier" class="relative hover:text-amber-400 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="CartStore.produitsPanier?.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {{ CartStore.produitsPanier.length }}
          </span>
        </button>

        <!-- Profil utilisateur -->
        <RouterLink to="/" class="flex items-center gap-2 hover:text-amber-400 transition-colors">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span class="hidden lg:inline text-sm">{{ userStore.user?.nom || 'Invité' }}</span>
        </RouterLink>
      </div>

      <!-- Bouton menu mobile (droite) -->
      <div class="flex md:hidden items-center gap-3">
        <!-- Badge panier mobile -->
        <button @click="toggleDetailPanier" class="relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="CartStore.produitsPanier?.length > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {{ CartStore.produitsPanier.length }}
          </span>
        </button>

        <button @click="toggleMobileMenu" class="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Menu principal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Barre de recherche mobile (sous la navbar) -->
  <div class="lg:hidden fixed top-[70px] left-0 right-0 bg-[#000A2B] border-t border-white/10 p-3 z-40">
    <div class="flex gap-2">
      <input v-model="searchTerm" @input="rechercherProduits" placeholder="Rechercher..."
        class="bg-white text-gray-800 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
      <button @click="rechercherProduits"
        class="bg-amber-400 text-black px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors text-sm font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- MENU MOBILE MODAL (slide depuis la droite) -->
  <Transition name="slide-fade">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] md:hidden" @click.self="toggleMobileMenu">


      <!-- Menu panel -->
      <div class="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#000A2B] shadow-2xl overflow-y-auto">
        <div class="p-6 space-y-6">
          <!-- Header avec fermeture -->
          <div class="flex justify-between items-center pb-4 border-b border-white/10">
            <h2 class="text-xl font-bold text-amber-400">Menu</h2>
            <button @click="toggleMobileMenu" class="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Fermer le menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Profil utilisateur -->
          <div class="flex items-center gap-3 pb-4 border-b border-white/10">
            <div
              class="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-[#000A2B] font-bold text-lg">
              {{ (userStore.user?.nom || 'I')[0].toUpperCase() }}
            </div>
            <div>
              <p class="text-amber-400 font-medium">{{ userStore.user?.nom || 'Invité' }}</p>
              <p class="text-white text-sm">Bienvenue !</p>
            </div>
          </div>

          <!-- Navigation links -->
          <nav class="space-y-2">
            <RouterLink to="/produit" class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
              @click="toggleMobileMenu">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="text-lg text-white">Produits</span>
            </RouterLink>

            <RouterLink to="/categorie"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
              @click="toggleMobileMenu">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="text-lg text-white">Catégories</span>
            </RouterLink>

            <button @click="toggleDetailPanier(); toggleMobileMenu()"
              class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <div class="relative">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span v-if="CartStore.produitsPanier?.length > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {{ CartStore.produitsPanier.length }}
                </span>
              </div>
              <span class="text-lg text-white">Mon Panier</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </Transition>

  <!-- CONTENU PRINCIPAL -->
  <main class="pt-[130px] lg:pt-[100px] px-4 pb-8 min-h-screen bg-gray-50">
    <div class="max-w-screen-2xl mx-auto">

      <!-- Message de chargement -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
        <p class="text-gray-600 mt-4">Chargement des produits...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="text-center py-16">
        <svg class="w-24 h-24 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-red-600 text-lg mb-4">{{ error }}</p>
        <button @click="chargerProduits"
          class="bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors font-medium">
          Réessayer
        </button>
      </div>

      <!-- Grille de produits filtrés -->
      <div v-else-if="produitsFiltres.length > 0"
        class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 justify-items-center place-items-center w-full">
        <Divs v-for="product in produitsFiltres" :key="product.id" :product="product" @add-product="addProduct" />
      </div>

      <!-- Message si aucun produit trouvé -->
      <div v-else class="text-center py-16">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-gray-500 text-lg mb-2">
          {{ searchTerm ? 'Aucun produit trouvé pour votre recherche' : 'Aucun produit disponible' }}
        </p>
        <p v-if="searchTerm" class="text-gray-400 text-sm">
          Essayez avec un autre terme de recherche
        </p>
      </div>
    </div>
  </main>

  <!-- MODAL CATEGORIES -->
  <Transition name="slide">
    <div v-if="isCategoriesOpen" class="fixed inset-0 z-50 flex">
      <Categorie @close-categorie="toggleCategories" @categorie-chosen="filtrerParCategorie" />
      <div @click="toggleCategories" class="flex-1 bg-black/30 backdrop-blur-[2px]"></div>
    </div>
  </Transition>

  <!-- MODAL DETAIL PANIER -->
  <Transition name="slide-right">
    <div v-if="isDetailPanierOpen" class="fixed inset-0 z-50 flex">
      <div @click="toggleDetailPanier" class="flex-1 bg-black/50 backdrop-blur-sm"></div>
      <DetailPanier :produitsPanier="CartStore.produitsPanier" @closeDetailPanier="toggleDetailPanier"
        @update-produitsPanier="handleUpdatePanier" class="relative z-10" />
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Logo from '@/components/logo.vue'
import Divs from '@/components/divs.vue'
import Categorie from '@/components/categorie.vue'
import DetailPanier from '@/components/detailPanier.vue'
import { useCartStore } from '@/stores/cart'
import { useUserCustomerStore } from '@/stores/user'
import axios from 'axios'

// Stores
const CartStore = useCartStore()
const userStore = useUserCustomerStore()

// Variables pour modales
const isCategoriesOpen = ref(false)
const isDetailPanierOpen = ref(false)
const isMobileMenuOpen = ref(false)

// États de chargement
const loading = ref(false)
const error = ref(null)

// Liste de produits
const produitbd = ref([])
const produitsFiltres = ref([])
const produitsOriginal = ref([])

// Recherche et filtres
const searchTerm = ref('')
const categorieSelectionnee = ref(null)

// Chargement initial des produits
onMounted(() => {
  chargerProduits()
})

// Fonction pour charger les produits depuis l'API
function chargerProduits() {
  loading.value = true
  error.value = null

  axios.get('http://127.0.0.1:8000/api/produits')
    .then((response) => {
      produitbd.value = response.data
      produitsOriginal.value = response.data
      produitsFiltres.value = response.data

      console.log('✅ Produits chargés:', response.data)

      // Mettre à jour le store
      CartStore.produits = response.data
    })
    .catch((err) => {
      console.error('❌ Erreur chargement produits:', err)
      error.value = 'Impossible de charger les produits. Vérifiez votre connexion.'
    })
    .finally(() => {
      loading.value = false
    })
}

// Fonction pour filtrer par catégorie
function filtrerParCategorie(categorie) {
  console.log('📂 Catégorie sélectionnée:', categorie)

  categorieSelectionnee.value = categorie
  loading.value = true
  error.value = null

  Promise.resolve()
    .then(() => {
      if (categorie && categorie.id) {
        produitsFiltres.value = produitsOriginal.value.filter(
          p => p.categorie_id === categorie.id
        )
        console.log('✅ Produits filtrés:', produitsFiltres.value)
      } else {
        // Si aucune catégorie, afficher tous les produits
        produitsFiltres.value = produitsOriginal.value
      }

      // Réinitialiser la recherche
      searchTerm.value = ''
    })
    .catch((err) => {
      console.error('❌ Erreur filtrage:', err)
      error.value = 'Erreur lors du filtrage des produits'
    })
    .finally(() => {
      loading.value = false
    })
}

// Fonction pour rechercher dans la liste
function rechercherProduits() {
  console.log('🔍 Recherche:', searchTerm.value)

  if (!searchTerm.value || searchTerm.value.trim() === '') {
    // Si pas de recherche, afficher les produits filtrés par catégorie ou tous
    if (categorieSelectionnee.value) {
      produitsFiltres.value = produitsOriginal.value.filter(
        p => p.categorie_id === categorieSelectionnee.value.id
      )
    } else {
      produitsFiltres.value = produitsOriginal.value
    }
    return
  }

  const term = searchTerm.value.toLowerCase().trim()

  // Rechercher dans les produits (filtrés par catégorie si applicable)
  const produitsARechercher = categorieSelectionnee.value
    ? produitsOriginal.value.filter(p => p.categorie_id === categorieSelectionnee.value.id)
    : produitsOriginal.value

  produitsFiltres.value = produitsARechercher.filter(p =>
    p.nom?.toLowerCase().includes(term) ||
    p.description?.toLowerCase().includes(term) ||
    p.categorie?.nom?.toLowerCase().includes(term)
  )

  console.log('✅ Résultats de recherche:', produitsFiltres.value.length)
}

// Fonction pour ouvrir/fermer catégories
const toggleCategories = () => {
  isCategoriesOpen.value = !isCategoriesOpen.value
}

// Fonction pour ouvrir/fermer détail panier
const toggleDetailPanier = () => {
  isDetailPanierOpen.value = !isDetailPanierOpen.value
}

// Fonction pour ouvrir/fermer menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Ajoute produit au panier
function addProduct(product) {
  console.log('🛒 Ajout au panier:', product)
  CartStore.addProduct(product)
  toggleDetailPanier()
}

// Gérer la mise à jour du panier
function handleUpdatePanier(updatedPanier) {
  console.log('🔄 Mise à jour du panier:', updatedPanier)
  CartStore.produitsPanier = updatedPanier
}

// Écoute pour verrouiller le scroll si modale
function watchingProduit(modalRef) {
  watch(modalRef, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
}

watchingProduit(isCategoriesOpen)
watchingProduit(isDetailPanierOpen)
watchingProduit(isMobileMenuOpen)
</script>
<style scoped>
/* Animations pour les modales */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-from>*:last-child,
.slide-fade-leave-to>*:last-child {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from>*:first-child,
.slide-leave-to>*:first-child {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
}

.slide-right-enter-from>*:last-child,
.slide-right-leave-to>*:last-child {
  transform: translateX(100%);
}

/* Animation de spin pour le loader */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>