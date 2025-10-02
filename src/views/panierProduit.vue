<template>
    <div class=" flex flex-col  items-center gap-12 h-[600px]">
        <div class="w-[1100px]   h-[40px] flex-end">
            <div class="text-black flex justify-end items-center w-[70px]   h-[40px] ">
                <button @click="$emit('close-PanierProduit')" class="  rounded hover:bg-red-500 hover:p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8 font-bold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>


        </div>
        <div class=" flex flex-col justify-center items-center gap-12 h-[300px]  ">
            <p class="font-bold text-[25px] ">Oups, Votre panier est encore vide</p>

            <img src="./../Assets/image/icone/empty-cart.gif" alt="kk" class="h-[200px]">
        </div>
        <div class="flex gap-2 text-gray-900 underline text-[15px] font-semibold">
            <p class="">
                Continuez vos achats sur
            </p>
            <div class=" flex text-[16px]">
                <p class="text-[#C43837]">SG</p>
                <p class="text-gray-600 text-bold">Stock</p>

            </div>

            <p> ,vous satisfaire est notre priorité</p>

        </div>
    </div>
</template>

<script setup>

</script>