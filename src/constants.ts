import { getImage } from './lib/images';
export interface RoofingProfile {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  specs?: {
    effectiveWidth: string;
    gaugeRange: string;
  };
}

export const ROOFING_PROFILES: RoofingProfile[] = [
  {
    id: "box-profile",
    title: "Box Profile",
    description: "High-precision angular ribs for superior load-bearing capacity.",
    image: getImage("/profiles/box/charcoal.png"),
    category: "Pinnacle",
    specs: {
      effectiveWidth: "880mm",
      gaugeRange: "28G - 32G"
    }
  },
  {
    id: "classic-tile",
    title: "Classic Tile",
    description: "Architectural elegance of traditional tiles with the durability of lightweight steel.",
    image: getImage("/profiles/classic/charcoal.png"),
    category: "Pinnacle"
  },
  {
    id: "corrugated-sheets",
    title: "Corrugated Sheet",
    description: "The classic, time-tested waveform for optimal drainage.",
    image: getImage("/profiles/corrugated/charcoal.png"),
    category: "Colored"
  },
  {
    id: "ecospan-tile",
    title: "EcoSpan Tile",
    description: "Modern roofing with a unique design, cost-effective and durable solution for contemporary builds.",
    image: getImage("/profiles/ecospan/charcoal.jpg"),
    category: "Pinnacle Builders"
  },
  {
    id: "stone-coated-shingles",
    title: "Stone Coated Shingles",
    description: "Premium, extremely durable with a natural stone look. The ultimate choice for longevity.",
    image: getImage("/profiles/stone/charcoal.png"),
    category: "Pinnacle"
  }
];

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  opacity: number;
  secondaryBlend?: string;
  description: string;
  vibe: string;
}

export type FinishType = 'matte' | 'gloss';

export interface FinishOption {
  id: FinishType;
  name: string;
  description: string;
  vibe: string;
}

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'matte',
    name: 'Textured Matte',
    description: 'A granular, non-reflective powder-coated texture designed for elegant premium anti-glare looks.',
    vibe: 'Classic Slate Look'
  },
  {
    id: 'gloss',
    name: 'Brilliant Gloss',
    description: 'A high-reflectivity, smooth surface that accentuates depth, curves and metallic profiles under direct sunlight.',
    vibe: 'Contemporary Lustre'
  }
];

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'charcoal',
    name: 'Charcoal Gray',
    hex: '#333538',
    opacity: 0.35,
    description: 'Deep contemporary neutral slate tone that emphasizes clean modern structural lines.',
    vibe: 'Modern & Sophisticated'
  },
  {
    id: 'tile-red',
    name: 'Tile Red',
    hex: '#8c2424',
    opacity: 0.7,
    description: 'Classic clay-brick red designed to offer a timeless, warm, and highly authentic appeal.',
    vibe: 'Warm & Traditional'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    hex: '#4e3325',
    opacity: 0.75,
    description: 'Warm, chocolate-earth brown that integrates seamlessly into residential surroundings.',
    vibe: 'Rich & Organic'
  },
  {
    id: 'dark-green',
    name: 'Dark Green',
    hex: '#1f3e26',
    opacity: 0.65,
    description: 'Deep forest safari green, ideal for natural landscapes and eco-friendly home structures.',
    vibe: 'Serene & Eco-Friendly'
  }
];

