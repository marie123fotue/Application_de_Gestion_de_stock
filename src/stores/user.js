// stores/user.js
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserCustomerStore = defineStore('user', () => {
  const user = ref(null)

  // ✅ Fonction pour définir l'utilisateur
  function setUser(utilisateur) {
    user.value = utilisateur
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    setUser,
    logout
  }
})
