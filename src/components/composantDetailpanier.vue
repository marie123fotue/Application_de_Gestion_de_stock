<template>
       <div class="flex   items-center w-[260px] h-[200px] shadow-xl rounded-[5px] p-2 gap-6 ">
            <div>
               <img :src="photo" alt="Produit" class="w-full h-40 object-contain " />                

            </div>
            <div class=" flex flex-col gap-4">
                <p class="text-[12px] px-1.5  text-gray-700 font-semibold font-Montserrat " :title="nom">{{ nom }}</p>
                <div>
                    <p class="ml-2 font-bold text-[18px]   text-gray-700 ">{{ prix }} FCFA</p>
                </div>
            </div>

        </div>
</template>
<script setup  >

defineProps({
    nom: String,
    prix: Number,
    photo: String,
    totalProduit: Number
});
</script>