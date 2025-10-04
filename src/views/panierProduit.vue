<template>
    <div v-if="CartStore.produitsPanier.length === 0">
        <div class="flex flex-col bg-white rounded-lg z-50 opacity-55 gap-2 ">
            <panierProduit/> 
         <div class="flex flex-col gap-1">
            <p>Resumé de la commande </p>
               <div class="flex flex-col shadow-2xl w-[200px] h-[100px]">
                

            </div>
         </div>
        </div>
    </div>
    <div v-else>
        <ComposantDetailpanier 
            v-for="(product, index) in CartStore.produitsPanier" 
            :key="index" 
            :product="product"
            @delete-product="supprimerProduit" 
        />
    </div>
</template>

<script setup>
import ComposantDetailpanier from '@/components/composantDetailpanier.vue'
import panierProduit from '@/views/panierProduit.vue';
import { useCartStore } from '@/stores/cart'

const CartStore = useCartStore()

</script>

