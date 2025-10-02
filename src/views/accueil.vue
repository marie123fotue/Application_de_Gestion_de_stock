<template>
  <div class="flex flex-col ">

    <!-- MODAL PAGE CATEGORIE -->
    <!-- Modal + Overlay -->
    <div v-if="isCategoriesOpen" class="fixed inset-0 z-50 flex">
      <!-- Modal Categorie à gauche -->
      <div>
        <Categorie @close-categorie="toggleCategories" />

      </div>

      <!-- Overlay flouté à droite -->
      <div @click="toggleCategories" class=" opacity-35 bg-black  w-full">
      </div>
    </div>


    <!-- MODAL PAGE DETAIL PANIER  -->
    <!-- Modal + Overlay pour detailpanier  -->
    <div v-if="isDetailPanierOpen" class="fixed inset-0 z-50 flex">
      <!-- Overlay flouté à droite -->
      <div @click="toggleDetailPanier" class=" opacity-35 bg-black  w-full">
      </div>
      <!-- Modal Categorie à gauche -->
      <div>
        <DetailPanier @close-DetailPanier="toggleDetailPanier" v-if="isDetailPanierOpen" />
      </div>


    </div>


    <!-- Barre de navigation -->
    <div class="w-full h-[80px] text-white pt-6 bg-[#000A2B] flex justify-between items-center px-6 fixed z-30">
      <!-- Partie gauche -->
      <div class="flex justify-center items-center w-[480px] mt-2">

        <!-- APPEL DU MODAL CATEGORIE -->
        <button @click="toggleCategories" class="mt-4 text-white px-3 py-1 rounded">
          <!-- Icône hamburger -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center">
          <Logo />
        </div>
      </div>

      <!-- Barre de recherche -->
      <div class="flex justify-center items-center gap-2 text-black">
        <input type="text" placeholder="Que recherchez-vous ?"
          class="bg-gray-200 w-[350px] h-[35px] rounded-[7px] px-4">
        <button class="p-1 bg-amber-100 rounded-[7px] h-[35px] hover:bg-amber-200">Rechercher</button>
      </div>

      <!-- Partie droite -->
      <div class="flex justify-center items-center w-[670px] gap-12">
        <span
          class="text-lg font-semibold text-white hover:scale-120 hover:bg-amber-100 hover:text-black hover:p-2 hover:rounded-2xl">
          Produit
        </span>

        <div class="flex justify-center items-center gap-4">

          <div class="flex items-center gap-[2px]">
            <!-- APPEL DU MODAL DETAILPANIER -->
            <button @click="togglePanierProduit">
              <div class="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
                  src="./../Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/téléchargerpanier.png"
                  class="w-full h-full object-cover" />
              </div>
            </button>

            <span class="text-xl text-white font-bold">0</span>
          </div>
          <button @click="toggleDetailPanier">
            <p class="font-semiBold text-white text-lg hover:bg-amber-100 hover:text-black hover:p-2 hover:rounded-2xl">
              Panier
            </p>
          </button>
        </div>

        <!-- Icône profil -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-8 h-8 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
    </div>

    <!-- Modal PanierProduit centré -->
    <div v-if="isPanierProduit" class="fixed inset-0 z-50 ">
      <!-- Overlay flouté derrière -->
      <div @click="togglePanierProduit" class="absolute inset-0 bg-black opacity-35 backdrop-blur-[0.8px] z-40">
      </div>

      <!-- Contenu du modal centré -->
      <div @click.stop class="absolute inset-0 flex items-center justify-center z-50">

        <div
          class="flex flex-col justify-between items-center gap-12 p-1 bg-white  shadow-2xl rounded-[5px] h-[630px] w-[1100px] mt-[100px] ">
          <PanierProduit @close-PanierProduit="togglePanierProduit" />
        </div>
      </div>
    </div>


    <!-- Section produits -->
    <div class="flex justify-center items-center mt-[100px]">
      <div>
        <BodyProduits />
      </div>
    </div>
  </div>
</template>


<script setup>
import { watch, ref } from 'vue'
import Logo from '@/components/logo.vue'
import BodyProduits from '@/components/bodyProduits.vue';


import Categorie from '@/components/categorie.vue';
import DetailPanier from '@/components/detailPanier.vue'
import PanierProduit from './panierProduit.vue';

// MODAL PAGE PANIERVIDE
const isPanierProduit = ref(false)

// // Fonction pour basculer l'état (true <-> false)
const togglePanierProduit = () => {
  isPanierProduit.value = !isPanierProduit.value;
};


//MODAL PAGE CATEGORIE
const isCategoriesOpen = ref(false);

// Fonction pour basculer l'état (true <-> false)
const toggleCategories = () => {
  isCategoriesOpen.value = !isCategoriesOpen.value;
};


//MODal page  DETAILPANIER
const isDetailPanierOpen = ref(false);

// // Fonction pour basculer l'état (true <-> false)
const toggleDetailPanier = () => {
  isDetailPanierOpen.value = !isDetailPanierOpen.value;
};
watch(isCategoriesOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})


watch(isDetailPanierOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})


watch(isPanierProduit, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})






</script>