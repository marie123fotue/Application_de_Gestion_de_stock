<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserCustomerStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserCustomerStore()

const nom = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

function seConnecter() {
  if (!nom.value.trim()) {
    alert("Veuillez entrer votre nom")
    return
  }

  // Stocker dans Pinia
  userStore.setUser({
    nom: nom.value,
    email: email.value
  })

  // Redirection vers la page d’accueil
  router.push('/accueil')
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex flex-col justify-center items-left shadow-xl rounded-[15px] p-2 w-[300px] h-fit border-[1px] border-pink-700">

      <div class="flex flex-col justify-center items-center text-center">
        <p class="font-semi-bold text-2xl underline">
          <span class="text-pink-700 font-bold">S</span>e
          <span class="text-pink-700 font-bold"> C</span>onnecter
        </p>
        <Logo />
      </div>

      <div class="flex flex-col justify-center items-left gap-1 px-6">
        <div class="flex flex-col items-left gap-1">
          <label for="nom">Nom:</label>
          <input
            id="nom"
            type="text"
            v-model="nom"
            class="text-center p-1 border-[1px] rounded-[10px]"
            placeholder="Entrez votre nom"
          >
        </div>

        <div class="flex flex-col">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="text-center p-1 rounded-[10px] border-[1px]"
            placeholder="Entrez votre Email"
          >
        </div>

        <div class="flex flex-col">
          <label for="password">Mot de passe :</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="form-checkbox text-center p-1 rounded-[10px] border-[1px]"
            placeholder="Entrez votre mot de passe"
          >
        </div>

        <div class="flex gap-1 justify-center items-center">
          <input
            type="checkbox"
            id="togglePass"
            v-model="showPassword"
            class="w-[20px] h-[20px] pl-2 p-2 rounded-[10px] border-[1px]"
          >
          <label for="togglePass">Afficher le Mot de passe :</label>
        </div>

        <div class="flex flex-col justify-center items-center gap-2 m-2">
          <button
            @click="seConnecter"
            class="flex justify-center items-center border-none p-1.5 rounded-[18px] shadow-xl bg-pink-700 hover:bg-pink-950 text-white"
          >
            Se Déconnecter
          </button>

          <router-view />

          <div class="flex gap-2 justify-center items-center">
            <p>Pas de compte ?</p>
            <p class="underline text-blue-500 cursor-pointer">S'inscrire</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
