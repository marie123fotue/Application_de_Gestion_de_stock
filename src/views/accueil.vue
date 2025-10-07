<template>
  <RouterView />
  <div class="flex flex-col">
    <!-- page categorie -->
    <div v-if="isCategoriesOpen" class="fixed inset-0 z-50 flex">
      <div>
        <Categorie @close-categorie="toggleCategories" />
      </div>
      <div @click="toggleCategories" class="opacity-38 bg-black backdrop-blur-[0.8px] w-full"></div>
    </div>
    <!-- page detailProduit -->

    <div v-if="isDetailPanierOpen" class="fixed inset-0 z-50 flex">
      <div @click="toggleDetailPanier" class="opacity-38 bg-black w-full"></div>
      <div>
        <DetailPanier :produitsPanier="CartStore.produitsPanier" @closeDetailPanier="toggleDetailPanier"
          @update-produitsPanier="handleUpdatePanier" />
      </div>
    </div>

    <div class="w-full h-[80px] text-white pt-6 bg-[#000A2B] flex justify-between items-center px-4 fixed z-30">
      <div class="flex justify-center items-center w-[450px] mt-2">
        <button @click="toggleCategories" class="mt-4 text-white px-3 py-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div class="flex items-center">
          <Logo />
        </div>
      </div>

      <div class="flex justify-center items-center gap-2 text-black">
        <input type="text" placeholder="Que recherchez-vous ?"
          class="bg-gray-200 w-[350px] h-[35px] rounded-[7px] px-4">
        <button class="font-semiBold text-white text-lg hover:bg-amber-100
            hover:text-black p-2 duration-300 hover:rounded-2xl">Rechercher</button>
      </div>

      <div class="flex justify-center items-center w-[670px] gap-8">
      <!-- // hover:bg-amber-100 -->
            <!-- hover:text-black p-2 duration-300 hover:rounded-2xl -->

        <RouterLink to="/produit" class="font-semiBold text-white text-lg"
            active-class="text-blue-500 font-semibold border-b-2 border border-green-600">Produit</RouterLink>
        <RouterLink to="/categorie" class="font-semiBold text-white text-lg"
            active-class="underline  text-amber-200 border-amber-200 ">Categorie</RouterLink>

        <div class="flex justify-center items-center gap-4">
          <div class="flex items-center gap-[2px]">
            <button @close-Detailpanier="toggleDetailPanier">
              <div class="w-[40px] h-[40px] overflow-hidden rounded-full">                <img
                  src="./../Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/téléchargerpanier.png"
                  class="w-full h-full object-cover" />
              </div>
            </button>
            <span class="text-xl text-amber-100 font-bold">{{ CartStore.produitsPanier.length }}</span>
          </div>
          <RouterLink to="/panierProduit" class="font-semiBold text-white text-lg hover:bg-amber-100
             p-2 duration-300 hover:rounded-2xl">
            Panier
          </RouterLink>
        </div>
        <div class="flex gap-0.5">
          <RouterLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </RouterLink>
          <label for="" class="font-semiblod text-amber-100 ">Bienvenue, {{ userStore.user?.nom }}</label>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center mt-[100px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl">
        <Divs v-for="(product, index) in CartStore.produits" :key="index" :product="product" @add-product="addProduct" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Logo from '@/components/logo.vue'
import Divs from '@/components/divs.vue'
import Categorie from '@/components/categorie.vue'
import DetailPanier from '@/components/detailPanier.vue'
import { useCartStore } from '@/stores/cart'

const CartStore = useCartStore()
import { useUserCustomerStore } from '@/stores/user'
const userStore = useUserCustomerStore()


// États des modales

const isCategoriesOpen = ref(false)
const isDetailPanierOpen = ref(false)

// Fonctions de toggle
// const togglePanierProduit = () => isPanierProduit.value = !isPanierProduit.value
const toggleCategories = () => isCategoriesOpen.value = !isCategoriesOpen.value
const toggleDetailPanier = () => isDetailPanierOpen.value = !isDetailPanierOpen.value

// ✅ NOUVELLE FONCTION CRITIQUE : Reçoit le nouveau tableau de DetailPanier et met à jour l'état local.
function handleUpdatePanier(nouveauPanier) {
  CartStore.produitsPanier.value = nouveauPanier;
}

// Ajout d’un produit au panier
function addProduct(product) {
  CartStore.addProduct(product)
  toggleDetailPanier()
}

// Bloquer le scroll quand une modale est ouverte
function watchingProduit(modalRef) {
  watch(modalRef, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
}
watchingProduit(isCategoriesOpen)
watchingProduit(isDetailPanierOpen)


</script>