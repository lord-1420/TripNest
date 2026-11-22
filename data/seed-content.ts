/**
 * TripNest development seed content.
 *
 * IMPORTANT: every record created here is tagged content_status = 'SEED'.
 * Editorial copy was written for the development build and is explicitly marked
 * as unverified in the admin console and in the site footer. Records only become
 * 'VERIFIED' when an administrator confirms them after editorial review.
 *
 * Geography: every coordinate in this file was resolved through OpenStreetMap
 * (Nominatim) during the build and is stored with its source precision.
 * Photography: Wikimedia Commons, with licence + author stored per image in
 * public/image-credits.json and rendered on /credits.
 */

export interface SeedCategory {
  slug: string;
  name: string;
  kind: "DESTINATION" | "ATTRACTION" | "BOTH";
  description: string;
  image: string;
}

export const categories: SeedCategory[] = [
  { slug: "beaches", name: "Beaches", kind: "BOTH", description: "Atlantic surf, palm-lined sand and estuary retreats.", image: "/images/editorial-coast.jpg" },
  { slug: "nature", name: "Nature", kind: "BOTH", description: "Forest reserves, crater lakes and open savannah.", image: "/images/editorial-forest.jpg" },
  { slug: "culture", name: "Culture", kind: "BOTH", description: "Living traditions, craft and community life.", image: "/images/editorial-culture.jpg" },
  { slug: "heritage", name: "Heritage", kind: "BOTH", description: "Forts, castles and places that carry difficult histories.", image: "/images/att-elmina-castle.jpg" },
  { slug: "adventure", name: "Adventure", kind: "BOTH", description: "Canopy walks, hill climbs and river crossings.", image: "/images/att-kakum.jpg" },
  { slug: "waterfalls", name: "Waterfalls", kind: "BOTH", description: "Forest cascades reached on foot.", image: "/images/att-wli-falls.jpg" },
  { slug: "wildlife", name: "Wildlife", kind: "BOTH", description: "Elephants, monkeys and reserve wildlife.", image: "/images/dest-mole.jpg" },
  { slug: "city", name: "City experiences", kind: "BOTH", description: "Markets, museums, music and street food.", image: "/images/att-jamestown.jpg" },
  { slug: "food", name: "Food & local life", kind: "BOTH", description: "Chop bars, markets and regional cooking.", image: "/images/editorial-food.jpg" },
];

export interface SeedDestination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  summary: string;
  description: string[];
  hero_image: string;
  lat: number;
  lng: number;
  geo_precision: "exact" | "approximate";
  best_time: string;
  getting_there: string;
  getting_around: string;
  categories: string[];
  featured?: boolean;
  gallery: { url: string; alt: string; caption?: string }[];
  tips: { title: string; body: string }[];
  checklist: string[];
}

export const destinations: SeedDestination[] = [
  {
    slug: "accra",
    name: "Accra",
    region: "Greater Accra",
    tagline: "Atlantic surf, a restless creative scene and the best street food in the south.",
    summary:
      "Ghana's capital balances colonial-era forts, a confident contemporary arts scene and long Atlantic beaches with the everyday rhythm of West African city life.",
    description: [
      "Accra grew from Ga fishing settlements around Jamestown and Usshertown into a capital of wide avenues, low-rise neighbourhoods and an increasingly confident design and music scene. The old quarter is still the most atmospheric corner of the city: the lighthouse, the harbour below it and the boxing gyms of Bukom sit within a few minutes' walk of each other.",
      "The city wears its history lightly in places and directly in others. Independence Square and the Black Star Gate mark the country's 1957 independence, while the forts along the coast carry a much heavier story. Between those poles sits the Accra most visitors remember: Makola Market, the Kenkey sellers at dawn, gallery openings in Osu, and highlife drifting out of bars in the evening.",
      "For travellers, Accra works best as a base and a first impression. Spend a day in the centre and on the coast, then use the city's road links to head west towards Cape Coast and Elmina, or north towards Aburi and the Eastern Region hills.",
    ],
    hero_image: "/images/dest-accra.jpg",
    lat: 5.5571,
    lng: -0.2012,
    geo_precision: "exact",
    best_time:
      "The southern coast is most comfortable in the drier months, roughly November to March, when humidity eases and the skies are clearer. The heaviest rains usually arrive between May and June, with a shorter wet spell around September and October.",
    getting_there:
      "Kotoka International Airport (ACC) sits a short drive from the central districts and is the main arrival point for international visitors. Road links connect Accra with Cape Coast, Kumasi, Ho and the Volta Region.",
    getting_around:
      "Ride-hailing apps and metered taxis are the simplest way to move around the central districts. Trotros — shared minibuses — cover the city cheaply and are part of the experience, though routes take a little learning.",
    categories: ["city", "food", "beaches", "heritage"],
    featured: true,
    gallery: [
      { url: "/images/att-jamestown.jpg", alt: "The red and white Jamestown Lighthouse standing above the Accra coast", caption: "Jamestown Lighthouse" },
      { url: "/images/att-makola.jpg", alt: "The busy entrance to Makola Market in central Accra", caption: "Makola Market" },
      { url: "/images/att-labadi.jpg", alt: "People walking along the sand at Labadi Beach, Accra", caption: "Labadi Beach" },
    ],
    tips: [
      { title: "Start in the old city", body: "Jamestown and Usshertown reward an early start, when the harbour, the fish market and the streets around the lighthouse are at their busiest and most photogenic." },
      { title: "Cash still matters", body: "Cards work in hotels and larger restaurants, but markets, trotros and smaller chop bars usually expect cash. Withdraw in larger amounts rather than relying on street ATMs." },
      { title: "Plan around traffic", body: "Central Accra slows considerably at the start and end of the working day. Group nearby stops together rather than crossing the city twice." },
    ],
    checklist: [
      "Lightweight clothing and a hat for the coastal heat",
      "Cash in Ghana cedis for markets and transport",
      "A charger and power bank for long days out",
      "Comfortable shoes for walking the old quarter",
      "Refillable water bottle",
      "A light layer for air-conditioned interiors",
    ],
  },
  {
    slug: "cape-coast",
    name: "Cape Coast",
    region: "Central",
    tagline: "A coastal university town built around one of the world's most consequential castles.",
    summary:
      "Cape Coast pairs a whitewashed hilltop castle with a compact colonial street plan, a lively student population and easy access to Kakum's rainforest canopy.",
    description: [
      "Cape Coast was the administrative centre of the British Gold Coast and the capital of the colony until 1877. The castle that dominates the town was one of the most important nodes in the transatlantic slave trade, and it is now a UNESCO World Heritage site and a place of remembrance visited by people from across the diaspora.",
      "The town itself is walkable and pleasant in a way that few Ghanaian cities are: a grid of old merchant houses, churches and school buildings climbing away from the sea, with the castle at the centre. Fante culture, a strong educational tradition and a steady stream of students give it an energy that is different from Accra's.",
      "Most travellers use Cape Coast as a base for two days: the castle and the town on one day, Kakum National Park and the beaches west towards Elmina on the other. The annual Fetu Afahye festival fills the streets with durbar and drumming.",
    ],
    hero_image: "/images/dest-cape-coast.jpg",
    lat: 5.1081,
    lng: -1.2417,
    geo_precision: "exact",
    best_time:
      "The Central Region is wettest between May and July, when forest downpours are frequent. The drier months from November through February are the easiest for castle visits and canopy walks.",
    getting_there:
      "Cape Coast lies west of Accra on the coastal road, with regular intercity buses and shared vehicles from the capital. Kakum National Park is reached by road from the town.",
    getting_around:
      "The historic centre and castle are easily covered on foot. Taxis and shared vehicles connect the town with Kakum, Elmina and the surrounding beaches.",
    categories: ["heritage", "culture", "city", "nature"],
    featured: true,
    gallery: [
      { url: "/images/att-cape-coast-castle.jpg", alt: "The courtyard of Cape Coast Castle with its weathered white walls", caption: "Inside Cape Coast Castle" },
      { url: "/images/att-kakum.jpg", alt: "The rope and plank canopy walkway suspended above Kakum rainforest", caption: "Kakum canopy walkway" },
      { url: "/images/dest-elmina.jpg", alt: "Elmina Castle seen from the shoreline west of Cape Coast", caption: "Elmina, a short drive west" },
    ],
    tips: [
      { title: "Give the castle time", body: "The guided tour through the castle takes in the dungeons and the Door of No Return. Many visitors prefer to go in the morning and leave the rest of the day unplanned." },
      { title: "Walk the old town", body: "The streets between the castle and the market hold merchant houses, churches and small museums that most day-trippers miss entirely." },
      { title: "Combine with Kakum early", body: "Canopy walks are cooler and quieter in the morning, and rainforest cloud often builds through the afternoon." },
    ],
    checklist: [
      "Modest, comfortable clothing for the castle visit",
      "Insect repellent for Kakum and the coast",
      "Cash for entry fees and guides",
      "A light rain layer between May and July",
      "Time set aside for reflection at the castle",
      "Water and snacks for the canopy walk",
    ],
  },
  {
    slug: "elmina",
    name: "Elmina",
    region: "Central",
    tagline: "A fishing town where a fifteenth-century castle meets a working harbour.",
    summary:
      "Elmina's St George's Castle — the oldest European building in sub-Saharan Africa — sits beside one of Ghana's most active fishing harbours and a coast that still runs on the sea.",
    description: [
      "Elmina began as a Ga fishing settlement and became the site of São Jorge da Mina, built by the Portuguese in the late fifteenth century. Later held by the Dutch and then the British, the castle stands directly over the harbour, its whitewashed walls visible from far along the coast.",
      "The town below it is not a museum piece. Canoes come in through the surf, fish are smoked and sold along the shore, and the streets behind the harbour are busy from first light. That contrast — monumental history and ordinary working life in the same few hundred metres — is what makes Elmina worth more than a quick stop.",
      "The castle's museum and guided tours explain the trade in gold, then in enslaved people, that passed through this coast. Fort St Jago on the hill above gives the best view of the whole harbour and is a short climb from the town centre.",
    ],
    hero_image: "/images/dest-elmina.jpg",
    lat: 5.0827,
    lng: -1.3482,
    geo_precision: "exact",
    best_time:
      "The coastal dry season from November to March brings the clearest light and the most comfortable walking conditions. Expect heavy showers between May and July.",
    getting_there:
      "Elmina is a short drive west of Cape Coast along the coastal road, reachable by taxi, shared vehicle or intercity bus. Accra is further east along the same corridor.",
    getting_around:
      "The castle, harbour and town centre are within walking distance of each other. Local taxis cover the beaches and Fort St Jago, and boats can be arranged at the harbour for trips on the lagoon.",
    categories: ["heritage", "culture", "beaches", "food"],
    featured: true,
    gallery: [
      { url: "/images/att-elmina-castle.jpg", alt: "The whitewashed facade and staircase of Elmina Castle", caption: "St George's Castle" },
      { url: "/images/editorial-coast.jpg", alt: "A palm-thatched shelter on a Ghanaian beach at Elmina", caption: "The coast around Elmina" },
      { url: "/images/dest-cape-coast.jpg", alt: "Cape Coast Castle, a short drive east of Elmina", caption: "Cape Coast, a short drive east" },
    ],
    tips: [
      { title: "Go down to the harbour", body: "The working fishing harbour is the heart of the town. Early morning is when the canoes land and the fish market is at its liveliest." },
      { title: "Climb to Fort St Jago", body: "The small fort on the ridge above town gives the clearest view of the castle, the harbour and the coastline in both directions." },
      { title: "Eat where the boats come in", body: "The fish served in Elmina is as fresh as it gets in Ghana. Small chop bars near the shore are usually the best value." },
    ],
    checklist: [
      "Cash for castle entry and local guides",
      "Shoes suitable for walking on uneven harbour ground",
      "A hat and sun protection",
      "Permission before photographing people at work",
      "Time for the castle museum as well as the tour",
      "A light layer for the evening sea breeze",
    ],
  },
  {
    slug: "kumasi",
    name: "Kumasi",
    region: "Ashanti",
    tagline: "The seat of Asante culture, built around the largest market in West Africa.",
    summary:
      "Kumasi is the capital of the Ashanti Region and the centre of Asante identity — a city of goldsmiths, kente weavers, royal history and the vast Kejetia market.",
    description: [
      "Kumasi grew around the Asantehene's court and remains the cultural heart of the Asante people. Manhyia Palace, the seat of the traditional ruler, and the surrounding museums explain a kingdom that resisted colonial expansion longer than most in the region.",
      "The city's commercial life is centred on Kejetia, an enormous market where cloth, food, hardware and almost anything else can be found. Nearby craft villages specialise: weaving at Bonwire, adinkra cloth printing at Ntonso, wood carving at Ahwiaa. These are working places rather than staged experiences, which is what makes them interesting.",
      "Kumasi is a useful northern hinge for a southern Ghana itinerary — closer to the savannah than the coast, and the natural stop between Accra and Mole National Park.",
    ],
    hero_image: "/images/dest-kumasi.jpg",
    lat: 6.6986,
    lng: -1.6233,
    geo_precision: "exact",
    best_time:
      "Kumasi sits in the forest belt and can be humid year-round. November to March is generally the driest period; the main rains fall between March and July.",
    getting_there:
      "Kumasi has an airport and is connected to Accra by a major trunk road, as well as by intercity buses and shared vehicles. The city is also the usual stopover on the road north towards Mole National Park.",
    getting_around:
      "Taxis and ride-hailing are the easiest way around the central districts. Shared minibuses reach the craft villages and outer neighbourhoods; a driver for a half-day is a practical option for visiting several workshops.",
    categories: ["culture", "heritage", "city", "food"],
    featured: true,
    gallery: [
      { url: "/images/att-kejetia.jpg", alt: "The modern covered hall of Kejetia Market in Kumasi", caption: "Kejetia Market" },
      { url: "/images/att-manhyia.jpg", alt: "Inside Manhyia Palace, the seat of the Asantehene in Kumasi", caption: "Manhyia Palace" },
      { url: "/images/editorial-kente.jpg", alt: "Bolts of brightly patterned kente and wax print cloth for sale", caption: "Cloth in the market" },
    ],
    tips: [
      { title: "Buy cloth where it is made", body: "Kente from Bonwire and adinkra from Ntonso cost less and mean more than anything bought in a city shop. Ask your driver to build a workshop loop." },
      { title: "Kejetia needs a guide", body: "The market is vast and easy to get disoriented in. Going with someone local, or with a specific purchase in mind, makes it far more enjoyable." },
      { title: "Check palace visiting days", body: "Manhyia Palace museum hours and access vary. Confirm locally before travelling across the city for it." },
    ],
    checklist: [
      "Cash for market purchases and workshop visits",
      "A bag for cloth, carvings or pottery",
      "Comfortable shoes for market walking",
      "Bargaining patience — start friendly, not low",
      "A driver's number for the day",
      "Sun protection for outdoor craft visits",
    ],
  },
  {
    slug: "aburi",
    name: "Aburi",
    region: "Eastern",
    tagline: "Cool hill air, a botanical garden and a weekend escape from the city.",
    summary:
      "Aburi sits in the hills north of Accra, where the temperature drops, the botanical gardens are shaded by enormous palms, and the road up is lined with craft stalls.",
    description: [
      "Aburi has been a retreat from Accra's heat since the colonial period. The town is built along a ridge in the Akuapem hills, with views down towards the coastal plain and a noticeably cooler climate than the city below.",
      "Aburi Botanical Gardens, laid out in the nineteenth century, is the main draw: broad lawns, an avenue of towering palms and a collection of tropical trees labelled for visitors. The gardens are quiet on weekdays and popular with families at weekends.",
      "The surrounding Akuapem hills hold hiking trails, small waterfalls and villages known for bead-making and woodcarving. Aburi works well as a day trip from Accra or as an overnight stop before continuing to Koforidua or the Volta Region.",
    ],
    hero_image: "/images/dest-aburi.jpg",
    lat: 5.8475,
    lng: -0.1753,
    geo_precision: "exact",
    best_time:
      "The hills are pleasant year-round and offer relief from coastal humidity. The drier months from November to February give the clearest views; the area is greener and wetter from May to July.",
    getting_there:
      "Aburi is reached by road from Accra, climbing into the Akuapem hills. Shared taxis and minibuses run from the city's eastern transport terminals, and a private car is the most flexible option.",
    getting_around:
      "The botanical gardens and town centre are walkable. Local taxis reach the surrounding villages and trails; walking between them is possible but hilly.",
    categories: ["nature", "culture", "adventure"],
    gallery: [
      { url: "/images/att-aburi-gardens.jpg", alt: "Tall palms and open lawn in Aburi Botanical Gardens", caption: "Aburi Botanical Gardens" },
      { url: "/images/editorial-forest.jpg", alt: "Dense green forest canopy in the Eastern Region hills", caption: "Forest in the hills" },
      { url: "/images/editorial-craft.jpg", alt: "Wooden crafts and household goods displayed at a Ghanaian market", caption: "Craft stalls on the ridge" },
    ],
    tips: [
      { title: "Bring a layer", body: "The ridge is meaningfully cooler than Accra, especially in the early morning and after rain. A light jacket is worth carrying." },
      { title: "Combine with the bead villages", body: "Craft villages around the Akuapem ridge make a natural half-day extension to the botanical gardens." },
      { title: "Go on a weekday if you can", body: "The gardens and the ridge road are busiest at weekends, when Accra empties into the hills." },
    ],
    checklist: [
      "A light jacket for the cooler air",
      "Walking shoes for garden paths and hills",
      "Cash for entry fees and craft stalls",
      "Insect repellent if walking trails",
      "A camera for the ridge views",
      "Water — the climb is dry work",
    ],
  },
  {
    slug: "mole-national-park",
    name: "Mole National Park",
    region: "Savannah",
    tagline: "Ghana's largest protected area, where elephants walk through open savannah.",
    summary:
      "Mole is Ghana's biggest and best-known national park: 4,000 square kilometres of savannah and woodland where elephants, antelope and over 300 bird species live on an escarpment above the Mole river.",
    description: [
      "Mole National Park covers a broad swathe of northern savannah, with a ridge above the Mole river that gives walking safaris their best viewpoints. It is the most reliable place in Ghana to see elephants, which are accustomed to visitors on foot and at a distance.",
      "The park is also a landscape of human history: old caravan routes crossed this country, and the villages around its edges — Larabanga, Mognori, Murugu — have their own traditions, architecture and crafts. Community tourism programmes in Mognori and Larabanga let visitors spend time in those villages rather than only in a vehicle.",
      "Because Mole sits in the north, it is a committed journey from the coast — usually via Kumasi or Tamale. The reward is a part of Ghana that feels completely different from the coast: wide skies, dry-season dust, and wildlife that is genuinely wild.",
    ],
    hero_image: "/images/dest-mole.jpg",
    lat: 9.6569,
    lng: -1.8674,
    geo_precision: "exact",
    best_time:
      "The dry season, roughly November to April, is when animals concentrate near water and vegetation is thinner, making wildlife easier to see. By the end of the dry season the heat is intense; the wetter months from June bring green landscapes and fewer visitors.",
    getting_there:
      "Mole is usually reached by road from Tamale or Damongo, with the final stretch on laterite and gravel. Most visitors arrange a vehicle with a driver for the journey and the park itself.",
    getting_around:
      "Walking safaris with park rangers and vehicle safaris are the two ways to explore; both are arranged at the park. A vehicle is essential for getting between the gate, the lodge and the surrounding villages.",
    categories: ["wildlife", "nature", "adventure", "culture"],
    featured: true,
    gallery: [
      { url: "/images/att-larabanga.jpg", alt: "The whitewashed Sudano-Sahelian towers of Larabanga Mosque", caption: "Larabanga Mosque near the park gate" },
      { url: "/images/editorial-forest.jpg", alt: "Woodland and savannah vegetation in northern Ghana", caption: "Savannah woodland" },
      { url: "/images/dest-mole.jpg", alt: "An elephant walking across dry savannah grass in Mole National Park", caption: "Elephants on the escarpment" },
    ],
    tips: [
      { title: "Walk with a ranger", body: "Walking safaris are the reason to come to Mole. Rangers read the landscape and keep distances safe; follow their instructions on noise and movement." },
      { title: "Take the long road seriously", body: "The drive north is long and the last section is rough. Build in daylight hours and carry water rather than trying to rush the journey." },
      { title: "Spend a night in a village", body: "Community tourism in Larabanga and Mognori supports local families and gives a much fuller picture of the region than the park gate alone." },
    ],
    checklist: [
      "Neutral-coloured clothing for walking safaris",
      "Binoculars and a zoom lens",
      "Sun hat, high-factor sunscreen and long sleeves",
      "Plenty of drinking water",
      "Malaria precautions for the north",
      "Cash — card acceptance is limited",
    ],
  },
  {
    slug: "lake-bosumtwi",
    name: "Lake Bosumtwi",
    region: "Ashanti",
    tagline: "A meteorite crater lake ringed by hills and fishing villages.",
    summary:
      "Lake Bosumtwi fills an ancient impact crater south-east of Kumasi — a near-circular lake where fishing villages sit between steep forested hills.",
    description: [
      "Lake Bosumtwi formed in a crater roughly a million years ago, and at around eight kilometres across it is one of the largest natural lakes in West Africa. The Ashanti consider it sacred; traditionally only wooden pads were used for fishing, and the lake still has a quiet, enclosed atmosphere.",
      "Villages ring the shoreline — Abono is the largest and most accessible — with guesthouses, small restaurants and boats that take visitors across the water. The surrounding hills offer short walks with views over the crater rim.",
      "Because it is close to Kumasi, Bosumtwi makes an easy overnight or day trip from the city. It is a place to slow down rather than tick off: swim, eat fresh tilapia by the water and watch the light change on the hills.",
    ],
    hero_image: "/images/dest-bosumtwi.jpg",
    lat: 6.5060,
    lng: -1.4102,
    geo_precision: "exact",
    best_time:
      "The lake is green and lush through the rainy season and drier with clearer skies from November to February. Weekends are busier with visitors from Kumasi.",
    getting_there:
      "The lake lies south-east of Kumasi, reached by road via the Bosomtwe district. Shared taxis and private cars run from Kumasi; the final approach descends steeply to the shoreline.",
    getting_around:
      "Villages around the lake are connected by footpaths and by boat. Local boatmen offer crossings and short trips; walking between villages takes time but is the best way to see the shoreline.",
    categories: ["nature", "adventure", "culture"],
    gallery: [
      { url: "/images/att-bosumtwi-crater.jpg", alt: "Satellite view of the near-circular Bosumtwi crater lake", caption: "The crater seen from orbit" },
      { url: "/images/dest-bosumtwi.jpg", alt: "The shoreline of Lake Bosumtwi with hills behind", caption: "Shoreline at Abono" },
      { url: "/images/editorial-forest.jpg", alt: "Forested hills surrounding the lake", caption: "The crater rim" },
    ],
    tips: [
      { title: "Respect local custom", body: "The lake is sacred to many Ashanti communities. Ask before swimming in areas used for ritual, and follow guidance from your hosts about where to go." },
      { title: "Eat by the water", body: "Tilapia from the lake, grilled at a shoreline spot, is the local speciality and one of the simplest pleasures of a visit." },
      { title: "Stay overnight", body: "Day trips from Kumasi are possible, but the lake is at its best in the early morning and at sunset, when the hills go quiet." },
    ],
    checklist: [
      "Swimwear and a towel",
      "Cash for boats and meals",
      "Insect repellent for the evening",
      "Shoes with grip for the descent to the shore",
      "A jacket for cool evenings on the water",
      "Respectful clothing for village visits",
    ],
  },
  {
    slug: "busua",
    name: "Busua",
    region: "Western",
    tagline: "Warm water, surf lessons and the friendliest beach village on the western coast.",
    summary:
      "Busua is a fishing village turned relaxed beach stop, with a wide crescent of sand, surf schools and a short boat ride to the quieter Dixcove coastline.",
    description: [
      "Busua's beach curves for the better part of a kilometre, sheltered enough for swimming and with enough swell for beginners' surf lessons. It has become the most sociable stop on Ghana's western coast: small guesthouses and beach bars, a handful of surf schools, and a fishing community that still launches canoes from the same sand.",
      "Nearby Dixcove has a small English fort on a headland and a working harbour, while the coast westwards towards Axim and Cape Three Points becomes progressively quieter and more dramatic. The water here is warm year-round.",
      "Busua is not a resort strip. It is a village that has absorbed tourism without losing its own rhythm, which makes it a good place to spend a few unplanned days.",
    ],
    hero_image: "/images/dest-busua.jpg",
    lat: 4.8067,
    lng: -1.9389,
    geo_precision: "exact",
    best_time:
      "The western coast is most reliable for beach days in the drier months from November to March. Surf is generally best when swell picks up, and afternoon showers are common during the wet season.",
    getting_there:
      "Busua is reached by road from Takoradi and Agona Nkwanta in the Western Region, with shared taxis and trotros covering the final stretch. Travelling from Accra or Cape Coast takes most of a day.",
    getting_around:
      "The village and beach are walkable. Taxis connect Busua with Dixcove and the coast road; boats can be arranged for fishing trips or to reach beaches further along.",
    categories: ["beaches", "food", "adventure", "culture"],
    gallery: [
      { url: "/images/editorial-coast.jpg", alt: "Thatched beach shelter and palms on the Ghanaian coast", caption: "Beach shelters in Busua" },
      { url: "/images/dest-busua.jpg", alt: "The curve of Busua beach with palms behind the sand", caption: "Busua bay" },
      { url: "/images/editorial-food.jpg", alt: "A bowl of Ghanaian kenkey with fried fish and pepper", caption: "Beachside food" },
    ],
    tips: [
      { title: "Learn to surf here", body: "Busua's gentle beach break and several small surf schools make it the most approachable place in Ghana to try surfing for the first time." },
      { title: "Walk to Dixcove", body: "The headland fort and harbour at Dixcove are a manageable walk or short taxi ride along the coast and worth the trip." },
      { title: "Buy from the boats", body: "Fishing canoes land on the beach most mornings. Ask about buying fish directly and having it grilled nearby." },
    ],
    checklist: [
      "Reef-safe sunscreen",
      "Swimwear and a quick-dry towel",
      "Cash for surf hire and beach food",
      "A torch for unlit paths after dark",
      "Mosquito repellent for evenings",
      "A relaxed plan — things move slowly here",
    ],
  },
  {
    slug: "ada-foah",
    name: "Ada Foah",
    region: "Greater Accra",
    tagline: "Where the Volta River meets the Atlantic, in a maze of islands and palms.",
    summary:
      "Ada Foah sits at the mouth of the Volta River, a low-lying landscape of estuary, sandbars and palm islands that has become Accra's favourite weekend escape.",
    description: [
      "At Ada Foah the Volta River spreads into a delta before reaching the sea, creating a shoreline of sand spits, mangroves and small islands. The river and the ocean run side by side, and boats are the natural way to get around.",
      "Weekend resorts and guesthouses line the estuary, from simple beach camps to comfortable riverside lodges. Boat trips go out to the sandbars where the river meets the sea, past fishing settlements and birdlife on the estuary.",
      "Ada is close enough to Accra for a short break but feels distinctly removed from the city. It is also a working coastal community, with salt production, fishing and boat-building alongside tourism.",
    ],
    hero_image: "/images/dest-ada-foah.jpg",
    lat: 5.7816,
    lng: 0.6332,
    geo_precision: "exact",
    best_time:
      "November to March brings the most settled weather for boat trips and beach days. The estuary is greenest in the wet season, when showers are frequent but short.",
    getting_there:
      "Ada Foah is reached by road east of Accra through the Ada East district, with shared vehicles and private cars. Boats from the estuary villages are the only way to reach some of the islands.",
    getting_around:
      "Boats are the main way to explore the estuary and islands. Local taxis connect the town with resorts along the river; many lodges arrange transfers from Accra.",
    categories: ["beaches", "nature", "food"],
    gallery: [
      { url: "/images/dest-ada-foah.jpg", alt: "Palms standing in still water at the Volta estuary near Ada Foah", caption: "Palms in the estuary" },
      { url: "/images/att-dodi-island.jpg", alt: "A wooden pier reaching into Lake Volta at Dodi Island", caption: "Life on the water" },
      { url: "/images/editorial-lake.jpg", alt: "Calm water and shoreline on the Volta lake system", caption: "The Volta waterway" },
    ],
    tips: [
      { title: "Take a boat to the sandbar", body: "The point where the river meets the Atlantic is the classic Ada trip. Arrange it with a local boatman and allow a couple of hours." },
      { title: "Bring cash", body: "Resorts and boat operators often work on cash. There are few reliable ATMs in the area." },
      { title: "Watch the birds", body: "The estuary and mangroves attract a wide range of waterbirds; early morning is the best time to see them." },
    ],
    checklist: [
      "Cash for boats, food and tips",
      "Sun hat and high-factor sunscreen",
      "Insect repellent for the estuary at dusk",
      "A dry bag for boat trips",
      "Sandals that can get wet",
      "A book — this is a slow place",
    ],
  },
  {
    slug: "wli",
    name: "Wli",
    region: "Volta",
    tagline: "The Volta Region's great waterfall, at the foot of the Agumatsa range.",
    summary:
      "Wli village is the gateway to the Agumatsa waterfalls, a forest reserve where a river drops off a cliff in two tiers and fruit bats hang in the canopy above the path.",
    description: [
      "The falls at Wli — Agumatsa — are usually described as the highest in West Africa, with the upper fall dropping several hundred metres off the cliff face. The walk in from the village is gentle, shaded and crosses the river on simple bridges, passing a sacred grove and colonies of bats in the trees.",
      "The reserve around the falls protects forest that shelters butterflies, birds and monkeys, and the community manages access with local guides. A longer, steeper route continues up to the upper falls for those who want more of a hike.",
      "Wli is also a good base for the wider Volta Region: Tafi Atome's monkey sanctuary, the mountain village of Amedzofe and the forests around Mount Afadjato are all within reach, making a two- or three-day loop worthwhile.",
    ],
    hero_image: "/images/dest-wli.jpg",
    lat: 7.1195,
    lng: 0.5881,
    geo_precision: "exact",
    best_time:
      "The falls carry most water during and just after the rainy season, roughly June to October, when the volume is dramatic. The drier months are easier for the hike but the flow is lighter.",
    getting_there:
      "Wli is reached by road from Hohoe in the Volta Region, with shared taxis and local transport covering the last stretch to the village. Most visitors base themselves in Hohoe or at the falls.",
    getting_around:
      "The walk to the falls starts from the village and is done on foot with a local guide. A vehicle is useful for reaching Tafi Atome, Amedzofe and other sites in the district.",
    categories: ["waterfalls", "nature", "adventure", "wildlife"],
    gallery: [
      { url: "/images/att-wli-falls.jpg", alt: "The lower Agumatsa waterfall dropping into a pool at Wli", caption: "The lower falls" },
      { url: "/images/editorial-forest.jpg", alt: "Forest at the foot of the Agumatsa range", caption: "Forest around the falls" },
      { url: "/images/dest-amedzofe.jpg", alt: "The hillside village of Amedzofe in the Volta Region", caption: "Amedzofe, further up the hills" },
    ],
    tips: [
      { title: "Swim at the lower falls", body: "The pool beneath the lower fall is safe for a swim when water levels are normal. Ask your guide before entering." },
      { title: "Take the upper route if you are fit", body: "The climb to the upper falls is steep and can be slippery, but it is quieter and the views back down the valley are excellent." },
      { title: "Carry small notes", body: "Guides, community entry fees and drinks are usually paid in cash, and change can be hard to find in the villages." },
    ],
    checklist: [
      "Trainers with good grip for wet rock",
      "A dry bag or waterproof cover for phones",
      "Cash for guides and community fees",
      "Quick-dry clothing",
      "Insect repellent for the forest walk",
      "Water and a snack for the upper trail",
    ],
  },
  {
    slug: "nzulezu",
    name: "Nzulezu",
    region: "Western",
    tagline: "A village built on stilts above a lagoon, reached only by canoe.",
    summary:
      "Nzulezo is a stilt village on Lake Tadane, reached by a canoe journey through reeds — a community of wooden walkways, schools and shrines built over water.",
    description: [
      "Nzulezo sits entirely on stilts above Lake Tadane, near the coast west of Takoradi. The village is reached by canoe from Beyin, crossing open water and then a channel cut through reeds. Houses, walkways, a school and a small shrine are all raised on wooden platforms.",
      "Oral tradition says the community arrived from the north-west centuries ago, following a snail that led them to the lagoon — the name refers to that story. Life here revolves around fishing, farming on nearby land and, increasingly, hosting visitors.",
      "The visit is short but memorable, and it is a good example of community-managed tourism: guides come from the village, entry fees support the community, and the canoe trip itself is part of the experience. Combine it with the beaches and forts of the western coast.",
    ],
    hero_image: "/images/dest-nzulezu.jpg",
    lat: 5.0210,
    lng: -2.5980,
    geo_precision: "exact",
    best_time:
      "The lagoon is accessible year-round. The drier months from November to March give calmer water and easier travel on the coastal roads.",
    getting_there:
      "Boats to Nzulezo leave from Beyin in the Jomoro district, west of Takoradi along the coastal road. Arrange the crossing at the community tourism office in Beyin.",
    getting_around:
      "Canoes are the only way to reach the village. Local guides lead the crossing and the walk through the village; life jackets are provided by the operators.",
    categories: ["culture", "heritage", "nature", "adventure"],
    gallery: [
      { url: "/images/dest-nzulezu.jpg", alt: "Stilt houses and walkways above the water at Nzulezo", caption: "Nzulezo stilt village" },
      { url: "/images/att-dodi-island.jpg", alt: "A pier over still water in Ghana", caption: "Waterborne life" },
      { url: "/images/editorial-lake.jpg", alt: "Still water and reeds on a Ghanaian lagoon", caption: "Lake Tadane" },
    ],
    tips: [
      { title: "Ask before you photograph", body: "People live here year-round. Ask before photographing individuals and respect any request not to be filmed." },
      { title: "Bring small notes", body: "The canoe fee, guide tip and any craft purchases are paid locally in cash, and change is scarce." },
      { title: "Combine with Beyin beach", body: "The coast at Beyin and nearby beaches makes a natural pairing with the lagoon crossing for a full day." },
    ],
    checklist: [
      "Cash in small denominations",
      "A hat and sun protection for the canoe",
      "A waterproof bag for cameras",
      "Footwear that can handle wet planks",
      "Water for the crossing",
      "Patience — crossings are timed with other visitors",
    ],
  },
  {
    slug: "paga",
    name: "Paga",
    region: "Upper East",
    tagline: "Ghana's northern border town, known for its sacred crocodiles and painted compounds.",
    summary:
      "Paga sits on the Burkina Faso border in the far north-east, where a crocodile pond, elaborate painted architecture and a busy cross-border trade give the town its character.",
    description: [
      "Paga is the last major town before the Burkina Faso border and the cultural heart of the Kassena-Nankana area. Its best-known site is the crocodile pond, where a community of Nile crocodiles has long been protected and is considered sacred by local families.",
      "The wider Upper East Region is famous for its decorated architecture: compounds of earthen walls painted in geometric black, white and red patterns, best known around Sirigu and the surrounding villages. The region also holds the rock formations and shrines of the Tongo Hills.",
      "This is a long way from Ghana's coast and few visitors make it here — which is exactly the appeal. The landscape, languages and building traditions are distinct from the south, and the border crossing at Paga leads on to Burkina Faso.",
    ],
    hero_image: "/images/dest-paga.jpg",
    lat: 10.9700,
    lng: -1.1017,
    geo_precision: "exact",
    best_time:
      "The far north is hottest from March to May, before the rains arrive. November to February is drier and more comfortable, though nights can be cool and dusty Harmattan winds blow in December and January.",
    getting_there:
      "Paga is reached by road from Bolgatanga and Tamale, with shared vehicles and buses along the northern highway. The Ghana–Burkina Faso border is at the edge of town.",
    getting_around:
      "Local taxis and shared vehicles connect the town centre, the crocodile pond and nearby villages. A vehicle for the day is the most practical way to reach Sirigu and the Tongo Hills.",
    categories: ["wildlife", "culture", "heritage", "adventure"],
    gallery: [
      { url: "/images/att-paga-pond.jpg", alt: "A Nile crocodile resting at the Paga crocodile pond", caption: "The sacred crocodile pond" },
      { url: "/images/dest-paga.jpg", alt: "A crocodile at the water's edge at Paga", caption: "Crocodiles at Paga" },
      { url: "/images/att-tongo.jpg", alt: "Rock formations and shrines at the Tongo Hills", caption: "Tongo Hills, south of Paga" },
    ],
    tips: [
      { title: "Follow the guide at the pond", body: "The crocodiles are habituated but still wild. Guides from the community manage all contact and know which animals to approach." },
      { title: "See the painted compounds", body: "The decorated architecture around Sirigu is best seen through a community tourism guide, who can arrange visits with families who welcome them." },
      { title: "Time the border", body: "If you plan to cross into Burkina Faso, check current opening hours and requirements in advance; arrangements change." },
    ],
    checklist: [
      "Cool, loose clothing and a hat",
      "Cash — few card facilities in the far north",
      "A guide booked in advance for Sirigu",
      "Water in quantity; the heat is serious",
      "Passport if continuing to Burkina Faso",
      "Respectful dress for village visits",
    ],
  },
  {
    slug: "axim",
    name: "Axim",
    region: "Western",
    tagline: "A fort, a fishing beach and the quiet end of Ghana's western coast.",
    summary:
      "Axim is a low-key coastal town with a seventeenth-century fort, a wide working beach and easy access to the wilder coast at Cape Three Points.",
    description: [
      "Axim's Fort St Anthony was built by the Portuguese and later held by the Dutch and the British. It sits at the edge of town facing the sea, an understated counterpoint to the larger castles at Elmina and Cape Coast.",
      "The town is a working fishing community, and its beach — broad, open and lined with canoes — is one of the most honest stretches of coast in Ghana. There are few facilities, which keeps it quiet.",
      "Axim is a good base for the far western coast. Cape Three Points, the southernmost tip of Ghana, is a short drive away, and the coastline between them is largely undeveloped.",
    ],
    hero_image: "/images/dest-axim.jpg",
    lat: 4.8654,
    lng: -2.2422,
    geo_precision: "exact",
    best_time:
      "November to March offers the driest beach weather. The coast is humid year-round, with rain most likely between April and July.",
    getting_there:
      "Axim lies west of Takoradi along the coastal road, served by shared taxis, trotros and buses. Cape Three Points is reached by a further drive on smaller roads.",
    getting_around:
      "The town centre, fort and beach are within walking distance. A taxi or hired vehicle is needed for Cape Three Points and the surrounding coastline.",
    categories: ["heritage", "beaches", "culture", "nature"],
    gallery: [
      { url: "/images/dest-axim.jpg", alt: "Fort St Anthony at Axim standing above the shoreline", caption: "Fort St Anthony" },
      { url: "/images/att-cape-three-points.jpg", alt: "Palms leaning over the sea near Cape Three Points", caption: "Cape Three Points" },
      { url: "/images/editorial-coast.jpg", alt: "Palm-thatched shelter on a quiet Ghanaian beach", caption: "The western shoreline" },
    ],
    tips: [
      { title: "Drive out to Cape Three Points", body: "The lighthouse and headland at Ghana's southern tip are the reason many travellers come this far west. The road is rough in places." },
      { title: "Keep expectations simple", body: "Axim has little tourist infrastructure. That is the point — eat what the town eats and enjoy an unarranged day." },
      { title: "Carry cash from Takoradi", body: "ATMs are scarce on this stretch of coast. Withdraw before you travel." },
    ],
    checklist: [
      "Cash withdrawn before leaving Takoradi",
      "Sun protection for the open beach",
      "Insect repellent for evenings",
      "A torch for unlit streets",
      "Patience for rough roads",
      "Swimwear for quiet beach days",
    ],
  },
  {
    slug: "akosombo",
    name: "Akosombo",
    region: "Eastern",
    tagline: "The dam that made Lake Volta, and the water that followed it.",
    summary:
      "Akosombo is home to the dam that created Lake Volta, the world's largest reservoir by surface area, with ferry routes and islands spreading north from the gorge.",
    description: [
      "The Akosombo Dam was completed in the 1960s, damming the Volta River and creating a reservoir that stretches for hundreds of kilometres into the northern half of the country. The gorge itself is dramatic, with the lake held between forested hills.",
      "The lake supports ferries, fishing communities and island settlements, and a small tourism scene has grown around it: lakeside hotels, boat trips and viewpoints over the dam. Dodi Island, reached by boat, is a popular day trip from the area.",
      "Akosombo is an easy stop on the road between Accra and the Volta Region, and it explains a great deal about modern Ghana — power, migration and the reshaping of a river.",
    ],
    hero_image: "/images/dest-akosombo.jpg",
    lat: 6.2698,
    lng: 0.0509,
    geo_precision: "exact",
    best_time:
      "The area is humid and green for much of the year. November to March is drier and clearer, with better views from the gorge.",
    getting_there:
      "Akosombo lies on the Accra–Ho road and is served by buses and shared vehicles. Lake ferries connect ports further north along the reservoir.",
    getting_around:
      "Taxis cover the town and dam area. Boats to Dodi Island and other lake destinations depart from local jetties and lakefront hotels.",
    categories: ["nature", "adventure", "culture"],
    gallery: [
      { url: "/images/att-akosombo-dam.jpg", alt: "Water spilling through the Akosombo Dam spillway", caption: "The dam spillway" },
      { url: "/images/att-dodi-island.jpg", alt: "A jetty on Lake Volta at Dodi Island", caption: "Dodi Island" },
      { url: "/images/editorial-lake.jpg", alt: "The wide surface of Lake Volta", caption: "Lake Volta" },
    ],
    tips: [
      { title: "See the lake from the water", body: "The gorge is impressive from the road, but a boat trip shows the scale of the reservoir and reaches islands you cannot drive to." },
      { title: "Ask about dam access", body: "Security arrangements at the dam change. Check in advance whether visitor access is available during your trip." },
      { title: "Stop on the Accra–Ho run", body: "If you are travelling between Accra and the Volta Region, Akosombo makes a natural break in the journey." },
    ],
    checklist: [
      "Sun protection for boat trips",
      "A light rain layer — the gorge catches weather",
      "Cash for boats and local meals",
      "A camera with a wide lens for the lake",
      "Water and snacks",
      "Ask before photographing dam infrastructure",
    ],
  },
  {
    slug: "shai-hills",
    name: "Shai Hills",
    region: "Greater Accra",
    tagline: "Savannah and rock outcrops an hour from the capital.",
    summary:
      "Shai Hills Resource Reserve protects a pocket of savannah, inselbergs and wildlife within easy reach of Accra — the closest thing to a safari from the city.",
    description: [
      "Shai Hills is a protected reserve of open grassland, wooded valleys and granite hills rising abruptly out of the coastal plain. It is small compared to Mole but close to Accra, which makes it a practical half-day trip.",
      "The reserve holds antelope, baboons, monkeys and a good number of bird species, along with caves that were used as refuges during the nineteenth century. Guided walks and short drives with a ranger are the way to see it.",
      "Because it sits between Accra and the Volta road, Shai Hills can be combined with a day out towards Ada Foah or Akosombo.",
    ],
    hero_image: "/images/dest-shai-hills.jpg",
    lat: 5.9056,
    lng: 0.0633,
    geo_precision: "exact",
    best_time:
      "Early morning and late afternoon are best for wildlife and for the heat. The dry season from November to March gives clearer tracks.",
    getting_there:
      "The reserve entrance is on the Accra–Aflao road east of the city, reachable by car or taxi in about an hour from central Accra.",
    getting_around:
      "Rangers lead walking safaris and vehicle tours inside the reserve; private vehicles are not permitted to wander unaccompanied.",
    categories: ["wildlife", "nature", "adventure"],
    gallery: [
      { url: "/images/att-shai-hills.jpg", alt: "Rocky hills and savannah vegetation in Shai Hills Resource Reserve", caption: "The inselbergs" },
      { url: "/images/dest-shai-hills.jpg", alt: "Grassland and rock outcrops at Shai Hills", caption: "Reserve landscape" },
      { url: "/images/dest-mole.jpg", alt: "An elephant in Ghanaian savannah", caption: "Ghanaian savannah wildlife" },
    ],
    tips: [
      { title: "Go early", body: "Wildlife is more active and the walking is far more comfortable in the first hours after opening." },
      { title: "Ask about the caves", body: "The reserve's caves carry a history of refuge during conflict. Walking to them with a ranger adds real context to the landscape." },
      { title: "Pair it with Ada", body: "Shai Hills sits on the road towards Ada Foah, making a natural morning stop on the way to the estuary." },
    ],
    checklist: [
      "Walking shoes and a hat",
      "Water — there is little shade on the tracks",
      "Binoculars for birds",
      "Cash for entry and guide fees",
      "Long sleeves for early walks",
      "No plastic bags — reserve rules apply",
    ],
  },
  {
    slug: "amedzofe",
    name: "Amedzofe",
    region: "Volta",
    tagline: "A mountain village in the clouds, with trails to Mount Gemi.",
    summary:
      "Amedzofe sits high in the Volta Region's hills, one of the highest settlements in Ghana, with a cool climate, forest walks and a summit trail to Mount Gemi.",
    description: [
      "Amedzofe is a small Ewe village on a ridge in the Ho West district, high enough to be noticeably cool and often wrapped in cloud. The surrounding hills are forested, and the village is a base for walks to waterfalls, caves and viewpoints.",
      "The trail to Mount Gemi, the second-highest peak in Ghana, takes a few hours on foot and passes through forest and farmland. On clear days the view reaches across the Volta Region towards Togo.",
      "Community tourism here is organised by local guides, and the village has guesthouses and a training centre. It is one of the most rewarding places in southern Ghana for walkers, and it pairs easily with Wli and Tafi Atome.",
    ],
    hero_image: "/images/dest-amedzofe.jpg",
    lat: 6.8453,
    lng: 0.4360,
    geo_precision: "exact",
    best_time:
      "The hills are cool and often misty; December to February is driest with the best chance of clear summit views. The rainy season brings lush forest and muddy trails.",
    getting_there:
      "Amedzofe is reached by road from Ho or Hohoe in the Volta Region. Shared taxis and trotros run to the village, with the last stretch climbing steeply.",
    getting_around:
      "Village paths connect the guesthouses, viewpoints and trailheads on foot. Local guides lead the Mount Gemi hike and visits to nearby caves and waterfalls.",
    categories: ["adventure", "nature", "culture", "waterfalls"],
    gallery: [
      { url: "/images/dest-amedzofe.jpg", alt: "The hillside village of Amedzofe with Mount Gemi behind", caption: "Amedzofe and Mount Gemi" },
      { url: "/images/editorial-volta.jpg", alt: "Green hills and valleys in the Volta Region", caption: "Volta hills" },
      { url: "/images/att-wli-falls.jpg", alt: "A waterfall in the Volta Region forest", caption: "Waterfalls nearby" },
    ],
    tips: [
      { title: "Hike with a local guide", body: "Trails are unmarked in places and the weather changes fast. Guides from the village know the routes and the safest lines up Mount Gemi." },
      { title: "Pack for cloud", body: "Amedzofe can be wet and cool even when the lowlands are hot. Bring a waterproof layer and something warm for the evening." },
      { title: "Stay a night", body: "Day trips rush the best part. Sunrise over the hills from the village is the reason to stay." },
    ],
    checklist: [
      "Waterproof jacket and warm layer",
      "Hiking shoes with grip",
      "Cash for guides and village fees",
      "Head torch for early starts",
      "Water and high-energy snacks",
      "A dry bag for the summit walk",
    ],
  },
  {
    slug: "keta",
    name: "Keta",
    region: "Volta",
    tagline: "A narrow strip of coast between the sea and the lagoon.",
    summary:
      "Keta is a coastal town squeezed between the Atlantic and the Keta Lagoon, with a Danish fort, a long history of coastal trade and a shoreline that is constantly shifting.",
    description: [
      "Keta sits on a sandbar between the Gulf of Guinea and the Keta Lagoon, a position that has shaped its history. The Danish fort, Fort Prinzenstein, was an important trading post and later a site in the transatlantic slave trade; part of it has been lost to the sea.",
      "Coastal erosion has been a defining problem here for generations, and the sea defences now visible along the shore are part of that long story. The lagoon behind the town supports fishing and birdlife.",
      "Keta is quiet and rarely crowded, with wide beaches and a strong sense of a place living with the water. It is easily combined with a Volta Region itinerary.",
    ],
    hero_image: "/images/dest-keta.jpg",
    lat: 5.9216,
    lng: 0.9911,
    geo_precision: "exact",
    best_time:
      "November to March is the driest and most comfortable period. The coast is humid year-round, with rain most likely between May and July.",
    getting_there:
      "Keta lies on the coastal road east of Accra towards the Volta Region and Togo, served by buses and shared vehicles from Accra, Ho and Aflao.",
    getting_around:
      "The town is small enough to walk. Local taxis cover the fort, the beaches and the lagoon side of town.",
    categories: ["heritage", "beaches", "culture", "nature"],
    gallery: [
      { url: "/images/dest-keta.jpg", alt: "Waves breaking on the shore at Keta", caption: "The Keta shoreline" },
      { url: "/images/editorial-coast.jpg", alt: "A palm shelter on a Ghanaian beach", caption: "Beach shelters" },
      { url: "/images/editorial-lake.jpg", alt: "Calm water on a coastal lagoon", caption: "The Keta Lagoon" },
    ],
    tips: [
      { title: "Visit the fort with context", body: "Fort Prinzenstein is partly in ruins and partly reclaimed by the sea. A local guide explains both the trade history and the erosion that threatens the site." },
      { title: "Look for the birds", body: "The lagoon is a stop for waterbirds. Early morning along the lagoon shore is the best time to see them." },
      { title: "Combine with Aflao", body: "Keta is close to the Togo border, making it an easy addition to a route along the eastern coast." },
    ],
    checklist: [
      "Cash for entry fees and local food",
      "Sun protection for the open shore",
      "Insect repellent for the lagoon at dusk",
      "Shoes for walking on sand and rubble",
      "A light layer for the sea breeze",
      "Time to talk to local guides",
    ],
  },
];
