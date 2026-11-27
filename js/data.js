// TripNest Ghana — Seeded travel dataset (pure Vanilla JS)
window.TRIPNEST_DATA = {
  "users": [
    {
      "id": 1,
      "name": "Ama Boateng",
      "email": "admin@tripnest.gh",
      "role": "ADMIN",
      "created_at": "2026-11-23 06:14:57",
      "password": "tripnest123"
    },
    {
      "id": 2,
      "name": "Kwesi Mensah",
      "email": "provider@tripnest.gh",
      "role": "PROVIDER",
      "created_at": "2026-11-23 06:14:57",
      "password": "tripnest123"
    },
    {
      "id": 3,
      "name": "Akosua Danso",
      "email": "traveller@tripnest.gh",
      "role": "TRAVELLER",
      "created_at": "2026-11-23 06:14:57",
      "password": "tripnest123"
    },
    {
      "id": 4,
      "name": "Yaw Owusu",
      "email": "yaw@tripnest.gh",
      "role": "TRAVELLER",
      "created_at": "2026-11-23 06:14:57",
      "password": "tripnest123"
    }
  ],
  "categories": [
    {
      "id": 1,
      "slug": "beaches",
      "name": "Beaches",
      "kind": "BOTH",
      "description": "Atlantic surf, palm-lined sand and estuary retreats.",
      "image": "assets/images/editorial-coast.jpg",
      "sort": 0
    },
    {
      "id": 2,
      "slug": "nature",
      "name": "Nature",
      "kind": "BOTH",
      "description": "Forest reserves, crater lakes and open savannah.",
      "image": "assets/images/editorial-forest.jpg",
      "sort": 1
    },
    {
      "id": 3,
      "slug": "culture",
      "name": "Culture",
      "kind": "BOTH",
      "description": "Living traditions, craft and community life.",
      "image": "assets/images/editorial-culture.jpg",
      "sort": 2
    },
    {
      "id": 4,
      "slug": "heritage",
      "name": "Heritage",
      "kind": "BOTH",
      "description": "Forts, castles and places that carry difficult histories.",
      "image": "assets/images/att-elmina-castle.jpg",
      "sort": 3
    },
    {
      "id": 5,
      "slug": "adventure",
      "name": "Adventure",
      "kind": "BOTH",
      "description": "Canopy walks, hill climbs and river crossings.",
      "image": "assets/images/att-kakum.jpg",
      "sort": 4
    },
    {
      "id": 6,
      "slug": "waterfalls",
      "name": "Waterfalls",
      "kind": "BOTH",
      "description": "Forest cascades reached on foot.",
      "image": "assets/images/att-wli-falls.jpg",
      "sort": 5
    },
    {
      "id": 7,
      "slug": "wildlife",
      "name": "Wildlife",
      "kind": "BOTH",
      "description": "Elephants, monkeys and reserve wildlife.",
      "image": "assets/images/dest-mole.jpg",
      "sort": 6
    },
    {
      "id": 8,
      "slug": "city",
      "name": "City experiences",
      "kind": "BOTH",
      "description": "Markets, museums, music and street food.",
      "image": "assets/images/att-jamestown.jpg",
      "sort": 7
    },
    {
      "id": 9,
      "slug": "food",
      "name": "Food & local life",
      "kind": "BOTH",
      "description": "Chop bars, markets and regional cooking.",
      "image": "assets/images/editorial-food.jpg",
      "sort": 8
    }
  ],
  "destinations": [
    {
      "id": 1,
      "slug": "accra",
      "name": "Accra",
      "region": "Greater Accra",
      "tagline": "Atlantic surf, a restless creative scene and the best street food in the south.",
      "summary": "Ghana's capital balances colonial-era forts, a confident contemporary arts scene and long Atlantic beaches with the everyday rhythm of West African city life.",
      "description": "Accra grew from Ga fishing settlements around Jamestown and Usshertown into a capital of wide avenues, low-rise neighbourhoods and an increasingly confident design and music scene. The old quarter is still the most atmospheric corner of the city: the lighthouse, the harbour below it and the boxing gyms of Bukom sit within a few minutes' walk of each other.\n\nThe city wears its history lightly in places and directly in others. Independence Square and the Black Star Gate mark the country's 1957 independence, while the forts along the coast carry a much heavier story. Between those poles sits the Accra most visitors remember: Makola Market, the Kenkey sellers at dawn, gallery openings in Osu, and highlife drifting out of bars in the evening.\n\nFor travellers, Accra works best as a base and a first impression. Spend a day in the centre and on the coast, then use the city's road links to head west towards Cape Coast and Elmina, or north towards Aburi and the Eastern Region hills.",
      "hero_image": "assets/images/dest-accra.jpg",
      "hero_credit": "Uprising Man / CC BY-SA 4.0",
      "lat": 5.5571,
      "lng": -0.2012,
      "geo_precision": "exact",
      "best_time": "The southern coast is most comfortable in the drier months, roughly November to March, when humidity eases and the skies are clearer. The heaviest rains usually arrive between May and June, with a shorter wet spell around September and October.",
      "getting_there": "Kotoka International Airport (ACC) sits a short drive from the central districts and is the main arrival point for international visitors. Road links connect Accra with Cape Coast, Kumasi, Ho and the Volta Region.",
      "getting_around": "Ride-hailing apps and metered taxis are the simplest way to move around the central districts. Trotros — shared minibuses — cover the city cheaply and are part of the experience, though routes take a little learning.",
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "sort": 0,
      "categories": [
        "city",
        "food",
        "beaches",
        "heritage"
      ],
      "gallery": [
        {
          "url": "assets/images/att-jamestown.jpg",
          "alt": "The red and white Jamestown Lighthouse standing above the Accra coast",
          "caption": "Jamestown Lighthouse",
          "credit": "Adotey Hoffman / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/att-makola.jpg",
          "alt": "The busy entrance to Makola Market in central Accra",
          "caption": "Makola Market",
          "credit": "Benggriff / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/att-labadi.jpg",
          "alt": "People walking along the sand at Labadi Beach, Accra",
          "caption": "Labadi Beach",
          "credit": "Cca Raheem / CC BY 4.0"
        }
      ],
      "tips": [
        {
          "id": 1,
          "title": "Start in the old city",
          "body": "Jamestown and Usshertown reward an early start, when the harbour, the fish market and the streets around the lighthouse are at their busiest and most photogenic."
        },
        {
          "id": 2,
          "title": "Cash still matters",
          "body": "Cards work in hotels and larger restaurants, but markets, trotros and smaller chop bars usually expect cash. Withdraw in larger amounts rather than relying on street ATMs."
        },
        {
          "id": 3,
          "title": "Plan around traffic",
          "body": "Central Accra slows considerably at the start and end of the working day. Group nearby stops together rather than crossing the city twice."
        }
      ],
      "checklist": [
        {
          "id": 1,
          "label": "Lightweight clothing and a hat for the coastal heat"
        },
        {
          "id": 2,
          "label": "Cash in Ghana cedis for markets and transport"
        },
        {
          "id": 3,
          "label": "A charger and power bank for long days out"
        },
        {
          "id": 4,
          "label": "Comfortable shoes for walking the old quarter"
        },
        {
          "id": 5,
          "label": "Refillable water bottle"
        },
        {
          "id": 6,
          "label": "A light layer for air-conditioned interiors"
        }
      ]
    },
    {
      "id": 2,
      "slug": "cape-coast",
      "name": "Cape Coast",
      "region": "Central",
      "tagline": "A coastal university town built around one of the world's most consequential castles.",
      "summary": "Cape Coast pairs a whitewashed hilltop castle with a compact colonial street plan, a lively student population and easy access to Kakum's rainforest canopy.",
      "description": "Cape Coast was the administrative centre of the British Gold Coast and the capital of the colony until 1877. The castle that dominates the town was one of the most important nodes in the transatlantic slave trade, and it is now a UNESCO World Heritage site and a place of remembrance visited by people from across the diaspora.\n\nThe town itself is walkable and pleasant in a way that few Ghanaian cities are: a grid of old merchant houses, churches and school buildings climbing away from the sea, with the castle at the centre. Fante culture, a strong educational tradition and a steady stream of students give it an energy that is different from Accra's.\n\nMost travellers use Cape Coast as a base for two days: the castle and the town on one day, Kakum National Park and the beaches west towards Elmina on the other. The annual Fetu Afahye festival fills the streets with durbar and drumming.",
      "hero_image": "assets/images/dest-cape-coast.jpg",
      "hero_credit": "Kwameghana(Bright Kwame Ayisi) / CC BY 4.0",
      "lat": 5.1081,
      "lng": -1.2417,
      "geo_precision": "exact",
      "best_time": "The Central Region is wettest between May and July, when forest downpours are frequent. The drier months from November through February are the easiest for castle visits and canopy walks.",
      "getting_there": "Cape Coast lies west of Accra on the coastal road, with regular intercity buses and shared vehicles from the capital. Kakum National Park is reached by road from the town.",
      "getting_around": "The historic centre and castle are easily covered on foot. Taxis and shared vehicles connect the town with Kakum, Elmina and the surrounding beaches.",
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "sort": 1,
      "categories": [
        "heritage",
        "culture",
        "city",
        "nature"
      ],
      "gallery": [
        {
          "url": "assets/images/att-cape-coast-castle.jpg",
          "alt": "The courtyard of Cape Coast Castle with its weathered white walls",
          "caption": "Inside Cape Coast Castle",
          "credit": "Matti Blume / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/att-kakum.jpg",
          "alt": "The rope and plank canopy walkway suspended above Kakum rainforest",
          "caption": "Kakum canopy walkway",
          "credit": "daSupremo / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-elmina.jpg",
          "alt": "Elmina Castle seen from the shoreline west of Cape Coast",
          "caption": "Elmina, a short drive west",
          "credit": "Damien Halleux Radermecker / CC BY-SA 2.0"
        }
      ],
      "tips": [
        {
          "id": 4,
          "title": "Give the castle time",
          "body": "The guided tour through the castle takes in the dungeons and the Door of No Return. Many visitors prefer to go in the morning and leave the rest of the day unplanned."
        },
        {
          "id": 5,
          "title": "Walk the old town",
          "body": "The streets between the castle and the market hold merchant houses, churches and small museums that most day-trippers miss entirely."
        },
        {
          "id": 6,
          "title": "Combine with Kakum early",
          "body": "Canopy walks are cooler and quieter in the morning, and rainforest cloud often builds through the afternoon."
        }
      ],
      "checklist": [
        {
          "id": 7,
          "label": "Modest, comfortable clothing for the castle visit"
        },
        {
          "id": 8,
          "label": "Insect repellent for Kakum and the coast"
        },
        {
          "id": 9,
          "label": "Cash for entry fees and guides"
        },
        {
          "id": 10,
          "label": "A light rain layer between May and July"
        },
        {
          "id": 11,
          "label": "Time set aside for reflection at the castle"
        },
        {
          "id": 12,
          "label": "Water and snacks for the canopy walk"
        }
      ]
    },
    {
      "id": 3,
      "slug": "elmina",
      "name": "Elmina",
      "region": "Central",
      "tagline": "A fishing town where a fifteenth-century castle meets a working harbour.",
      "summary": "Elmina's St George's Castle — the oldest European building in sub-Saharan Africa — sits beside one of Ghana's most active fishing harbours and a coast that still runs on the sea.",
      "description": "Elmina began as a Ga fishing settlement and became the site of São Jorge da Mina, built by the Portuguese in the late fifteenth century. Later held by the Dutch and then the British, the castle stands directly over the harbour, its whitewashed walls visible from far along the coast.\n\nThe town below it is not a museum piece. Canoes come in through the surf, fish are smoked and sold along the shore, and the streets behind the harbour are busy from first light. That contrast — monumental history and ordinary working life in the same few hundred metres — is what makes Elmina worth more than a quick stop.\n\nThe castle's museum and guided tours explain the trade in gold, then in enslaved people, that passed through this coast. Fort St Jago on the hill above gives the best view of the whole harbour and is a short climb from the town centre.",
      "hero_image": "assets/images/dest-elmina.jpg",
      "hero_credit": "Damien Halleux Radermecker / CC BY-SA 2.0",
      "lat": 5.0827,
      "lng": -1.3482,
      "geo_precision": "exact",
      "best_time": "The coastal dry season from November to March brings the clearest light and the most comfortable walking conditions. Expect heavy showers between May and July.",
      "getting_there": "Elmina is a short drive west of Cape Coast along the coastal road, reachable by taxi, shared vehicle or intercity bus. Accra is further east along the same corridor.",
      "getting_around": "The castle, harbour and town centre are within walking distance of each other. Local taxis cover the beaches and Fort St Jago, and boats can be arranged at the harbour for trips on the lagoon.",
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "sort": 2,
      "categories": [
        "heritage",
        "culture",
        "beaches",
        "food"
      ],
      "gallery": [
        {
          "url": "assets/images/att-elmina-castle.jpg",
          "alt": "The whitewashed facade and staircase of Elmina Castle",
          "caption": "St George's Castle",
          "credit": "Matti Blume / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-coast.jpg",
          "alt": "A palm-thatched shelter on a Ghanaian beach at Elmina",
          "caption": "The coast around Elmina",
          "credit": "Kwameghana / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-cape-coast.jpg",
          "alt": "Cape Coast Castle, a short drive east of Elmina",
          "caption": "Cape Coast, a short drive east",
          "credit": "Kwameghana(Bright Kwame Ayisi) / CC BY 4.0"
        }
      ],
      "tips": [
        {
          "id": 7,
          "title": "Go down to the harbour",
          "body": "The working fishing harbour is the heart of the town. Early morning is when the canoes land and the fish market is at its liveliest."
        },
        {
          "id": 8,
          "title": "Climb to Fort St Jago",
          "body": "The small fort on the ridge above town gives the clearest view of the castle, the harbour and the coastline in both directions."
        },
        {
          "id": 9,
          "title": "Eat where the boats come in",
          "body": "The fish served in Elmina is as fresh as it gets in Ghana. Small chop bars near the shore are usually the best value."
        }
      ],
      "checklist": [
        {
          "id": 13,
          "label": "Cash for castle entry and local guides"
        },
        {
          "id": 14,
          "label": "Shoes suitable for walking on uneven harbour ground"
        },
        {
          "id": 15,
          "label": "A hat and sun protection"
        },
        {
          "id": 16,
          "label": "Permission before photographing people at work"
        },
        {
          "id": 17,
          "label": "Time for the castle museum as well as the tour"
        },
        {
          "id": 18,
          "label": "A light layer for the evening sea breeze"
        }
      ]
    },
    {
      "id": 4,
      "slug": "kumasi",
      "name": "Kumasi",
      "region": "Ashanti",
      "tagline": "The seat of Asante culture, built around the largest market in West Africa.",
      "summary": "Kumasi is the capital of the Ashanti Region and the centre of Asante identity — a city of goldsmiths, kente weavers, royal history and the vast Kejetia market.",
      "description": "Kumasi grew around the Asantehene's court and remains the cultural heart of the Asante people. Manhyia Palace, the seat of the traditional ruler, and the surrounding museums explain a kingdom that resisted colonial expansion longer than most in the region.\n\nThe city's commercial life is centred on Kejetia, an enormous market where cloth, food, hardware and almost anything else can be found. Nearby craft villages specialise: weaving at Bonwire, adinkra cloth printing at Ntonso, wood carving at Ahwiaa. These are working places rather than staged experiences, which is what makes them interesting.\n\nKumasi is a useful northern hinge for a southern Ghana itinerary — closer to the savannah than the coast, and the natural stop between Accra and Mole National Park.",
      "hero_image": "assets/images/dest-kumasi.jpg",
      "hero_credit": "Maven Egote / CC BY-SA 4.0",
      "lat": 6.6986,
      "lng": -1.6233,
      "geo_precision": "exact",
      "best_time": "Kumasi sits in the forest belt and can be humid year-round. November to March is generally the driest period; the main rains fall between March and July.",
      "getting_there": "Kumasi has an airport and is connected to Accra by a major trunk road, as well as by intercity buses and shared vehicles. The city is also the usual stopover on the road north towards Mole National Park.",
      "getting_around": "Taxis and ride-hailing are the easiest way around the central districts. Shared minibuses reach the craft villages and outer neighbourhoods; a driver for a half-day is a practical option for visiting several workshops.",
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "sort": 3,
      "categories": [
        "culture",
        "heritage",
        "city",
        "food"
      ],
      "gallery": [
        {
          "url": "assets/images/att-kejetia.jpg",
          "alt": "The modern covered hall of Kejetia Market in Kumasi",
          "caption": "Kejetia Market",
          "credit": "Afus199620 / CC0"
        },
        {
          "url": "assets/images/att-manhyia.jpg",
          "alt": "Inside Manhyia Palace, the seat of the Asantehene in Kumasi",
          "caption": "Manhyia Palace",
          "credit": "U.S. Embassy Ghana / Public domain"
        },
        {
          "url": "assets/images/editorial-kente.jpg",
          "alt": "Bolts of brightly patterned kente and wax print cloth for sale",
          "caption": "Cloth in the market",
          "credit": "Adam Jones / CC BY-SA 2.0"
        }
      ],
      "tips": [
        {
          "id": 10,
          "title": "Buy cloth where it is made",
          "body": "Kente from Bonwire and adinkra from Ntonso cost less and mean more than anything bought in a city shop. Ask your driver to build a workshop loop."
        },
        {
          "id": 11,
          "title": "Kejetia needs a guide",
          "body": "The market is vast and easy to get disoriented in. Going with someone local, or with a specific purchase in mind, makes it far more enjoyable."
        },
        {
          "id": 12,
          "title": "Check palace visiting days",
          "body": "Manhyia Palace museum hours and access vary. Confirm locally before travelling across the city for it."
        }
      ],
      "checklist": [
        {
          "id": 19,
          "label": "Cash for market purchases and workshop visits"
        },
        {
          "id": 20,
          "label": "A bag for cloth, carvings or pottery"
        },
        {
          "id": 21,
          "label": "Comfortable shoes for market walking"
        },
        {
          "id": 22,
          "label": "Bargaining patience — start friendly, not low"
        },
        {
          "id": 23,
          "label": "A driver's number for the day"
        },
        {
          "id": 24,
          "label": "Sun protection for outdoor craft visits"
        }
      ]
    },
    {
      "id": 5,
      "slug": "aburi",
      "name": "Aburi",
      "region": "Eastern",
      "tagline": "Cool hill air, a botanical garden and a weekend escape from the city.",
      "summary": "Aburi sits in the hills north of Accra, where the temperature drops, the botanical gardens are shaded by enormous palms, and the road up is lined with craft stalls.",
      "description": "Aburi has been a retreat from Accra's heat since the colonial period. The town is built along a ridge in the Akuapem hills, with views down towards the coastal plain and a noticeably cooler climate than the city below.\n\nAburi Botanical Gardens, laid out in the nineteenth century, is the main draw: broad lawns, an avenue of towering palms and a collection of tropical trees labelled for visitors. The gardens are quiet on weekdays and popular with families at weekends.\n\nThe surrounding Akuapem hills hold hiking trails, small waterfalls and villages known for bead-making and woodcarving. Aburi works well as a day trip from Accra or as an overnight stop before continuing to Koforidua or the Volta Region.",
      "hero_image": "assets/images/dest-aburi.jpg",
      "hero_credit": "Malibu xoxo / CC BY-SA 4.0",
      "lat": 5.8475,
      "lng": -0.1753,
      "geo_precision": "exact",
      "best_time": "The hills are pleasant year-round and offer relief from coastal humidity. The drier months from November to February give the clearest views; the area is greener and wetter from May to July.",
      "getting_there": "Aburi is reached by road from Accra, climbing into the Akuapem hills. Shared taxis and minibuses run from the city's eastern transport terminals, and a private car is the most flexible option.",
      "getting_around": "The botanical gardens and town centre are walkable. Local taxis reach the surrounding villages and trails; walking between them is possible but hilly.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 4,
      "categories": [
        "nature",
        "culture",
        "adventure"
      ],
      "gallery": [
        {
          "url": "assets/images/att-aburi-gardens.jpg",
          "alt": "Tall palms and open lawn in Aburi Botanical Gardens",
          "caption": "Aburi Botanical Gardens",
          "credit": "Malibu xoxo / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-forest.jpg",
          "alt": "Dense green forest canopy in the Eastern Region hills",
          "caption": "Forest in the hills",
          "credit": "Benebiankie / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-craft.jpg",
          "alt": "Wooden crafts and household goods displayed at a Ghanaian market",
          "caption": "Craft stalls on the ridge",
          "credit": "Benggriff / CC BY-SA 3.0"
        }
      ],
      "tips": [
        {
          "id": 13,
          "title": "Bring a layer",
          "body": "The ridge is meaningfully cooler than Accra, especially in the early morning and after rain. A light jacket is worth carrying."
        },
        {
          "id": 14,
          "title": "Combine with the bead villages",
          "body": "Craft villages around the Akuapem ridge make a natural half-day extension to the botanical gardens."
        },
        {
          "id": 15,
          "title": "Go on a weekday if you can",
          "body": "The gardens and the ridge road are busiest at weekends, when Accra empties into the hills."
        }
      ],
      "checklist": [
        {
          "id": 25,
          "label": "A light jacket for the cooler air"
        },
        {
          "id": 26,
          "label": "Walking shoes for garden paths and hills"
        },
        {
          "id": 27,
          "label": "Cash for entry fees and craft stalls"
        },
        {
          "id": 28,
          "label": "Insect repellent if walking trails"
        },
        {
          "id": 29,
          "label": "A camera for the ridge views"
        },
        {
          "id": 30,
          "label": "Water — the climb is dry work"
        }
      ]
    },
    {
      "id": 6,
      "slug": "mole-national-park",
      "name": "Mole National Park",
      "region": "Savannah",
      "tagline": "Ghana's largest protected area, where elephants walk through open savannah.",
      "summary": "Mole is Ghana's biggest and best-known national park: 4,000 square kilometres of savannah and woodland where elephants, antelope and over 300 bird species live on an escarpment above the Mole river.",
      "description": "Mole National Park covers a broad swathe of northern savannah, with a ridge above the Mole river that gives walking safaris their best viewpoints. It is the most reliable place in Ghana to see elephants, which are accustomed to visitors on foot and at a distance.\n\nThe park is also a landscape of human history: old caravan routes crossed this country, and the villages around its edges — Larabanga, Mognori, Murugu — have their own traditions, architecture and crafts. Community tourism programmes in Mognori and Larabanga let visitors spend time in those villages rather than only in a vehicle.\n\nBecause Mole sits in the north, it is a committed journey from the coast — usually via Kumasi or Tamale. The reward is a part of Ghana that feels completely different from the coast: wide skies, dry-season dust, and wildlife that is genuinely wild.",
      "hero_image": "assets/images/dest-mole.jpg",
      "hero_credit": "Matti Blume / CC BY-SA 4.0",
      "lat": 9.6569,
      "lng": -1.8674,
      "geo_precision": "exact",
      "best_time": "The dry season, roughly November to April, is when animals concentrate near water and vegetation is thinner, making wildlife easier to see. By the end of the dry season the heat is intense; the wetter months from June bring green landscapes and fewer visitors.",
      "getting_there": "Mole is usually reached by road from Tamale or Damongo, with the final stretch on laterite and gravel. Most visitors arrange a vehicle with a driver for the journey and the park itself.",
      "getting_around": "Walking safaris with park rangers and vehicle safaris are the two ways to explore; both are arranged at the park. A vehicle is essential for getting between the gate, the lodge and the surrounding villages.",
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "sort": 5,
      "categories": [
        "wildlife",
        "nature",
        "adventure",
        "culture"
      ],
      "gallery": [
        {
          "url": "assets/images/att-larabanga.jpg",
          "alt": "The whitewashed Sudano-Sahelian towers of Larabanga Mosque",
          "caption": "Larabanga Mosque near the park gate",
          "credit": "Sathyan Velumani / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/editorial-forest.jpg",
          "alt": "Woodland and savannah vegetation in northern Ghana",
          "caption": "Savannah woodland",
          "credit": "Benebiankie / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-mole.jpg",
          "alt": "An elephant walking across dry savannah grass in Mole National Park",
          "caption": "Elephants on the escarpment",
          "credit": "Matti Blume / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 16,
          "title": "Walk with a ranger",
          "body": "Walking safaris are the reason to come to Mole. Rangers read the landscape and keep distances safe; follow their instructions on noise and movement."
        },
        {
          "id": 17,
          "title": "Take the long road seriously",
          "body": "The drive north is long and the last section is rough. Build in daylight hours and carry water rather than trying to rush the journey."
        },
        {
          "id": 18,
          "title": "Spend a night in a village",
          "body": "Community tourism in Larabanga and Mognori supports local families and gives a much fuller picture of the region than the park gate alone."
        }
      ],
      "checklist": [
        {
          "id": 31,
          "label": "Neutral-coloured clothing for walking safaris"
        },
        {
          "id": 32,
          "label": "Binoculars and a zoom lens"
        },
        {
          "id": 33,
          "label": "Sun hat, high-factor sunscreen and long sleeves"
        },
        {
          "id": 34,
          "label": "Plenty of drinking water"
        },
        {
          "id": 35,
          "label": "Malaria precautions for the north"
        },
        {
          "id": 36,
          "label": "Cash — card acceptance is limited"
        }
      ]
    },
    {
      "id": 7,
      "slug": "lake-bosumtwi",
      "name": "Lake Bosumtwi",
      "region": "Ashanti",
      "tagline": "A meteorite crater lake ringed by hills and fishing villages.",
      "summary": "Lake Bosumtwi fills an ancient impact crater south-east of Kumasi — a near-circular lake where fishing villages sit between steep forested hills.",
      "description": "Lake Bosumtwi formed in a crater roughly a million years ago, and at around eight kilometres across it is one of the largest natural lakes in West Africa. The Ashanti consider it sacred; traditionally only wooden pads were used for fishing, and the lake still has a quiet, enclosed atmosphere.\n\nVillages ring the shoreline — Abono is the largest and most accessible — with guesthouses, small restaurants and boats that take visitors across the water. The surrounding hills offer short walks with views over the crater rim.\n\nBecause it is close to Kumasi, Bosumtwi makes an easy overnight or day trip from the city. It is a place to slow down rather than tick off: swim, eat fresh tilapia by the water and watch the light change on the hills.",
      "hero_image": "assets/images/dest-bosumtwi.jpg",
      "hero_credit": "Stig Nygaard from Copenhagen, Denmark / CC BY 2.0",
      "lat": 6.506,
      "lng": -1.4102,
      "geo_precision": "exact",
      "best_time": "The lake is green and lush through the rainy season and drier with clearer skies from November to February. Weekends are busier with visitors from Kumasi.",
      "getting_there": "The lake lies south-east of Kumasi, reached by road via the Bosomtwe district. Shared taxis and private cars run from Kumasi; the final approach descends steeply to the shoreline.",
      "getting_around": "Villages around the lake are connected by footpaths and by boat. Local boatmen offer crossings and short trips; walking between villages takes time but is the best way to see the shoreline.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 6,
      "categories": [
        "nature",
        "adventure",
        "culture"
      ],
      "gallery": [
        {
          "url": "assets/images/att-bosumtwi-crater.jpg",
          "alt": "Satellite view of the near-circular Bosumtwi crater lake",
          "caption": "The crater seen from orbit",
          "credit": "NASA Earth Observatory images by Michala Garrison, using Landsat data from the U.S. Geological Survey. Story by Adam Voiland. / Public domain"
        },
        {
          "url": "assets/images/dest-bosumtwi.jpg",
          "alt": "The shoreline of Lake Bosumtwi with hills behind",
          "caption": "Shoreline at Abono",
          "credit": "Stig Nygaard from Copenhagen, Denmark / CC BY 2.0"
        },
        {
          "url": "assets/images/editorial-forest.jpg",
          "alt": "Forested hills surrounding the lake",
          "caption": "The crater rim",
          "credit": "Benebiankie / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 19,
          "title": "Respect local custom",
          "body": "The lake is sacred to many Ashanti communities. Ask before swimming in areas used for ritual, and follow guidance from your hosts about where to go."
        },
        {
          "id": 20,
          "title": "Eat by the water",
          "body": "Tilapia from the lake, grilled at a shoreline spot, is the local speciality and one of the simplest pleasures of a visit."
        },
        {
          "id": 21,
          "title": "Stay overnight",
          "body": "Day trips from Kumasi are possible, but the lake is at its best in the early morning and at sunset, when the hills go quiet."
        }
      ],
      "checklist": [
        {
          "id": 37,
          "label": "Swimwear and a towel"
        },
        {
          "id": 38,
          "label": "Cash for boats and meals"
        },
        {
          "id": 39,
          "label": "Insect repellent for the evening"
        },
        {
          "id": 40,
          "label": "Shoes with grip for the descent to the shore"
        },
        {
          "id": 41,
          "label": "A jacket for cool evenings on the water"
        },
        {
          "id": 42,
          "label": "Respectful clothing for village visits"
        }
      ]
    },
    {
      "id": 8,
      "slug": "busua",
      "name": "Busua",
      "region": "Western",
      "tagline": "Warm water, surf lessons and the friendliest beach village on the western coast.",
      "summary": "Busua is a fishing village turned relaxed beach stop, with a wide crescent of sand, surf schools and a short boat ride to the quieter Dixcove coastline.",
      "description": "Busua's beach curves for the better part of a kilometre, sheltered enough for swimming and with enough swell for beginners' surf lessons. It has become the most sociable stop on Ghana's western coast: small guesthouses and beach bars, a handful of surf schools, and a fishing community that still launches canoes from the same sand.\n\nNearby Dixcove has a small English fort on a headland and a working harbour, while the coast westwards towards Axim and Cape Three Points becomes progressively quieter and more dramatic. The water here is warm year-round.\n\nBusua is not a resort strip. It is a village that has absorbed tourism without losing its own rhythm, which makes it a good place to spend a few unplanned days.",
      "hero_image": "assets/images/dest-busua.jpg",
      "hero_credit": "Mac-Jordan Degadjor / CC BY 2.0",
      "lat": 4.8067,
      "lng": -1.9389,
      "geo_precision": "exact",
      "best_time": "The western coast is most reliable for beach days in the drier months from November to March. Surf is generally best when swell picks up, and afternoon showers are common during the wet season.",
      "getting_there": "Busua is reached by road from Takoradi and Agona Nkwanta in the Western Region, with shared taxis and trotros covering the final stretch. Travelling from Accra or Cape Coast takes most of a day.",
      "getting_around": "The village and beach are walkable. Taxis connect Busua with Dixcove and the coast road; boats can be arranged for fishing trips or to reach beaches further along.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 7,
      "categories": [
        "beaches",
        "food",
        "adventure",
        "culture"
      ],
      "gallery": [
        {
          "url": "assets/images/editorial-coast.jpg",
          "alt": "Thatched beach shelter and palms on the Ghanaian coast",
          "caption": "Beach shelters in Busua",
          "credit": "Kwameghana / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-busua.jpg",
          "alt": "The curve of Busua beach with palms behind the sand",
          "caption": "Busua bay",
          "credit": "Mac-Jordan Degadjor / CC BY 2.0"
        },
        {
          "url": "assets/images/editorial-food.jpg",
          "alt": "A bowl of Ghanaian kenkey with fried fish and pepper",
          "caption": "Beachside food",
          "credit": "DromoTetteh / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 22,
          "title": "Learn to surf here",
          "body": "Busua's gentle beach break and several small surf schools make it the most approachable place in Ghana to try surfing for the first time."
        },
        {
          "id": 23,
          "title": "Walk to Dixcove",
          "body": "The headland fort and harbour at Dixcove are a manageable walk or short taxi ride along the coast and worth the trip."
        },
        {
          "id": 24,
          "title": "Buy from the boats",
          "body": "Fishing canoes land on the beach most mornings. Ask about buying fish directly and having it grilled nearby."
        }
      ],
      "checklist": [
        {
          "id": 43,
          "label": "Reef-safe sunscreen"
        },
        {
          "id": 44,
          "label": "Swimwear and a quick-dry towel"
        },
        {
          "id": 45,
          "label": "Cash for surf hire and beach food"
        },
        {
          "id": 46,
          "label": "A torch for unlit paths after dark"
        },
        {
          "id": 47,
          "label": "Mosquito repellent for evenings"
        },
        {
          "id": 48,
          "label": "A relaxed plan — things move slowly here"
        }
      ]
    },
    {
      "id": 9,
      "slug": "ada-foah",
      "name": "Ada Foah",
      "region": "Greater Accra",
      "tagline": "Where the Volta River meets the Atlantic, in a maze of islands and palms.",
      "summary": "Ada Foah sits at the mouth of the Volta River, a low-lying landscape of estuary, sandbars and palm islands that has become Accra's favourite weekend escape.",
      "description": "At Ada Foah the Volta River spreads into a delta before reaching the sea, creating a shoreline of sand spits, mangroves and small islands. The river and the ocean run side by side, and boats are the natural way to get around.\n\nWeekend resorts and guesthouses line the estuary, from simple beach camps to comfortable riverside lodges. Boat trips go out to the sandbars where the river meets the sea, past fishing settlements and birdlife on the estuary.\n\nAda is close enough to Accra for a short break but feels distinctly removed from the city. It is also a working coastal community, with salt production, fishing and boat-building alongside tourism.",
      "hero_image": "assets/images/dest-ada-foah.jpg",
      "hero_credit": "Philip Nalangan / CC BY 4.0",
      "lat": 5.7816,
      "lng": 0.6332,
      "geo_precision": "exact",
      "best_time": "November to March brings the most settled weather for boat trips and beach days. The estuary is greenest in the wet season, when showers are frequent but short.",
      "getting_there": "Ada Foah is reached by road east of Accra through the Ada East district, with shared vehicles and private cars. Boats from the estuary villages are the only way to reach some of the islands.",
      "getting_around": "Boats are the main way to explore the estuary and islands. Local taxis connect the town with resorts along the river; many lodges arrange transfers from Accra.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 8,
      "categories": [
        "beaches",
        "nature",
        "food"
      ],
      "gallery": [
        {
          "url": "assets/images/dest-ada-foah.jpg",
          "alt": "Palms standing in still water at the Volta estuary near Ada Foah",
          "caption": "Palms in the estuary",
          "credit": "Philip Nalangan / CC BY 4.0"
        },
        {
          "url": "assets/images/att-dodi-island.jpg",
          "alt": "A wooden pier reaching into Lake Volta at Dodi Island",
          "caption": "Life on the water",
          "credit": "Hiroo Yamagata / CC BY-SA 2.0"
        },
        {
          "url": "assets/images/editorial-lake.jpg",
          "alt": "Calm water and shoreline on the Volta lake system",
          "caption": "The Volta waterway",
          "credit": "A.r.a.k.e.l.s.h.o.t.s / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 25,
          "title": "Take a boat to the sandbar",
          "body": "The point where the river meets the Atlantic is the classic Ada trip. Arrange it with a local boatman and allow a couple of hours."
        },
        {
          "id": 26,
          "title": "Bring cash",
          "body": "Resorts and boat operators often work on cash. There are few reliable ATMs in the area."
        },
        {
          "id": 27,
          "title": "Watch the birds",
          "body": "The estuary and mangroves attract a wide range of waterbirds; early morning is the best time to see them."
        }
      ],
      "checklist": [
        {
          "id": 49,
          "label": "Cash for boats, food and tips"
        },
        {
          "id": 50,
          "label": "Sun hat and high-factor sunscreen"
        },
        {
          "id": 51,
          "label": "Insect repellent for the estuary at dusk"
        },
        {
          "id": 52,
          "label": "A dry bag for boat trips"
        },
        {
          "id": 53,
          "label": "Sandals that can get wet"
        },
        {
          "id": 54,
          "label": "A book — this is a slow place"
        }
      ]
    },
    {
      "id": 10,
      "slug": "wli",
      "name": "Wli",
      "region": "Volta",
      "tagline": "The Volta Region's great waterfall, at the foot of the Agumatsa range.",
      "summary": "Wli village is the gateway to the Agumatsa waterfalls, a forest reserve where a river drops off a cliff in two tiers and fruit bats hang in the canopy above the path.",
      "description": "The falls at Wli — Agumatsa — are usually described as the highest in West Africa, with the upper fall dropping several hundred metres off the cliff face. The walk in from the village is gentle, shaded and crosses the river on simple bridges, passing a sacred grove and colonies of bats in the trees.\n\nThe reserve around the falls protects forest that shelters butterflies, birds and monkeys, and the community manages access with local guides. A longer, steeper route continues up to the upper falls for those who want more of a hike.\n\nWli is also a good base for the wider Volta Region: Tafi Atome's monkey sanctuary, the mountain village of Amedzofe and the forests around Mount Afadjato are all within reach, making a two- or three-day loop worthwhile.",
      "hero_image": "assets/images/dest-wli.jpg",
      "hero_credit": "Stig Nygaard / CC BY 2.0",
      "lat": 7.1195,
      "lng": 0.5881,
      "geo_precision": "exact",
      "best_time": "The falls carry most water during and just after the rainy season, roughly June to October, when the volume is dramatic. The drier months are easier for the hike but the flow is lighter.",
      "getting_there": "Wli is reached by road from Hohoe in the Volta Region, with shared taxis and local transport covering the last stretch to the village. Most visitors base themselves in Hohoe or at the falls.",
      "getting_around": "The walk to the falls starts from the village and is done on foot with a local guide. A vehicle is useful for reaching Tafi Atome, Amedzofe and other sites in the district.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 9,
      "categories": [
        "waterfalls",
        "nature",
        "adventure",
        "wildlife"
      ],
      "gallery": [
        {
          "url": "assets/images/att-wli-falls.jpg",
          "alt": "The lower Agumatsa waterfall dropping into a pool at Wli",
          "caption": "The lower falls",
          "credit": "Jdjdiwla / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-forest.jpg",
          "alt": "Forest at the foot of the Agumatsa range",
          "caption": "Forest around the falls",
          "credit": "Benebiankie / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-amedzofe.jpg",
          "alt": "The hillside village of Amedzofe in the Volta Region",
          "caption": "Amedzofe, further up the hills",
          "credit": "Williams Penuku / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 28,
          "title": "Swim at the lower falls",
          "body": "The pool beneath the lower fall is safe for a swim when water levels are normal. Ask your guide before entering."
        },
        {
          "id": 29,
          "title": "Take the upper route if you are fit",
          "body": "The climb to the upper falls is steep and can be slippery, but it is quieter and the views back down the valley are excellent."
        },
        {
          "id": 30,
          "title": "Carry small notes",
          "body": "Guides, community entry fees and drinks are usually paid in cash, and change can be hard to find in the villages."
        }
      ],
      "checklist": [
        {
          "id": 55,
          "label": "Trainers with good grip for wet rock"
        },
        {
          "id": 56,
          "label": "A dry bag or waterproof cover for phones"
        },
        {
          "id": 57,
          "label": "Cash for guides and community fees"
        },
        {
          "id": 58,
          "label": "Quick-dry clothing"
        },
        {
          "id": 59,
          "label": "Insect repellent for the forest walk"
        },
        {
          "id": 60,
          "label": "Water and a snack for the upper trail"
        }
      ]
    },
    {
      "id": 11,
      "slug": "nzulezu",
      "name": "Nzulezu",
      "region": "Western",
      "tagline": "A village built on stilts above a lagoon, reached only by canoe.",
      "summary": "Nzulezo is a stilt village on Lake Tadane, reached by a canoe journey through reeds — a community of wooden walkways, schools and shrines built over water.",
      "description": "Nzulezo sits entirely on stilts above Lake Tadane, near the coast west of Takoradi. The village is reached by canoe from Beyin, crossing open water and then a channel cut through reeds. Houses, walkways, a school and a small shrine are all raised on wooden platforms.\n\nOral tradition says the community arrived from the north-west centuries ago, following a snail that led them to the lagoon — the name refers to that story. Life here revolves around fishing, farming on nearby land and, increasingly, hosting visitors.\n\nThe visit is short but memorable, and it is a good example of community-managed tourism: guides come from the village, entry fees support the community, and the canoe trip itself is part of the experience. Combine it with the beaches and forts of the western coast.",
      "hero_image": "assets/images/dest-nzulezu.jpg",
      "hero_credit": "Luke Bosman / CC BY-SA 1.0",
      "lat": 5.021,
      "lng": -2.598,
      "geo_precision": "exact",
      "best_time": "The lagoon is accessible year-round. The drier months from November to March give calmer water and easier travel on the coastal roads.",
      "getting_there": "Boats to Nzulezo leave from Beyin in the Jomoro district, west of Takoradi along the coastal road. Arrange the crossing at the community tourism office in Beyin.",
      "getting_around": "Canoes are the only way to reach the village. Local guides lead the crossing and the walk through the village; life jackets are provided by the operators.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 10,
      "categories": [
        "culture",
        "heritage",
        "nature",
        "adventure"
      ],
      "gallery": [
        {
          "url": "assets/images/dest-nzulezu.jpg",
          "alt": "Stilt houses and walkways above the water at Nzulezo",
          "caption": "Nzulezo stilt village",
          "credit": "Luke Bosman / CC BY-SA 1.0"
        },
        {
          "url": "assets/images/att-dodi-island.jpg",
          "alt": "A pier over still water in Ghana",
          "caption": "Waterborne life",
          "credit": "Hiroo Yamagata / CC BY-SA 2.0"
        },
        {
          "url": "assets/images/editorial-lake.jpg",
          "alt": "Still water and reeds on a Ghanaian lagoon",
          "caption": "Lake Tadane",
          "credit": "A.r.a.k.e.l.s.h.o.t.s / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 31,
          "title": "Ask before you photograph",
          "body": "People live here year-round. Ask before photographing individuals and respect any request not to be filmed."
        },
        {
          "id": 32,
          "title": "Bring small notes",
          "body": "The canoe fee, guide tip and any craft purchases are paid locally in cash, and change is scarce."
        },
        {
          "id": 33,
          "title": "Combine with Beyin beach",
          "body": "The coast at Beyin and nearby beaches makes a natural pairing with the lagoon crossing for a full day."
        }
      ],
      "checklist": [
        {
          "id": 61,
          "label": "Cash in small denominations"
        },
        {
          "id": 62,
          "label": "A hat and sun protection for the canoe"
        },
        {
          "id": 63,
          "label": "A waterproof bag for cameras"
        },
        {
          "id": 64,
          "label": "Footwear that can handle wet planks"
        },
        {
          "id": 65,
          "label": "Water for the crossing"
        },
        {
          "id": 66,
          "label": "Patience — crossings are timed with other visitors"
        }
      ]
    },
    {
      "id": 12,
      "slug": "paga",
      "name": "Paga",
      "region": "Upper East",
      "tagline": "Ghana's northern border town, known for its sacred crocodiles and painted compounds.",
      "summary": "Paga sits on the Burkina Faso border in the far north-east, where a crocodile pond, elaborate painted architecture and a busy cross-border trade give the town its character.",
      "description": "Paga is the last major town before the Burkina Faso border and the cultural heart of the Kassena-Nankana area. Its best-known site is the crocodile pond, where a community of Nile crocodiles has long been protected and is considered sacred by local families.\n\nThe wider Upper East Region is famous for its decorated architecture: compounds of earthen walls painted in geometric black, white and red patterns, best known around Sirigu and the surrounding villages. The region also holds the rock formations and shrines of the Tongo Hills.\n\nThis is a long way from Ghana's coast and few visitors make it here — which is exactly the appeal. The landscape, languages and building traditions are distinct from the south, and the border crossing at Paga leads on to Burkina Faso.",
      "hero_image": "assets/images/dest-paga.jpg",
      "hero_credit": "Dieu-Donné Gameli / CC BY-SA 3.0",
      "lat": 10.97,
      "lng": -1.1017,
      "geo_precision": "exact",
      "best_time": "The far north is hottest from March to May, before the rains arrive. November to February is drier and more comfortable, though nights can be cool and dusty Harmattan winds blow in December and January.",
      "getting_there": "Paga is reached by road from Bolgatanga and Tamale, with shared vehicles and buses along the northern highway. The Ghana–Burkina Faso border is at the edge of town.",
      "getting_around": "Local taxis and shared vehicles connect the town centre, the crocodile pond and nearby villages. A vehicle for the day is the most practical way to reach Sirigu and the Tongo Hills.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 11,
      "categories": [
        "wildlife",
        "culture",
        "heritage",
        "adventure"
      ],
      "gallery": [
        {
          "url": "assets/images/att-paga-pond.jpg",
          "alt": "A Nile crocodile resting at the Paga crocodile pond",
          "caption": "The sacred crocodile pond",
          "credit": "Dieu-Donné Gameli / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/dest-paga.jpg",
          "alt": "A crocodile at the water's edge at Paga",
          "caption": "Crocodiles at Paga",
          "credit": "Dieu-Donné Gameli / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/att-tongo.jpg",
          "alt": "Rock formations and shrines at the Tongo Hills",
          "caption": "Tongo Hills, south of Paga",
          "credit": "Knowledge and philosophy / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 34,
          "title": "Follow the guide at the pond",
          "body": "The crocodiles are habituated but still wild. Guides from the community manage all contact and know which animals to approach."
        },
        {
          "id": 35,
          "title": "See the painted compounds",
          "body": "The decorated architecture around Sirigu is best seen through a community tourism guide, who can arrange visits with families who welcome them."
        },
        {
          "id": 36,
          "title": "Time the border",
          "body": "If you plan to cross into Burkina Faso, check current opening hours and requirements in advance; arrangements change."
        }
      ],
      "checklist": [
        {
          "id": 67,
          "label": "Cool, loose clothing and a hat"
        },
        {
          "id": 68,
          "label": "Cash — few card facilities in the far north"
        },
        {
          "id": 69,
          "label": "A guide booked in advance for Sirigu"
        },
        {
          "id": 70,
          "label": "Water in quantity; the heat is serious"
        },
        {
          "id": 71,
          "label": "Passport if continuing to Burkina Faso"
        },
        {
          "id": 72,
          "label": "Respectful dress for village visits"
        }
      ]
    },
    {
      "id": 13,
      "slug": "axim",
      "name": "Axim",
      "region": "Western",
      "tagline": "A fort, a fishing beach and the quiet end of Ghana's western coast.",
      "summary": "Axim is a low-key coastal town with a seventeenth-century fort, a wide working beach and easy access to the wilder coast at Cape Three Points.",
      "description": "Axim's Fort St Anthony was built by the Portuguese and later held by the Dutch and the British. It sits at the edge of town facing the sea, an understated counterpoint to the larger castles at Elmina and Cape Coast.\n\nThe town is a working fishing community, and its beach — broad, open and lined with canoes — is one of the most honest stretches of coast in Ghana. There are few facilities, which keeps it quiet.\n\nAxim is a good base for the far western coast. Cape Three Points, the southernmost tip of Ghana, is a short drive away, and the coastline between them is largely undeveloped.",
      "hero_image": "assets/images/dest-axim.jpg",
      "hero_credit": "Jesuraj Alakassery / CC BY-SA 4.0",
      "lat": 4.8654,
      "lng": -2.2422,
      "geo_precision": "exact",
      "best_time": "November to March offers the driest beach weather. The coast is humid year-round, with rain most likely between April and July.",
      "getting_there": "Axim lies west of Takoradi along the coastal road, served by shared taxis, trotros and buses. Cape Three Points is reached by a further drive on smaller roads.",
      "getting_around": "The town centre, fort and beach are within walking distance. A taxi or hired vehicle is needed for Cape Three Points and the surrounding coastline.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 12,
      "categories": [
        "heritage",
        "beaches",
        "culture",
        "nature"
      ],
      "gallery": [
        {
          "url": "assets/images/dest-axim.jpg",
          "alt": "Fort St Anthony at Axim standing above the shoreline",
          "caption": "Fort St Anthony",
          "credit": "Jesuraj Alakassery / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/att-cape-three-points.jpg",
          "alt": "Palms leaning over the sea near Cape Three Points",
          "caption": "Cape Three Points",
          "credit": "Friedmut Abel / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-coast.jpg",
          "alt": "Palm-thatched shelter on a quiet Ghanaian beach",
          "caption": "The western shoreline",
          "credit": "Kwameghana / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 37,
          "title": "Drive out to Cape Three Points",
          "body": "The lighthouse and headland at Ghana's southern tip are the reason many travellers come this far west. The road is rough in places."
        },
        {
          "id": 38,
          "title": "Keep expectations simple",
          "body": "Axim has little tourist infrastructure. That is the point — eat what the town eats and enjoy an unarranged day."
        },
        {
          "id": 39,
          "title": "Carry cash from Takoradi",
          "body": "ATMs are scarce on this stretch of coast. Withdraw before you travel."
        }
      ],
      "checklist": [
        {
          "id": 73,
          "label": "Cash withdrawn before leaving Takoradi"
        },
        {
          "id": 74,
          "label": "Sun protection for the open beach"
        },
        {
          "id": 75,
          "label": "Insect repellent for evenings"
        },
        {
          "id": 76,
          "label": "A torch for unlit streets"
        },
        {
          "id": 77,
          "label": "Patience for rough roads"
        },
        {
          "id": 78,
          "label": "Swimwear for quiet beach days"
        }
      ]
    },
    {
      "id": 14,
      "slug": "akosombo",
      "name": "Akosombo",
      "region": "Eastern",
      "tagline": "The dam that made Lake Volta, and the water that followed it.",
      "summary": "Akosombo is home to the dam that created Lake Volta, the world's largest reservoir by surface area, with ferry routes and islands spreading north from the gorge.",
      "description": "The Akosombo Dam was completed in the 1960s, damming the Volta River and creating a reservoir that stretches for hundreds of kilometres into the northern half of the country. The gorge itself is dramatic, with the lake held between forested hills.\n\nThe lake supports ferries, fishing communities and island settlements, and a small tourism scene has grown around it: lakeside hotels, boat trips and viewpoints over the dam. Dodi Island, reached by boat, is a popular day trip from the area.\n\nAkosombo is an easy stop on the road between Accra and the Volta Region, and it explains a great deal about modern Ghana — power, migration and the reshaping of a river.",
      "hero_image": "assets/images/dest-akosombo.jpg",
      "hero_credit": "ZSM / CC BY-SA 3.0",
      "lat": 6.2698,
      "lng": 0.0509,
      "geo_precision": "exact",
      "best_time": "The area is humid and green for much of the year. November to March is drier and clearer, with better views from the gorge.",
      "getting_there": "Akosombo lies on the Accra–Ho road and is served by buses and shared vehicles. Lake ferries connect ports further north along the reservoir.",
      "getting_around": "Taxis cover the town and dam area. Boats to Dodi Island and other lake destinations depart from local jetties and lakefront hotels.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 13,
      "categories": [
        "nature",
        "adventure",
        "culture"
      ],
      "gallery": [
        {
          "url": "assets/images/att-akosombo-dam.jpg",
          "alt": "Water spilling through the Akosombo Dam spillway",
          "caption": "The dam spillway",
          "credit": "ZSM / CC BY-SA 3.0"
        },
        {
          "url": "assets/images/att-dodi-island.jpg",
          "alt": "A jetty on Lake Volta at Dodi Island",
          "caption": "Dodi Island",
          "credit": "Hiroo Yamagata / CC BY-SA 2.0"
        },
        {
          "url": "assets/images/editorial-lake.jpg",
          "alt": "The wide surface of Lake Volta",
          "caption": "Lake Volta",
          "credit": "A.r.a.k.e.l.s.h.o.t.s / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 40,
          "title": "See the lake from the water",
          "body": "The gorge is impressive from the road, but a boat trip shows the scale of the reservoir and reaches islands you cannot drive to."
        },
        {
          "id": 41,
          "title": "Ask about dam access",
          "body": "Security arrangements at the dam change. Check in advance whether visitor access is available during your trip."
        },
        {
          "id": 42,
          "title": "Stop on the Accra–Ho run",
          "body": "If you are travelling between Accra and the Volta Region, Akosombo makes a natural break in the journey."
        }
      ],
      "checklist": [
        {
          "id": 79,
          "label": "Sun protection for boat trips"
        },
        {
          "id": 80,
          "label": "A light rain layer — the gorge catches weather"
        },
        {
          "id": 81,
          "label": "Cash for boats and local meals"
        },
        {
          "id": 82,
          "label": "A camera with a wide lens for the lake"
        },
        {
          "id": 83,
          "label": "Water and snacks"
        },
        {
          "id": 84,
          "label": "Ask before photographing dam infrastructure"
        }
      ]
    },
    {
      "id": 15,
      "slug": "shai-hills",
      "name": "Shai Hills",
      "region": "Greater Accra",
      "tagline": "Savannah and rock outcrops an hour from the capital.",
      "summary": "Shai Hills Resource Reserve protects a pocket of savannah, inselbergs and wildlife within easy reach of Accra — the closest thing to a safari from the city.",
      "description": "Shai Hills is a protected reserve of open grassland, wooded valleys and granite hills rising abruptly out of the coastal plain. It is small compared to Mole but close to Accra, which makes it a practical half-day trip.\n\nThe reserve holds antelope, baboons, monkeys and a good number of bird species, along with caves that were used as refuges during the nineteenth century. Guided walks and short drives with a ranger are the way to see it.\n\nBecause it sits between Accra and the Volta road, Shai Hills can be combined with a day out towards Ada Foah or Akosombo.",
      "hero_image": "assets/images/dest-shai-hills.jpg",
      "hero_credit": "Matti Blume / CC BY-SA 4.0",
      "lat": 5.9056,
      "lng": 0.0633,
      "geo_precision": "exact",
      "best_time": "Early morning and late afternoon are best for wildlife and for the heat. The dry season from November to March gives clearer tracks.",
      "getting_there": "The reserve entrance is on the Accra–Aflao road east of the city, reachable by car or taxi in about an hour from central Accra.",
      "getting_around": "Rangers lead walking safaris and vehicle tours inside the reserve; private vehicles are not permitted to wander unaccompanied.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 14,
      "categories": [
        "wildlife",
        "nature",
        "adventure"
      ],
      "gallery": [
        {
          "url": "assets/images/att-shai-hills.jpg",
          "alt": "Rocky hills and savannah vegetation in Shai Hills Resource Reserve",
          "caption": "The inselbergs",
          "credit": "Matti Blume / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-shai-hills.jpg",
          "alt": "Grassland and rock outcrops at Shai Hills",
          "caption": "Reserve landscape",
          "credit": "Matti Blume / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/dest-mole.jpg",
          "alt": "An elephant in Ghanaian savannah",
          "caption": "Ghanaian savannah wildlife",
          "credit": "Matti Blume / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 43,
          "title": "Go early",
          "body": "Wildlife is more active and the walking is far more comfortable in the first hours after opening."
        },
        {
          "id": 44,
          "title": "Ask about the caves",
          "body": "The reserve's caves carry a history of refuge during conflict. Walking to them with a ranger adds real context to the landscape."
        },
        {
          "id": 45,
          "title": "Pair it with Ada",
          "body": "Shai Hills sits on the road towards Ada Foah, making a natural morning stop on the way to the estuary."
        }
      ],
      "checklist": [
        {
          "id": 85,
          "label": "Walking shoes and a hat"
        },
        {
          "id": 86,
          "label": "Water — there is little shade on the tracks"
        },
        {
          "id": 87,
          "label": "Binoculars for birds"
        },
        {
          "id": 88,
          "label": "Cash for entry and guide fees"
        },
        {
          "id": 89,
          "label": "Long sleeves for early walks"
        },
        {
          "id": 90,
          "label": "No plastic bags — reserve rules apply"
        }
      ]
    },
    {
      "id": 16,
      "slug": "amedzofe",
      "name": "Amedzofe",
      "region": "Volta",
      "tagline": "A mountain village in the clouds, with trails to Mount Gemi.",
      "summary": "Amedzofe sits high in the Volta Region's hills, one of the highest settlements in Ghana, with a cool climate, forest walks and a summit trail to Mount Gemi.",
      "description": "Amedzofe is a small Ewe village on a ridge in the Ho West district, high enough to be noticeably cool and often wrapped in cloud. The surrounding hills are forested, and the village is a base for walks to waterfalls, caves and viewpoints.\n\nThe trail to Mount Gemi, the second-highest peak in Ghana, takes a few hours on foot and passes through forest and farmland. On clear days the view reaches across the Volta Region towards Togo.\n\nCommunity tourism here is organised by local guides, and the village has guesthouses and a training centre. It is one of the most rewarding places in southern Ghana for walkers, and it pairs easily with Wli and Tafi Atome.",
      "hero_image": "assets/images/dest-amedzofe.jpg",
      "hero_credit": "Williams Penuku / CC BY-SA 4.0",
      "lat": 6.8453,
      "lng": 0.436,
      "geo_precision": "exact",
      "best_time": "The hills are cool and often misty; December to February is driest with the best chance of clear summit views. The rainy season brings lush forest and muddy trails.",
      "getting_there": "Amedzofe is reached by road from Ho or Hohoe in the Volta Region. Shared taxis and trotros run to the village, with the last stretch climbing steeply.",
      "getting_around": "Village paths connect the guesthouses, viewpoints and trailheads on foot. Local guides lead the Mount Gemi hike and visits to nearby caves and waterfalls.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 15,
      "categories": [
        "adventure",
        "nature",
        "culture",
        "waterfalls"
      ],
      "gallery": [
        {
          "url": "assets/images/dest-amedzofe.jpg",
          "alt": "The hillside village of Amedzofe with Mount Gemi behind",
          "caption": "Amedzofe and Mount Gemi",
          "credit": "Williams Penuku / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-volta.jpg",
          "alt": "Green hills and valleys in the Volta Region",
          "caption": "Volta hills",
          "credit": "Peterkwashie / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/att-wli-falls.jpg",
          "alt": "A waterfall in the Volta Region forest",
          "caption": "Waterfalls nearby",
          "credit": "Jdjdiwla / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 46,
          "title": "Hike with a local guide",
          "body": "Trails are unmarked in places and the weather changes fast. Guides from the village know the routes and the safest lines up Mount Gemi."
        },
        {
          "id": 47,
          "title": "Pack for cloud",
          "body": "Amedzofe can be wet and cool even when the lowlands are hot. Bring a waterproof layer and something warm for the evening."
        },
        {
          "id": 48,
          "title": "Stay a night",
          "body": "Day trips rush the best part. Sunrise over the hills from the village is the reason to stay."
        }
      ],
      "checklist": [
        {
          "id": 91,
          "label": "Waterproof jacket and warm layer"
        },
        {
          "id": 92,
          "label": "Hiking shoes with grip"
        },
        {
          "id": 93,
          "label": "Cash for guides and village fees"
        },
        {
          "id": 94,
          "label": "Head torch for early starts"
        },
        {
          "id": 95,
          "label": "Water and high-energy snacks"
        },
        {
          "id": 96,
          "label": "A dry bag for the summit walk"
        }
      ]
    },
    {
      "id": 17,
      "slug": "keta",
      "name": "Keta",
      "region": "Volta",
      "tagline": "A narrow strip of coast between the sea and the lagoon.",
      "summary": "Keta is a coastal town squeezed between the Atlantic and the Keta Lagoon, with a Danish fort, a long history of coastal trade and a shoreline that is constantly shifting.",
      "description": "Keta sits on a sandbar between the Gulf of Guinea and the Keta Lagoon, a position that has shaped its history. The Danish fort, Fort Prinzenstein, was an important trading post and later a site in the transatlantic slave trade; part of it has been lost to the sea.\n\nCoastal erosion has been a defining problem here for generations, and the sea defences now visible along the shore are part of that long story. The lagoon behind the town supports fishing and birdlife.\n\nKeta is quiet and rarely crowded, with wide beaches and a strong sense of a place living with the water. It is easily combined with a Volta Region itinerary.",
      "hero_image": "assets/images/dest-keta.jpg",
      "hero_credit": "Amuzujoe / CC BY-SA 4.0",
      "lat": 5.9216,
      "lng": 0.9911,
      "geo_precision": "exact",
      "best_time": "November to March is the driest and most comfortable period. The coast is humid year-round, with rain most likely between May and July.",
      "getting_there": "Keta lies on the coastal road east of Accra towards the Volta Region and Togo, served by buses and shared vehicles from Accra, Ho and Aflao.",
      "getting_around": "The town is small enough to walk. Local taxis cover the fort, the beaches and the lagoon side of town.",
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "sort": 16,
      "categories": [
        "heritage",
        "beaches",
        "culture",
        "nature"
      ],
      "gallery": [
        {
          "url": "assets/images/dest-keta.jpg",
          "alt": "Waves breaking on the shore at Keta",
          "caption": "The Keta shoreline",
          "credit": "Amuzujoe / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-coast.jpg",
          "alt": "A palm shelter on a Ghanaian beach",
          "caption": "Beach shelters",
          "credit": "Kwameghana / CC BY-SA 4.0"
        },
        {
          "url": "assets/images/editorial-lake.jpg",
          "alt": "Calm water on a coastal lagoon",
          "caption": "The Keta Lagoon",
          "credit": "A.r.a.k.e.l.s.h.o.t.s / CC BY-SA 4.0"
        }
      ],
      "tips": [
        {
          "id": 49,
          "title": "Visit the fort with context",
          "body": "Fort Prinzenstein is partly in ruins and partly reclaimed by the sea. A local guide explains both the trade history and the erosion that threatens the site."
        },
        {
          "id": 50,
          "title": "Look for the birds",
          "body": "The lagoon is a stop for waterbirds. Early morning along the lagoon shore is the best time to see them."
        },
        {
          "id": 51,
          "title": "Combine with Aflao",
          "body": "Keta is close to the Togo border, making it an easy addition to a route along the eastern coast."
        }
      ],
      "checklist": [
        {
          "id": 97,
          "label": "Cash for entry fees and local food"
        },
        {
          "id": 98,
          "label": "Sun protection for the open shore"
        },
        {
          "id": 99,
          "label": "Insect repellent for the lagoon at dusk"
        },
        {
          "id": 100,
          "label": "Shoes for walking on sand and rubble"
        },
        {
          "id": 101,
          "label": "A light layer for the sea breeze"
        },
        {
          "id": 102,
          "label": "Time to talk to local guides"
        }
      ]
    }
  ],
  "attractions": [
    {
      "id": 1,
      "slug": "cape-coast-castle",
      "name": "Cape Coast Castle",
      "destination_id": 2,
      "region": "Central",
      "nearest_town": "Cape Coast",
      "summary": "A UNESCO World Heritage castle above the Atlantic, and one of the most important sites of memory in the Atlantic world.",
      "description": "Built and repeatedly rebuilt by European traders from the seventeenth century, Cape Coast Castle became the administrative centre of British power on the Gold Coast. Its dungeons held enslaved Africans before they were forced through the Door of No Return onto ships.\n\nThe guided tour is led by guides whose families live in the town, and it does not soften the history. Above the dungeons, the castle's chapel and governors' quarters show how close comfort and brutality were kept.",
      "image": "assets/images/att-cape-coast-castle.jpg",
      "lat": 5.1036,
      "lng": -1.2411,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "culture",
        "city"
      ]
    },
    {
      "id": 2,
      "slug": "elmina-castle",
      "name": "Elmina Castle (St George's)",
      "destination_id": 3,
      "region": "Central",
      "nearest_town": "Elmina",
      "summary": "The oldest European building in sub-Saharan Africa, standing directly over Elmina's working fishing harbour.",
      "description": "Founded by the Portuguese in the late fifteenth century as a trading fort, São Jorge da Mina later passed to the Dutch and the British. Its whitewashed walls and courtyard now hold a museum and a guided tour that addresses the slave trade conducted through the castle.\n\nWhat makes Elmina distinctive is the life around it: canoes land on the beach below the walls, fish are smoked along the shore, and the harbour is as busy as it has been for centuries.",
      "image": "assets/images/att-elmina-castle.jpg",
      "lat": 5.0827,
      "lng": -1.3482,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "culture",
        "city"
      ]
    },
    {
      "id": 3,
      "slug": "kakum-national-park",
      "name": "Kakum National Park",
      "destination_id": 2,
      "region": "Central",
      "nearest_town": "Abrafo, near Cape Coast",
      "summary": "Rainforest canopy walks on rope bridges suspended high above the forest floor.",
      "description": "Kakum protects a large area of moist tropical forest north of Cape Coast. Its canopy walkway — a series of rope and plank bridges strung between emergent trees — gives visitors a view of the forest normally reserved for birds and monkeys.\n\nRangers lead walks along forest trails as well, and the early morning is the best time for birdlife and for cooler temperatures. The walkway is not suitable for those with a strong fear of heights, but the forest trails remain an option.",
      "image": "assets/images/att-kakum.jpg",
      "lat": 5.4421,
      "lng": -1.348,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "adventure",
        "wildlife"
      ]
    },
    {
      "id": 4,
      "slug": "aburi-botanical-gardens",
      "name": "Aburi Botanical Gardens",
      "destination_id": 5,
      "region": "Eastern",
      "nearest_town": "Aburi",
      "summary": "Nineteenth-century hill gardens with an avenue of towering palms and labelled tropical trees.",
      "description": "Laid out in the late nineteenth century, Aburi's gardens were established as a hill station and experimental ground for tropical plants. The great avenue of palms and the broad lawns are the centrepiece.\n\nPaths wind through collections of ornamental and economic trees, and the gardens are a good place to spend a slow morning before exploring the surrounding Akuapem hills.",
      "image": "assets/images/att-aburi-gardens.jpg",
      "lat": 5.8475,
      "lng": -0.1753,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "culture"
      ]
    },
    {
      "id": 5,
      "slug": "wli-waterfalls",
      "name": "Wli (Agumatsa) Waterfalls",
      "destination_id": 10,
      "region": "Volta",
      "nearest_town": "Wli Afegame",
      "summary": "A forest waterfall at the foot of the Agumatsa range, reached on foot through a bat-filled grove.",
      "description": "The lower falls at Wli drop off a cliff into a pool that is swimmable at normal water levels. The walk in crosses the Agumatsa river and passes trees where fruit bats hang in numbers.\n\nA steeper trail continues to the upper falls for those with the time and the legs. Guides from the village manage access and can explain the reserve's ecology.",
      "image": "assets/images/att-wli-falls.jpg",
      "lat": 7.126,
      "lng": 0.591,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "waterfalls",
        "nature",
        "adventure"
      ]
    },
    {
      "id": 6,
      "slug": "paga-crocodile-pond",
      "name": "Paga Crocodile Pond",
      "destination_id": 12,
      "region": "Upper East",
      "nearest_town": "Paga",
      "summary": "A community-protected pond where Nile crocodiles are considered sacred by local families.",
      "description": "The pond at Paga is home to a group of Nile crocodiles that have long been protected by the community. Guides introduce visitors to the animals and explain the beliefs that keep them safe.\n\nIt is a small, informal site rather than a wildlife park, and the experience lasts under an hour — but it is one of the more unusual stops in northern Ghana.",
      "image": "assets/images/att-paga-pond.jpg",
      "lat": 10.9848,
      "lng": -1.1089,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "wildlife",
        "culture"
      ]
    },
    {
      "id": 7,
      "slug": "larabanga-mosque",
      "name": "Larabanga Mosque",
      "destination_id": 6,
      "region": "Savannah",
      "nearest_town": "Larabanga",
      "summary": "A Sudanese-style mud-and-timber mosque, said to be one of the oldest in West Africa.",
      "description": "The mosque at Larabanga is built in the Sudano-Sahelian style, with tapered earthen walls, timber beams projecting from the facade and a distinctive whitewashed finish.\n\nIt sits beside the road to Mole National Park and is closely linked to the village's history. Visitors should ask permission before approaching or photographing, and dress respectfully.",
      "image": "assets/images/att-larabanga.jpg",
      "lat": 9.2203,
      "lng": -1.8599,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "culture"
      ]
    },
    {
      "id": 8,
      "slug": "lake-bosumtwi-rim",
      "name": "Lake Bosumtwi crater rim",
      "destination_id": 7,
      "region": "Ashanti",
      "nearest_town": "Abono",
      "summary": "Forest trails on the rim of a million-year-old crater lake, with views across the water.",
      "description": "Paths around the crater rim climb through farmland and forest to viewpoints over the lake. Several villages are linked by footpaths, and boats can be hired at Abono for crossings.\n\nThe rim walk is a half-day undertaking rather than a technical hike, but the humidity is high and a local guide is worth having for directions and access.",
      "image": "assets/images/att-bosumtwi-crater.jpg",
      "lat": 6.506,
      "lng": -1.4102,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "adventure"
      ]
    },
    {
      "id": 9,
      "slug": "jamestown-lighthouse",
      "name": "Jamestown Lighthouse",
      "destination_id": 1,
      "region": "Greater Accra",
      "nearest_town": "Accra",
      "summary": "The red-and-white lighthouse above Accra's old harbour, at the centre of the city's oldest quarter.",
      "description": "Jamestown's lighthouse rises above the fishing harbour and the streets of the old Ga settlement. The area around it holds colonial-era buildings, boxing gyms and some of the most photographed corners of Accra.\n\nWalk down towards the harbour and the beach to see the fishing fleet and the everyday bustle that makes the quarter worth an early start.",
      "image": "assets/images/att-jamestown.jpg",
      "lat": 5.5331,
      "lng": -0.2121,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "city",
        "culture"
      ]
    },
    {
      "id": 10,
      "slug": "black-star-gate",
      "name": "Black Star Gate & Independence Square",
      "destination_id": 1,
      "region": "Greater Accra",
      "nearest_town": "Accra",
      "summary": "The monument marking Ghana's independence, on the wide ceremonial square facing the sea.",
      "description": "Independence Square was laid out to mark Ghana's independence in 1957. The Black Star Gate, the memorial arches and the vast parade ground are used for national celebrations and are open to walk through.\n\nIt is a short stop, but an important one for understanding the country's modern history — best combined with Jamestown and the nearby Kwame Nkrumah Memorial Park.",
      "image": "assets/images/att-black-star.jpg",
      "lat": 5.549,
      "lng": -0.1929,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "city"
      ]
    },
    {
      "id": 11,
      "slug": "makola-market",
      "name": "Makola Market",
      "destination_id": 1,
      "region": "Greater Accra",
      "nearest_town": "Accra",
      "summary": "Accra's great trading heart, where cloth, food and household goods fill the streets around Kojo Thompson Road.",
      "description": "Makola is the commercial engine of central Accra, run largely by women traders. The market spills into the surrounding streets, with sections for cloth, beads, food, cookware and almost everything else.\n\nGo with a purpose, keep valuables close, and ask before taking photographs. Even a short visit gives a clearer sense of the city than any museum.",
      "image": "assets/images/att-makola.jpg",
      "lat": 5.5481,
      "lng": -0.2069,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "food",
        "city",
        "culture"
      ]
    },
    {
      "id": 12,
      "slug": "labadi-beach",
      "name": "Labadi Beach",
      "destination_id": 1,
      "region": "Greater Accra",
      "nearest_town": "Accra",
      "summary": "The capital's best-known beach, busy with football, food and music at weekends.",
      "description": "Labadi is the closest proper beach to central Accra, with a long stretch of sand, beach bars and plenty of activity. Weekends bring drumming, football and families, while weekdays are quieter.\n\nIt is a working leisure beach rather than a resort, and the food stalls and music are a large part of the appeal.",
      "image": "assets/images/att-labadi.jpg",
      "lat": 5.5639,
      "lng": -0.1406,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "beaches",
        "food",
        "city"
      ]
    },
    {
      "id": 13,
      "slug": "manhyia-palace",
      "name": "Manhyia Palace",
      "destination_id": 4,
      "region": "Ashanti",
      "nearest_town": "Kumasi",
      "summary": "The seat of the Asantehene, with a museum tracing the history of the Asante kingdom.",
      "description": "Manhyia is the palace of the Asantehene, the traditional ruler of the Asante people. The museum in the old palace buildings displays regalia, photographs and objects connected to the kingdom's history, including the period of British annexation.\n\nThe palace remains a working royal residence, so access and opening times can vary. Check locally before making the trip across the city.",
      "image": "assets/images/att-manhyia.jpg",
      "lat": 6.7038,
      "lng": -1.6156,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 1,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "heritage",
        "culture",
        "city"
      ]
    },
    {
      "id": 14,
      "slug": "kejetia-market",
      "name": "Kejetia Market",
      "destination_id": 4,
      "region": "Ashanti",
      "nearest_town": "Kumasi",
      "summary": "One of West Africa's largest markets, rebuilt around a vast modern trading hall.",
      "description": "Kejetia is the commercial centre of Kumasi, with thousands of traders selling food, cloth, hardware and household goods. The modern hall replaced much of the older market but the surrounding streets remain just as busy.\n\nIt is easy to lose your bearings. Go with a local guide or a specific purchase in mind, and expect to spend longer than planned.",
      "image": "assets/images/att-kejetia.jpg",
      "lat": 6.6958,
      "lng": -1.621,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "food",
        "city",
        "culture"
      ]
    },
    {
      "id": 15,
      "slug": "boabeng-fiema",
      "name": "Boabeng-Fiema Monkey Sanctuary",
      "destination_id": null,
      "region": "Bono East",
      "nearest_town": "Nkoranza",
      "summary": "A forest sanctuary where mona and black-and-white colobus monkeys live alongside two villages.",
      "description": "Boabeng and Fiema are neighbouring villages that have protected the monkeys living in the surrounding forest for generations. Mona and black-and-white colobus monkeys move freely between the trees and the villages.\n\nGuides from the community lead walks along forest paths and explain the traditions that make the sanctuary work. It is a genuinely community-run site, and the forest is small enough to explore in a morning.",
      "image": "assets/images/att-boabeng-fiema.jpg",
      "lat": 7.758,
      "lng": -1.7258,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "wildlife",
        "nature",
        "culture"
      ]
    },
    {
      "id": 16,
      "slug": "tafi-atome",
      "name": "Tafi Atome Monkey Sanctuary",
      "destination_id": null,
      "region": "Volta",
      "nearest_town": "Tafi Atome, near Hohoe",
      "summary": "A community sanctuary where mona monkeys are considered sacred and tolerated close approach.",
      "description": "The monkey sanctuary at Tafi Atome began as a community conservation project and now protects a population of mona monkeys that move through the village and its forest. Guides explain how the sanctuary works and how the community benefits.\n\nIt is a short visit, easily combined with Wli and Amedzofe in the Volta Region, and a good example of how local belief and conservation can support one another.",
      "image": "assets/images/att-tafi-atome.jpg",
      "lat": 6.906,
      "lng": 0.3856,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "wildlife",
        "culture",
        "nature"
      ]
    },
    {
      "id": 17,
      "slug": "tongo-hills",
      "name": "Tongo Hills & Tengzug Shrines",
      "destination_id": null,
      "region": "Upper East",
      "nearest_town": "Tongo, near Bolgatanga",
      "summary": "Granite hills, caves and shrines that remain central to Talensi religious life.",
      "description": "The Tongo Hills rise out of the Upper East plains in a cluster of granite outcrops, caves and narrow passages. The shrines at Tengzug are still actively used, and visits are made with a local guide who explains the protocols.\n\nThe landscape is striking and the cultural context is essential to understanding it. Dress respectfully and expect to be asked not to enter certain areas.",
      "image": "assets/images/att-tongo.jpg",
      "lat": 10.6809,
      "lng": -0.812,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "adventure",
        "culture",
        "heritage"
      ]
    },
    {
      "id": 18,
      "slug": "kintampo-waterfalls",
      "name": "Kintampo Waterfalls",
      "destination_id": null,
      "region": "Bono East",
      "nearest_town": "Kintampo",
      "summary": "A three-tiered waterfall in forest, with a canopy walkway and pools below the falls.",
      "description": "Kintampo's falls drop in stages through forest north of the town, with a short walkway through the trees and paths down to the water. The setting is green and cool even in the hot season.\n\nIt is a convenient stop on the road between Kumasi and the north, and rarely crowded on weekdays.",
      "image": "assets/images/att-kintampo-falls.jpg",
      "lat": 8.0896,
      "lng": -1.698,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "waterfalls",
        "nature",
        "adventure"
      ]
    },
    {
      "id": 19,
      "slug": "boti-falls",
      "name": "Boti Falls",
      "destination_id": null,
      "region": "Eastern",
      "nearest_town": "Boti, near Koforidua",
      "summary": "Twin falls in the Eastern Region, reached by a stepped path down into the forest.",
      "description": "Boti's two falls — known locally as male and female — drop into a pool surrounded by forest at the end of a long staircase. The site includes picnic areas and a rock formation that has become a local landmark.\n\nIt is a popular weekend trip from Accra, best visited early before the coaches arrive.",
      "image": "assets/images/att-boti-falls.jpg",
      "lat": 6.1833,
      "lng": -0.2167,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "waterfalls",
        "nature",
        "adventure"
      ]
    },
    {
      "id": 20,
      "slug": "nzulezu-stilt-village",
      "name": "Nzulezo Stilt Village",
      "destination_id": 11,
      "region": "Western",
      "nearest_town": "Beyin",
      "summary": "A village built entirely on stilts above Lake Tadane, reached by canoe through the reeds.",
      "description": "Nzulezo's houses, walkways and school stand on wooden platforms above the lagoon. The canoe crossing from Beyin is part of the experience, passing open water and a channel cut through reeds.\n\nVisits are managed by the community, with local guides and an entry fee that supports the village. It is a living settlement, not a reconstruction, so ask before photographing people and their homes.",
      "image": "assets/images/dest-nzulezu.jpg",
      "lat": 5.021,
      "lng": -2.598,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "culture",
        "heritage",
        "nature"
      ]
    },
    {
      "id": 21,
      "slug": "cape-three-points",
      "name": "Cape Three Points",
      "destination_id": 13,
      "region": "Western",
      "nearest_town": "Near Axim",
      "summary": "The southernmost tip of Ghana, with a lighthouse, rough surf and palms leaning over the water.",
      "description": "Cape Three Points marks the southern extremity of Ghana, where the coastline turns east towards Takoradi. The lighthouse and headland offer wide views of the Atlantic, and the beaches nearby are among the least developed in the country.\n\nThe road in is rough and facilities are minimal. Bring what you need and arrange your transport back in advance.",
      "image": "assets/images/att-cape-three-points.jpg",
      "lat": 4.7398,
      "lng": -2.0917,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "adventure",
        "beaches"
      ]
    },
    {
      "id": 22,
      "slug": "kyabobo-national-park",
      "name": "Kyabobo National Park",
      "destination_id": null,
      "region": "Oti",
      "nearest_town": "Nkwanta",
      "summary": "Remote forest and savannah on the Togo border, with waterfalls and hill trails.",
      "description": "Kyabobo protects a remote block of forest and savannah along the Togo border, with hills, waterfalls and a quiet that is hard to find elsewhere in Ghana. Wildlife includes antelope, monkeys and a wide range of birds.\n\nAccess is rough and infrastructure minimal; visits should be arranged in advance through the park office. This is a destination for travellers who are comfortable being a long way from services.",
      "image": "assets/images/att-kyabobo.jpg",
      "lat": 8.2812,
      "lng": 0.5302,
      "geo_precision": "exact",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "wildlife",
        "adventure",
        "waterfalls"
      ]
    },
    {
      "id": 23,
      "slug": "dodi-island",
      "name": "Dodi Island",
      "destination_id": 14,
      "region": "Eastern",
      "nearest_town": "Akosombo",
      "summary": "An island community on Lake Volta, reached by boat from the Akosombo shore.",
      "description": "Dodi Island sits in Lake Volta, reachable by boat from jetties near Akosombo. The island has a small community, guesthouses and quiet shoreline, and the crossing gives a sense of the reservoir's scale.\n\nBoats can be arranged locally or through lakeside hotels. Confirm return arrangements before setting out.",
      "image": "assets/images/att-dodi-island.jpg",
      "lat": 6.5574,
      "lng": 0.1115,
      "geo_precision": "approximate",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "adventure",
        "culture"
      ]
    },
    {
      "id": 24,
      "slug": "akosombo-dam-viewpoint",
      "name": "Akosombo Dam",
      "destination_id": 14,
      "region": "Eastern",
      "nearest_town": "Akosombo",
      "summary": "The hydroelectric dam that created Lake Volta, seen from the gorge above the river.",
      "description": "Completed in the 1960s, the dam at Akosombo reshaped the Volta River and created one of the largest reservoirs in the world by surface area. The gorge and spillway are visible from viewpoints around the town.\n\nThe dam is a working national asset with security restrictions. Check current access arrangements rather than assuming a visitor tour is available.",
      "image": "assets/images/att-akosombo-dam.jpg",
      "lat": 6.2998,
      "lng": 0.0593,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "culture"
      ]
    },
    {
      "id": 25,
      "slug": "shai-hills-reserve",
      "name": "Shai Hills Resource Reserve",
      "destination_id": 15,
      "region": "Greater Accra",
      "nearest_town": "Doryumu",
      "summary": "Savannah, inselbergs and caves within an hour of Accra, with guided walks and drives.",
      "description": "Shai Hills protects grassland, woodland and granite hills close to the capital. Baboons, monkeys and antelope are regularly seen, along with a wide range of birds.\n\nRangers lead short walks to the caves and viewpoints. It is the most accessible taste of savannah from Accra and fits neatly into a day trip towards Ada Foah.",
      "image": "assets/images/att-shai-hills.jpg",
      "lat": 5.9056,
      "lng": 0.0633,
      "geo_precision": "exact",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "wildlife",
        "nature",
        "adventure"
      ]
    },
    {
      "id": 26,
      "slug": "busua-beach",
      "name": "Busua Beach",
      "destination_id": 8,
      "region": "Western",
      "nearest_town": "Busua",
      "summary": "A wide, sheltered beach with surf schools and fishing canoes pulled up on the sand.",
      "description": "Busua's bay is broad enough to absorb a crowd and sheltered enough for swimming. Surf schools operate from the beach, and canoes land most mornings.\n\nThe village behind the beach has guesthouses and beach bars, and the walk to Dixcove along the coast takes about an hour.",
      "image": "assets/images/dest-busua.jpg",
      "lat": 4.8067,
      "lng": -1.9389,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "beaches",
        "food",
        "adventure"
      ]
    },
    {
      "id": 27,
      "slug": "ada-foah-estuary",
      "name": "Ada Foah Estuary",
      "destination_id": 9,
      "region": "Greater Accra",
      "nearest_town": "Ada Foah",
      "summary": "The meeting point of the Volta River and the Atlantic, best seen by boat.",
      "description": "The estuary at Ada spreads into islands, sandbars and mangrove channels before reaching the sea. Boat trips run from the shore out to the sandbar where river and ocean meet.\n\nBirdlife is good along the quieter channels, and the beaches on the islands are often empty. Arrange boats through local operators or your lodge.",
      "image": "assets/images/dest-ada-foah.jpg",
      "lat": 5.7816,
      "lng": 0.6332,
      "geo_precision": "approximate",
      "hidden_gem": 0,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "nature",
        "beaches",
        "adventure"
      ]
    },
    {
      "id": 28,
      "slug": "amedzofe-mount-gemi",
      "name": "Mount Gemi Trail",
      "destination_id": 16,
      "region": "Volta",
      "nearest_town": "Amedzofe",
      "summary": "A forest climb from Amedzofe to one of Ghana's highest peaks, with views into Togo on clear days.",
      "description": "The trail from Amedzofe climbs through farmland and forest to the summit of Mount Gemi, one of the highest points in Ghana. The walk takes a few hours at an easy pace and is best done with a local guide.\n\nCloud can close in quickly. Start early, carry water and a waterproof layer, and enjoy the forest rather than chasing the view.",
      "image": "assets/images/dest-amedzofe.jpg",
      "lat": 6.8453,
      "lng": 0.436,
      "geo_precision": "approximate",
      "hidden_gem": 1,
      "featured": 0,
      "published": 1,
      "content_status": "SEED",
      "categories": [
        "adventure",
        "nature",
        "culture"
      ]
    }
  ],
  "amenities": [
    {
      "id": 1,
      "slug": "wifi",
      "name": "Wi-Fi"
    },
    {
      "id": 2,
      "slug": "breakfast",
      "name": "Breakfast"
    },
    {
      "id": 3,
      "slug": "air-conditioning",
      "name": "Air conditioning"
    },
    {
      "id": 4,
      "slug": "pool",
      "name": "Swimming pool"
    },
    {
      "id": 5,
      "slug": "restaurant",
      "name": "Restaurant"
    },
    {
      "id": 6,
      "slug": "parking",
      "name": "Parking"
    },
    {
      "id": 7,
      "slug": "kitchen",
      "name": "Kitchen"
    },
    {
      "id": 8,
      "slug": "laundry",
      "name": "Laundry"
    },
    {
      "id": 9,
      "slug": "bar",
      "name": "Bar"
    },
    {
      "id": 10,
      "slug": "tour-desk",
      "name": "Tour desk"
    },
    {
      "id": 11,
      "slug": "workspace",
      "name": "Workspace"
    },
    {
      "id": 12,
      "slug": "family-rooms",
      "name": "Family rooms"
    },
    {
      "id": 13,
      "slug": "security",
      "name": "24-hour security"
    },
    {
      "id": 14,
      "slug": "generator",
      "name": "Backup power"
    },
    {
      "id": 15,
      "slug": "airport-transfer",
      "name": "Airport transfer"
    },
    {
      "id": 16,
      "slug": "sea-view",
      "name": "Sea view"
    }
  ],
  "accommodations": [
    {
      "id": 1,
      "slug": "osu-garden-lodge",
      "name": "Osu Garden Lodge",
      "destination_id": 1,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 620,
      "description": "A small garden hotel in Osu, a short walk from the restaurants and galleries of the neighbourhood. Rooms open onto a courtyard, and the rooftop is used for breakfast.",
      "address": "Off Oxford Street, Osu",
      "area": "Osu, Accra",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "osu-garden-lodge@tripnest.example",
      "image": "assets/images/editorial-coast.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Breakfast",
        "Air conditioning",
        "Restaurant",
        "24-hour security",
        "Workspace"
      ]
    },
    {
      "id": 2,
      "slug": "jamestown-backpackers",
      "name": "Jamestown Backpackers",
      "destination_id": 1,
      "provider_id": 2,
      "type": "HOSTEL",
      "price_per_night": 140,
      "description": "A friendly hostel in the old quarter with dorms and a few private rooms. The common terrace looks over the harbour and the lighthouse is five minutes away.",
      "address": "Cleland Road, Jamestown",
      "area": "Jamestown, Accra",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "jamestown-backpackers@tripnest.example",
      "image": "assets/images/att-jamestown.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Kitchen",
        "Workspace",
        "Laundry",
        "24-hour security"
      ]
    },
    {
      "id": 3,
      "slug": "labone-courtyard-apartments",
      "name": "Labone Courtyard Apartments",
      "destination_id": 1,
      "provider_id": 2,
      "type": "APARTMENT",
      "price_per_night": 480,
      "description": "Serviced one- and two-bedroom apartments in a quiet residential street, with kitchens, a shared garden and weekly cleaning — suited to longer stays in the capital.",
      "address": "Labone Crescent",
      "area": "Labone, Accra",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "labone-courtyard-apartments@tripnest.example",
      "image": "assets/images/dest-accra.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Kitchen",
        "Air conditioning",
        "Parking",
        "Laundry",
        "Workspace",
        "Backup power"
      ]
    },
    {
      "id": 4,
      "slug": "castle-view-guesthouse",
      "name": "Castle View Guesthouse",
      "destination_id": 2,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 340,
      "description": "A modest guesthouse on the ridge above Cape Coast with simple rooms, a terrace and views down to the castle and the sea.",
      "address": "Near Victoria Park",
      "area": "Cape Coast",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "castle-view-guesthouse@tripnest.example",
      "image": "assets/images/dest-cape-coast.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Breakfast",
        "Air conditioning",
        "Parking",
        "24-hour security"
      ]
    },
    {
      "id": 5,
      "slug": "kakum-forest-camp",
      "name": "Kakum Forest Camp",
      "destination_id": 2,
      "provider_id": 2,
      "type": "HOSTEL",
      "price_per_night": 120,
      "description": "Basic forest-edge accommodation near the Kakum entrance, with shared facilities and an early start for the canopy walkway.",
      "address": "Kakum road, Abrafo",
      "area": "Abrafo, near Cape Coast",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "kakum-forest-camp@tripnest.example",
      "image": "assets/images/att-kakum.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Parking",
        "Tour desk",
        "Restaurant",
        "24-hour security"
      ]
    },
    {
      "id": 6,
      "slug": "elmina-harbour-house",
      "name": "Elmina Harbour House",
      "destination_id": 3,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 420,
      "description": "A restored merchant house facing the fishing harbour, with tall shuttered windows, a courtyard restaurant and direct access to the castle road.",
      "address": "Harbour front, Elmina",
      "area": "Elmina",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "elmina-harbour-house@tripnest.example",
      "image": "assets/images/dest-elmina.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Breakfast",
        "Restaurant",
        "Air conditioning",
        "Bar",
        "Sea view"
      ]
    },
    {
      "id": 7,
      "slug": "asante-heritage-rooms",
      "name": "Asante Heritage Rooms",
      "destination_id": 4,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 450,
      "description": "Comfortable rooms in a quiet corner of central Kumasi, decorated with locally woven cloth and within walking distance of Kejetia.",
      "address": "Off Prempeh II Street",
      "area": "Adum, Kumasi",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "asante-heritage-rooms@tripnest.example",
      "image": "assets/images/dest-kumasi.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Breakfast",
        "Air conditioning",
        "Restaurant",
        "Parking",
        "24-hour security"
      ]
    },
    {
      "id": 8,
      "slug": "bonwire-weavers-apartment",
      "name": "Bonwire Weavers' Apartment",
      "destination_id": 4,
      "provider_id": 2,
      "type": "APARTMENT",
      "price_per_night": 260,
      "description": "A two-bedroom apartment attached to a family weaving workshop outside Kumasi, with a kitchen and a chance to see kente being made.",
      "address": "Bonwire craft road",
      "area": "Bonwire, Ashanti",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "bonwire-weavers-apartment@tripnest.example",
      "image": "assets/images/editorial-kente.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Kitchen",
        "Parking",
        "Tour desk",
        "Family rooms"
      ]
    },
    {
      "id": 9,
      "slug": "hillcrest-aburi-retreat",
      "name": "Hillcrest Aburi Retreat",
      "destination_id": 5,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 380,
      "description": "Cool-weather rooms on the Akuapem ridge with a garden, a fire in the evenings and a short walk to the botanical gardens.",
      "address": "Aburi ridge road",
      "area": "Aburi, Eastern Region",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "hillcrest-aburi-retreat@tripnest.example",
      "image": "assets/images/dest-aburi.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Breakfast",
        "Restaurant",
        "Parking",
        "Family rooms",
        "Backup power"
      ]
    },
    {
      "id": 10,
      "slug": "mole-savannah-lodge",
      "name": "Mole Savannah Lodge",
      "destination_id": 6,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 520,
      "description": "A lodge on the escarpment above the Mole river, with a terrace for watching elephants and easy access to the walking-safari meeting point.",
      "address": "Mole park road",
      "area": "Mole National Park",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "mole-savannah-lodge@tripnest.example",
      "image": "assets/images/dest-mole.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Restaurant",
        "Bar",
        "Swimming pool",
        "Parking",
        "Tour desk",
        "Backup power",
        "Family rooms"
      ]
    },
    {
      "id": 11,
      "slug": "busua-surf-camp",
      "name": "Busua Surf Camp",
      "destination_id": 8,
      "provider_id": 2,
      "type": "HOSTEL",
      "price_per_night": 160,
      "description": "Beachfront rooms and dorms with surfboards for hire, an outdoor kitchen and hammocks facing the water.",
      "address": "Beachfront, Busua",
      "area": "Busua, Western Region",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "busua-surf-camp@tripnest.example",
      "image": "assets/images/dest-busua.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Kitchen",
        "Bar",
        "Tour desk",
        "Sea view"
      ]
    },
    {
      "id": 12,
      "slug": "ada-riverside-cabins",
      "name": "Ada Riverside Cabins",
      "destination_id": 9,
      "provider_id": 2,
      "type": "APARTMENT",
      "price_per_night": 300,
      "description": "Simple self-catering cabins on the estuary with wooden decks over the water and boat trips arranged at the jetty.",
      "address": "Estuary road, Ada Foah",
      "area": "Ada Foah, Greater Accra",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "ada-riverside-cabins@tripnest.example",
      "image": "assets/images/dest-ada-foah.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Kitchen",
        "Parking",
        "Tour desk",
        "Sea view",
        "Family rooms"
      ]
    },
    {
      "id": 13,
      "slug": "wli-forest-guesthouse",
      "name": "Wli Forest Guesthouse",
      "destination_id": 10,
      "provider_id": 2,
      "type": "HOSTEL",
      "price_per_night": 150,
      "description": "A community guesthouse at the trailhead for the falls, with simple rooms, a shared kitchen and guides available at the gate.",
      "address": "Wli Afegame",
      "area": "Wli Afegame, Volta",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "wli-forest-guesthouse@tripnest.example",
      "image": "assets/images/dest-wli.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Kitchen",
        "Parking",
        "Tour desk"
      ]
    },
    {
      "id": 14,
      "slug": "dixcove-fort-view",
      "name": "Dixcove Fort View Rooms",
      "destination_id": 8,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 290,
      "description": "Rooms on the headland above Dixcove harbour with sea views, a small restaurant and access to one of the quietest beaches on the western coast.",
      "address": "Dixcove headland",
      "area": "Dixcove, Western Region",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "dixcove-fort-view@tripnest.example",
      "image": "assets/images/editorial-coast.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "APPROVED",
      "published": 1,
      "content_status": "SEED",
      "amenities": [
        "Breakfast",
        "Restaurant",
        "Air conditioning",
        "Sea view",
        "Parking"
      ]
    },
    {
      "id": 15,
      "slug": "akosombo-lakeview-hotel",
      "name": "Akosombo Lakeview Hotel",
      "destination_id": 14,
      "provider_id": 2,
      "type": "HOTEL",
      "price_per_night": 700,
      "description": "A lakeside hotel with a pool, a terrace over the water and boat transfers to Dodi Island arranged at reception.",
      "address": "Lake road, Akosombo",
      "area": "Akosombo, Eastern Region",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "akosombo-lakeview-hotel@tripnest.example",
      "image": "assets/images/editorial-lake.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "PENDING",
      "published": 0,
      "content_status": "SEED",
      "amenities": [
        "Wi-Fi",
        "Swimming pool",
        "Restaurant",
        "Bar",
        "Parking",
        "Tour desk",
        "Airport transfer"
      ]
    },
    {
      "id": 16,
      "slug": "keta-lagoon-lodge",
      "name": "Keta Lagoon Lodge",
      "destination_id": 17,
      "provider_id": 2,
      "type": "APARTMENT",
      "price_per_night": 260,
      "description": "Two self-contained units between the sea and the lagoon, with kitchenettes and bicycles for exploring the town.",
      "address": "Lagoon side, Keta",
      "area": "Keta, Volta",
      "lat": null,
      "lng": null,
      "phone": null,
      "whatsapp": null,
      "email": "keta-lagoon-lodge@tripnest.example",
      "image": "assets/images/editorial-lake.jpg",
      "image_kind": "AREA_ILLUSTRATION",
      "status": "PENDING",
      "published": 0,
      "content_status": "SEED",
      "amenities": [
        "Kitchen",
        "Wi-Fi",
        "Parking",
        "Family rooms"
      ]
    }
  ],
  "saved_places": [
    {
      "id": 1,
      "user_id": 3,
      "destination_id": 2,
      "attraction_id": null,
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 2,
      "user_id": 3,
      "destination_id": 6,
      "attraction_id": null,
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 3,
      "user_id": 4,
      "destination_id": 1,
      "attraction_id": null,
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 4,
      "user_id": 3,
      "destination_id": null,
      "attraction_id": 3,
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 5,
      "user_id": 3,
      "destination_id": null,
      "attraction_id": 5,
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 6,
      "user_id": 4,
      "destination_id": null,
      "attraction_id": 9,
      "created_at": "2026-11-23 06:14:57"
    }
  ],
  "trips": [
    {
      "id": 1,
      "user_id": 3,
      "name": "Coast & Castles",
      "destination_id": 2,
      "start_date": "2026-12-12",
      "end_date": "2026-12-15",
      "travellers": 2,
      "notes": "A long weekend for the castles and the canopy walk. Hoping to get to Elmina one afternoon.",
      "created_at": "2026-11-23 06:14:57"
    },
    {
      "id": 2,
      "user_id": 3,
      "name": "Volta Hills Weekend",
      "destination_id": 10,
      "start_date": "2027-01-16",
      "end_date": "2027-01-18",
      "travellers": 3,
      "notes": "Waterfalls and the mountain village. Pack for rain.",
      "created_at": "2026-11-23 06:14:57"
    }
  ],
  "itinerary_entries": [
    {
      "id": 1,
      "trip_id": 1,
      "entry_date": "2026-12-12",
      "start_time": "15:00",
      "title": "Arrive and walk the old town",
      "attraction_id": null,
      "notes": "Check in, then a slow loop between the castle and the market to get bearings.",
      "estimated_cost": 60.0,
      "sort": 0
    },
    {
      "id": 2,
      "trip_id": 1,
      "entry_date": "2026-12-13",
      "start_time": "08:30",
      "title": "Cape Coast Castle tour",
      "attraction_id": 1,
      "notes": "Guided tour, then time on our own in the courtyard.",
      "estimated_cost": 120.0,
      "sort": 1
    },
    {
      "id": 3,
      "trip_id": 1,
      "entry_date": "2026-12-13",
      "start_time": "14:00",
      "title": "Elmina harbour at golden hour",
      "attraction_id": 2,
      "notes": "Drive over after lunch. Fish by the harbour if the boats are in.",
      "estimated_cost": 180.0,
      "sort": 2
    },
    {
      "id": 4,
      "trip_id": 1,
      "entry_date": "2026-12-14",
      "start_time": "07:00",
      "title": "Kakum canopy walkway",
      "attraction_id": 3,
      "notes": "Early start to beat the heat and the coaches.",
      "estimated_cost": 150.0,
      "sort": 3
    },
    {
      "id": 5,
      "trip_id": 2,
      "entry_date": "2027-01-16",
      "start_time": "13:00",
      "title": "Travel to Wli via Hohoe",
      "attraction_id": null,
      "notes": "Shared taxi from Hohoe. Leave bags and walk to the lower falls before dark.",
      "estimated_cost": 220.0,
      "sort": 0
    },
    {
      "id": 6,
      "trip_id": 2,
      "entry_date": "2027-01-17",
      "start_time": "08:00",
      "title": "Agumatsa falls walk",
      "attraction_id": 5,
      "notes": "Lower falls in the morning, swim if the water is calm.",
      "estimated_cost": 80.0,
      "sort": 1
    }
  ],
  "budget_entries": [
    {
      "id": 1,
      "trip_id": 1,
      "category": "ACCOMMODATION",
      "label": "Guesthouse, 3 nights",
      "amount": 1020.0,
      "notes": "GH₵ 340 per night, two people"
    },
    {
      "id": 2,
      "trip_id": 1,
      "category": "TRANSPORT",
      "label": "Accra return + local taxis",
      "amount": 480.0,
      "notes": "Intercity bus and a driver for Kakum"
    },
    {
      "id": 3,
      "trip_id": 1,
      "category": "FOOD",
      "label": "Meals for two",
      "amount": 600.0,
      "notes": "Mostly chop bars, one restaurant dinner"
    },
    {
      "id": 4,
      "trip_id": 1,
      "category": "ACTIVITIES",
      "label": "Castle tours and canopy walk",
      "amount": 350.0,
      "notes": "Entry fees and guides"
    },
    {
      "id": 5,
      "trip_id": 1,
      "category": "OTHER",
      "label": "Buffer",
      "amount": 200.0,
      "notes": "Souvenirs, water, unexpected"
    },
    {
      "id": 6,
      "trip_id": 2,
      "category": "ACCOMMODATION",
      "label": "Guesthouse, 2 nights",
      "amount": 300.0,
      "notes": "Two rooms"
    },
    {
      "id": 7,
      "trip_id": 2,
      "category": "TRANSPORT",
      "label": "Hohoe–Wli return",
      "amount": 260.0,
      "notes": ""
    },
    {
      "id": 8,
      "trip_id": 2,
      "category": "FOOD",
      "label": "Meals",
      "amount": 240.0,
      "notes": ""
    }
  ],
  "image_credits": [
    {
      "file": "assets/images/editorial-lake.jpg",
      "width": 2000,
      "height": 1124,
      "title": "File:The Volta Lake @ Ghana.jpg",
      "artist": "A.r.a.k.e.l.s.h.o.t.s",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "One of the largest lakes in the wold. About 250 miles long and covers 3,283 square miles. Covers 3.6% of Ghana's area.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AThe_Volta_Lake_%40_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/5/54/The_Volta_Lake_%40_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-lake"
    },
    {
      "file": "assets/images/att-kyabobo.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:The Kyabobo forest waterfalls.jpg",
      "artist": "Abdul Rahman Abdul Kudus",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "An image of the Kyabobo forest waterfalls",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AThe_Kyabobo_forest_waterfalls.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/9/9a/The_Kyabobo_forest_waterfalls.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-kyabobo"
    },
    {
      "file": "assets/images/editorial-kente.jpg",
      "width": 1500,
      "height": 1500,
      "title": "File:Kente Kumasi 2010-06-30-cropped.jpg",
      "artist": "Adam Jones",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "description": "Original caption: \"Kente (Batik) Cloth in Market - Kumasi - Ghana\" Ankara textiles (Batik textiles) (no Kente) on the Kejetia Market in Kumasi, Ashanti Region, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AKente_Kumasi_2010-06-30-cropped.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kente_Kumasi_2010-06-30-cropped.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-kente"
    },
    {
      "file": "assets/images/editorial-market-woman.jpg",
      "width": 2000,
      "height": 3000,
      "title": "File:Market Woman - Kejetia Market - Kumasi - Ghana - 03 (4756183854).jpg",
      "artist": "Adam Jones from Kelowna, BC, Canada",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "description": "Market Woman - Kejetia Market - Kumasi - Ghana - 03",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AMarket_Woman_-_Kejetia_Market_-_Kumasi_-_Ghana_-_03_%284756183854%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Market_Woman_-_Kejetia_Market_-_Kumasi_-_Ghana_-_03_%284756183854%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-market-woman"
    },
    {
      "file": "assets/images/att-jamestown.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Lighthouse at Jamestown in Accra.jpg",
      "artist": "Adotey Hoffman",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "Lighthouse at Jamestown in Accra",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ALighthouse_at_Jamestown_in_Accra.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/4/46/Lighthouse_at_Jamestown_in_Accra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-jamestown"
    },
    {
      "file": "assets/images/att-kejetia.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Modern market hall of Kejetia market.jpg",
      "artist": "Afus199620",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "description": "New market building of Kejetia market In Kumasi",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AModern_market_hall_of_Kejetia_market.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/29/Modern_market_hall_of_Kejetia_market.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-kejetia"
    },
    {
      "file": "assets/images/att-boabeng-fiema.jpg",
      "width": 2000,
      "height": 1125,
      "title": "File:Cercopithecus mona, Boabeng Fiema, Monkey Sanctuary, Ghana.JPG",
      "artist": "AlexisENVN",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "Cercopithecus mona au Monkey Sanctuary de Boabeng Fiema, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ACercopithecus_mona%2C_Boabeng_Fiema%2C_Monkey_Sanctuary%2C_Ghana.JPG",
      "original": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Cercopithecus_mona%2C_Boabeng_Fiema%2C_Monkey_Sanctuary%2C_Ghana.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-boabeng-fiema"
    },
    {
      "file": "assets/images/dest-keta.jpg",
      "width": 2000,
      "height": 1334,
      "title": "File:Keta Sea Defends.jpg",
      "artist": "Amuzujoe",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "This is an image with the theme \"Home + Habitat in Africa\" from:",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AKeta_Sea_Defends.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/27/Keta_Sea_Defends.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-keta"
    },
    {
      "file": "assets/images/editorial-forest.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Obosomase Forest 2.jpg",
      "artist": "Benebiankie",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "The forest underneath there lies the Obosomase (under the gods/fetish) waterfalls",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AObosomase_Forest_2.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Obosomase_Forest_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-forest"
    },
    {
      "file": "assets/images/att-makola.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Makola Market Entrance, Accra, Ghana.JPG",
      "artist": "Benggriff",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "Makola Market Entrance, Accra, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AMakola_Market_Entrance%2C_Accra%2C_Ghana.JPG",
      "original": "https://upload.wikimedia.org/wikipedia/commons/4/46/Makola_Market_Entrance%2C_Accra%2C_Ghana.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-makola"
    },
    {
      "file": "assets/images/editorial-craft.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Pots Section, Makola Market, Accra, Ghana.JPG",
      "artist": "Benggriff",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "Pots Section, Makola Market, Accra, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3APots_Section%2C_Makola_Market%2C_Accra%2C_Ghana.JPG",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pots_Section%2C_Makola_Market%2C_Accra%2C_Ghana.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-craft"
    },
    {
      "file": "assets/images/att-labadi.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Labadi beach 3.jpg",
      "artist": "Cca Raheem",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "description": "Labadi beach in Accra",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ALabadi_beach_3.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Labadi_beach_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-labadi"
    },
    {
      "file": "assets/images/dest-elmina.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Elmina Castle - Ghana.jpg",
      "artist": "Damien Halleux Radermecker",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "description": "Elmina Castle also known as St. George of the Mine Castle in Ghana.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AElmina_Castle_-_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Elmina_Castle_-_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-elmina"
    },
    {
      "file": "assets/images/att-kakum.jpg",
      "width": 1200,
      "height": 1600,
      "title": "File:Canopy walkway in Kakum National Park 3.jpg",
      "artist": "daSupremo",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "Canopy walkway in Kakum National Park",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ACanopy_walkway_in_Kakum_National_Park_3.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Canopy_walkway_in_Kakum_National_Park_3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-kakum"
    },
    {
      "file": "assets/images/dest-paga.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Friendly Paga Crocodile I.jpg",
      "artist": "Dieu-Donné Gameli",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "you can actually touch or sit on the crocodiles at the Paga crocodile pond.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AFriendly_Paga_Crocodile_I.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Friendly_Paga_Crocodile_I.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-paga"
    },
    {
      "file": "assets/images/att-paga-pond.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Friendly Paga Crocodile I.jpg",
      "artist": "Dieu-Donné Gameli",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "you can actually touch or sit on the crocodiles at the Paga crocodile pond.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AFriendly_Paga_Crocodile_I.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Friendly_Paga_Crocodile_I.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-paga-pond"
    },
    {
      "file": "assets/images/editorial-food.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:3tor-korkor in an earthen ware pot.jpg",
      "artist": "DromoTetteh",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "This is an image of food from",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3A3tor-korkor_in_an_earthen_ware_pot.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/8/80/3tor-korkor_in_an_earthen_ware_pot.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-food"
    },
    {
      "file": "assets/images/att-cape-three-points.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Cape Three Points Lighthouse 1875.jpg",
      "artist": "Friedmut Abel",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "Cape Three Points and ruin of the first lighthouse built in 1875 in Ghana.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ACape_Three_Points_Lighthouse_1875.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Cape_Three_Points_Lighthouse_1875.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-cape-three-points"
    },
    {
      "file": "assets/images/att-dodi-island.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Dodi Island Pier.jpg",
      "artist": "Hiroo Yamagata",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "description": "Dodi Island Pier",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ADodi_Island_Pier.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Dodi_Island_Pier.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-dodi-island"
    },
    {
      "file": "assets/images/att-wli-falls.jpg",
      "width": 1920,
      "height": 2560,
      "title": "File:Spirit of Ghana Wli Waterfalls 10.jpg",
      "artist": "Jdjdiwla",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ASpirit_of_Ghana_Wli_Waterfalls_10.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Spirit_of_Ghana_Wli_Waterfalls_10.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-wli-falls"
    },
    {
      "file": "assets/images/dest-axim.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Fort Saint Anthony in Axim, Western Region, Ghana.jpg",
      "artist": "Jesuraj Alakassery",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "The history of Fort St. Anthony, located in Axim in the Western Region of Ghana, partly illustrates the motive for the construction of heavily fortified forts on natural elevations – especially on a rocky one that juts out into the sea. In ",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AFort_Saint_Anthony_in_Axim%2C_Western_Region%2C_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Fort_Saint_Anthony_in_Axim%2C_Western_Region%2C_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-axim"
    },
    {
      "file": "assets/images/att-kintampo-falls.jpg",
      "width": 2000,
      "height": 1428,
      "title": "File:Top view of Kintampo waterfalls.jpg",
      "artist": "Knowledge and philosophy",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "A drone like view of Kintampo waterfalls",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ATop_view_of_Kintampo_waterfalls.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/4/41/Top_view_of_Kintampo_waterfalls.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-kintampo-falls"
    },
    {
      "file": "assets/images/att-tongo.jpg",
      "width": 2000,
      "height": 1332,
      "title": "File:Tongo Hills cave.jpg",
      "artist": "Knowledge and philosophy",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "A cave at Tongo Hills",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ATongo_Hills_cave.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/29/Tongo_Hills_cave.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-tongo"
    },
    {
      "file": "assets/images/att-tafi-atome.jpg",
      "width": 2000,
      "height": 2026,
      "title": "File:Mona Monkey in Tafi Atome.jpg",
      "artist": "Kradolferp",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "Mona monkey at the Tafi Atome Monkey Sanctuary",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AMona_Monkey_in_Tafi_Atome.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mona_Monkey_in_Tafi_Atome.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-tafi-atome"
    },
    {
      "file": "assets/images/editorial-coast.jpg",
      "width": 2000,
      "height": 1351,
      "title": "File:A hut by the beach.jpg",
      "artist": "Kwameghana",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "This is an image with the theme \"Home + Habitat in Africa\" from:",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AA_hut_by_the_beach.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/4/49/A_hut_by_the_beach.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-coast"
    },
    {
      "file": "assets/images/dest-cape-coast.jpg",
      "width": 2000,
      "height": 1331,
      "title": "File:A daytime view of Cape Coast Castle.jpg",
      "artist": "Kwameghana(Bright Kwame Ayisi)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "description": "Cape Coast Castle, located on the southern coast of Ghana, is a historical fortress that played a significant role in the trans-Atlantic slave trade.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AA_daytime_view_of_Cape_Coast_Castle.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/b/b1/A_daytime_view_of_Cape_Coast_Castle.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-cape-coast"
    },
    {
      "file": "assets/images/editorial-culture.jpg",
      "width": 2000,
      "height": 1331,
      "title": "File:A traditional leaders gracefully seated atop a beautifully adorned horse 02.jpg",
      "artist": "Kwameghana(Bright Kwame Ayisi)",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "This is an image with the theme \"Rites and Rituals\" from:",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AA_traditional_leaders_gracefully_seated_atop_a_beautifully_adorned_horse_02.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/c/c8/A_traditional_leaders_gracefully_seated_atop_a_beautifully_adorned_horse_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-culture"
    },
    {
      "file": "assets/images/att-boti-falls.jpg",
      "width": 2000,
      "height": 2500,
      "title": "File:Boti Falls Ghana (3).jpg",
      "artist": "Lauren Gardenbelle Fritts",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "description": "Iphone 8 plus photograph africa #ghana #Accra",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ABoti_Falls_Ghana_%283%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Boti_Falls_Ghana_%283%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-boti-falls"
    },
    {
      "file": "assets/images/dest-nzulezu.jpg",
      "width": 1752,
      "height": 1232,
      "title": "File:Nzulezo stilt village.jpg",
      "artist": "Luke Bosman",
      "license": "CC BY-SA 1.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/1.0",
      "description": "Nzulezo stilt village, Nzulezo.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ANzulezo_stilt_village.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/5/50/Nzulezo_stilt_village.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-nzulezu"
    },
    {
      "file": "assets/images/dest-busua.jpg",
      "width": 1280,
      "height": 960,
      "title": "File:Busua Beach Resort setting in Western region, Ghana.jpg",
      "artist": "Mac-Jordan Degadjor",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "description": "Busua Beach Resort setting in Western region, Ghana.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ABusua_Beach_Resort_setting_in_Western_region%2C_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/25/Busua_Beach_Resort_setting_in_Western_region%2C_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-busua"
    },
    {
      "file": "assets/images/dest-aburi.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Aburi Botanical Garden 8.jpg",
      "artist": "Malibu xoxo",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": null,
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAburi_Botanical_Garden_8.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/0/06/Aburi_Botanical_Garden_8.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-aburi"
    },
    {
      "file": "assets/images/att-aburi-gardens.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Aburi Botanical Garden 6.jpg",
      "artist": "Malibu xoxo",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": null,
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAburi_Botanical_Garden_6.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/6/61/Aburi_Botanical_Garden_6.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-aburi-gardens"
    },
    {
      "file": "assets/images/dest-mole.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Mole National Park, West Gonja (P1100445).jpg",
      "artist": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      "description": "African elephant in Mole National Park, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AMole_National_Park%2C_West_Gonja_%28P1100445%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Mole_National_Park%2C_West_Gonja_%28P1100445%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-mole"
    },
    {
      "file": "assets/images/dest-shai-hills.jpg",
      "width": 2000,
      "height": 2500,
      "title": "File:Shai Hills, Shai-Osudoku (P1100110).jpg",
      "artist": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      "description": "Entrance to the Museum of Natural and Cultural Heritage at Shai Hills, Greater Accra, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AShai_Hills%2C_Shai-Osudoku_%28P1100110%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Shai_Hills%2C_Shai-Osudoku_%28P1100110%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-shai-hills"
    },
    {
      "file": "assets/images/att-cape-coast-castle.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Castle, Cape Coast (P1100223).jpg",
      "artist": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      "description": "Cape Coast Castle",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ACastle%2C_Cape_Coast_%28P1100223%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Castle%2C_Cape_Coast_%28P1100223%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-cape-coast-castle"
    },
    {
      "file": "assets/images/att-elmina-castle.jpg",
      "width": 2000,
      "height": 2666,
      "title": "File:Castle, Elmina (P1100186).jpg",
      "artist": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      "description": "Elmina Castle Museum, Central Region, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ACastle%2C_Elmina_%28P1100186%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Castle%2C_Elmina_%28P1100186%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-elmina-castle"
    },
    {
      "file": "assets/images/att-shai-hills.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Shai Hills, Shai-Osudoku (P1100104).jpg",
      "artist": "Matti Blume",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
      "description": "Zebra and Heron in Shai Hills Resource Reserve",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AShai_Hills%2C_Shai-Osudoku_%28P1100104%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Shai_Hills%2C_Shai-Osudoku_%28P1100104%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-shai-hills"
    },
    {
      "file": "assets/images/dest-kumasi.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:Kronum Kumasi 2018-11-08 (130246).jpg",
      "artist": "Maven Egote",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "Beautiful sky of Kronum in Kumasi, Ghana.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AKronum_Kumasi_2018-11-08_%28130246%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/0/02/Kronum_Kumasi_2018-11-08_%28130246%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-kumasi"
    },
    {
      "file": "assets/images/att-bosumtwi-crater.jpg",
      "width": 2000,
      "height": 1666,
      "title": "File:An Explosive Beginning for Lake Bosumtwi (154739 - 151229 lrg).jpg",
      "artist": "NASA Earth Observatory images by Michala Garrison, using Landsat data from the U.S. Geological Survey. Story by Adam Voiland.",
      "license": "Public domain",
      "licenseUrl": "",
      "description": "Ghana, a West African nation of about 35 million people, has just one natural lake. Lake Bosumtwi, a bowl-shaped body of water southeast of the fast-growing city of Kumasi, spans 49 square kilometers (19 square miles) and plunges to a depth",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAn_Explosive_Beginning_for_Lake_Bosumtwi_%28154739_-_151229_lrg%29.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/d/d7/An_Explosive_Beginning_for_Lake_Bosumtwi_%28154739_-_151229_lrg%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-bosumtwi-crater"
    },
    {
      "file": "assets/images/editorial-volta.jpg",
      "width": 2000,
      "height": 2000,
      "title": "File:A beautiful landscape at Ve In the Volta Region of Ghana 5.jpg",
      "artist": "Peterkwashie",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "A beautiful landscape",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AA_beautiful_landscape_at_Ve_In_the_Volta_Region_of_Ghana_5.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e3/A_beautiful_landscape_at_Ve_In_the_Volta_Region_of_Ghana_5.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-volta"
    },
    {
      "file": "assets/images/dest-ada-foah.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Ada Foah Beach 1.jpg",
      "artist": "Philip Nalangan",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "description": "Ada Foah is a town on the southeast coast of Ghana. Known for palm-lined beaches and estuary islands, it is where the Volta River meets the Atlantic Ocean.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAda_Foah_Beach_1.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Ada_Foah_Beach_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-ada-foah"
    },
    {
      "file": "assets/images/att-larabanga.jpg",
      "width": 2000,
      "height": 1328,
      "title": "File:Larabanga Mosque Ghana.jpg",
      "artist": "Sathyan Velumani",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "This is a photo of Ghana's material cultural heritage number",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ALarabanga_Mosque_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/3/31/Larabanga_Mosque_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-larabanga"
    },
    {
      "file": "assets/images/dest-wli.jpg",
      "width": 1920,
      "height": 2560,
      "title": "File:Wli Lower Fall-4.jpg",
      "artist": "Stig Nygaard",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "description": "We have arrieved at the lower fall.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AWli_Lower_Fall-4.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Wli_Lower_Fall-4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-wli"
    },
    {
      "file": "assets/images/dest-bosumtwi.jpg",
      "width": 2000,
      "height": 1169,
      "title": "File:Lake Bosumtwi, Ghana.jpg",
      "artist": "Stig Nygaard from Copenhagen, Denmark",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "description": "Even though the weather was rather grey this morning, Lake Bosumtwi looked pretty nice.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ALake_Bosumtwi%2C_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/8/83/Lake_Bosumtwi%2C_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-bosumtwi"
    },
    {
      "file": "assets/images/editorial-hero.jpg",
      "width": 2000,
      "height": 1500,
      "title": "File:A PIC OF SEA AT SIR CHARLES BEACH RESORT IN WINNEBA 14.jpg",
      "artist": "T.Chordson",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "A View of the Sea with Human Beings Walking at its Shore at Sir Charles Beach Resort located at Winneba, Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AA_PIC_OF_SEA_AT_SIR_CHARLES_BEACH_RESORT_IN_WINNEBA_14.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/f/fe/A_PIC_OF_SEA_AT_SIR_CHARLES_BEACH_RESORT_IN_WINNEBA_14.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "editorial-hero"
    },
    {
      "file": "assets/images/att-manhyia.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Manhyia Palace Ambassador Sullivan Kumasi Tour 1.jpg",
      "artist": "U.S. Embassy Ghana",
      "license": "Public domain",
      "licenseUrl": "",
      "description": "Ambassador Stephanie S. Sullivan traveled to the Ashanti Region from May 2-7 to promote partnerships on health, education, good governance, and economic development between the United States of America and the Republic of Ghana. On May 3, A",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AManhyia_Palace_Ambassador_Sullivan_Kumasi_Tour_1.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Manhyia_Palace_Ambassador_Sullivan_Kumasi_Tour_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-manhyia"
    },
    {
      "file": "assets/images/dest-accra.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Black Star Gate located in Accra.jpg",
      "artist": "Uprising Man",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "The Black Star Gate is a monument topped by the Black Star of Africa. The five-pointed star represents Africa in general and particularly Ghana itself. It has the inscription “AD 1957” and “Freedom and Justice”.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ABlack_Star_Gate_located_in_Accra.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/3/38/Black_Star_Gate_located_in_Accra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-accra"
    },
    {
      "file": "assets/images/att-black-star.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Black Star Gate located in Accra.jpg",
      "artist": "Uprising Man",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "The Black Star Gate is a monument topped by the Black Star of Africa. The five-pointed star represents Africa in general and particularly Ghana itself. It has the inscription “AD 1957” and “Freedom and Justice”.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ABlack_Star_Gate_located_in_Accra.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/3/38/Black_Star_Gate_located_in_Accra.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-black-star"
    },
    {
      "file": "assets/images/dest-amedzofe.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Amedzofe village Ghana.jpg",
      "artist": "Williams Penuku",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "description": "Amedzofe, is the highest habitable place in Ghana at more than 600 meters, is perched at the foot of Mt. Gemi. Located in the Volta Region of Ghana.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAmedzofe_village_Ghana.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Amedzofe_village_Ghana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-amedzofe"
    },
    {
      "file": "assets/images/dest-akosombo.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Spillway of Akosombo dam.jpg",
      "artist": "ZSM",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "One of two spillways of Akosombo dam with 6 floodgates in Ghana",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3ASpillway_of_Akosombo_dam.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Spillway_of_Akosombo_dam.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "dest-akosombo"
    },
    {
      "file": "assets/images/att-akosombo-dam.jpg",
      "width": 2000,
      "height": 1333,
      "title": "File:Akosombo Dam spilling water, Akosombo, Ghana - 20101106.jpg",
      "artist": "ZSM",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "description": "The water is spilled from the Akosombo Dam through 4 floodgates out of 12 because of the dangerously high water level in the reservoir.",
      "sourcePage": "https://commons.wikimedia.org/wiki/File%3AAkosombo_Dam_spilling_water%2C_Akosombo%2C_Ghana_-_20101106.jpg",
      "original": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Akosombo_Dam_spilling_water%2C_Akosombo%2C_Ghana_-_20101106.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
      "slug": "att-akosombo-dam"
    }
  ]
};
