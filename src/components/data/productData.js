// Images
import peri1 from "../../assets/products/periperi1.png";
import peri2 from "../../assets/products/periperi2.png";
import peri3 from "../../assets/products/periperi3.jpg";

import cheese1 from "../../assets/products/cheese1.png";
import cheese2 from "../../assets/products/cheese2.png";
import cheese3 from "../../assets/products/cheese3.jpg";

import tomato1 from "../../assets/products/tomato1.png";
import tomato2 from "../../assets/products/tomato2.png";
import tomato3 from "../../assets/products/tomato3.jpg";

import pudina1 from "../../assets/products/pudina1.png";
import pudina2 from "../../assets/products/pudina2.png";
import pudina3 from "../../assets/products/pudina3.jpg";

const productData = [
  {
    id: "PF001",

    sku: "PF-PERI-70",

    slug: "peri-peri",

    name: "Peri Peri",

    title: "Peri Peri Roasted Makhana",

    category: "Makhana",

    weight: "70g",

    mrp: 199,

    sellingPrice: 149,

    stock: 150,

    rating: 4.8,

    totalReviews: 278,

    featured: true,

    bestseller: true,

    combo: false,

    description:
      "Crafted from premium roasted foxnuts and seasoned with a fiery peri peri blend that delivers the perfect balance of heat, tanginess and crunch. Every bite is packed with bold flavours while staying light, healthy and completely guilt-free.",

    shortDescription:
      "Smoky African chilli blend with a citrusy kick. Fiery, bold and addictive.",

    images: [
      peri1,
      peri2,
      peri3,
    ],

    tags: [
      "High Protein",
      "Never Fried",
      "Roasted",
    ],

    ingredients: [
      "Premium Foxnuts",
      "Peri Peri Seasoning",
      "Sunflower Oil",
      "Salt",
    ],

    nutrition: {
      calories: "116 kcal",
      protein: "4 g",
      carbs: "18 g",
      fat: "2.5 g",
      fibre: "3 g",
    },

    theme: {
      background: "#F8E6DF",
      accent: "#E86B2F",
      text: "#184C35",
      badge: "BEST SELLER",
    },
  },

  {
    id: "PF002",

    sku: "PF-CHEESE-70",

    slug: "cheese",

    name: "Cheese",

    title: "Cheese Roasted Makhana",

    category: "Makhana",

    weight: "70g",

    mrp: 199,

    sellingPrice: 149,

    stock: 135,

    rating: 4.7,

    totalReviews: 214,

    featured: true,

    bestseller: true,

    combo: false,

    description:
      "Rich and creamy cheese seasoning perfectly coats every roasted makhana to create an irresistible crunchy snack. Indulgent in flavour yet light enough for everyday guilt-free munching.",

    shortDescription:
      "Creamy cheese flavour wrapped around every crunchy bite.",

    images: [
      cheese1,
      cheese2,
      cheese3,
    ],

    tags: [
      "High Protein",
      "Never Fried",
      "Roasted",
    ],

    ingredients: [
      "Premium Foxnuts",
      "Cheese Seasoning",
      "Sunflower Oil",
      "Salt",
    ],

    nutrition: {
      calories: "118 kcal",
      protein: "4 g",
      carbs: "18 g",
      fat: "3 g",
      fibre: "3 g",
    },

    theme: {
      background: "#FBF2DE",
      accent: "#D7A326",
      text: "#184C35",
      badge: "BEST SELLER",
    },
  },

  {
    id: "PF003",

    sku: "PF-TOMATO-70",

    slug: "tangy-tomato",

    name: "Tangy Tomato",

    title: "Tangy Tomato Roasted Makhana",

    category: "Makhana",

    weight: "70g",

    mrp: 199,

    sellingPrice: 149,

    stock: 110,

    rating: 4.6,

    totalReviews: 184,

    featured: false,

    bestseller: false,

    combo: false,

    description:
      "Sweet, tangy and deliciously savoury, this flavour is inspired by classic tomato seasoning that keeps every crunchy bite exciting and satisfying.",

    shortDescription:
      "Sweet, tangy and packed with delicious tomato goodness.",

    images: [
      tomato1,
      tomato2,
      tomato3,
    ],

    tags: [
      "High Protein",
      "Never Fried",
      "Roasted",
    ],

    ingredients: [
      "Premium Foxnuts",
      "Tomato Seasoning",
      "Sunflower Oil",
      "Salt",
    ],

    nutrition: {
      calories: "117 kcal",
      protein: "4 g",
      carbs: "18 g",
      fat: "2.7 g",
      fibre: "3 g",
    },

    theme: {
      background: "#FBE6E2",
      accent: "#D94E43",
      text: "#184C35",
      badge: "CUSTOMER FAVOURITE",
    },
  },

  {
    id: "PF004",

    sku: "PF-PUDINA-70",

    slug: "pudina",

    name: "Pudina",

    title: "Pudina Roasted Makhana",

    category: "Makhana",

    weight: "70g",

    mrp: 199,

    sellingPrice: 149,

    stock: 95,

    rating: 4.7,

    totalReviews: 201,

    featured: false,

    bestseller: false,

    combo: false,

    description:
      "Refreshing mint seasoning blended with roasted premium foxnuts creates a light, crisp and refreshing snacking experience that's perfect anytime during the day.",

    shortDescription:
      "Refreshing mint flavours with a crisp and addictive crunch.",

    images: [
      pudina1,
      pudina2,
      pudina3,
    ],

    tags: [
      "High Protein",
      "Never Fried",
      "Roasted",
    ],

    ingredients: [
      "Premium Foxnuts",
      "Mint Seasoning",
      "Sunflower Oil",
      "Salt",
    ],

    nutrition: {
      calories: "115 kcal",
      protein: "4 g",
      carbs: "18 g",
      fat: "2.4 g",
      fibre: "3 g",
    },

    theme: {
      background: "#EAF4EB",
      accent: "#3D8C57",
      text: "#184C35",
      badge: "REFRESHING",
    },
  },
];

export default productData;