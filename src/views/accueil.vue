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


        <RouterLink to="/produit" class="font-semiBold text-white text-lg hover:bg-amber-100
            hover:text-black p-2 duration-300 hover:rounded-2xl">Produit</RouterLink>
        <RouterLink to="/categorie" class="font-semiBold text-white text-lg hover:bg-amber-100
            hover:text-black p-2 duration-300 hover:rounded-2xl">Categorie</RouterLink>

        <div class="flex justify-center items-center gap-4">
          <div class="flex items-center gap-[2px]">
            <button @close-Detailpanier="toggleDetailPanier">
              <div class="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
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
        <Divs v-for="(product, index) in produits" :key="index" :product="product" @add-product="addProduct" />
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

// Déclaration de la liste des produits
const produits = [
  // Ligne 1
  { "nom": "Riz Parfumé mémé Long Grain 25KG", "prix": 13000, "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz-parfume_-me_me_-long-grain-25kg.jpg" },
  { "nom": " Spaghetti Pasta Gold--500g", "prix": 600, "photo": "src/Assets/image/spaghetti/spaghetti---pasta-gold---500g-600.jpg" },
  { "nom": "Huile Raffinée - Mayor- Made in Cameroun -1L", "prix": 1450, "photo": "src/Assets/image/huile/huile-raffine_e---mayor---made-in-cameroun---1l-1500.jpg" },
  { "nom": " Spaghetti Pasta first 500g", "prix": 500, "photo": "src/Assets/image/spaghetti/spaghetti---pasta-first---500g_1.jpg" },
  // Ligne 2
  { "nom": "Lait concentré Pavani 1kg", "prix": 1400, "photo": "src/Assets/image/lait/lait-concentr_-sucr_-pavani---1kg-1400.jpg" },
  { "nom": "Matinal-au-lait 200g", "prix": 2700, "photo": "src/Assets/image/huile/Matinal-au-lait-200g-vente-en-ligne-au-Cameroun-chez-Glotelho_2nd-2 700.jpg" },
  { "nom": "Lait en poudre nido 2500g ", "prix": 18000, "photo": "src/Assets/image/lait/lait_en_poudre_nido_-_2500g_petit_prix-18 000.jpg" },
  { "nom": "Chocolat-en-poudre 800g ", "prix": 3700, "photo": "src/Assets/image/lait/chocolat-en-poudre-matinal-800g-3 700.jpg" },
  // Ligne 3
  { "nom": "Lingette pour bébé ", "prix": 700, "photo": "src/Assets/image/bebe/lingette_b_b_onlem_-700.jpg" },
  { "nom": "Ensemble ulta doux pour bébé", "prix": 8000, "photo": "src/Assets/image/bebe/grenouill_re_b_b_1-8000.jpg" },
  { "nom": "Couches jetables Softcare 11kg Gold", "prix": 1500, "photo": "src/Assets/image/bebe/couches_jetables_softcare_gold_pour_b_b_-_taille_4_-_6_11_kg-1500.jpg" },
  { "nom": "Protex-Pharmapure 100g charbon", "prix": 1000, "photo": "src/Assets/image/SAVON/protex_-_pharmapur_-_charbon_2_1000.jpg" },
  // Ligne 4
  { "nom": "Trottinette pour Bebe ", "prix": 70000, "photo": "src/Assets/image/bebe/trotteur_b_b_r_glable_3_niveaux_avec_musique_6_-18_mois-70 000.jpg" },
  { "nom": "Couches Sofware Premuin ", "prix": 7000, "photo": "src/Assets/image/bebe/softcare_-_premium_soft_-_couches_jetables-7 000.jpg" },
  { "nom": "Poudre Tal de soin Tou chou pour bebe", "prix": 1200, "photo": "src/Assets/image/bebe/poudre_talc_de_soin-1200.jpg" },
  // Ligne 5
  { "nom": "Lotion corporelle super hydratant", "prix": 3500, "photo": "src/Assets/image/bebe/lotion-corporelle-pour-b_b_-ultra-sensible---babylove---250-ml-3500.jpg" },
  { "nom": " dentifrice gel colgate max fresh menthe fraiche 75 ml", "prix": 1500, "photo": "src/Assets/image/bouche/dentifrice_gel_-_colgate_max_fresh_-_menthe_fra_che_-_75_ml-1500.jpg" },
  { "nom": "dentifrice colgate total active prevention au charbon 75 ml", "prix": 2000, "photo": "src/Assets/image/bouche/dentifrice_colgate_-_total_active_prevention_au_charbon_75_ml-2000.jpg" },
  { "nom": " dentifrice colgate maxfresh ", "prix": 1600, "photo": "src/Assets/image/bouche/dentifrice_-_colgate_max_fresh_-_pic_3_1600.jpg" },
  { "nom": "colgate sensitive 75_ml", "prix": 3500, "photo": "src/Assets/image/bouche/colgate_sensitive_pro_relief_-_r_pare_et_pr_vient_75_ml-3500.jpg" },
  // Ligne 6
  { "nom": "Riz Lion Prestige 25 Kg", "prix": 12500, "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz_lion_prestige_25kg-13-500.jpg" },
  { "nom": "Riz Thailandais vitali 25KG - 25% Brisure-Qualité ", "prix": 12500, "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz_thai_landais_vitali_25kg.jpg" },
  { "nom": "Riz Parfumé mémé Long Grain 25KG", "prix": 35000, "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz-parfume_-me_me_-long-grain-25kg.jpg" },
  { "nom": "Riz Parfume royal umbrella 5KG", "prix": 7500, "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/Riz-parfume-royal-umbrella-5kg.jpg" },
  // Ligne 7
  { "nom": " Spaghetti Pasta first", "prix": 500, "photo": "src/Assets/image/spaghetti/spaghetti---pasta-first---500g_1.jpg" },
  { "nom": "Spaghetti selva", "prix": 550, "photo": "src/Assets/image/spaghetti/spaghetti-selva---ble_-dur---500g-550.jpg" },
  { "nom": " spaghetti Pasta barka", "prix": 400, "photo": "src/Assets/image/spaghetti/spaghetti_la_pasta_barka_500g-375.jpg" },
  { "nom": "Spaghetti salaka", "prix": 550, "photo": "src/Assets/image/spaghetti/p_tes_alimentaires_salaka-450.jpg" },
  // Ligne 8
  { "nom": " Sanon uno ultra doux", "prix": 1000, "photo": "src/Assets/image/SAVON/protex_-_pharmapur_-_classique-1 000.jpg" },
  { "nom": "Savon liquide multi-usage Parfum citron", "prix": 550, "photo": "src/Assets/image/SAVON/savon_liquide_multi-usage_-_succ_s_-_parfum_citron_-_1l_2-1 300.jpg" },
  { "nom": " savon liquide bloom", "prix": 6000, "photo": "src/Assets/image/SAVON/savon_liquide_-_bloom_2-6000.jpg" },
  { "nom": "Savon de marseille", "prix": 300, "photo": "src/Assets/image/SAVON/savon_de_marseille_jazz-300.jpg" },
  // Ligne 9
  { "nom": "biscuit trufills vanille choco", "prix": 200, "photo": "src/Assets/image/Biscuit/biscuit_trufills_vanille_choco-200.jpg" },
  { "nom": "biscuit cremelo chocolate", "prix": 200, "photo": "src/Assets/image/Biscuit/biscuit-cremelo-chocolate_200.jpg" },
  { "nom": "carton de 24 paquets de biscuit trio4", "prix": 14500, "photo": "src/Assets/image/Biscuit/carton-de-24-paquets-de-biscuit-trio4-14500.jpg" },
  { "nom": "pack de 6 biscuits cremelo vanilla", "prix": 1200, "photo": "src/Assets/image/Biscuit/pack-de-6-biscuits-cremelo-vanilla-1200.jpg" },
  // Ligne 10
  { "nom": " chocolat_mambo_au_lait", "prix": 900, "photo": "src/Assets/image/Biscuit/chocolat_mambo_au_lait-900.jpg" },
  { "nom": "chocolat-au-riz", "prix": 800, "photo": "src/Assets/image/Biscuit/chocolat-au-riz_1-800.jpg" },
  { "nom": "Mambo chocolat noir 100g", "prix": 750, "photo": "src/Assets/image/Biscuit/Manbo chocolat noir 100g-750.jpg" },
  { "nom": "biscuit-cremelo-chocolate", "prix": 200, "photo": "src/Assets/image/Biscuit/biscuit-cremelo-chocolate_200.jpg" },
  // Ligne 11
  { "nom": " carton de 6 bouteilles de vin rouge calvet merlot 75cl", "prix": 27000, "photo": "src/Assets/image/vin/carton_de_6_bouteilles_de_vin_rouge_calvet_merlot_-_75cl-27000.jpg" },
  { "nom": "vin rouge merlot grand sud 1litre-", "prix": 5300, "photo": "src/Assets/image/vin/vin_rouge_merlot_grand_sud_1litre-5300.jpg" },
  { "nom": " carton de 12 vins rouge en brique perlado ", "prix": 2000, "photo": "src/Assets/image/vin/carton_de_12_vins_rouge_en_brique_-_perlado_1-2000.jpg" },
  { "nom": "vin rouge l'etoile de vincent 2020 bordeaux-", "prix": 7500, "photo": "src/Assets/image/vin/vin_rouge_-_l_toile_de_vincent_2020_bordeaux-7500.jpg" },
  // Ligne 12
  { "nom": " jus de fruit naturel frutas au raisin 1 litre 1", "prix": 1100, "photo": "src/Assets/image/jus/jus_de_fruit_naturel_-_frutas_-_au_raisin_-_1_litre_1_1000.jpg" },
  { "nom": "jus de fruit naturel frutas cocktail", "prix": 1000, "photo": "src/Assets/image/jus/jus_de_fruit_naturel_-_frutas_-_cocktail_1-1000.jpg" },
  { "nom": "jus de fruit naturel frutas orange", "prix": 1000, "photo": "src/Assets/image/jus/jus_de_fruit_naturel_frutas_orange_1_litre-1000.jpg" },
  { "nom": "pack de 6 jus nectar mangue 1l", "prix": 200, "photo": "src/Assets/image/jus/pack_de_6_jus_nectar_mangue_-_1l_prix_cameroun-7150.jpg" },
];
</script>