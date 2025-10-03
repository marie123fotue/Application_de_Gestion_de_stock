
<template>
    <router-view />

    <div> </div>
    <div class=" flex flex-col  justify-center items-center gap-12 h-[600px]">

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
        <div>
            <router-link to="/accueil" class="text-blue-950  text-[15px] font-bold underline duration-300">Retournez
                l'accueil 👌</router-link>
        </div>
    </div>
</template>

<script setup>

</script>