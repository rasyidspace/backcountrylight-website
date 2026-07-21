export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  rentalPrice?: number;
  image: string;
  type: "buy" | "rent" | "both";
  category: string;
  description?: string;
  specifications?: Record<string, string>;
}

const baseProducts: Omit<Product, "rentalPrice">[] = [
  {
    id: "1",
    slug: "soto-windmaster",
    name: "WindMaster Stove",
    brand: "SOTO",
    price: 1200000,
    image: "/images/products/soto-windmaster.jpg",
    type: "both",
    category: "cooking",
    description: "Highly efficient micro regulator stove that defies the wind.",
    specifications: { "Weight": "2.3 oz", "Output": "11,000 BTU" }
  },
  {
    id: "2",
    slug: "gsi-pinnacle-dualist",
    name: "Pinnacle Dualist Cookset",
    brand: "GSI Outdoors",
    price: 1500000,
    image: "/images/products/gsi-pinnacle-dualist.jpg",
    type: "both",
    category: "cooking",
    description: "Complete, compact cooking and eating solution for two.",
    specifications: { "Weight": "21.6 oz", "Material": "Hard Anodized Aluminum" }
  },
  {
    id: "3",
    slug: "gear-aid-tenacious-tape",
    name: "Tenacious Tape",
    brand: "Gear Aid",
    price: 150000,
    image: "/images/products/gear-aid-tenacious-tape.jpg",
    type: "buy",
    category: "accessories",
    description: "Ultra-strong repair tape for fixing rips, holes and gashes in outdoor gear.",
    specifications: { "Size": "3 x 20 inches", "Material": "PVC/Nylon" }
  },
  {
    id: "4",
    slug: "heroclip-medium",
    name: "Medium Hybrid Gear Clip",
    brand: "Heroclip",
    price: 350000,
    image: "/images/products/heroclip-medium.jpg",
    type: "buy",
    category: "accessories",
    description: "Versatile 3-in-1 clip, hook, and carabiner to hang gear anywhere.",
    specifications: { "Weight Capacity": "60 lbs", "Weight": "2 oz" }
  },
  {
    id: "5",
    slug: "hmg-ultamid-2",
    name: "Ultamid 2",
    brand: "Hyperlite Mountain Gear",
    price: 12500000,
    image: "/images/products/hmg-ultamid-2.jpg",
    type: "both",
    category: "shelter",
    description: "The UltaMid 2 is a lightweight, durable, and highly weather-resistant pyramid shelter.",
    specifications: { "Weight": "1.17 lbs", "Capacity": "2 Person", "Material": "Dyneema Composite" }
  },
  {
    id: "6",
    slug: "grand-trunk-skeeter-beeter",
    name: "Skeeter Beeter Pro",
    brand: "Grand Trunk",
    price: 1800000,
    image: "/images/products/grand-trunk-skeeter-beeter.jpg",
    type: "both",
    category: "shelter",
    description: "Roomy parachute nylon hammock with attached mosquito netting.",
    specifications: { "Weight Capacity": "400 lbs", "Weight": "35 oz" }
  },
  {
    id: "7",
    slug: "big-agnes-copper-spur-ul2",
    name: "Copper Spur HV UL2",
    brand: "Big Agnes",
    price: 8500000,
    image: "/images/products/big-agnes-copper-spur-ul2.jpg",
    type: "both",
    category: "shelter",
    description: "Award-winning, full-featured ultralight backpacking tent.",
    specifications: { "Weight": "2 lbs 11 oz", "Capacity": "2 Person" }
  },
  {
    id: "8",
    slug: "vipole-carbon-ql",
    name: "Carbon QL Trekking Poles",
    brand: "Vipole",
    price: 2200000,
    image: "/images/products/vipole-carbon-ql.jpg",
    type: "both",
    category: "accessories",
    description: "Ultra-lightweight 100% carbon trekking poles with quick lock system.",
    specifications: { "Weight": "180g (per pole)", "Material": "100% Carbon" }
  }
];

export const PRODUCTS: Product[] = baseProducts.map((p) => ({
  ...p,
  rentalPrice: p.type !== "buy" ? p.price * 0.1 : undefined,
}));

export const CATEGORIES = [
  "Backpack", "Shelter", "Sleeping", "Cooking", "Apparel", "Accessories"
];

export const BRANDS = [
  "SOTO", "GSI Outdoors", "Gear Aid", "Heroclip", "Hyperlite Mountain Gear", "Grand Trunk", "Big Agnes", "Vipole"
];
