import {createRouter, createWebHistory}from "vue-router"

import connexion from "@/views/connexion.vue"
import accueil from "@/views/accueil.vue"

const routes =[

    {path: '/', name: 'rout-connexion', component: connexion},
    {path: '/accueil', name: 'rout-Accueil', component: accueil},

]
const router = createRouter({
    history:createWebHistory(),
    routes
});
export default router 