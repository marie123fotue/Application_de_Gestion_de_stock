<template>
    <!-- Modal de categorie -->

    <div class="flex  flex-col  fixed inset-0 gap-4 h-screen w-[240px] bg-white  border-0 rounded-xl shadow  z-60 ">
      <!-- Header categorie -->
        <div class="flex  items-center justify-between  px-1 py-2 text-white bg-[#000A2B]  w-[240px] h-[70px] ">
        <!-- hello+ bouton se connecter -->
            <div class="flex justify-between items-center gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <p class="text-[15px] font-semibold"> Hello,</p>
                <div
                    class="text-[12px]  px-2 font-semibold text-black flex justify-center items-center border-none p-1 rounded-[18px] shadow-xl bg-white  hover:bg-gray-200">
                    Se Connecter</div>
            </div>
        <!-- icone de delete -->
            <div class="text-gray-300">
                <button @click="$emit('close-categorie')" class="mt-4  text-white px-2 py-1 rounded hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4 font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

            </div>

        </div>

        <div class=" ">
            <ul class="flex  flex-col px-2 gap-5 w-[240px] h-[40px]">
                <li v-for="(cat, index) in categoriesProduit" :key="index"
                    class="  flex flex-col gap-2 px-3  py-2 text-gray-600 font-semibold rounded text-left hover:bg-amber-100">
                    {{ cat }}
                </li>
            </ul>
        </div>
    </div>

</template>
<script setup>
const categoriesProduit =
    [
        "Riz parfumé & tendre",
        "Spaghetti gourmet",
        "Huile raffinée de qualité",
        "Vin savoureux & raffiné",
        "Lait nourrissant & crémeux",
        "Biscuits croustillants",
        "Douceurs sucrées",
        "Soin dentaire Colgate",
        "Produits doux pour bébé",
        "Jus frais & vitaminé"
    ]

</script>