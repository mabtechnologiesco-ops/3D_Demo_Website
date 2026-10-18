export interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  category: 'Amber & Intense' | 'Floral & Sensual' | 'Woody & Mysterious';
  notes: string;
  keyNotes: string[];
  description: string;
  longDescription: string;
  ritual: string;
  image: string;
  pyramid: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: {
    size: '30ml' | '50ml' | '100ml';
    price: number;
    flaconWeight: string;
  }[];
  inspiration: string;
  badge?: string;
  accords: string[];
}

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'golden-pharaoh',
    name: 'GOLDEN PHARAOH',
    subtitle: 'Eau de Parfum Extrême',
    category: 'Amber & Intense',
    notes: 'Amber, Saffron, Oud',
    keyNotes: ['Imperial Amber', 'Persian Saffron', 'Royal Oud', 'Sun-drenched Honey'],
    description: 'A powerful, warm fragrance inspired by royal Egyptian chambers and golden sunlight across sacred sanctuaries.',
    longDescription:
      'Consecrated in ancient rites of kingship, Golden Pharaoh opens with an incandescent blaze of hand-harvested Persian saffron and radiant sun resins. At its heart lies the sacred kyphi incense accord, resting on aged Cambodian oud and molten amber that resonates on skin for over twenty-four hours.',
    ritual:
      'Warm three drops between the wrists and press gently onto pulse points at the collarbone and nape. Allow the warmth of the skin to unfurl the sacred resinous layers.',
    image: '/src/assets/images/perfume_golden_pharaoh_1792302698019.jpg',
    pyramid: {
      top: ['Imperial Saffron', 'Cistus Labdanum', 'Bitter Orange Essence'],
      heart: ['Sacred Kyphi Incense', 'Smoked Honey Accord', 'Atlas Cedar'],
      base: ['Rare Cambodian Oud', 'Black Amber', 'Papyrus Reed']
    },
    sizes: [
      { size: '30ml', price: 5400, flaconWeight: '320g Cast Glass' },
      { size: '50ml', price: 8400, flaconWeight: '460g Sculpted Crystal' },
      { size: '100ml', price: 12400, flaconWeight: '710g Monumental Crystal' }
    ],
    inspiration: 'The solar chambers of Karnak Temple at the summer solstice.',
    badge: 'Signature Masterpiece',
    accords: ['Golden Amber', 'Warm Spice', 'Resinous Balsam', 'Aged Woods']
  },
  {
    id: 'queen-of-the-nile',
    name: 'QUEEN OF THE NILE',
    subtitle: 'Parfum Royal',
    category: 'Floral & Sensual',
    notes: 'Rose, Jasmine, Vanilla',
    keyNotes: ['Damask Rose Absolue', 'Night-Blooming Jasmine', 'Madagascan Bourbon Vanilla', 'Lotus Nectar'],
    description: 'An elegant floral fragrance with a sensual, timeless character inspired by regal Egyptian queens and fragrant lotus pools.',
    longDescription:
      'Evoking Cleopatra’s aromatic barge drifting down the tranquil Nile at twilight. Hand-plucked Egyptian blue lotus blossoms meld seamlessly with lush Damascena rose absolute, veiled in velvet Madagascan bourbon vanilla and tender musk.',
    ritual:
      'Mist lightly across the chest and hair from a handspan away. The floral sillage trails in your wake like silk along marble corridors.',
    image: '/src/assets/images/perfume_queen_nile_1792302698548.jpg',
    pyramid: {
      top: ['Egyptian Blue Lotus', 'Calabrian Bergamot', 'Pink Pepper'],
      heart: ['Grasse Rose Absolue', 'Night Jasmine', 'Orris Butter'],
      base: ['Bourbon Vanilla Pod', 'Golden Musk', 'Sandalwood Silk']
    },
    sizes: [
      { size: '30ml', price: 5100, flaconWeight: '310g Cast Glass' },
      { size: '50ml', price: 7950, flaconWeight: '450g Sculpted Crystal' },
      { size: '100ml', price: 11900, flaconWeight: '690g Monumental Crystal' }
    ],
    inspiration: 'The private botanical sanctuaries of Alexandria and Queen Hatshepsut’s terraces.',
    badge: 'Royal Édition',
    accords: ['Opulent Floral', 'Powdery Iris', 'Warm Vanilla', 'Sensual Musk']
  },
  {
    id: 'temple-of-oud',
    name: 'TEMPLE OF OUD',
    subtitle: 'Extrait de Parfum',
    category: 'Woody & Mysterious',
    notes: 'Oud, Incense, Sandalwood',
    keyNotes: ['Smoked Frankincense', 'Sacred Sandalwood', 'Black Agarwood', 'Myrrh Tears'],
    description: 'A mysterious woody fragrance inspired by sacred temple rituals, stone sanctuaries, and eternal ceremonial offerings.',
    longDescription:
      'Stepping into the shadowed inner sanctum of Luxor after sunset. Ancient pillars infused with millennia of rare resin offerings, cold carved stone, and smoldering frankincense coalesce around a deep, majestic core of wild agarwood.',
    ritual:
      'Apply to inner forearms and behind ears. Perfect for evening ceremonies, contemplative twilight, and grand affairs.',
    image: '/src/assets/images/perfume_temple_oud_1792302699057.jpg',
    pyramid: {
      top: ['Green Omani Frankincense', 'Elemi Resin', 'Crushed Juniper'],
      heart: ['Smoky Myrrh', 'Cypriol Nagarmotha', 'Guaiac Wood'],
      base: ['Aged Wild Agarwood (Oud)', 'East Indian Sandalwood', 'Dark Vetiver']
    },
    sizes: [
      { size: '30ml', price: 5750, flaconWeight: '330g Cast Glass' },
      { size: '50ml', price: 9050, flaconWeight: '470g Sculpted Crystal' },
      { size: '100ml', price: 13500, flaconWeight: '730g Monumental Crystal' }
    ],
    inspiration: 'The deepest hypostyle hall of Medinet Habu illuminated by oil lamps.',
    badge: 'Sacred Ritual',
    accords: ['Smoky Incense', 'Sacred Wood', 'Earthy Resins', 'Dark Amber']
  },
  {
    id: 'black-obelisk',
    name: 'BLACK OBELISK',
    subtitle: 'Cologne Forte de Nuit',
    category: 'Woody & Mysterious',
    notes: 'Leather, Musk, Dark Woods',
    keyNotes: ['Cuir Ancien', 'Black Cedar', 'Castoreum Accord', 'Ebony Wood'],
    description: 'A bold, sophisticated fragrance with a deep and captivating finish, channeling the dark monolithic power of volcanic obsidian.',
    longDescription:
      'Chiseled from the void of black obsidian and midnight skies. A commanding convergence of burnished saddlery leather, smoked birch tar, midnight musk, and petrified ebony wood. Monolithic, architectural, and completely hypnotic.',
    ritual:
      'Spray once across the nape and once on the collar of tailored cashmere or linen. The fragrance leaves a commanding, unforgettable trail.',
    image: '/src/assets/images/perfume_black_obelisk_1792302700152.jpg',
    pyramid: {
      top: ['Black Pepper', 'Smoked Birch Bark', 'Cade Oil'],
      heart: ['Hand-rubbed Leather', 'Cacao Pod', 'Smoky Clove'],
      base: ['Volcanic Ebony', 'Midnight Musk', 'Sumatran Patchouli']
    },
    sizes: [
      { size: '30ml', price: 6200, flaconWeight: '340g Cast Glass' },
      { size: '50ml', price: 9700, flaconWeight: '490g Sculpted Crystal' },
      { size: '100ml', price: 14350, flaconWeight: '750g Monumental Crystal' }
    ],
    inspiration: 'The monolithic granite obelisks of Heliopolis standing against the starry desert cosmos.',
    badge: 'Limited Run',
    accords: ['Smoked Leather', 'Dark Ebony', 'Deep Musk', 'Volcanic Mineral']
  }
];

export interface CartItem {
  id: string;
  fragranceId: string;
  name: string;
  size: '30ml' | '50ml' | '100ml';
  price: number;
  quantity: number;
  image: string;
}

export const TEMPLE_STORY_IMAGE = '/src/assets/images/egyptian_temple_story_1792302700514.jpg';
