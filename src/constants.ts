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
    image: "/src/assets/images/box_profile_1780836606931.png",
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
    image: "/src/assets/images/classic_tile_roofing_sheet_1780836849615.png",
    category: "Pinnacle"
  },
  {
    id: "corrugated-sheets",
    title: "Corrugated Sheet",
    description: "The classic, time-tested waveform for optimal drainage.",
    image: "/src/assets/images/corrugated_roofing_sheet_1780837354489.png",
    category: "Colored"
  },
  {
    id: "ecospan-tile",
    title: "EcoSpan Tile",
    description: "Modern roofing with a unique design, cost-effective and durable solution for contemporary builds.",
    image: "/src/assets/images/ecospan_accurate_mabati_1780921162670.png",
    category: "Pinnacle Builders"
  },
  {
    id: "briton-tile",
    title: "Briton Tile",
    description: "A classic aesthetic with high strength, perfectly suited for Kenyan architectural heritage.",
    image: "/src/assets/images/briton_tile_sheet_1780837384287.png",
    category: "Pinnacle"
  },
  {
    id: "stone-coated-shingles",
    title: "Stone Coated Shingles",
    description: "Premium, extremely durable with a natural stone look. The ultimate choice for longevity.",
    image: "/src/assets/images/stone_coated_shingles_1780837397275.png",
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

