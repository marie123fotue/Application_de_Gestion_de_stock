import {createRouter, createWebHistory}from "vue-router"

import connexion from "@/views/connexion.vue"
import accueil from "@/views/accueil.vue"
import panierProduit from "@/views/panierProduit.vue"

const routes =[

    {path: '/', name: 'rout-connexion', component: connexion},
    {path: '/accueil', name: 'rout-Accueil', component: accueil},
    {path: '/panierProduit', name: 'rout-panierproduit', component: panierProduit},

]
const router = createRouter({
    history:createWebHistory(),
    routes
});
export default router 