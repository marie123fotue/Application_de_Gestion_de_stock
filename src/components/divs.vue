<!-- Ma page de produits -->
<template>

  <div class="flex ">

    <div
      class=" flex flex-col justify-between m-3.5 w-[200px] h-[250px]   bg-white border-gray-100 rounded shadow p-1.5 hover:scale-110">

      <div class="flex flex-col gap-1 ">
        <div>
          <img :src="photo" alt="Produit" class="w-full h-32 object-contain " />
        </div>
        <div>
          <!-- pour tronquer l'afffichage du nom de mon produit -->
          <p class="text-[12px] px-1.5    text-gray-700 font-semibold font-Montserrat
            truncate max-w-[250px]" :title="nom">{{ nom }}</p>      

 
        </div>
        <div>
          <p class="ml-2 font-bold text-[18px]   text-gray-700 ">{{ prix }} FCFA</p>
        </div>

        <div class="flex items-center justify-center">
          <button
            class="flex items-center gap-2 px-2 py-2 bg-[#7E0A44] hover:bg-[#9c1160] text-white rounded-lg shadow-md transition duration-300 ease-in-out">
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
defineProps({
  nom: String,
  prix: Number,
  photo: String,
});
</script>