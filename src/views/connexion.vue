<script setup>

import Logo from '@/components/logo.vue'

import accueil  from './accueil.vue'

import { ref } from 'vue'
//  variable pour masquer et afficher le mot de passe
const password = ref('')
const showPassword = ref(false)
</script>
<template>
   <!-- Page de connexion -->
  <div class=" flex  justify-center items-center h-screen  ">
    <div
      class=" flex  flex-col justify-center items-left shadow-xl   rounded-[15px] p-2    w-[300px] h-fit border-[1px] border-pink-700">
 
      <div class="flex flex-col justify-center items-center text-center ">
        <div class="w-full h-full ">
          <p class="font-semi-bold text-2xl underline"><span class="text-pink-700 font-bold">S</span>e <span
              class="text-pink-700 font-bold">C</span>onnecter</p>
        </div>
        <div>
          <Logo />
        </div>

      </div>

      <div class="flex flex-col  justify-center items-left   gap-1 px-6 ">
        <div class="flex flex-col items-left  gap-1">
          <label for="text">Nom:</label>
          <input type="text" class=" text-center  p-1  border-[1px]  rounded-[10px]  " placeholder="Entrez votre nom">
        </div>

        <div class="flex flex-col">
          <label for="text">Email:</label>
          <input type="Email" class=" text-center  p-1  rounded-[10px]  border-[1px] " placeholder="Entrez votre Email">
        </div>
        <div class="flex flex-col">
          <label for="text">Mot de passe :</label>
          <input :type="showPassword ? 'text' : 'password'" id="idPass"
            class="form-checkbox text-center  p-1  rounded-[10px]  border-[1px] " placeholder="Entrez votre mot de passe ">
        </div><br>
        <div class="flex  gap-1  justify-center items-center">
          <input type="checkbox" v-model="showPassword"
            class=" w-[20px] h-[20px] pl-2  p-2 rounded-[10px]  border-[1px]" id="togglePass"
            placeholder="Entrez votre Email">
          <label for="text"> Afficher le Mot de passe :</label>
        </div>
        <div class="flex  flex-col justify-center items-center gap-2 m-2">
       <!-- routes vers ma page d'accueil -->
          <RouterLink to="/accueil" class="  flex justify-center items-center border-none p-1.5 rounded-[18px] shadow-xl bg-pink-700  hover-bg-pink-950" > 
            Se connecter
          </RouterLink>
          <router-view/>
          <div class=" flex gap-2 justify-center items-center">
            <p>Pas de compte ?</p>
            <p class="underline  text-blue-500"> S'incrire</p>
          </div>
        </div>

      </div>

    </div>


  </div>
</template>


