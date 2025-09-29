<template>
  <router-view />

  <!-- Barre de navigation -->
  <div class="flex flex-col gap-7 ">
    <div class="w-full h-[60px] text-white  bg-[#000A2B] flex items-center justify-between px-6">
      
      <!-- Partie gauche -->
      <div class="flex items-center gap-3 mt-2">
        <!-- lien vers mon modal categorie essaie -->
        <RouterLink to="/categorie">
          <div class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </RouterLink>
       <!-- logo de l'appli -->
        <div class="">
          <Logo />
        </div>

      </div>

      <!-- Partie droite -->
      <div class="flex items-center gap-12">
        <span class="text-lg font-semibold  text-white">Produit</span>
        <div class="flex items-center gap-2">
          <div class="w-[40px] h-[40px] overflow-hidden rounded-full">
            <img
              src="./../Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/téléchargerpanier.png"
              alt="panier" class="w-full h-full object-cover" />
          </div>
          <span class="text-xl text-white font-bold">0</span>
        </div>
        <!-- Icône profil -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-8 h-8 text-gray-700">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
    </div>

    <div class="flex justify-center items-center ">

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  max-w-screen-xl  ">
        <!-- Boucle pour afficher les produits -->
        <Divs v-for="(product, index) in produits" :key="index" :nom="product.nom" :prix="product.prix"
          :photo="product.photo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/logo.vue'
import Divs from '@/components/divs.vue' // votre composant
import ategorie from "@/components/categorie.vue"

// Déclaration de la liste des produits
const produits = [
  {
    "nom": "Riz Bella Luna brisure 25KG",
    "prix": 13000,
    "photo": "src/Assets/image/riz-meme.jpg"
  },

  {
    "nom": "Riz lion Prestige 25KG",
    "prix": 13500,
    "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz_lion_prestige_25kg-13-500.jpg"
  },

  {
    "nom": "Riz Parfumé Africana 25KG",
    "prix": 23000,
    "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz_lion_prestige_25kg-13-500.jpg"
  },
  {
    "nom": "Riz Thailandais vitali 25kg ",
    "prix": 12500,
    "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz_thai_landais_vitali_25kg (1)-12-500.jpg"
  },
  {
    "nom": "Riz mémé cassé 25KG",
    "prix": 35000,
    "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz-parfume_-me_me_-long-grain-25kg.jpg"
  },

  {
    "nom": "Riz Parfume royal umbrella 5KG",
    "prix": 7500,
    "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/Riz-parfume-royal-umbrella-5kg.jpg"
  },
  {
    "nom": " Pasta Gold",
    "prix": 600,
    "photo": "src/Assets/image/spaghetti/spaghetti---pasta-gold---500g-600.jpg"
  },

  {
    "nom": "Pasta first",
    "prix": 500,
    "photo": "src/Assets/image/spaghetti/spaghetti---pasta-first---500g_1.jpg"
  },
  {
    "nom": "Spaghetti selva",
    "prix": 550,
    "photo": "src/Assets/image/spaghetti/spaghetti-selva---ble_-dur---500g-550.jpg"
  },

  {
    "nom": "Pasta barka",
    "prix": 400,
    "photo": "src/Assets/image/spaghetti/spaghetti_la_pasta_barka_500g-375.jpg"
  },
  {
    "nom": "Spaghetti salaka",
    "prix": 550,
    "photo": "src/Assets/image/spaghetti/p_tes_alimentaires_salaka-450.jpg"
  },

];


</script>