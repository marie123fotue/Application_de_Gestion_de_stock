<template>
    <div
        class="flex  flex-col  justify-between items-center   h-full w-[280px]  rounded-[10px]   bg-white shadow font-Montserrat  ">
        <div class="flex flex-col gap-6">
            <!-- nom et bouton fermeture -->
            <div class=" flex justify-between items-center  w-[275px]   h-[50px]  bg-gray-100 px-2  text-black hover:bg-amber-100 p-1">
                <p class=" font-semibold ">Detail de votre Panier </p>
                <button @click="$emit('close-DetailPanier')" class="  p-2 py-1 rounded hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <!-- produitPanier -->
            <div class=" flex flex-col shadow-b-xl  m-2  gap-4">
                <ComposantDetailpanier v-for="(product, index) in produitsPanier" :key="index" :nom="product.nom"
                    :prix="product.prix" :photo="product.photo" />
            </div>
        </div>

        <div class="flex flex-col justify-end gap-2 ">

            <p class="ml-2 font-bold text-[18px]   text-gray-700">Total:.....FCFA</p>
            <button class="bg-[#F7D036] p-1 rounded-[5px]"> Passer la commande </button>
        </div>

    </div>
</template>

<script setup>
import ComposantDetailpanier from '@/components/composantDetailpanier.vue'

const produitsPanier = [

    // Premiere ligne de produits
    {
        "nom": "Riz Parfumé mémé Long Grain 25KG",
        "prix": 13000,
        "photo": "src/Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/riz-parfume_-me_me_-long-grain-25kg.jpg"
    },
    {
        "nom": " Spaghetti Pasta Gold--500g",
        "prix": 600,
        "photo": "src/Assets/image/spaghetti/spaghetti---pasta-gold---500g-600.jpg"
    },
]
</script>