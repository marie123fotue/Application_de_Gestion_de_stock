<!-- Ma page de produits -->
<template>

  <div class="flex ">

    <div
      class=" flex flex-col justify-between m-5 w-[230px] h-[290px]   bg-white border-[0.5px] border-gray-200 rounded shadow-t-xl  p-1.5 hover:scale-110 duration-300">

      <div class="flex flex-col gap-1 ">
        <div>
          <img :src="product.photo" alt="Produit" class="w-full h-45 object-contain " />
        </div>
        <div>
          <!-- pour tronquer l'afffichage du nom de mon produit -->
          <p class="text-[12px] px-1.5    text-gray-700 font-semibold font-Montserrat
            truncate max-w-[250px]" :title="product.nom">{{ product.nom }}</p>      

 
        </div>
        <div>
          <p class="ml-2 font-bold text-[18px]   text-gray-700 ">{{ product.prix }} FCFA</p>
        </div>

        <div class="flex justify- items-center ">
          <button @click="addProduct(product)"
            class="flex items-center gap-2 px-2 py-2 w-[230px] bg-[#7E0A44] hover:bg-[#9c1160] text-white  rounded-lg shadow-md transition duration-300 ease-in-out">
            Ajouter au panier
            <div class="w-5 h-5 rounded-full overflow-hidden">
              <img
                src="./../Assets/image/Riz parfumé mémé Long Grain - 25KG _ Glotelho Cameroun-13-000_files/téléchargerpanier.png"
                alt="panier" class="w-full h-full object-cover" />
            </div>
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(['addProduct'])

function addProduct(product){
  emit("addProduct", product)
}

defineProps({
  product: Object,
});
</script>