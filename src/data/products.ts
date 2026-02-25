export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  category: "butter" | "dairy" | "dressing";
  color: string;
  bgColor: string;
  featured: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Butter",
    slug: "classic-butter",
    price: 8.99,
    shortDescription: "Pure, creamy perfection crafted in small batches.",
    fullDescription:
      "Our Classic Butter begins with the finest cream, slowly churned in small batches to produce an exceptionally rich, velvety butter. Lightly salted with fleur de sel, it spreads beautifully on warm bread, melts luxuriously over vegetables, and elevates every dish it touches. This is butter as it was meant to be — simple, pure, and unforgettable.",
    category: "butter",
    color: "#F5C842",
    bgColor: "#FFF8E1",
    featured: true,
    tags: ["classic", "salted", "everyday"],
  },
  {
    id: "2",
    name: "Miso Butter",
    slug: "miso-butter",
    price: 11.99,
    shortDescription: "Umami-rich miso meets golden, cultured butter.",
    fullDescription:
      "A revelation for savory lovers: our Miso Butter blends aged white miso from a family-owned Japanese producer with our house-churned butter. The result is a deeply savory, complex compound butter with notes of caramel and fermented grain. Swirl it into ramen, baste your steak, or spread it on grilled corn — it transforms everything it touches.",
    category: "butter",
    color: "#C8943A",
    bgColor: "#FFF3E0",
    featured: true,
    tags: ["umami", "savory", "japanese"],
  },
  {
    id: "3",
    name: "Herb Butter",
    slug: "herb-butter",
    price: 10.99,
    shortDescription: "Garden-fresh herbs folded into silky compound butter.",
    fullDescription:
      "Handpicked chives, flat-leaf parsley, tarragon, and a whisper of garlic are folded into our freshly churned butter to create this vibrant compound butter. Each log is rolled by hand and wrapped in parchment. Slice it over a sizzling steak, dissolve it over roasted potatoes, or simply spread it on crusty sourdough. The herb garden in every bite.",
    category: "butter",
    color: "#6B9E3A",
    bgColor: "#F1F8E9",
    featured: true,
    tags: ["herbs", "garlic", "fresh"],
  },
  {
    id: "4",
    name: "Chimichurri Butter",
    slug: "chimichurri-butter",
    price: 12.99,
    shortDescription: "Bold Argentinian chimichurri captured in butter form.",
    fullDescription:
      "Inspired by the open-fire asados of Argentina, our Chimichurri Butter captures the bold, herbaceous spirit of classic chimichurri sauce in a luscious butter. Fresh oregano, flat-leaf parsley, red wine vinegar, garlic, and a kick of red pepper flakes are blended into our cultured butter. The perfect companion for grilled meats, roasted vegetables, or crusty bread straight from the oven.",
    category: "butter",
    color: "#4A7C3F",
    bgColor: "#E8F5E9",
    featured: false,
    tags: ["spicy", "herbs", "argentinian"],
  },
  {
    id: "5",
    name: "Berry Butter",
    slug: "berry-butter",
    price: 10.99,
    shortDescription: "Sweet mixed berry swirled into our signature butter.",
    fullDescription:
      "A breakfast table centerpiece, our Berry Butter slowly simmers a seasonal blend of strawberries, blueberries, and blackberries with a touch of raw honey and lemon zest before folding the jewel-toned reduction into our freshly churned butter. Spread it on warm waffles, swirl it into yogurt, or top your morning toast for a moment of pure indulgence.",
    category: "butter",
    color: "#9B3A8C",
    bgColor: "#F8E8F5",
    featured: false,
    tags: ["sweet", "fruit", "breakfast"],
  },
  {
    id: "6",
    name: "Cinnamon Butter",
    slug: "cinnamon-butter",
    price: 9.99,
    shortDescription: "Warm Ceylon cinnamon and honey-kissed butter.",
    fullDescription:
      "We source only true Ceylon cinnamon — delicate, floral, and far more nuanced than the cassia cinnamon found in most pantries — and blend it with local wildflower honey into our slowly churned butter. The result is a warmly spiced, gently sweet compound butter that melts magnificently on pancakes, sweet potatoes, or fresh-baked cinnamon rolls. A hug in butter form.",
    category: "butter",
    color: "#A0522D",
    bgColor: "#FBE9E7",
    featured: true,
    tags: ["sweet", "cinnamon", "honey", "breakfast"],
  },
  {
    id: "7",
    name: "Cultured Buttermilk",
    slug: "cultured-buttermilk",
    price: 7.99,
    shortDescription: "Rich, tangy traditionally cultured buttermilk.",
    fullDescription:
      "True buttermilk — not the thick, overly acidic imitation — is the liquid gold left behind from our butter-churning process, then slowly cultured with live active cultures for 24 hours. The result is a pleasantly tangy, slightly effervescent dairy with a clean finish. Use it in biscuits, pancakes, marinades, or enjoy a chilled glass on its own. This is buttermilk as grandmother knew it.",
    category: "dairy",
    color: "#F0E6D0",
    bgColor: "#FFFDE7",
    featured: true,
    tags: ["tangy", "cultured", "traditional"],
  },
  {
    id: "8",
    name: "Ranch Dressing",
    slug: "ranch-dressing",
    price: 9.99,
    shortDescription: "Homestyle ranch made with fresh herbs and buttermilk.",
    fullDescription:
      "Forget the bottle. Our Ranch Dressing is made fresh with our own cultured buttermilk as the base, blended with real mayonnaise, fresh dill, chives, parsley, and a careful balance of garlic and onion. No stabilizers, no gums, no mystery ingredients — just honest, creamy, herbaceous ranch the way it was meant to be made. Use it as a dressing, dip, or drizzle on everything.",
    category: "dressing",
    color: "#E8DCC8",
    bgColor: "#FAFAFA",
    featured: false,
    tags: ["creamy", "herbs", "versatile"],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, count = 3): Product[] =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(
      products
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category !== product.category
        )
        .slice(0, Math.max(0, count - products.filter((p) => p.id !== product.id && p.category === product.category).length))
    )
    .slice(0, count);
