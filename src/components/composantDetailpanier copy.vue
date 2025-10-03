<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-product'])

function supprimer() {
  emit('delete-product', props.product)
}
</script>

<template>
  <div class="flex flex-col  items-center w-[260px] h-[200px] bg-white my-1 rounded shadow">
    <!-- Bouton delete en haut à droite -->
    <button @click="supprimer"
      class=" text-red-600  flex justify-end inset-0  hover:text-red-800 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
     <div class="flex w-[260px] h-[200px] bg-white  shadow-xl rounded-[5px] p-2 gap-6 ">
            <div>
               <img :src="product.photo" alt="Produit" class="w-full h-40 object-contain " />                

            </div>
            <div class=" flex flex-col gap-4">
                <p class="text-[12px] px-1.5  text-gray-700 font-semibold font-Montserrat " :title="product.nom">{{ product.nom }}</p>
                <div>
                    <p class="ml-2 font-bold text-[18px]   text-gray-700 ">{{ product.prix }} FCFA</p>
                </div>
            </div>

        </div>
</div>
 
</template>
      

