import { createRouter, createWebHistory } from "vue-router"

import connexion from "@/views/connexion.vue"
import accueil from "@/views/accueil.vue"
import panierProduit from "@/views/panierProduit.vue"
import Produit from "@/views/produit.vue"
import categorie from "@/views/categorie.vue"

const routes = [

    { path: '/', name: 'rout-connexion', component: connexion },
    { path: '/accueil', name: 'rout-Accueil', component: accueil },
    { path: '/panierProduit', name: 'rout-panierproduit', component: panierProduit },
    { path: '/categorie', name: 'rout-categorie', component: categorie },
    { path: '/produit', name: 'rout-produit', component: Produit },
]
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router 