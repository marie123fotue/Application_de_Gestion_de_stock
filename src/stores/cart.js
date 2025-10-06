import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {
  // 🛒 Produits du panier
  const produitsPanier = ref([])

  // ✅ Liste des catégories (objets avec nom + description)
  const categoriesProduit = ref([
    { nom: "Riz parfumé & tendre", description: "Un riz délicat et savoureux" },
    { nom: "Spaghetti gourmet", description: "Pâtes italiennes haut de gamme" },
    { nom: "Huile raffinée de qualité", description: "Huile végétale pure" },
    { nom: "Vin savoureux & raffiné", description: "Vin rouge élégant" },
    { nom: "Lait nourrissant & crémeux", description: "Lait entier riche en calcium" },
    { nom: "Biscuits croustillants", description: "Snack sucré et croquant" },
    { nom: "Douceurs sucrées", description: "Bonbons et sucreries" },
    { nom: "Soin dentaire Colgate", description: "Dentifrice Colgate pour dents fortes" },
    { nom: "Produits doux pour bébé", description: "Soins pour la peau de bébé" },
    { nom: "Jus frais & vitaminé", description: "Jus de fruits naturel" }
  ])

  // ✅ Ajout d'une nouvelle catégorie
  function addCategorie(categorie) {
    const existeDeja = categoriesProduit.value.find(c => c.nom === categorie.nom)
    if (!existeDeja) {
      categoriesProduit.value.push(categorie)
    } else {
      alert("Cette catégorie existe déjà.")
    }
  }

  function demanderSuppression(productId) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      supprimerProduit(productId)
    }
  }

  function supprimerProduit(productId) {
    const index = produitsPanier.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      produitsPanier.value.splice(index, 1)
    }
  }

  function diminuer(product) {
    if (product.quantite > 1) {
      product.quantite--
    }
  }

  function augmenter(product) {
    product.quantite++
  }

  const prixTotal = computed(() => {
    return produitsPanier.value.reduce((total, produit) => {
      const prix = parseFloat(produit.prix) || 0
      const quantite = parseInt(produit.quantite) || 0
      return total + prix * quantite
    }, 0).toFixed(2)
  })

  return {
    produitsPanier,
    prixTotal,
    supprimerProduit,
    demanderSuppression,
    diminuer,
    augmenter,
    categoriesProduit,
    addCategorie
  }
})
