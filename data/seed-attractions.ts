/**
 * Attraction + accommodation seed records. All rows are tagged content_status='SEED'.
 * Coordinates resolved via OpenStreetMap (Nominatim) at build time.
 * Seeded accommodation listings are fictional development records: images are
 * labelled area illustrations (image_kind='AREA_ILLUSTRATION') and contact details
 * use the reserved .example domain so no real person or business is misrepresented.
 */

export interface SeedAttraction {
  slug: string;
  name: string;
  destination: string | null;
  region: string;
  nearest_town: string;
  summary: string;
  description: string[];
  image: string;
  lat: number;
  lng: number;
  geo_precision: "exact" | "approximate";
  hidden_gem?: boolean;
  featured?: boolean;
  categories: string[];
}

export const attractions: SeedAttraction[] = [
  {
    slug: "cape-coast-castle",
    name: "Cape Coast Castle",
    destination: "cape-coast",
    region: "Central",
    nearest_town: "Cape Coast",
    summary:
      "A UNESCO World Heritage castle above the Atlantic, and one of the most important sites of memory in the Atlantic world.",
    description: [
      "Built and repeatedly rebuilt by European traders from the seventeenth century, Cape Coast Castle became the administrative centre of British power on the Gold Coast. Its dungeons held enslaved Africans before they were forced through the Door of No Return onto ships.",
      "The guided tour is led by guides whose families live in the town, and it does not soften the history. Above the dungeons, the castle's chapel and governors' quarters show how close comfort and brutality were kept.",
    ],
    image: "/images/att-cape-coast-castle.jpg",
    lat: 5.1036,
    lng: -1.2411,
    geo_precision: "exact",
    featured: true,
    categories: ["heritage", "culture", "city"],
  },
  {
    slug: "elmina-castle",
    name: "Elmina Castle (St George's)",
    destination: "elmina",
    region: "Central",
    nearest_town: "Elmina",
    summary:
      "The oldest European building in sub-Saharan Africa, standing directly over Elmina's working fishing harbour.",
    description: [
      "Founded by the Portuguese in the late fifteenth century as a trading fort, São Jorge da Mina later passed to the Dutch and the British. Its whitewashed walls and courtyard now hold a museum and a guided tour that addresses the slave trade conducted through the castle.",
      "What makes Elmina distinctive is the life around it: canoes land on the beach below the walls, fish are smoked along the shore, and the harbour is as busy as it has been for centuries.",
    ],
    image: "/images/att-elmina-castle.jpg",
    lat: 5.0827,
    lng: -1.3482,
    geo_precision: "exact",
    featured: true,
    categories: ["heritage", "culture", "city"],
  },
  {
    slug: "kakum-national-park",
    name: "Kakum National Park",
    destination: "cape-coast",
    region: "Central",
    nearest_town: "Abrafo, near Cape Coast",
    summary:
      "Rainforest canopy walks on rope bridges suspended high above the forest floor.",
    description: [
      "Kakum protects a large area of moist tropical forest north of Cape Coast. Its canopy walkway — a series of rope and plank bridges strung between emergent trees — gives visitors a view of the forest normally reserved for birds and monkeys.",
      "Rangers lead walks along forest trails as well, and the early morning is the best time for birdlife and for cooler temperatures. The walkway is not suitable for those with a strong fear of heights, but the forest trails remain an option.",
    ],
    image: "/images/att-kakum.jpg",
    lat: 5.4421,
    lng: -1.348,
    geo_precision: "exact",
    featured: true,
    categories: ["nature", "adventure", "wildlife"],
  },
  {
    slug: "aburi-botanical-gardens",
    name: "Aburi Botanical Gardens",
    destination: "aburi",
    region: "Eastern",
    nearest_town: "Aburi",
    summary:
      "Nineteenth-century hill gardens with an avenue of towering palms and labelled tropical trees.",
    description: [
      "Laid out in the late nineteenth century, Aburi's gardens were established as a hill station and experimental ground for tropical plants. The great avenue of palms and the broad lawns are the centrepiece.",
      "Paths wind through collections of ornamental and economic trees, and the gardens are a good place to spend a slow morning before exploring the surrounding Akuapem hills.",
    ],
    image: "/images/att-aburi-gardens.jpg",
    lat: 5.8475,
    lng: -0.1753,
    geo_precision: "approximate",
    featured: true,
    categories: ["nature", "culture"],
  },
  {
    slug: "wli-waterfalls",
    name: "Wli (Agumatsa) Waterfalls",
    destination: "wli",
    region: "Volta",
    nearest_town: "Wli Afegame",
    summary:
      "A forest waterfall at the foot of the Agumatsa range, reached on foot through a bat-filled grove.",
    description: [
      "The lower falls at Wli drop off a cliff into a pool that is swimmable at normal water levels. The walk in crosses the Agumatsa river and passes trees where fruit bats hang in numbers.",
      "A steeper trail continues to the upper falls for those with the time and the legs. Guides from the village manage access and can explain the reserve's ecology.",
    ],
    image: "/images/att-wli-falls.jpg",
    lat: 7.126,
    lng: 0.591,
    geo_precision: "approximate",
    featured: true,
    categories: ["waterfalls", "nature", "adventure"],
  },
  {
    slug: "paga-crocodile-pond",
    name: "Paga Crocodile Pond",
    destination: "paga",
    region: "Upper East",
    nearest_town: "Paga",
    summary:
      "A community-protected pond where Nile crocodiles are considered sacred by local families.",
    description: [
      "The pond at Paga is home to a group of Nile crocodiles that have long been protected by the community. Guides introduce visitors to the animals and explain the beliefs that keep them safe.",
      "It is a small, informal site rather than a wildlife park, and the experience lasts under an hour — but it is one of the more unusual stops in northern Ghana.",
    ],
    image: "/images/att-paga-pond.jpg",
    lat: 10.9848,
    lng: -1.1089,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["wildlife", "culture"],
  },
  {
    slug: "larabanga-mosque",
    name: "Larabanga Mosque",
    destination: "mole-national-park",
    region: "Savannah",
    nearest_town: "Larabanga",
    summary:
      "A Sudanese-style mud-and-timber mosque, said to be one of the oldest in West Africa.",
    description: [
      "The mosque at Larabanga is built in the Sudano-Sahelian style, with tapered earthen walls, timber beams projecting from the facade and a distinctive whitewashed finish.",
      "It sits beside the road to Mole National Park and is closely linked to the village's history. Visitors should ask permission before approaching or photographing, and dress respectfully.",
    ],
    image: "/images/att-larabanga.jpg",
    lat: 9.2203,
    lng: -1.8599,
    geo_precision: "exact",
    featured: true,
    categories: ["heritage", "culture"],
  },
  {
    slug: "lake-bosumtwi-rim",
    name: "Lake Bosumtwi crater rim",
    destination: "lake-bosumtwi",
    region: "Ashanti",
    nearest_town: "Abono",
    summary:
      "Forest trails on the rim of a million-year-old crater lake, with views across the water.",
    description: [
      "Paths around the crater rim climb through farmland and forest to viewpoints over the lake. Several villages are linked by footpaths, and boats can be hired at Abono for crossings.",
      "The rim walk is a half-day undertaking rather than a technical hike, but the humidity is high and a local guide is worth having for directions and access.",
    ],
    image: "/images/att-bosumtwi-crater.jpg",
    lat: 6.506,
    lng: -1.4102,
    geo_precision: "approximate",
    categories: ["nature", "adventure"],
  },
  {
    slug: "jamestown-lighthouse",
    name: "Jamestown Lighthouse",
    destination: "accra",
    region: "Greater Accra",
    nearest_town: "Accra",
    summary:
      "The red-and-white lighthouse above Accra's old harbour, at the centre of the city's oldest quarter.",
    description: [
      "Jamestown's lighthouse rises above the fishing harbour and the streets of the old Ga settlement. The area around it holds colonial-era buildings, boxing gyms and some of the most photographed corners of Accra.",
      "Walk down towards the harbour and the beach to see the fishing fleet and the everyday bustle that makes the quarter worth an early start.",
    ],
    image: "/images/att-jamestown.jpg",
    lat: 5.5331,
    lng: -0.2121,
    geo_precision: "exact",
    featured: true,
    categories: ["heritage", "city", "culture"],
  },
  {
    slug: "black-star-gate",
    name: "Black Star Gate & Independence Square",
    destination: "accra",
    region: "Greater Accra",
    nearest_town: "Accra",
    summary:
      "The monument marking Ghana's independence, on the wide ceremonial square facing the sea.",
    description: [
      "Independence Square was laid out to mark Ghana's independence in 1957. The Black Star Gate, the memorial arches and the vast parade ground are used for national celebrations and are open to walk through.",
      "It is a short stop, but an important one for understanding the country's modern history — best combined with Jamestown and the nearby Kwame Nkrumah Memorial Park.",
    ],
    image: "/images/att-black-star.jpg",
    lat: 5.549,
    lng: -0.1929,
    geo_precision: "exact",
    categories: ["heritage", "city"],
  },
  {
    slug: "makola-market",
    name: "Makola Market",
    destination: "accra",
    region: "Greater Accra",
    nearest_town: "Accra",
    summary:
      "Accra's great trading heart, where cloth, food and household goods fill the streets around Kojo Thompson Road.",
    description: [
      "Makola is the commercial engine of central Accra, run largely by women traders. The market spills into the surrounding streets, with sections for cloth, beads, food, cookware and almost everything else.",
      "Go with a purpose, keep valuables close, and ask before taking photographs. Even a short visit gives a clearer sense of the city than any museum.",
    ],
    image: "/images/att-makola.jpg",
    lat: 5.5481,
    lng: -0.2069,
    geo_precision: "exact",
    categories: ["food", "city", "culture"],
  },
  {
    slug: "labadi-beach",
    name: "Labadi Beach",
    destination: "accra",
    region: "Greater Accra",
    nearest_town: "Accra",
    summary:
      "The capital's best-known beach, busy with football, food and music at weekends.",
    description: [
      "Labadi is the closest proper beach to central Accra, with a long stretch of sand, beach bars and plenty of activity. Weekends bring drumming, football and families, while weekdays are quieter.",
      "It is a working leisure beach rather than a resort, and the food stalls and music are a large part of the appeal.",
    ],
    image: "/images/att-labadi.jpg",
    lat: 5.5639,
    lng: -0.1406,
    geo_precision: "exact",
    categories: ["beaches", "food", "city"],
  },
  {
    slug: "manhyia-palace",
    name: "Manhyia Palace",
    destination: "kumasi",
    region: "Ashanti",
    nearest_town: "Kumasi",
    summary:
      "The seat of the Asantehene, with a museum tracing the history of the Asante kingdom.",
    description: [
      "Manhyia is the palace of the Asantehene, the traditional ruler of the Asante people. The museum in the old palace buildings displays regalia, photographs and objects connected to the kingdom's history, including the period of British annexation.",
      "The palace remains a working royal residence, so access and opening times can vary. Check locally before making the trip across the city.",
    ],
    image: "/images/att-manhyia.jpg",
    lat: 6.7038,
    lng: -1.6156,
    geo_precision: "exact",
    featured: true,
    categories: ["heritage", "culture", "city"],
  },
  {
    slug: "kejetia-market",
    name: "Kejetia Market",
    destination: "kumasi",
    region: "Ashanti",
    nearest_town: "Kumasi",
    summary:
      "One of West Africa's largest markets, rebuilt around a vast modern trading hall.",
    description: [
      "Kejetia is the commercial centre of Kumasi, with thousands of traders selling food, cloth, hardware and household goods. The modern hall replaced much of the older market but the surrounding streets remain just as busy.",
      "It is easy to lose your bearings. Go with a local guide or a specific purchase in mind, and expect to spend longer than planned.",
    ],
    image: "/images/att-kejetia.jpg",
    lat: 6.6958,
    lng: -1.621,
    geo_precision: "exact",
    categories: ["food", "city", "culture"],
  },
  {
    slug: "boabeng-fiema",
    name: "Boabeng-Fiema Monkey Sanctuary",
    destination: null,
    region: "Bono East",
    nearest_town: "Nkoranza",
    summary:
      "A forest sanctuary where mona and black-and-white colobus monkeys live alongside two villages.",
    description: [
      "Boabeng and Fiema are neighbouring villages that have protected the monkeys living in the surrounding forest for generations. Mona and black-and-white colobus monkeys move freely between the trees and the villages.",
      "Guides from the community lead walks along forest paths and explain the traditions that make the sanctuary work. It is a genuinely community-run site, and the forest is small enough to explore in a morning.",
    ],
    image: "/images/att-boabeng-fiema.jpg",
    lat: 7.758,
    lng: -1.7258,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["wildlife", "nature", "culture"],
  },
  {
    slug: "tafi-atome",
    name: "Tafi Atome Monkey Sanctuary",
    destination: null,
    region: "Volta",
    nearest_town: "Tafi Atome, near Hohoe",
    summary:
      "A community sanctuary where mona monkeys are considered sacred and tolerated close approach.",
    description: [
      "The monkey sanctuary at Tafi Atome began as a community conservation project and now protects a population of mona monkeys that move through the village and its forest. Guides explain how the sanctuary works and how the community benefits.",
      "It is a short visit, easily combined with Wli and Amedzofe in the Volta Region, and a good example of how local belief and conservation can support one another.",
    ],
    image: "/images/att-tafi-atome.jpg",
    lat: 6.906,
    lng: 0.3856,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["wildlife", "culture", "nature"],
  },
  {
    slug: "tongo-hills",
    name: "Tongo Hills & Tengzug Shrines",
    destination: null,
    region: "Upper East",
    nearest_town: "Tongo, near Bolgatanga",
    summary:
      "Granite hills, caves and shrines that remain central to Talensi religious life.",
    description: [
      "The Tongo Hills rise out of the Upper East plains in a cluster of granite outcrops, caves and narrow passages. The shrines at Tengzug are still actively used, and visits are made with a local guide who explains the protocols.",
      "The landscape is striking and the cultural context is essential to understanding it. Dress respectfully and expect to be asked not to enter certain areas.",
    ],
    image: "/images/att-tongo.jpg",
    lat: 10.6809,
    lng: -0.812,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["adventure", "culture", "heritage"],
  },
  {
    slug: "kintampo-waterfalls",
    name: "Kintampo Waterfalls",
    destination: null,
    region: "Bono East",
    nearest_town: "Kintampo",
    summary:
      "A three-tiered waterfall in forest, with a canopy walkway and pools below the falls.",
    description: [
      "Kintampo's falls drop in stages through forest north of the town, with a short walkway through the trees and paths down to the water. The setting is green and cool even in the hot season.",
      "It is a convenient stop on the road between Kumasi and the north, and rarely crowded on weekdays.",
    ],
    image: "/images/att-kintampo-falls.jpg",
    lat: 8.0896,
    lng: -1.698,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["waterfalls", "nature", "adventure"],
  },
  {
    slug: "boti-falls",
    name: "Boti Falls",
    destination: null,
    region: "Eastern",
    nearest_town: "Boti, near Koforidua",
    summary:
      "Twin falls in the Eastern Region, reached by a stepped path down into the forest.",
    description: [
      "Boti's two falls — known locally as male and female — drop into a pool surrounded by forest at the end of a long staircase. The site includes picnic areas and a rock formation that has become a local landmark.",
      "It is a popular weekend trip from Accra, best visited early before the coaches arrive.",
    ],
    image: "/images/att-boti-falls.jpg",
    lat: 6.1833,
    lng: -0.2167,
    geo_precision: "approximate",
    categories: ["waterfalls", "nature", "adventure"],
  },
  {
    slug: "nzulezu-stilt-village",
    name: "Nzulezo Stilt Village",
    destination: "nzulezu",
    region: "Western",
    nearest_town: "Beyin",
    summary:
      "A village built entirely on stilts above Lake Tadane, reached by canoe through the reeds.",
    description: [
      "Nzulezo's houses, walkways and school stand on wooden platforms above the lagoon. The canoe crossing from Beyin is part of the experience, passing open water and a channel cut through reeds.",
      "Visits are managed by the community, with local guides and an entry fee that supports the village. It is a living settlement, not a reconstruction, so ask before photographing people and their homes.",
    ],
    image: "/images/dest-nzulezu.jpg",
    lat: 5.021,
    lng: -2.598,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["culture", "heritage", "nature"],
  },
  {
    slug: "cape-three-points",
    name: "Cape Three Points",
    destination: "axim",
    region: "Western",
    nearest_town: "Near Axim",
    summary:
      "The southernmost tip of Ghana, with a lighthouse, rough surf and palms leaning over the water.",
    description: [
      "Cape Three Points marks the southern extremity of Ghana, where the coastline turns east towards Takoradi. The lighthouse and headland offer wide views of the Atlantic, and the beaches nearby are among the least developed in the country.",
      "The road in is rough and facilities are minimal. Bring what you need and arrange your transport back in advance.",
    ],
    image: "/images/att-cape-three-points.jpg",
    lat: 4.7398,
    lng: -2.0917,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["nature", "adventure", "beaches"],
  },
  {
    slug: "kyabobo-national-park",
    name: "Kyabobo National Park",
    destination: null,
    region: "Oti",
    nearest_town: "Nkwanta",
    summary:
      "Remote forest and savannah on the Togo border, with waterfalls and hill trails.",
    description: [
      "Kyabobo protects a remote block of forest and savannah along the Togo border, with hills, waterfalls and a quiet that is hard to find elsewhere in Ghana. Wildlife includes antelope, monkeys and a wide range of birds.",
      "Access is rough and infrastructure minimal; visits should be arranged in advance through the park office. This is a destination for travellers who are comfortable being a long way from services.",
    ],
    image: "/images/att-kyabobo.jpg",
    lat: 8.2812,
    lng: 0.5302,
    geo_precision: "exact",
    hidden_gem: true,
    categories: ["nature", "wildlife", "adventure", "waterfalls"],
  },
  {
    slug: "dodi-island",
    name: "Dodi Island",
    destination: "akosombo",
    region: "Eastern",
    nearest_town: "Akosombo",
    summary:
      "An island community on Lake Volta, reached by boat from the Akosombo shore.",
    description: [
      "Dodi Island sits in Lake Volta, reachable by boat from jetties near Akosombo. The island has a small community, guesthouses and quiet shoreline, and the crossing gives a sense of the reservoir's scale.",
      "Boats can be arranged locally or through lakeside hotels. Confirm return arrangements before setting out.",
    ],
    image: "/images/att-dodi-island.jpg",
    lat: 6.5574,
    lng: 0.1115,
    geo_precision: "approximate",
    hidden_gem: true,
    categories: ["nature", "adventure", "culture"],
  },
  {
    slug: "akosombo-dam-viewpoint",
    name: "Akosombo Dam",
    destination: "akosombo",
    region: "Eastern",
    nearest_town: "Akosombo",
    summary:
      "The hydroelectric dam that created Lake Volta, seen from the gorge above the river.",
    description: [
      "Completed in the 1960s, the dam at Akosombo reshaped the Volta River and created one of the largest reservoirs in the world by surface area. The gorge and spillway are visible from viewpoints around the town.",
      "The dam is a working national asset with security restrictions. Check current access arrangements rather than assuming a visitor tour is available.",
    ],
    image: "/images/att-akosombo-dam.jpg",
    lat: 6.2998,
    lng: 0.0593,
    geo_precision: "exact",
    categories: ["nature", "culture"],
  },
  {
    slug: "shai-hills-reserve",
    name: "Shai Hills Resource Reserve",
    destination: "shai-hills",
    region: "Greater Accra",
    nearest_town: "Doryumu",
    summary:
      "Savannah, inselbergs and caves within an hour of Accra, with guided walks and drives.",
    description: [
      "Shai Hills protects grassland, woodland and granite hills close to the capital. Baboons, monkeys and antelope are regularly seen, along with a wide range of birds.",
      "Rangers lead short walks to the caves and viewpoints. It is the most accessible taste of savannah from Accra and fits neatly into a day trip towards Ada Foah.",
    ],
    image: "/images/att-shai-hills.jpg",
    lat: 5.9056,
    lng: 0.0633,
    geo_precision: "exact",
    categories: ["wildlife", "nature", "adventure"],
  },
  {
    slug: "busua-beach",
    name: "Busua Beach",
    destination: "busua",
    region: "Western",
    nearest_town: "Busua",
    summary:
      "A wide, sheltered beach with surf schools and fishing canoes pulled up on the sand.",
    description: [
      "Busua's bay is broad enough to absorb a crowd and sheltered enough for swimming. Surf schools operate from the beach, and canoes land most mornings.",
      "The village behind the beach has guesthouses and beach bars, and the walk to Dixcove along the coast takes about an hour.",
    ],
    image: "/images/dest-busua.jpg",
    lat: 4.8067,
    lng: -1.9389,
    geo_precision: "approximate",
    categories: ["beaches", "food", "adventure"],
  },
  {
    slug: "ada-foah-estuary",
    name: "Ada Foah Estuary",
    destination: "ada-foah",
    region: "Greater Accra",
    nearest_town: "Ada Foah",
    summary:
      "The meeting point of the Volta River and the Atlantic, best seen by boat.",
    description: [
      "The estuary at Ada spreads into islands, sandbars and mangrove channels before reaching the sea. Boat trips run from the shore out to the sandbar where river and ocean meet.",
      "Birdlife is good along the quieter channels, and the beaches on the islands are often empty. Arrange boats through local operators or your lodge.",
    ],
    image: "/images/dest-ada-foah.jpg",
    lat: 5.7816,
    lng: 0.6332,
    geo_precision: "approximate",
    categories: ["nature", "beaches", "adventure"],
  },
  {
    slug: "amedzofe-mount-gemi",
    name: "Mount Gemi Trail",
    destination: "amedzofe",
    region: "Volta",
    nearest_town: "Amedzofe",
    summary:
      "A forest climb from Amedzofe to one of Ghana's highest peaks, with views into Togo on clear days.",
    description: [
      "The trail from Amedzofe climbs through farmland and forest to the summit of Mount Gemi, one of the highest points in Ghana. The walk takes a few hours at an easy pace and is best done with a local guide.",
      "Cloud can close in quickly. Start early, carry water and a waterproof layer, and enjoy the forest rather than chasing the view.",
    ],
    image: "/images/dest-amedzofe.jpg",
    lat: 6.8453,
    lng: 0.436,
    geo_precision: "approximate",
    hidden_gem: true,
    categories: ["adventure", "nature", "culture"],
  },
];

export interface SeedStay {
  slug: string;
  name: string;
  destination: string;
  type: "HOTEL" | "HOSTEL" | "APARTMENT";
  price: number;
  description: string;
  area: string;
  address: string;
  image: string;
  amenities: string[];
  status?: "APPROVED" | "PENDING" | "REJECTED";
  published?: boolean;
}

export const amenities = [
  { slug: "wifi", name: "Wi-Fi" },
  { slug: "breakfast", name: "Breakfast" },
  { slug: "air-conditioning", name: "Air conditioning" },
  { slug: "pool", name: "Swimming pool" },
  { slug: "restaurant", name: "Restaurant" },
  { slug: "parking", name: "Parking" },
  { slug: "kitchen", name: "Kitchen" },
  { slug: "laundry", name: "Laundry" },
  { slug: "bar", name: "Bar" },
  { slug: "tour-desk", name: "Tour desk" },
  { slug: "workspace", name: "Workspace" },
  { slug: "family-rooms", name: "Family rooms" },
  { slug: "security", name: "24-hour security" },
  { slug: "generator", name: "Backup power" },
  { slug: "airport-transfer", name: "Airport transfer" },
  { slug: "sea-view", name: "Sea view" },
];

export const stays: SeedStay[] = [
  {
    slug: "osu-garden-lodge",
    name: "Osu Garden Lodge",
    destination: "accra",
    type: "HOTEL",
    price: 620,
    description:
      "A small garden hotel in Osu, a short walk from the restaurants and galleries of the neighbourhood. Rooms open onto a courtyard, and the rooftop is used for breakfast.",
    area: "Osu, Accra",
    address: "Off Oxford Street, Osu",
    image: "/images/editorial-coast.jpg",
    amenities: ["wifi", "breakfast", "air-conditioning", "restaurant", "security", "workspace"],
  },
  {
    slug: "jamestown-backpackers",
    name: "Jamestown Backpackers",
    destination: "accra",
    type: "HOSTEL",
    price: 140,
    description:
      "A friendly hostel in the old quarter with dorms and a few private rooms. The common terrace looks over the harbour and the lighthouse is five minutes away.",
    area: "Jamestown, Accra",
    address: "Cleland Road, Jamestown",
    image: "/images/att-jamestown.jpg",
    amenities: ["wifi", "kitchen", "workspace", "laundry", "security"],
  },
  {
    slug: "labone-courtyard-apartments",
    name: "Labone Courtyard Apartments",
    destination: "accra",
    type: "APARTMENT",
    price: 480,
    description:
      "Serviced one- and two-bedroom apartments in a quiet residential street, with kitchens, a shared garden and weekly cleaning — suited to longer stays in the capital.",
    area: "Labone, Accra",
    address: "Labone Crescent",
    image: "/images/dest-accra.jpg",
    amenities: ["wifi", "kitchen", "air-conditioning", "parking", "laundry", "workspace", "generator"],
  },
  {
    slug: "castle-view-guesthouse",
    name: "Castle View Guesthouse",
    destination: "cape-coast",
    type: "HOTEL",
    price: 340,
    description:
      "A modest guesthouse on the ridge above Cape Coast with simple rooms, a terrace and views down to the castle and the sea.",
    area: "Cape Coast",
    address: "Near Victoria Park",
    image: "/images/dest-cape-coast.jpg",
    amenities: ["wifi", "breakfast", "air-conditioning", "parking", "security"],
  },
  {
    slug: "kakum-forest-camp",
    name: "Kakum Forest Camp",
    destination: "cape-coast",
    type: "HOSTEL",
    price: 120,
    description:
      "Basic forest-edge accommodation near the Kakum entrance, with shared facilities and an early start for the canopy walkway.",
    area: "Abrafo, near Cape Coast",
    address: "Kakum road, Abrafo",
    image: "/images/att-kakum.jpg",
    amenities: ["parking", "tour-desk", "restaurant", "security"],
  },
  {
    slug: "elmina-harbour-house",
    name: "Elmina Harbour House",
    destination: "elmina",
    type: "HOTEL",
    price: 420,
    description:
      "A restored merchant house facing the fishing harbour, with tall shuttered windows, a courtyard restaurant and direct access to the castle road.",
    area: "Elmina",
    address: "Harbour front, Elmina",
    image: "/images/dest-elmina.jpg",
    amenities: ["wifi", "breakfast", "restaurant", "air-conditioning", "bar", "sea-view"],
  },
  {
    slug: "asante-heritage-rooms",
    name: "Asante Heritage Rooms",
    destination: "kumasi",
    type: "HOTEL",
    price: 450,
    description:
      "Comfortable rooms in a quiet corner of central Kumasi, decorated with locally woven cloth and within walking distance of Kejetia.",
    area: "Adum, Kumasi",
    address: "Off Prempeh II Street",
    image: "/images/dest-kumasi.jpg",
    amenities: ["wifi", "breakfast", "air-conditioning", "restaurant", "parking", "security"],
  },
  {
    slug: "bonwire-weavers-apartment",
    name: "Bonwire Weavers' Apartment",
    destination: "kumasi",
    type: "APARTMENT",
    price: 260,
    description:
      "A two-bedroom apartment attached to a family weaving workshop outside Kumasi, with a kitchen and a chance to see kente being made.",
    area: "Bonwire, Ashanti",
    address: "Bonwire craft road",
    image: "/images/editorial-kente.jpg",
    amenities: ["wifi", "kitchen", "parking", "tour-desk", "family-rooms"],
  },
  {
    slug: "hillcrest-aburi-retreat",
    name: "Hillcrest Aburi Retreat",
    destination: "aburi",
    type: "HOTEL",
    price: 380,
    description:
      "Cool-weather rooms on the Akuapem ridge with a garden, a fire in the evenings and a short walk to the botanical gardens.",
    area: "Aburi, Eastern Region",
    address: "Aburi ridge road",
    image: "/images/dest-aburi.jpg",
    amenities: ["wifi", "breakfast", "restaurant", "parking", "family-rooms", "generator"],
  },
  {
    slug: "mole-savannah-lodge",
    name: "Mole Savannah Lodge",
    destination: "mole-national-park",
    type: "HOTEL",
    price: 520,
    description:
      "A lodge on the escarpment above the Mole river, with a terrace for watching elephants and easy access to the walking-safari meeting point.",
    area: "Mole National Park",
    address: "Mole park road",
    image: "/images/dest-mole.jpg",
    amenities: ["restaurant", "bar", "pool", "parking", "tour-desk", "generator", "family-rooms"],
  },
  {
    slug: "busua-surf-camp",
    name: "Busua Surf Camp",
    destination: "busua",
    type: "HOSTEL",
    price: 160,
    description:
      "Beachfront rooms and dorms with surfboards for hire, an outdoor kitchen and hammocks facing the water.",
    area: "Busua, Western Region",
    address: "Beachfront, Busua",
    image: "/images/dest-busua.jpg",
    amenities: ["wifi", "kitchen", "bar", "tour-desk", "sea-view"],
  },
  {
    slug: "ada-riverside-cabins",
    name: "Ada Riverside Cabins",
    destination: "ada-foah",
    type: "APARTMENT",
    price: 300,
    description:
      "Simple self-catering cabins on the estuary with wooden decks over the water and boat trips arranged at the jetty.",
    area: "Ada Foah, Greater Accra",
    address: "Estuary road, Ada Foah",
    image: "/images/dest-ada-foah.jpg",
    amenities: ["kitchen", "parking", "tour-desk", "sea-view", "family-rooms"],
  },
  {
    slug: "wli-forest-guesthouse",
    name: "Wli Forest Guesthouse",
    destination: "wli",
    type: "HOSTEL",
    price: 150,
    description:
      "A community guesthouse at the trailhead for the falls, with simple rooms, a shared kitchen and guides available at the gate.",
    area: "Wli Afegame, Volta",
    address: "Wli Afegame",
    image: "/images/dest-wli.jpg",
    amenities: ["wifi", "kitchen", "parking", "tour-desk"],
  },
  {
    slug: "dixcove-fort-view",
    name: "Dixcove Fort View Rooms",
    destination: "busua",
    type: "HOTEL",
    price: 290,
    description:
      "Rooms on the headland above Dixcove harbour with sea views, a small restaurant and access to one of the quietest beaches on the western coast.",
    area: "Dixcove, Western Region",
    address: "Dixcove headland",
    image: "/images/editorial-coast.jpg",
    amenities: ["breakfast", "restaurant", "air-conditioning", "sea-view", "parking"],
  },
  {
    slug: "akosombo-lakeview-hotel",
    name: "Akosombo Lakeview Hotel",
    destination: "akosombo",
    type: "HOTEL",
    price: 700,
    description:
      "A lakeside hotel with a pool, a terrace over the water and boat transfers to Dodi Island arranged at reception.",
    area: "Akosombo, Eastern Region",
    address: "Lake road, Akosombo",
    image: "/images/editorial-lake.jpg",
    amenities: ["wifi", "pool", "restaurant", "bar", "parking", "tour-desk", "airport-transfer"],
    status: "PENDING",
    published: false,
  },
  {
    slug: "keta-lagoon-lodge",
    name: "Keta Lagoon Lodge",
    destination: "keta",
    type: "APARTMENT",
    price: 260,
    description:
      "Two self-contained units between the sea and the lagoon, with kitchenettes and bicycles for exploring the town.",
    area: "Keta, Volta",
    address: "Lagoon side, Keta",
    image: "/images/editorial-lake.jpg",
    amenities: ["kitchen", "wifi", "parking", "family-rooms"],
    status: "PENDING",
    published: false,
  },
];
