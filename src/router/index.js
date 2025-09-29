import {createRouter, createWebHistory}from "vue-router"

import connexion from "@/views/connexion.vue"
import accueil from "@/views/accueil.vue"
import categorie from "@/components/categorie.vue"
const routes =[

    {path: '/', name: 'rout-connexion', component: connexion},
    {path: '/accueil', name: 'rout-Accueil', component: accueil},
    {path: '/categorie', name: 'rout-categorie', component:categorie }
]
const router = createRouter({
    history:createWebHistory(),
    routes
});
export default router 