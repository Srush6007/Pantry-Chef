// ─── STATE ────────────────────────────────────────────────────────────────────
const state = {
  view: "ingredients",
  currentRecipe: null,
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  hfToken: localStorage.getItem("hfToken") || "",
  cookedCount: JSON.parse(localStorage.getItem("cookedCount")) || 0,
  xp: JSON.parse(localStorage.getItem("xp")) || 0,
  level: JSON.parse(localStorage.getItem("level")) || 1,
  activeFilter: "All",
  searchQuery: "",
  userRatings: JSON.parse(localStorage.getItem("userRatings")) || {},
  cookedRecipes: JSON.parse(localStorage.getItem("cookedRecipes")) || [],
  ingredients: JSON.parse(localStorage.getItem("ingredients")) || [
    { name: "Farm Fresh Eggs",  category: "Protein",    icon: "egg",           color: "#FF6B6B" },
    { name: "Russet Potatoes",  category: "Vegetables", icon: "outdoor_grill", color: "#4CC9F0" },
    { name: "Red Onion",        category: "Vegetables", icon: "outdoor_grill", color: "#4CC9F0" },
    { name: "Baby Spinach",     category: "Greens",     icon: "eco",           color: "#52B788" },
    { name: "Cheddar Cheese",   category: "Dairy",      icon: "breakfast_dining", color: "#FFD60A" },
    { name: "Garlic Cloves",    category: "Pantry",     icon: "kitchen",       color: "#8D99AE" },
  ],
  staples: JSON.parse(localStorage.getItem("staples")) || [
    { name: "Olive Oil", selected: true  },
    { name: "Salt",      selected: true  },
    { name: "Pepper",    selected: true  },
    { name: "Butter",    selected: false },
    { name: "Milk",      selected: false },
  ],
  preferences: JSON.parse(localStorage.getItem("preferences")) || [
    { name: "Vegetarian",  selected: true  },
    { name: "Gluten-Free", selected: false },
    { name: "Dairy-Free",  selected: false },
    { name: "Low Carb",    selected: true  },
    { name: "Nut-Free",    selected: false },
  ],
  skills: JSON.parse(localStorage.getItem("skills")) || [
    { title: "Novice",        selected: false },
    { title: "Intermediate",  selected: true  },
    { title: "Pro",           selected: false },
  ],
  cookingStep: 0,
  recipes: JSON.parse(localStorage.getItem("recipes")) || [
    {
      title: "Mediterranean Herb Roasted Chicken",
      desc: "Used extra rosemary and let it sit in the brine for 2 hours longer. Much better! The skin was perfectly crisp.",
      time: "45 mins", prepTime: "15 min", cookTime: "30 min",
      difficulty: "Intermediate", rating: "4.9", nutrition: "580 kcal",
      match: "95% Match", matchColor: "#3A5F2D",
      badge: "Chef's Choice", badgeType: "green",
      date: "March 15, 2024",
      keywords: ["chicken", "garlic", "rosemary", "olive oil"],
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "1.5kg Whole Chicken", sub: "Organic, skin-on" },
        { name: "3 cloves Garlic", sub: "Minced or crushed", checked: true },
        { name: "Fresh Rosemary & Thyme", sub: "2–3 sprigs each" },
        { name: "Extra Virgin Olive Oil", sub: "Cold pressed, for drizzling" },
        { name: "Sea Salt & Black Pepper", sub: "To taste" },
        { name: "1 Lemon", sub: "Sliced, for stuffing" },
      ],
      steps: [
        { title: "Preheat and Prep", desc: "Preheat your oven to 200°C (400°F). Pat the chicken dry with paper towels to ensure the skin gets extra crispy during roasting.", imgLabel: "PREP STATION" },
        { title: "Herb Infusion", desc: "In a small bowl, mix the minced garlic with chopped rosemary, thyme, and olive oil. Rub this aromatic mixture generously over and under the chicken skin.", imgLabel: "AROMATIC BASE", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80", chips: ["Minced Garlic", "Fresh Rosemary", "Olive Oil"] },
        { title: "Slow Roasting", desc: "Place in the rustic ceramic dish. Roast for 45 minutes, basting occasionally with its own juices until the internal temperature reaches 75°C (165°F).", imgLabel: "SLOW ROAST" },
        { title: "Rest & Carve", desc: "Remove from oven and let rest for 10 minutes before carving. This keeps the juices inside the meat.", imgLabel: "REST TIME" },
        { title: "Serve", desc: "Carve and plate with roasted vegetables. Drizzle with pan juices and garnish with fresh rosemary.", imgLabel: "PLATING" },
      ],
    },
    {
      title: "Hand-Rolled Pesto Linguine",
      desc: "First time making the dough from scratch. A bit tough, maybe less flour next time. The basil from the garden is incredible.",
      time: "60 min", prepTime: "30 min", cookTime: "30 min",
      difficulty: "Hard", rating: "4.5", nutrition: "420 kcal",
      match: "80% Match", matchColor: "#4CC9F0",
      badge: "Healthy", badgeType: "terracotta",
      date: "March 12, 2024",
      keywords: ["pasta", "basil", "garlic", "parmesan"],
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "300g Pasta Flour", sub: "tipo 00 preferred" },
        { name: "3 Large Eggs", sub: "Room temperature" },
        { name: "2 cups Fresh Basil", sub: "Packed, washed" },
        { name: "50g Pine Nuts", sub: "Lightly toasted" },
        { name: "60g Parmesan", sub: "Freshly grated" },
        { name: "Extra Virgin Olive Oil", sub: "High quality" },
      ],
      steps: [
        { title: "Make the Dough", desc: "Mound flour on clean surface, make a well, crack in eggs. Gradually incorporate flour with a fork then knead 8–10 minutes until silky smooth.", imgLabel: "DOUGH PREP" },
        { title: "Rest Dough", desc: "Wrap dough in cling film and rest 30 minutes at room temperature. This lets the gluten relax for easier rolling.", imgLabel: "REST" },
        { title: "Make Pesto", desc: "Blend basil, pine nuts, parmesan, and garlic. Stream in olive oil while blending until smooth and vibrant green.", imgLabel: "PESTO" },
        { title: "Roll & Cut", desc: "Roll dough thin (2mm), fold and cut into 5mm linguine strands. Dust with flour to prevent sticking.", imgLabel: "ROLLING" },
        { title: "Cook & Toss", desc: "Cook fresh pasta 2–3 minutes in salted boiling water. Reserve pasta water, drain and toss with pesto.", imgLabel: "FINISHING" },
      ],
    },
    {
      title: "Sesame Glazed Salmon Bowl",
      desc: "Quick weeknight win. Added pickled ginger for extra zing. The kids actually ate the salmon!",
      time: "20 min", prepTime: "5 min", cookTime: "15 min",
      difficulty: "Easy", rating: "4.9", nutrition: "510 kcal",
      match: "60% Match", matchColor: "#FFB703",
      badge: "New Recipe", badgeType: "peach",
      date: "March 8, 2024",
      keywords: ["salmon", "sesame", "rice", "ginger"],
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "2 Salmon Fillets", sub: "Skin-on, 200g each" },
        { name: "3 tbsp Soy Sauce", sub: "Low sodium" },
        { name: "2 tbsp Sesame Oil", sub: "Toasted" },
        { name: "1 tbsp Honey", sub: "For glaze" },
        { name: "Steamed Jasmine Rice", sub: "2 cups cooked" },
        { name: "Pickled Ginger", sub: "Store bought, to serve" },
      ],
      steps: [
        { title: "Make Glaze", desc: "Whisk together soy sauce, sesame oil, honey, and minced ginger until combined.", imgLabel: "GLAZE" },
        { title: "Marinate", desc: "Coat salmon in half the glaze. Marinate 5 minutes while pan heats up.", imgLabel: "MARINATE" },
        { title: "Sear Salmon", desc: "Heat pan to medium-high. Sear salmon skin-side down 4 minutes until crispy. Flip, brush remaining glaze, cook 3 more minutes.", imgLabel: "SEARING" },
        { title: "Assemble Bowl", desc: "Serve salmon over rice. Garnish with sesame seeds, pickled ginger, and sliced avocado.", imgLabel: "PLATING" },
      ],
    },
  ],
  saved: JSON.parse(localStorage.getItem("saved")) || [
    {
      title: "Mediterranean Herb Roasted Chicken",
      desc: "Used extra rosemary and let it sit in the brine for 2 hours longer. The skin was perfectly crisp.",
      time: "45 min", difficulty: "Medium", category: "Dinner",
      badge: "Chef's Choice", badgeType: "green",
      date: "March 15, 2024", rating: "4.8",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Hand-Rolled Pesto Linguine",
      desc: "First time making the dough from scratch. A bit tough, maybe less flour next time. The basil from the garden is incredible.",
      time: "60 min", difficulty: "Hard", category: "Italian",
      badge: "Healthy", badgeType: "green",
      date: "March 12, 2024", rating: "4.5",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Sesame Glazed Salmon Bowl",
      desc: "Quick weeknight win. Added pickled ginger for extra zing. The kids actually ate the salmon!",
      time: "20 min", difficulty: "Easy", category: "Dinner",
      badge: "New Recipe", badgeType: "terracotta",
      date: "March 8, 2024", rating: "4.9",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Berry Smoothie Bowl",
      desc: "Antioxidant-rich breakfast topped with granola and fresh berries.",
      time: "5 min", difficulty: "Easy", category: "Breakfast",
      badge: "Healthy", badgeType: "peach",
      date: "March 5, 2024", rating: "4.2",
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80",
    },
  ],
};

// ─── RECIPE DATABASE ──────────────────────────────────────────────────────────
const recipeDatabase = [
  // ── CHICKEN ──────────────────────────────────────────────────────────────────
  {
    title: "Chicken Fried Rice",
    badge: "Chef's Choice", badgeType: "green",
    desc: "A satisfying wok-tossed fried rice packed with juicy chicken, vegetables, and soy sauce.",
    time: "25 min", prepTime: "10 min", cookTime: "15 min", difficulty: "Easy", rating: "4.7",
    nutrition: { kcal: 480, protein: "34g", carbs: "52g", fat: "12g" },
    primary: ["chicken", "rice"],
    keywords: ["chicken", "rice", "egg", "soy sauce", "onion", "carrot", "garlic"],
    steps: [
      { title: "Cook Rice", desc: "Use day-old cooked rice for best texture, or cook fresh and spread to cool 10 min." },
      { title: "Sauté Chicken", desc: "Dice chicken into small pieces. Cook in hot oil 5-6 min until golden and cooked through." },
      { title: "Add Vegetables", desc: "Add diced onion, carrot, and garlic. Stir-fry on high heat 3 min." },
      { title: "Scramble Eggs", desc: "Push ingredients aside. Crack 2 eggs directly in pan, scramble quickly before mixing in." },
      { title: "Toss with Rice", desc: "Add rice and soy sauce. Toss everything together on high heat 2-3 min. Garnish with spring onions." },
    ],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Chicken Biryani",
    badge: "Chef's Choice", badgeType: "green",
    desc: "Fragrant slow-cooked basmati rice layered with spiced chicken — a true classic.",
    time: "60 min", prepTime: "20 min", cookTime: "40 min", difficulty: "Intermediate", rating: "4.9",
    nutrition: { kcal: 620, protein: "38g", carbs: "68g", fat: "16g" },
    primary: ["chicken", "rice"],
    keywords: ["chicken", "rice", "basmati", "onion", "tomato", "garam masala", "yogurt", "saffron"],
    steps: [
      { title: "Marinate Chicken", desc: "Mix chicken with yogurt, turmeric, garam masala, and chili. Marinate 30 min minimum." },
      { title: "Fry Onions", desc: "Fry sliced onions in oil until deeply golden and crispy. Set aside half for garnish." },
      { title: "Cook Chicken", desc: "In the same pot, cook marinated chicken with tomatoes until oil separates — about 15 min." },
      { title: "Par-boil Rice", desc: "Boil basmati rice with whole spices until 70% cooked. Drain immediately." },
      { title: "Layer & Steam", desc: "Layer rice over chicken. Add saffron milk and fried onions. Cover and steam (dum) 25 min on low." },
    ],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Teriyaki Chicken Bowl",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Glazed chicken thighs over steamed rice with a sweet-savory teriyaki sauce.",
    time: "30 min", prepTime: "10 min", cookTime: "20 min", difficulty: "Easy", rating: "4.6",
    nutrition: { kcal: 510, protein: "36g", carbs: "58g", fat: "11g" },
    primary: ["chicken", "rice"],
    keywords: ["chicken", "rice", "soy sauce", "honey", "garlic", "ginger", "sesame"],
    steps: [
      { title: "Make Sauce", desc: "Whisk soy sauce, honey, garlic, ginger, and sesame oil together." },
      { title: "Marinate", desc: "Coat chicken thighs in half the teriyaki sauce. Rest 10 min." },
      { title: "Sear Chicken", desc: "Cook chicken in oiled pan 6-7 min per side until caramelised and cooked through." },
      { title: "Glaze", desc: "Pour remaining sauce into pan, reduce until sticky and glossy, coating chicken." },
      { title: "Serve", desc: "Slice and serve over steamed rice with sesame seeds and spring onion." },
    ],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Butter Chicken (Murgh Makhani)",
    badge: "Chef's Choice", badgeType: "green",
    desc: "Tender chicken in a velvety, mildly spiced tomato-cream sauce. Restaurant style at home.",
    time: "45 min", prepTime: "15 min", cookTime: "30 min", difficulty: "Intermediate", rating: "4.9",
    nutrition: { kcal: 540, protein: "35g", carbs: "22g", fat: "34g" },
    primary: ["chicken"],
    keywords: ["chicken", "tomato", "cream", "butter", "onion", "garlic", "ginger", "spices"],
    steps: [
      { title: "Marinate", desc: "Marinate chicken pieces in yogurt, lemon juice, turmeric, and chili. Rest 30 min." },
      { title: "Grill Chicken", desc: "Cook chicken on high heat until slightly charred. Set aside." },
      { title: "Make Sauce", desc: "Blend cooked onions, tomatoes, garlic, and ginger into a smooth sauce." },
      { title: "Simmer Sauce", desc: "Cook sauce in butter, add spices, simmer 10 min until thickened and rich." },
      { title: "Finish with Cream", desc: "Add grilled chicken to sauce. Stir in cream, simmer 5 min. Garnish with butter." },
    ],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Simple Grilled Chicken",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Perfectly seasoned grilled chicken breast — juicy inside, golden outside.",
    time: "25 min", prepTime: "10 min", cookTime: "15 min", difficulty: "Easy", rating: "4.4",
    nutrition: { kcal: 290, protein: "42g", carbs: "2g", fat: "12g" },
    primary: ["chicken"],
    keywords: ["chicken", "garlic", "lemon", "olive oil", "herbs"],
    steps: [
      { title: "Season", desc: "Flatten chicken breasts to even thickness. Season generously with garlic, salt, pepper, and herbs." },
      { title: "Marinate", desc: "Drizzle with olive oil and fresh lemon juice. Rest 10 min." },
      { title: "Grill", desc: "Cook on hot grill pan 6-7 min per side. Do not press down or move too early." },
      { title: "Rest", desc: "Let chicken rest 5 min before slicing to retain all juices." },
    ],
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80",
  },
  // ── EGG ──────────────────────────────────────────────────────────────────────
  {
    title: "Egg Fried Rice",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Quick and satisfying fried rice with scrambled eggs and vegetables.",
    time: "15 min", prepTime: "5 min", cookTime: "10 min", difficulty: "Easy", rating: "4.4",
    nutrition: { kcal: 380, protein: "14g", carbs: "56g", fat: "10g" },
    primary: ["egg", "rice"],
    keywords: ["egg", "rice", "onion", "carrot", "garlic", "soy sauce"],
    steps: [
      { title: "Heat Wok", desc: "Heat oil in a wok or large pan over high heat until smoking." },
      { title: "Stir-fry Veg", desc: "Add diced onions and carrots, stir-fry 3 minutes until softened." },
      { title: "Scramble Eggs", desc: "Push veggies aside, crack eggs directly in pan, scramble quickly." },
      { title: "Add Rice", desc: "Add cooked rice and soy sauce. Toss everything together 2 min." },
    ],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Spinach Potato Frittata",
    badge: "Healthy", badgeType: "terracotta",
    desc: "A gorgeous Italian baked egg dish packed with spinach and potato.",
    time: "30 min", prepTime: "10 min", cookTime: "20 min", difficulty: "Medium", rating: "4.5",
    nutrition: { kcal: 320, protein: "18g", carbs: "24g", fat: "16g" },
    primary: ["egg", "potato", "spinach"],
    keywords: ["egg", "spinach", "potato", "onion", "cheese"],
    steps: [
      { title: "Cook Potatoes", desc: "Slice potatoes thinly, cook in olive oil until golden, 8 min." },
      { title: "Add Greens", desc: "Add spinach and onion, wilt down for 2 minutes." },
      { title: "Pour Eggs", desc: "Beat eggs with salt and cheese, pour over vegetables evenly." },
      { title: "Set & Broil", desc: "Cook on stovetop 3 min then finish under broiler until set and golden." },
    ],
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Masala Omelette",
    badge: "New Recipe", badgeType: "peach",
    desc: "A spiced Indian-style omelette with onions, green chili, tomato, and coriander.",
    time: "10 min", prepTime: "3 min", cookTime: "7 min", difficulty: "Easy", rating: "4.3",
    nutrition: { kcal: 220, protein: "16g", carbs: "6g", fat: "14g" },
    primary: ["egg"],
    keywords: ["egg", "onion", "tomato", "chili", "coriander", "spices"],
    steps: [
      { title: "Beat Eggs", desc: "Beat 2-3 eggs with salt, turmeric, and a pinch of chili powder." },
      { title: "Add Veg", desc: "Stir in finely diced onion, tomato, green chili, and coriander." },
      { title: "Cook Omelette", desc: "Heat oil in pan, pour mixture, cook on medium until bottom is set." },
      { title: "Fold & Serve", desc: "Fold and slide onto plate. Serve with toast or bread." },
    ],
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=900&q=80",
  },
  // ── FISH & SEAFOOD ────────────────────────────────────────────────────────────
  {
    title: "Lemon Herb Salmon",
    badge: "New Recipe", badgeType: "peach",
    desc: "Pan-seared salmon with a bright lemon herb crust — 18 minutes to perfection.",
    time: "18 min", prepTime: "5 min", cookTime: "13 min", difficulty: "Medium", rating: "4.8",
    nutrition: { kcal: 360, protein: "40g", carbs: "4g", fat: "20g" },
    primary: ["salmon", "fish"],
    keywords: ["salmon", "fish", "lemon", "garlic", "butter", "herbs"],
    steps: [
      { title: "Prep Salmon", desc: "Pat salmon dry and season with salt, pepper, and minced garlic." },
      { title: "Heat Pan", desc: "Heat oil in pan over medium-high heat until shimmering hot." },
      { title: "Sear", desc: "Sear salmon 4-5 min per side until cooked through and golden." },
      { title: "Butter Baste", desc: "Squeeze lemon juice, add butter to pan and spoon over salmon." },
    ],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  // ── PASTA ────────────────────────────────────────────────────────────────────
  {
    title: "Classic Tomato Pasta",
    badge: "New Recipe", badgeType: "peach",
    desc: "A simple, vibrant pasta with a rich tomato base and fresh herbs.",
    time: "20 min", prepTime: "5 min", cookTime: "15 min", difficulty: "Easy", rating: "4.5",
    nutrition: { kcal: 420, protein: "14g", carbs: "72g", fat: "9g" },
    primary: ["pasta", "tomato"],
    keywords: ["pasta", "tomato", "garlic", "basil", "olive oil"],
    steps: [
      { title: "Boil Pasta", desc: "Boil salted water and cook pasta until al dente, about 10-12 minutes." },
      { title: "Make Sauce", desc: "Sauté minced garlic in olive oil for 1 minute until fragrant." },
      { title: "Simmer", desc: "Add crushed tomatoes, season with salt and pepper, simmer 10 min." },
      { title: "Finish", desc: "Toss pasta in sauce and top with fresh basil. Serve immediately." },
    ],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Creamy Garlic Pasta",
    badge: "Chef's Choice", badgeType: "green",
    desc: "A 15-minute pantry staple using just garlic, cream, and parmesan.",
    time: "15 min", prepTime: "5 min", cookTime: "10 min", difficulty: "Easy", rating: "4.7",
    nutrition: { kcal: 560, protein: "18g", carbs: "68g", fat: "24g" },
    primary: ["pasta", "garlic"],
    keywords: ["pasta", "garlic", "cream", "cheese", "butter"],
    steps: [
      { title: "Cook Pasta", desc: "Cook pasta in salted boiling water. Reserve 1 cup pasta water before draining." },
      { title: "Garlic Butter Base", desc: "Melt butter in a pan, add minced garlic, cook 2 minutes over medium heat." },
      { title: "Cream Sauce", desc: "Add cream, simmer 3 min. Stir in parmesan until silky smooth." },
      { title: "Combine", desc: "Toss pasta with sauce. Add pasta water to loosen if needed." },
    ],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  // ── VEGETARIAN / PANEER ──────────────────────────────────────────────────────
  {
    title: "Paneer Tikka Skillet",
    badge: "Chef's Choice", badgeType: "green",
    desc: "Smoky spiced paneer with peppers and onions — no oven needed.",
    time: "20 min", prepTime: "8 min", cookTime: "12 min", difficulty: "Medium", rating: "4.6",
    nutrition: { kcal: 390, protein: "22g", carbs: "18g", fat: "26g" },
    primary: ["paneer"],
    keywords: ["paneer", "tomato", "onion", "pepper", "capsicum", "yogurt", "spices"],
    steps: [
      { title: "Marinate", desc: "Cube paneer, marinate in yogurt, turmeric, garam masala for 10 min." },
      { title: "Sear Paneer", desc: "Sear cubes in hot oil until golden on all sides — about 4 min." },
      { title: "Cook Veg", desc: "In same pan, sauté onions and capsicum until softened, 3 min." },
      { title: "Finish", desc: "Add tomato and spices, cook 5 min. Add paneer back and toss to coat." },
    ],
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Palak Paneer",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Creamy spinach sauce with soft paneer cubes — a North Indian favourite.",
    time: "35 min", prepTime: "10 min", cookTime: "25 min", difficulty: "Medium", rating: "4.7",
    nutrition: { kcal: 350, protein: "20g", carbs: "14g", fat: "22g" },
    primary: ["paneer", "spinach"],
    keywords: ["paneer", "spinach", "onion", "tomato", "garlic", "cream", "spices"],
    steps: [
      { title: "Blanch Spinach", desc: "Blanch spinach in boiling water 2 min, transfer to ice water. Blend smooth." },
      { title: "Cook Masala", desc: "Sauté onions, garlic, ginger until golden. Add tomatoes and spices, cook 8 min." },
      { title: "Add Spinach", desc: "Pour in blended spinach, simmer 5 min until the sauce is vibrant and smooth." },
      { title: "Add Paneer", desc: "Add cubed paneer (unfried or lightly fried). Stir in cream. Simmer 5 min." },
    ],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
  // ── LENTILS / DAL ────────────────────────────────────────────────────────────
  {
    title: "Veggie Dal",
    badge: "Healthy", badgeType: "green",
    desc: "Warm, comforting red lentil dal with aromatic spices.",
    time: "30 min", prepTime: "5 min", cookTime: "25 min", difficulty: "Easy", rating: "4.5",
    nutrition: { kcal: 280, protein: "16g", carbs: "42g", fat: "5g" },
    primary: ["lentil", "dal"],
    keywords: ["lentil", "dal", "tomato", "onion", "garlic", "rice"],
    steps: [
      { title: "Cook Lentils", desc: "Rinse red lentils. Cook with water and turmeric 15 min until soft." },
      { title: "Tempering", desc: "Fry onion in oil until golden. Add garlic, ginger, and ground spices." },
      { title: "Add Tomatoes", desc: "Add tomatoes, cook 5 min until softened and jammy." },
      { title: "Combine", desc: "Pour tempering over lentils, simmer together 5 min. Serve with rice or bread." },
    ],
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=80",
  },
  // ── VEGGIES ──────────────────────────────────────────────────────────────────
  {
    title: "Mushroom Garlic Toast",
    badge: "New Recipe", badgeType: "peach",
    desc: "Earthy mushrooms sautéed with garlic on crispy toast — a perfect quick snack.",
    time: "12 min", prepTime: "3 min", cookTime: "9 min", difficulty: "Easy", rating: "4.2",
    nutrition: { kcal: 240, protein: "8g", carbs: "28g", fat: "11g" },
    primary: ["mushroom", "bread"],
    keywords: ["mushroom", "garlic", "butter", "bread", "toast"],
    steps: [
      { title: "Toast Bread", desc: "Toast bread slices until deeply golden and crisp." },
      { title: "Garlic Butter", desc: "Melt butter in pan, add minced garlic, cook 1 min." },
      { title: "Cook Mushrooms", desc: "Add sliced mushrooms, cook 6-7 min until golden and juicy." },
      { title: "Serve", desc: "Season generously, pile on toast, garnish with fresh parsley." },
    ],
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Aloo Gobi",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Classic dry-cooked potato and cauliflower sabzi with warming spices.",
    time: "30 min", prepTime: "10 min", cookTime: "20 min", difficulty: "Easy", rating: "4.4",
    nutrition: { kcal: 210, protein: "6g", carbs: "34g", fat: "7g" },
    primary: ["potato", "cauliflower"],
    keywords: ["potato", "cauliflower", "aloo", "gobi", "onion", "tomato", "garlic", "spices"],
    steps: [
      { title: "Prep Veg", desc: "Cut potato and cauliflower into medium florets/cubes. Pat dry." },
      { title: "Sauté Masala", desc: "Fry onions until golden, add tomatoes, garlic, ginger, and spices. Cook 5 min." },
      { title: "Add Veg", desc: "Add potato first, cook 5 min. Then add cauliflower, toss to coat in masala." },
      { title: "Steam Finish", desc: "Cover and cook on low 12-15 min until potatoes are tender. Garnish with coriander." },
    ],
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mixed Veg Stir-Fry",
    badge: "Healthy", badgeType: "terracotta",
    desc: "A colourful, healthy stir-fry ready in 10 minutes — perfect for any combination of vegetables.",
    time: "15 min", prepTime: "5 min", cookTime: "10 min", difficulty: "Easy", rating: "4.3",
    nutrition: { kcal: 160, protein: "5g", carbs: "22g", fat: "6g" },
    primary: ["vegetable"],
    keywords: ["onion", "carrot", "pepper", "capsicum", "broccoli", "garlic", "soy sauce", "ginger"],
    steps: [
      { title: "Prep Veg", desc: "Cut all vegetables into similar-sized pieces for even cooking." },
      { title: "Heat Wok", desc: "Heat wok or large pan on high. Add sesame/vegetable oil." },
      { title: "Stir-fry", desc: "Add hard vegetables first (broccoli, carrot). After 2 min, add softer ones." },
      { title: "Sauce & Finish", desc: "Add minced garlic, soy sauce, and a splash of water. Toss 1 min. Serve immediately." },
    ],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  // ── MUTTON / LAMB ────────────────────────────────────────────────────────────
  {
    title: "Mutton Curry",
    badge: "Chef's Choice", badgeType: "green",
    desc: "Slow-cooked mutton in a deeply spiced onion-tomato gravy. Rich and hearty.",
    time: "70 min", prepTime: "15 min", cookTime: "55 min", difficulty: "Intermediate", rating: "4.8",
    nutrition: { kcal: 580, protein: "44g", carbs: "16g", fat: "36g" },
    primary: ["mutton", "lamb"],
    keywords: ["mutton", "lamb", "onion", "tomato", "garlic", "ginger", "spices", "garam masala"],
    steps: [
      { title: "Brown Meat", desc: "Sear mutton pieces in hot oil until browned on all sides. Set aside." },
      { title: "Cook Onions", desc: "Fry sliced onions until deep golden. This is the base — take your time (15 min)." },
      { title: "Add Tomato Masala", desc: "Add garlic, ginger paste, tomatoes, and spices. Cook until oil separates." },
      { title: "Slow Cook", desc: "Add mutton back in with water. Pressure cook 4-5 whistles or simmer 40 min until tender." },
      { title: "Finish", desc: "Adjust salt, add garam masala and coriander. Serve with roti or rice." },
    ],
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=80",
  },
  // ── BREAD / SNACKS ────────────────────────────────────────────────────────────
  {
    title: "Avocado Toast",
    badge: "Healthy", badgeType: "terracotta",
    desc: "Creamy smashed avocado on toasted sourdough with a poached egg on top.",
    time: "10 min", prepTime: "5 min", cookTime: "5 min", difficulty: "Easy", rating: "4.5",
    nutrition: { kcal: 320, protein: "12g", carbs: "28g", fat: "18g" },
    primary: ["avocado", "bread"],
    keywords: ["avocado", "bread", "egg", "tomato", "lemon", "salt"],
    steps: [
      { title: "Toast Bread", desc: "Toast sourdough or favourite bread until golden and crisp." },
      { title: "Smash Avocado", desc: "Halve ripe avocado, remove pit, smash with fork. Season with lemon, salt, pepper." },
      { title: "Spread & Top", desc: "Spread avocado over toast. Top with sliced tomato and a poached or fried egg." },
      { title: "Garnish", desc: "Add chili flakes, everything bagel seasoning, or fresh herbs." },
    ],
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?auto=format&fit=crop&w=900&q=80",
  },
];


// ─── UTILITIES ────────────────────────────────────────────────────────────────
const viewSections = document.querySelectorAll(".view");
const toast = document.getElementById("toast");

const showToast = (msg) => {
  if (!msg) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2400);
};

const starsHTML = (rating) => {
  const r = parseFloat(rating) || 0;
  return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "");
};

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const showView = (view) => {
  state.view = view;
  viewSections.forEach((s) => s.classList.toggle("is-active", s.dataset.view === view));

  // Update bottom nav — only update for main tabs
  const navMap = { ingredients: "ingredients", discovery: "discovery", saved: "saved", profile: "profile" };
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === view);
  });

  if (view === "profile")   { loadAPITokenInput(); updateTokenStatus(); renderProfileStats(); }
  if (view === "saved")     { renderSavedStats(); renderSavedCards(); renderSavedFilters(); }
  if (view === "discovery") { renderJournalCards(); }
  if (view === "cooking")   { renderCookingStep(); }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleNav = (e) => {
  const t = e.target.closest("[data-nav]");
  if (!t) return;
  showView(t.dataset.nav);
};

// ─── XP & LEVELS ─────────────────────────────────────────────────────────────
const addXP = (amt) => {
  state.xp += amt;
  const newLevel = Math.floor(state.xp / 200) + 1;
  if (newLevel > state.level) {
    state.level = newLevel;
    showToast("Level Up! You are now Level " + state.level);
    localStorage.setItem("level", JSON.stringify(state.level));
  }
  localStorage.setItem("xp", JSON.stringify(state.xp));
  renderProfileStats();
};

// ─── AUTO-CATEGORIZE ──────────────────────────────────────────────────────────
const autoCategory = (name) => {
  const n = name.toLowerCase();
  if (["egg","chicken","meat","beef","fish","salmon","tuna","tofu","paneer","lamb","pork","turkey","prawn","shrimp"].some(k => n.includes(k)))
    return { category: "Protein", icon: "egg", color: "#FF6B6B" };
  if (["milk","cheese","butter","cream","yogurt","curd","ghee"].some(k => n.includes(k)))
    return { category: "Dairy", icon: "breakfast_dining", color: "#FFD60A" };
  if (["spinach","lettuce","kale","mint","coriander","parsley","basil"].some(k => n.includes(k)))
    return { category: "Greens", icon: "eco", color: "#52B788" };
  if (["potato","tomato","onion","carrot","broccoli","pepper","capsicum","corn","mushroom","cabbage","eggplant","zucchini"].some(k => n.includes(k)))
    return { category: "Vegetables", icon: "outdoor_grill", color: "#4CC9F0" };
  if (["apple","banana","mango","berry","orange","lemon","lime","grape","strawberry","pineapple"].some(k => n.includes(k)))
    return { category: "Fruits", icon: "nutrition", color: "#74C69D" };
  if (["pasta","rice","bread","flour","noodle","oat","wheat","quinoa"].some(k => n.includes(k)))
    return { category: "Grains", icon: "grain", color: "#FFB703" };
  if (["chickpea","lentil","dal","bean"].some(k => n.includes(k)))
    return { category: "Legumes", icon: "spa", color: "#A8DADC" };
  return { category: "Pantry", icon: "kitchen", color: "#8D99AE" };
};

// ─── RENDER INGREDIENTS ───────────────────────────────────────────────────────
const ingredientListEl = document.getElementById("ingredient-list");
const ingredientCountEl = document.getElementById("ingredient-count");

const renderIngredients = () => {
  ingredientCountEl.textContent = state.ingredients.length;
  if (state.ingredients.length === 0) {
    ingredientListEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">kitchen</span>
        <h3>Your pantry is empty!</h3>
        <p>Type an ingredient above or use AI Vision Scan to get started.</p>
      </div>`;
    localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
    return;
  }
  ingredientListEl.innerHTML = state.ingredients.map((item, i) => `
    <div class="ingredient-item">
      <div class="ingredient-icon" style="background:${item.color}">
        <span class="material-symbols-rounded">${item.icon}</span>
      </div>
      <div class="ingredient-info">
        <h4>${item.name}</h4>
        <span>${item.category}</span>
      </div>
      <button class="remove-button" data-remove="${i}" aria-label="Remove ${item.name}">
        <span class="material-symbols-rounded">close</span>
      </button>
    </div>`).join("");
  localStorage.setItem("ingredients", JSON.stringify(state.ingredients));
};

const removeIngredient = (i) => {
  state.ingredients.splice(i, 1);
  renderIngredients();
  showToast("Ingredient removed");
};

const addIngredient = () => {
  const input = document.getElementById("ingredient-input");
  const val = input.value.trim();
  if (!val) return;
  val.split(",").map(s => s.trim()).filter(Boolean).forEach(name => {
    const meta = autoCategory(name);
    state.ingredients.unshift({ name: name.charAt(0).toUpperCase() + name.slice(1), ...meta });
  });
  const count = val.split(",").filter(s => s.trim()).length;
  input.value = "";
  renderIngredients();
  renderMatchChart();
  addXP(count * 10);
  showToast((count > 1 ? count + " ingredients" : val.trim()) + " added! +" + count * 10 + " XP");
};

// ─── RENDER STAPLES ───────────────────────────────────────────────────────────
const renderStaples = () => {
  const el = document.getElementById("staple-list");
  el.innerHTML = state.staples.map((s, i) => `
    <button class="staple-chip${s.selected ? " selected" : ""}" data-staple="${i}">
      <span class="material-symbols-rounded" style="font-size:14px;">check_circle</span>
      ${s.name}
    </button>`).join("");
  localStorage.setItem("staples", JSON.stringify(state.staples));
};

// ─── RENDER MATCH CHART ───────────────────────────────────────────────────────
const renderMatchChart = () => {
  const el = document.getElementById("match-chart");
  if (!el) return;

  // Score each recipe against user's pantry using the same weighted logic
  const userTokens = [];
  state.ingredients.forEach(ing => {
    const lower = ing.name.toLowerCase();
    userTokens.push(lower);
    lower.split(/\s+/).forEach(w => { if (w.length > 2) userTokens.push(w); });
  });
  const unique = [...new Set(userTokens)];

  const allRecipes = [...recipeDatabase, ...state.recipes].slice(0, 8);
  const uniqueByTitle = [];
  const seenTitles = new Set();
  allRecipes.forEach(r => { if (!seenTitles.has(r.title)) { seenTitles.add(r.title); uniqueByTitle.push(r); } });

  const scored = uniqueByTitle.map(r => {
    let score = 0, primaryMatches = 0;
    (r.primary || []).forEach(pk => {
      if (unique.some(u => u.includes(pk) || pk.includes(u))) { score += 10; primaryMatches++; }
    });
    (r.keywords || []).forEach(kw => {
      if (unique.some(u => u.includes(kw) || kw.includes(u))) score += 3;
    });
    if ((r.primary || []).length > 0 && primaryMatches === 0) score -= 50;
    const maxPossible = ((r.primary||[]).length * 10) + ((r.keywords||[]).length * 3);
    const pct = maxPossible > 0 ? Math.min(98, Math.max(4, Math.round((Math.max(0,score) / maxPossible) * 100))) : 4;
    return { title: r.title, pct };
  })
  .sort((a, b) => b.pct - a.pct)
  .slice(0, 5);

  if (scored.length === 0 || unique.length === 0) {
    el.parentElement.querySelector(".match-chart-header") &&
      (el.innerHTML = `<div class="match-empty"><span class="material-symbols-rounded">kitchen</span><span>Add ingredients to see match scores</span></div>`);
    return;
  }

  const maxPct = scored[0]?.pct || 1;

  el.innerHTML = `<div class="match-rows">${
    scored.map((d, i) => {
      const isTop = i === 0;
      const label = d.title.length > 22 ? d.title.slice(0, 21) + "…" : d.title;
      return `
        <div class="match-row">
          <div class="match-row-inner">
            <div class="match-name">${isTop ? '<span class="crown">👑</span>' : ''}<span>${label}</span></div>
            <div class="match-track">
              <div class="match-fill${isTop ? ' top' : ''}" data-w="${d.pct}" style="width:0%"></div>
            </div>
          </div>
          <div class="match-pct${isTop ? ' top' : ''}">${d.pct}%</div>
        </div>`;
    }).join("")
  }</div>`;

  // Animate bars in after a brief delay
  requestAnimationFrame(() => {
    el.querySelectorAll(".match-fill").forEach(bar => {
      bar.style.width = bar.dataset.w + "%";
    });
  });
};

// ─── JOURNAL CARDS (Discovery screen) ────────────────────────────────────────
const renderJournalCards = () => {
  const el = document.getElementById("discovery-recipes");
  if (!el) return;
  el.innerHTML = state.recipes.map((r, i) => `
    <div class="journal-card" data-recipe-idx="${i}">
      <div class="journal-card-img">
        <img src="${r.image}" alt="${r.title}" loading="lazy" />
        ${r.badge ? `<span class="journal-badge ${r.badgeType || 'green'}">${r.badge}</span>` : ""}
      </div>
      <div class="journal-card-body">
        <div class="journal-meta">
          <span class="journal-date">${r.date ? r.date.toUpperCase() : "RECENTLY ADDED"}</span>
          <span class="journal-stars" style="color:#E8A020;">${starsHTML(r.rating)}</span>
        </div>
        <div class="journal-card-title">${r.title}</div>
        <p class="journal-card-quote">"${r.desc}"</p>
      </div>
    </div>`).join("");
};

// ─── COOKING MODE ─────────────────────────────────────────────────────────────
const renderCookingStep = () => {
  const recipe = state.currentRecipe;
  if (!recipe || !recipe.steps) return;
  const steps = recipe.steps;
  const i = state.cookingStep;
  const step = steps[i];
  const total = steps.length;

  // Progress
  const pct = Math.round(((i + 1) / total) * 100);
  const prog = document.getElementById("cooking-progress");
  if (prog) prog.style.width = pct + "%";

  // Top label
  const topLabel = document.getElementById("cooking-step-label-top");
  if (topLabel) topLabel.textContent = `Step ${i + 1} of ${total}`;

  // Step image
  const stepImg = document.getElementById("cooking-step-img");
  if (stepImg) stepImg.src = step.image || recipe.image || "";
  const imgLabel = document.getElementById("cooking-img-label");
  if (imgLabel) imgLabel.textContent = step.imgLabel || "CURRENT STEP";

  // Headline
  const numEl = document.getElementById("cooking-step-num");
  const nameEl = document.getElementById("cooking-step-name");
  if (numEl) numEl.textContent = `Step ${i + 1}:`;
  if (nameEl) nameEl.textContent = step.title || "";

  // Instruction
  const instrEl = document.getElementById("cooking-instruction");
  if (instrEl) instrEl.textContent = step.desc || "";

  // Ingredient chips
  const chipsEl = document.getElementById("cooking-ing-chips");
  const chipIcons = ["nutrition", "eco", "water_drop", "kitchen", "bolt"];
  if (chipsEl) {
    const chips = step.chips || [];
    chipsEl.innerHTML = chips.map((c, ci) => `
      <div class="cooking-ing-chip">
        <span class="material-symbols-rounded">${chipIcons[ci % chipIcons.length]}</span>
        ${c}
      </div>`).join("");
  }

  // Update next button
  const nextBtn = document.getElementById("cooking-next-btn");
  if (nextBtn) {
    if (i >= total - 1) {
      nextBtn.textContent = "Finish Cooking 🎉";
    } else {
      nextBtn.textContent = "Next Step";
    }
  }

  // Voice: speak step instruction automatically if autoSpeak is on
  // (manual only — user presses the voice button in topbar)

  // Update cooking voice btn
  const cookingVoiceBtn = document.getElementById("cooking-voice-btn");
  if (cookingVoiceBtn && step.desc) {
    cookingVoiceBtn.dataset.stepText = step.desc;
  }
};

// ─── SAVED STATS ──────────────────────────────────────────────────────────────
const renderSavedStats = () => {
  const c = document.getElementById("stat-cooked");
  const s = document.getElementById("stat-saved");
  const r = document.getElementById("stat-rating");
  if (c) c.textContent = state.cookedCount;
  if (s) s.textContent = state.saved.length;
  if (r) {
    const vals = Object.values(state.userRatings);
    r.textContent = vals.length ? (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1) : "--";
  }
};

// ─── SAVED CARDS ─────────────────────────────────────────────────────────────
const renderSavedCards = () => {
  const el = document.getElementById("saved-recipes");
  const filtered = state.saved.filter(r => {
    const matchFilter = state.activeFilter === "All" ||
      (r.category || "").toLowerCase().includes(state.activeFilter.toLowerCase());
    const matchSearch = !state.searchQuery ||
      r.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      (r.desc || "").toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">bookmark_border</span>
        <h3>${state.searchQuery ? "No recipes match" : "No saved recipes yet"}</h3>
        <p>${state.searchQuery ? "Try a different search" : "Generate a recipe and tap the bookmark to save it!"}</p>
      </div>`;
    return;
  }

  el.innerHTML = filtered.map((r) => {
    const idx = state.saved.indexOf(r);
    const ur = state.userRatings[r.title] || 0;
    const stars = [1,2,3,4,5].map(s =>
      `<span class="star-btn${ur >= s ? " active" : ""}" data-recipe="${r.title}" data-rating="${s}">&#9733;</span>`
    ).join("");
    return `
      <div class="journal-card" style="position:relative;">
        <div class="journal-card-img">
          <img src="${r.image}" alt="${r.title}" loading="lazy" />
          ${r.badge ? `<span class="journal-badge ${r.badgeType || 'green'}">${r.badge}</span>` : ""}
          <button class="unsave-btn hero-nav-btn" data-unsave="${idx}"
            style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.9);">
            <span class="material-symbols-rounded" style="font-size:18px;color:#C0392B;">favorite</span>
          </button>
        </div>
        <div class="journal-card-body">
          <div class="saved-journal-meta">
            <span class="journal-date">${r.date || r.category || ""}</span>
            <span class="journal-stars">${starsHTML(r.rating)}</span>
          </div>
          <div class="journal-card-title">${r.title}</div>
          <p class="journal-card-quote">${r.desc}</p>
          <div class="star-rating">${stars}</div>
          <div style="display:flex;gap:16px;margin-top:10px;">
            <span style="font-size:12px;color:var(--secondary-text);font-weight:500;">
              <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px;">schedule</span> ${r.time}
            </span>
            <span style="font-size:12px;color:var(--secondary-text);font-weight:500;">
              <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px;">local_fire_department</span> ${r.difficulty}
            </span>
          </div>
        </div>
      </div>`;
  }).join("");
};

// ─── SAVED FILTERS ────────────────────────────────────────────────────────────
const renderSavedFilters = () => {
  const el = document.getElementById("saved-filters");
  const filters = ["All", "Breakfast", "Italian", "Vegan", "Dinner", "Desserts"];
  el.innerHTML = filters.map(f => `
    <button class="filter-chip${f === state.activeFilter ? " active" : ""}" data-saved-filter="${f}">
      ${f}
    </button>`).join("");
};

// ─── PROFILE STATS ────────────────────────────────────────────────────────────
const renderProfileStats = () => {
  const r  = document.getElementById("stat-recipes");
  const m  = document.getElementById("stat-meals");
  const xp = document.getElementById("stat-xp");
  const lv = document.getElementById("profile-level");
  // Use demo baseline + real progress so it matches the design
  const BASE_RECIPES = 42, BASE_MEALS = 156, BASE_XP = 2400, BASE_LEVEL = 12;
  const totalRecipes = BASE_RECIPES + (state.recipes ? state.recipes.length : 0);
  const totalMeals   = BASE_MEALS + (state.cookedCount || 0);
  const totalXP      = BASE_XP + (state.xp || 0);
  const totalLevel   = BASE_LEVEL + (state.level - 1 || 0);
  if (r)  r.textContent  = totalRecipes;
  if (m)  m.textContent  = totalMeals;
  if (xp) xp.textContent = totalXP >= 1000 ? (totalXP/1000).toFixed(1)+"k" : totalXP;
  if (lv) lv.textContent = "EPICUREAN EXPLORER • LEVEL " + totalLevel;
};


// ─── RENDER PREFERENCES ───────────────────────────────────────────────────────
const renderPreferences = () => {
  const el = document.getElementById("preference-tags");
  if (!el) return;
  el.innerHTML = state.preferences.map((p, i) => `
    <button class="pref-chip${p.selected ? " selected" : ""}" data-pref="${i}">${p.name}</button>`
  ).join("");
};

// ─── RENDER SKILLS ────────────────────────────────────────────────────────────
const renderSkills = () => {
  const el = document.getElementById("skill-levels");
  if (!el) return;
  el.innerHTML = state.skills.map((s, i) => `
    <div class="skill-tab${s.selected ? " selected" : ""}" data-skill="${i}">${s.title}</div>`
  ).join("");
};

// ─── WEEKLY NUTRITION CHART ───────────────────────────────────────────────────
const renderWeeklyChart = () => {
  const el = document.getElementById("weekly-chart");
  if (!el) return;
  const days = ["M","T","W","T","F","S","S"];
  // Wednesday and Friday are highlighted in the reference design
  const highlights = [2, 4];
  const accents    = [4];
  const base = [35, 50, 85, 40, 95, 30, 45];
  const vals = base.map(v => Math.max(v + (state.cookedCount * 4 % 15), 8));
  el.innerHTML = days.map((d, i) => `
    <div class="bar-col">
      <div class="bar-fill${highlights.includes(i) ? " highlight" : accents.includes(i) ? " accent-bar" : ""}"
           style="height:${vals[i]}px"></div>
      <span class="bar-day">${d}</span>
    </div>`).join("");
};

// ─── API TOKEN ────────────────────────────────────────────────────────────────
const loadAPITokenInput = () => {
  const input = document.getElementById("hf-api-token");
  if (input) input.value = state.hfToken;
};
const updateTokenStatus = () => {
  const el = document.getElementById("token-status");
  if (el) { el.textContent = state.hfToken ? "AI Ready" : "No token set"; el.style.color = state.hfToken ? "var(--success)" : "var(--error)"; }
};

// ─── RENDER DETAIL VIEW ───────────────────────────────────────────────────────
const renderDetail = () => {
  const recipe = state.currentRecipe;
  if (!recipe) return;

  // Hero image
  const heroImg = document.getElementById("detail-hero-img");
  if (heroImg) {
    heroImg.style.opacity = "0";
    // Use a reliable image with cache-busting to bypass CORS cold-load issues
    const imgUrl = recipe.image || "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80";
    heroImg.src = imgUrl + (imgUrl.includes("?") ? "&" : "?") + "t=" + Date.now();
    heroImg.alt = recipe.title;
    heroImg.crossOrigin = "anonymous";
    heroImg.onload = () => { heroImg.style.transition = "opacity 0.4s"; heroImg.style.opacity = "1"; };
    heroImg.onerror = () => {
      // Fallback to picsum for guaranteed image display
      heroImg.crossOrigin = null;
      heroImg.src = `https://picsum.photos/seed/${encodeURIComponent(recipe.title)}/900/600`;
      heroImg.style.opacity = "1";
    };
  }

  // Title, time, nutrition
  const titleEl   = document.getElementById("detail-title");
  const timeEl    = document.getElementById("detail-time");
  const diffEl    = document.getElementById("detail-difficulty");
  const ratingEl  = document.getElementById("detail-rating");
  const reviewsEl = document.getElementById("detail-reviews");
  if (titleEl)   titleEl.textContent   = recipe.title;
  if (timeEl)    timeEl.textContent    = recipe.time || "30 min";
  const kcalStr = recipe.nutrition ? `${recipe.nutrition.kcal} kcal` : (recipe.difficulty || "Easy");
  if (diffEl)    diffEl.textContent    = kcalStr;
  if (ratingEl)  ratingEl.textContent  = recipe.rating || "4.5";
  if (reviewsEl) reviewsEl.textContent = "128 reviews";

  // Ingredients
  const ingEl = document.getElementById("detail-ingredients");
  const ingData = recipe.ingredients || [
    { name: "2 Large Potatoes", sub: "Peeled and diced",        color: "#4CC9F0" },
    { name: "3 Fresh Eggs",     sub: "Room temperature",        color: "#FFD60A" },
    { name: "1 Red Onion",      sub: "Finely sliced",           color: "#FF6B6B" },
    { name: "Handful Spinach",  sub: "Washed and dried",        color: "#52B788" },
    { name: "2 tbsp Olive Oil", sub: "Extra virgin",            color: "#8D99AE" },
    { name: "Salt & Pepper",    sub: "To taste",                color: "#8D99AE" },
  ];
  if (ingEl) {
    ingEl.innerHTML = ingData.map((ing, idx) => `
      <div class="detail-ingredient-row">
        <div class="detail-ing-check${idx === 1 ? " checked" : ""}" data-check="${idx}"></div>
        <div class="detail-ing-info">
          <div class="detail-ing-name">${typeof ing === "string" ? ing : ing.name}</div>
          ${ing.sub ? `<div class="detail-ing-sub">${ing.sub}</div>` : ""}
        </div>
      </div>`).join("");
  }

  // Steps
  const stepsEl = document.getElementById("detail-steps");
  const stepsData = recipe.steps || [
    { title: "Prepare", desc: "Wash, peel, and chop all fresh ingredients carefully." },
    { title: "Heat",    desc: "Heat 2 tablespoons of oil in a large skillet over medium-high heat." },
    { title: "Cook",    desc: "Add your ingredients and cook 15-20 minutes, stirring occasionally." },
    { title: "Season",  desc: "Add salt, pepper, and your favourite spices. Mix well." },
    { title: "Serve",   desc: "Transfer to a serving plate. Serve hot and enjoy!" },
  ];
  // Find the step that has an inline image (design shows image between step 2 & 3)
  const inlineImageStep = stepsData.findIndex((s, i) => i > 0 && s.image && s.image !== stepsData[0]?.image);
  if (stepsEl) {
    stepsEl.innerHTML = stepsData.map((step, i) => {
      const title = typeof step === "string" ? `Step ${i+1}` : step.title;
      const desc  = typeof step === "string" ? step : step.desc;
      const stepImg = (typeof step === "object" && step.image && i === 1) ?
        `<div class="step-inline-img"><img src="${step.image}" alt="${title}" onerror="this.parentElement.style.display='none'"/></div>` : "";
      return `
        <div class="step-item">
          <div class="step-num">${i+1}</div>
          <div class="step-content">
            <div class="step-title">${title}</div>
            <div class="step-desc">${desc}</div>
            <div class="step-actions">
              <button class="step-speak-btn" data-step-text="${desc.replace(/"/g,'&quot;')}" aria-label="Read step aloud">
                <span class="material-symbols-rounded">volume_up</span>
                Listen
              </button>
            </div>
          </div>
        </div>${stepImg}`;
    }).join("");
    // Wire up speak buttons
    stepsEl.querySelectorAll(".step-speak-btn").forEach(btn => {
      btn.addEventListener("click", () => speakStep(btn));
    });
  }

  // Reset translation section
  const transSec = document.getElementById("translation-section");
  if (transSec) transSec.style.display = "none";

  // Nutrition panel
  const nutEl = document.getElementById("detail-nutrition-panel");
  if (nutEl) {
    const n = recipe.nutrition;
    if (n) {
      nutEl.innerHTML = `
        <div class="nut-tile"><span class="nut-val">${n.kcal}</span><span class="nut-label">kcal</span></div>
        <div class="nut-tile"><span class="nut-val">${n.protein}</span><span class="nut-label">Protein</span></div>
        <div class="nut-tile"><span class="nut-val">${n.carbs}</span><span class="nut-label">Carbs</span></div>
        <div class="nut-tile"><span class="nut-val">${n.fat}</span><span class="nut-label">Fat</span></div>`;
      nutEl.style.display = "grid";
    } else {
      nutEl.style.display = "none";
    }
  }

  // User star rating display
  const starEl = document.getElementById("detail-user-rating");
  if (starEl) {
    const key = recipe.title;
    const saved = state.userRatings[key];
    starEl.innerHTML = saved
      ? `<span class="user-star-label">Your Rating:</span>${[1,2,3,4,5].map(i =>
          `<span class="user-star ${i <= saved ? 'filled' : ''}" data-star="${i}">★</span>`).join('')}`
      : `<span class="user-star-label">Rate this recipe:</span>${[1,2,3,4,5].map(i =>
          `<span class="user-star" data-star="${i}">☆</span>`).join('')}`;
    starEl.querySelectorAll(".user-star").forEach(s => {
      s.addEventListener("click", () => {
        const stars = parseInt(s.dataset.star);
        state.userRatings[recipe.title] = stars;
        localStorage.setItem("userRatings", JSON.stringify(state.userRatings));
        renderDetail();
        showToast(`Rated ${stars} star${stars > 1 ? 's' : ''}! ⭐`);
      });
    });
  }

  // Reset bookmark icon
  const favSpan = document.querySelector("#favorite-detail span");
  if (favSpan) favSpan.textContent = "bookmark_border";
  isFaved = false;
};

// ─── GENERATE RECIPE ──────────────────────────────────────────────────────────
const generateRecipe = async () => {
  if (state.ingredients.length === 0) { showToast("Add at least one ingredient first!"); return; }
  const btn = document.getElementById("generate-recipe");
  if (btn) { btn.textContent = "Generating..."; btn.disabled = true; }
  showToast("Finding your perfect recipe...");
  await new Promise(r => setTimeout(r, 700));

  if (!state.hfToken) {
    useLocalRecipeDatabase(state.ingredients);
    if (btn) { btn.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span> Generate Magic Recipe'; btn.disabled = false; }
    addXP(50);
    renderMatchChart();
    return;
  }

  try {
    const ingList = state.ingredients.map(i => i.name).join(", ");
    const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      headers: { Authorization: `Bearer ${state.hfToken}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ inputs: `Create recipe with: ${ingList}. Return JSON with title, description, time, difficulty, ingredients array, steps array.`, parameters: { max_new_tokens: 600, return_full_text: false } }),
    });
    if (!res.ok) throw new Error("API " + res.status);
    const result = await res.json();
    const text = Array.isArray(result) ? result[0].generated_text : result.generated_text;
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      const p = JSON.parse(m[0]);
      const recipe = {
        title: p.title || "AI Generated Recipe", desc: p.description || "",
        time: p.time || "30 min", prepTime: "10 min", cookTime: "20 min",
        difficulty: p.difficulty || "Medium", rating: "4.5",
        badge: "AI Recipe", badgeType: "green", date: new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }),
        keywords: [], image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=80",
        ingredients: (p.ingredients || []).map(i => ({ name: i, color: "#8D99AE" })),
        steps: (p.steps || []).map((s, idx) => ({ title: `Step ${idx+1}`, desc: s })),
      };
      state.recipes.unshift(recipe); state.currentRecipe = recipe;
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
      renderJournalCards(); renderDetail(); showView("detail"); addXP(50);
    } else { useLocalRecipeDatabase(state.ingredients); }
  } catch { useLocalRecipeDatabase(state.ingredients); }
  finally {
    if (btn) { btn.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span> Generate Magic Recipe'; btn.disabled = false; }
    renderMatchChart();
  }
};

// ─── LOCAL RECIPE MATCHING ────────────────────────────────────────────────────
const useLocalRecipeDatabase = (ingredients) => {
  // Expand user ingredient names into individual words + the full name
  // e.g. "chicken breast" → ["chicken breast", "chicken", "breast"]
  const userTokens = [];
  ingredients.forEach(ing => {
    const lower = ing.name.toLowerCase();
    userTokens.push(lower);
    lower.split(/\s+/).forEach(w => { if (w.length > 2) userTokens.push(w); });
  });

  const unique = [...new Set(userTokens)];

  // Scoring: primary keyword match = 10 pts, regular keyword = 3 pts
  // If NONE of the primary keywords match → apply -50 penalty (prevents wrong matches)
  let best = null, bestScore = -Infinity, bestPrimaryMatchCount = 0;

  recipeDatabase.forEach(r => {
    let score = 0;
    let primaryMatches = 0;

    // Check primary keywords (the core ingredient of the recipe)
    (r.primary || []).forEach(pk => {
      if (unique.some(u => u.includes(pk) || pk.includes(u))) {
        score += 10;
        primaryMatches++;
      }
    });

    // Check all keywords (supporting ingredients)
    (r.keywords || []).forEach(kw => {
      if (unique.some(u => u.includes(kw) || kw.includes(u))) {
        score += 3;
      }
    });

    // Heavy penalty if recipe has primary keywords but none matched
    // This prevents "Egg Fried Rice" winning when user adds chicken + rice
    if ((r.primary || []).length > 0 && primaryMatches === 0) {
      score -= 50;
    }

    if (score > bestScore) {
      bestScore = score;
      best = r;
      bestPrimaryMatchCount = primaryMatches;
    }
  });

  // Calculate match percentage based on how many of the recipe's keywords matched
  const baseRecipe = best || recipeDatabase[0];
  const maxPossible = ((baseRecipe.primary || []).length * 10) + ((baseRecipe.keywords || []).length * 3);
  const rawScore = Math.max(0, bestScore);
  const pct = maxPossible > 0 ? Math.min(98, Math.round((rawScore / maxPossible) * 100)) : 0;

  // Build ingredient list from user's pantry
  const pfx = ["2 cups","1 cup","3 tbsp","2 tbsp","1 tbsp","1 tsp","2 medium","Handful of","1 can","3 large"];
  const recipeIngredients = ingredients.slice(0, 8).map((ing, i) => ({
    name: pfx[i % pfx.length] + " " + ing.name,
    sub: ing.category, color: ing.color,
  }));
  state.staples.filter(s => s.selected).forEach((s, i) => {
    if (!recipeIngredients.find(r => r.name.toLowerCase().includes(s.name.toLowerCase())) && recipeIngredients.length < 10)
      recipeIngredients.push({ name: ["2 tbsp","1 tsp","1/2 tsp","1 tbsp","1/4 cup"][i%5] + " " + s.name, sub: "Staple", color: "#8D99AE" });
  });

  const recipe = {
    ...baseRecipe,
    match: pct + "% Match",
    matchColor: pct >= 60 ? "#3A5F2D" : pct >= 30 ? "#4CC9F0" : "#FFB703",
    date: new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }),
    ingredients: recipeIngredients,
  };
  state.recipes.unshift(recipe);
  state.currentRecipe = recipe;
  localStorage.setItem("recipes", JSON.stringify(state.recipes));
  renderJournalCards(); renderDetail();
  showView("detail");
  showToast(`🍽️ ${recipe.title} — ${recipe.match} with your pantry!`);
};


// ─── TRANSLATE TO HINGLISH ────────────────────────────────────────────────────
const translateRecipeToHinglish = async () => {
  if (!state.currentRecipe) { showToast("No recipe to translate"); return; }
  if (!state.hfToken) { showToast("Set up API token in Profile first"); showView("profile"); return; }
  const btn = document.getElementById("translate-recipe-btn");
  const orig = btn.innerHTML;
  btn.disabled = true; btn.textContent = "Translating...";
  try {
    const recipe = state.currentRecipe;
    const text = `Recipe: ${recipe.title}. ${recipe.desc}. Steps: ${(recipe.steps||[]).map(s => typeof s === "string" ? s : s.desc).join(". ")}`;
    const res = await fetch("https://api-inference.huggingface.co/models/suyash2739/English_to_Hinglish_fintuned_lamma_3_8b_instruct", {
      headers: { Authorization: `Bearer ${state.hfToken}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ inputs: text, parameters: { max_new_tokens: 500 } }),
    });
    if (!res.ok) throw new Error("Translation API " + res.status);
    const result = await res.json();
    let translated = Array.isArray(result) ? result[0]?.generated_text : result.translation_text || result;
    if (!translated) throw new Error("Empty response");
    const sec = document.getElementById("translation-section");
    document.getElementById("translated-text").textContent = translated;
    sec.style.display = "block";
    showToast("Translated to Hinglish!");
  } catch (err) { showToast("Translation error: " + err.message);
  } finally { btn.disabled = false; btn.innerHTML = orig; }
};

// ─── AI VISION ────────────────────────────────────────────────────────────────
const processImageWithAI = async (file) => {
  const loader = document.getElementById("ai-loading");
  if (!state.hfToken) { showToast("Set up API token in Profile first"); showView("profile"); return; }
  if (loader) loader.style.display = "flex";
  showToast("AI scanning your image...");
  try {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    await new Promise(r => (reader.onload = r));
    const res = await fetch("https://api-inference.huggingface.co/models/google/vit-base-patch16-224", {
      headers: { Authorization: `Bearer ${state.hfToken}`, "Content-Type": "application/octet-stream" },
      method: "POST", body: reader.result,
    });
    if (!res.ok) throw new Error("API " + res.status);
    const result = await res.json();
    const labels = (Array.isArray(result) ? result : []).slice(0, 3).map(r => r.label.split(",")[0].trim());
    if (labels.length) {
      labels.forEach(label => {
        const meta = autoCategory(label);
        state.ingredients.unshift({ name: label.charAt(0).toUpperCase() + label.slice(1), ...meta });
      });
      renderIngredients();
      showToast("AI detected: " + labels.join(", "));
    } else { showToast("No ingredients detected. Try a clearer photo."); }
  } catch (e) { showToast("AI vision error: " + e.message); }
  finally { if (loader) loader.style.display = "none"; }
};

// ─── VOICE INSTRUCTIONS ──────────────────────────────────────────────────────
let _speechUtterance = null;

const speakStep = (btn) => {
  if (!window.speechSynthesis) { showToast("Voice not supported in this browser"); return; }
  const text = btn.dataset.stepText;
  // If already speaking this step, stop it
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll(".step-speak-btn").forEach(b => {
      b.classList.remove("speaking");
      b.querySelector(".material-symbols-rounded").textContent = "volume_up";
      b.childNodes[1] && (b.childNodes[1].textContent = " Listen");
    });
    if (btn._wasSpeaking) { btn._wasSpeaking = false; return; }
  }
  btn._wasSpeaking = true;
  btn.classList.add("speaking");
  btn.querySelector(".material-symbols-rounded").textContent = "stop_circle";

  _speechUtterance = new SpeechSynthesisUtterance(text);
  _speechUtterance.rate = 0.92;
  _speechUtterance.pitch = 1;
  _speechUtterance.lang = "en-US";
  _speechUtterance.onend = () => {
    btn.classList.remove("speaking");
    btn.querySelector(".material-symbols-rounded").textContent = "volume_up";
    btn._wasSpeaking = false;
  };
  window.speechSynthesis.speak(_speechUtterance);
};

const speakCookingStep = () => {
  const btn = document.getElementById("cooking-voice-btn");
  if (!btn) return;
  if (!window.speechSynthesis) { showToast("Voice not supported"); return; }
  const text = btn.dataset.stepText;
  if (!text) return;
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.querySelector(".material-symbols-rounded").textContent = "volume_up";
    return;
  }
  btn.querySelector(".material-symbols-rounded").textContent = "stop_circle";
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.92; utt.lang = "en-US";
  utt.onend = () => { btn.querySelector(".material-symbols-rounded").textContent = "volume_up"; };
  window.speechSynthesis.speak(utt);
};

// ─── COOKING TIMER ────────────────────────────────────────────────────────────
let _timerInterval = null;
let _timerSeconds  = 0;
let _timerTotal    = 0;

// ── Floating pill (visible while recipe is shown) ─────────────────────────────
const ensureFloatingPill = () => {
  let pill = document.getElementById("timer-float-pill");
  if (!pill) {
    pill = document.createElement("button");
    pill.id = "timer-float-pill";
    pill.setAttribute("aria-label", "Open timer");
    pill.innerHTML = `<span class="material-symbols-rounded">timer</span><span id="timer-float-time">5:00</span>`;
    pill.addEventListener("click", openTimerModal);
    document.body.appendChild(pill);
  }
  return pill;
};

const showFloatingPill = (timeText) => {
  const pill = ensureFloatingPill();
  document.getElementById("timer-float-time").textContent = timeText;
  pill.classList.remove("done");
  pill.classList.add("visible");
};

const hideFloatingPill = () => {
  const pill = document.getElementById("timer-float-pill");
  if (pill) pill.classList.remove("visible", "done");
};

const setFloatingPillDone = () => {
  const pill = document.getElementById("timer-float-pill");
  if (!pill) return;
  document.getElementById("timer-float-time").textContent = "Done!";
  pill.querySelector(".material-symbols-rounded").textContent = "check_circle";
  pill.classList.add("done", "visible");
  setTimeout(() => {
    pill.classList.remove("visible", "done");
    pill.querySelector(".material-symbols-rounded").textContent = "timer";
  }, 4000);
};

const openTimerModal = () => {
  let modal = document.getElementById("timer-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "timer-modal";
    modal.innerHTML = `
      <div class="timer-backdrop" id="timer-backdrop"></div>
      <div class="timer-sheet">
        <div class="timer-header">
          <span class="timer-title">Cooking Timer</span>
          <button class="timer-close" id="timer-close-btn"><span class="material-symbols-rounded">close</span></button>
        </div>
        <div class="timer-ring-wrap">
          <svg class="timer-ring-svg" viewBox="0 0 120 120">
            <circle class="timer-ring-bg" cx="60" cy="60" r="52"/>
            <circle class="timer-ring-fill" id="timer-ring" cx="60" cy="60" r="52" stroke-dasharray="327" stroke-dashoffset="0"/>
          </svg>
          <div class="timer-display" id="timer-display">5:00</div>
        </div>
        <div class="timer-presets">
          <button class="timer-preset" data-secs="120">2 min</button>
          <button class="timer-preset" data-secs="300">5 min</button>
          <button class="timer-preset" data-secs="600">10 min</button>
          <button class="timer-preset" data-secs="900">15 min</button>
          <button class="timer-preset" data-secs="1800">30 min</button>
        </div>
        <div class="timer-controls">
          <button class="timer-btn start" id="timer-start-btn">Start</button>
          <button class="timer-btn reset" id="timer-reset-btn">Reset</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    // Preset buttons
    modal.querySelectorAll(".timer-preset").forEach(btn => {
      btn.addEventListener("click", () => {
        clearInterval(_timerInterval); _timerInterval = null;
        _timerSeconds = parseInt(btn.dataset.secs);
        _timerTotal   = _timerSeconds;
        updateTimerDisplay(_timerSeconds, _timerSeconds);
        modal.querySelectorAll(".timer-preset").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("timer-start-btn").textContent = "Start";
      });
    });

    document.getElementById("timer-start-btn").addEventListener("click", () => {
      const startBtn = document.getElementById("timer-start-btn");
      if (_timerInterval) {
        // PAUSE
        clearInterval(_timerInterval); _timerInterval = null;
        startBtn.textContent = "Resume";
        // Keep pill visible but paused
        const m = Math.floor(_timerSeconds / 60);
        const s = _timerSeconds % 60;
        showFloatingPill(`⏸ ${m}:${s < 10 ? "0" : ""}${s}`);
      } else {
        if (_timerSeconds <= 0) _timerSeconds = 300;
        if (_timerTotal === 0) _timerTotal = _timerSeconds;
        const totalSecs = _timerTotal;
        startBtn.textContent = "Pause";
        // Close modal so cooking step is visible, show floating pill
        closeTimerModal();
        const m0 = Math.floor(_timerSeconds / 60);
        const s0 = _timerSeconds % 60;
        showFloatingPill(`${m0}:${s0 < 10 ? "0" : ""}${s0}`);
        _timerInterval = setInterval(() => {
          _timerSeconds--;
          updateTimerDisplay(_timerSeconds, totalSecs);
          if (_timerSeconds <= 0) {
            clearInterval(_timerInterval); _timerInterval = null;
            startBtn.textContent = "Start";
            _timerTotal = 0;
            setFloatingPillDone();
            playTimerAlert();
          }
        }, 1000);
      }
    });

    document.getElementById("timer-reset-btn").addEventListener("click", () => {
      clearInterval(_timerInterval); _timerInterval = null;
      _timerSeconds = 0;
      _timerTotal = 0;
      updateTimerDisplay(0, 1);
      document.getElementById("timer-start-btn").textContent = "Start";
      document.querySelectorAll(".timer-preset").forEach(b => b.classList.remove("active"));
      hideFloatingPill();
    });

    document.getElementById("timer-close-btn").addEventListener("click", closeTimerModal);
    document.getElementById("timer-backdrop").addEventListener("click", closeTimerModal);
  }
  modal.classList.add("open");
  // Default to 5 min
  if (_timerSeconds === 0) {
    _timerSeconds = 300;
    updateTimerDisplay(300, 300);
  }
};

const closeTimerModal = () => {
  const modal = document.getElementById("timer-modal");
  if (modal) modal.classList.remove("open");
};

const updateTimerDisplay = (remaining, total) => {
  const el = document.getElementById("timer-display");
  const ring = document.getElementById("timer-ring");
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const timeStr = `${m}:${s < 10 ? "0" : ""}${s}`;
  if (el) el.textContent = timeStr;
  if (ring) {
    const circumference = 327;
    const progress = total > 0 ? remaining / total : 0;
    ring.style.strokeDashoffset = circumference * (1 - progress);
  }
  // Also update the floating pill if it's visible
  const pillTime = document.getElementById("timer-float-time");
  if (pillTime && document.getElementById("timer-float-pill")?.classList.contains("visible")) {
    pillTime.textContent = timeStr;
  }
};

const playTimerAlert = () => {
  showToast("⏱️ Timer done! Your step is ready.");
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.2, 0.4].forEach(delay => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.3);
    });
  } catch(e) {}
};

// ─── SHOPPING LIST ────────────────────────────────────────────────────────────
const showShoppingList = () => {
  const recipe = state.currentRecipe;
  if (!recipe) { showToast("No recipe loaded"); return; }

  const userItems = [
    ...state.ingredients.map(i => i.name.toLowerCase()),
    ...state.staples.filter(s => s.selected).map(s => s.name.toLowerCase()),
  ];

  const recipeIngredients = recipe.ingredients || [];
  const missing = recipeIngredients.filter(ing => {
    const name = (typeof ing === "string" ? ing : ing.name).toLowerCase();
    // Strip quantity prefixes to get just the ingredient name
    const cleanName = name.replace(/^[\d.]+\s*(cups?|tbsp|tsp|g|kg|ml|l|oz|lb|medium|large|small|handful of|can|cloves?)\s*/i, "").trim();
    return !userItems.some(u => cleanName.includes(u) || u.includes(cleanName.split(" ").pop()));
  });

  let modal = document.getElementById("shopping-modal");
  if (modal) modal.remove();

  modal = document.createElement("div");
  modal.id = "shopping-modal";
  const listItems = missing.length === 0
    ? `<div class="shopping-all-good"><span class="material-symbols-rounded">check_circle</span><p>You have everything for this recipe!</p></div>`
    : missing.map((ing, i) => {
        const name = typeof ing === "string" ? ing : ing.name;
        return `<label class="shopping-item"><input type="checkbox" id="shop-item-${i}"><span class="shopping-item-name">${name}</span></label>`;
      }).join("");

  modal.innerHTML = `
    <div class="timer-backdrop" id="shopping-backdrop"></div>
    <div class="timer-sheet">
      <div class="timer-header">
        <span class="timer-title">🛒 Shopping List</span>
        <button class="timer-close" id="shopping-close-btn"><span class="material-symbols-rounded">close</span></button>
      </div>
      <p class="shopping-subtitle">${missing.length === 0 ? "All stocked up!" : `${missing.length} item${missing.length > 1 ? "s" : ""} needed for <em>${recipe.title}</em>`}</p>
      <div class="shopping-list">${listItems}</div>
      ${missing.length > 0 ? `<button class="timer-btn start" id="copy-shopping-btn" style="margin-top:14px;width:100%;">📋 Copy to Clipboard</button>` : ""}
    </div>`;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("open"), 10);

  document.getElementById("shopping-close-btn").addEventListener("click", () => modal.remove());
  document.getElementById("shopping-backdrop").addEventListener("click", () => modal.remove());

  const copyBtn = document.getElementById("copy-shopping-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const text = `Shopping List for ${recipe.title}:\n` + missing.map(ing => {
        const name = typeof ing === "string" ? ing : ing.name;
        return `• ${name}`;
      }).join("\n");
      navigator.clipboard.writeText(text).then(() => showToast("📋 Copied!")).catch(() => showToast("Could not copy"));
    });
  }
};

// ─── INIT ─────────────────────────────────────────────────────────────────────
const DATA_VERSION = "v6"; // bump this to force cache reset
const storedVersion = localStorage.getItem("dataVersion");
if (storedVersion !== DATA_VERSION) {
  // Clear stale recipe/saved data so new schema loads
  localStorage.removeItem("recipes");
  localStorage.removeItem("saved");
  localStorage.setItem("dataVersion", DATA_VERSION);
  // Re-apply state defaults  
  state.recipes = null; // will force re-init below
  state.saved = null;
}

// Re-parse after potential cache clear
if (!state.recipes) {
  state.recipes = [
    {
      title: "Mediterranean Herb Roasted Chicken",
      desc: "Used extra rosemary and let it sit in the brine for 2 hours longer. Much better! The skin was perfectly crisp.",
      time: "45 mins", difficulty: "Intermediate", rating: "4.9", nutrition: "580 kcal",
      badge: "Chef's Choice", badgeType: "green", date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "1.5kg Whole Chicken", sub: "Organic, skin-on" },
        { name: "3 cloves Garlic", sub: "Minced or crushed", checked: true },
        { name: "Fresh Rosemary & Thyme", sub: "2–3 sprigs each" },
        { name: "Extra Virgin Olive Oil", sub: "Cold pressed" },
        { name: "Sea Salt & Black Pepper", sub: "To taste" },
        { name: "1 Lemon", sub: "Sliced, for stuffing" },
      ],
      steps: [
        { title: "Preheat and Prep", desc: "Preheat oven to 200°C (400°F). Pat the chicken dry with paper towels to ensure skin gets extra crispy.", imgLabel: "PREP STATION", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80" },
        { title: "Herb Infusion", desc: "Mix minced garlic with chopped rosemary, thyme, and olive oil. Rub this aromatic mixture generously over and under the chicken skin.", imgLabel: "AROMATIC BASE", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80", chips: ["Minced Garlic", "Fresh Rosemary", "Olive Oil"] },
        { title: "Slow Roasting", desc: "Place in a roasting dish. Roast for 45 minutes, basting occasionally until internal temperature reaches 75°C (165°F).", imgLabel: "SLOW ROAST", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", chips: ["Whole Chicken", "Lemon", "Herbs"] },
        { title: "Rest & Carve", desc: "Remove from oven and rest 10 minutes before carving. This keeps the juices inside the meat.", imgLabel: "REST TIME", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80" },
        { title: "Serve & Enjoy", desc: "Carve and plate with roasted vegetables. Drizzle with pan juices, garnish with fresh rosemary.", imgLabel: "PLATING", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      title: "Hand-Rolled Pesto Linguine",
      desc: "First time making the dough from scratch. A bit tough maybe less flour next time. The basil from the garden is incredible.",
      time: "60 min", difficulty: "Hard", rating: "4.5", nutrition: "420 kcal",
      badge: "Healthy", badgeType: "terracotta", date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "300g Pasta Flour", sub: "Tipo 00 preferred" },
        { name: "3 Large Eggs", sub: "Room temperature" },
        { name: "2 cups Fresh Basil", sub: "Packed, washed" },
        { name: "50g Pine Nuts", sub: "Lightly toasted" },
        { name: "60g Parmesan", sub: "Freshly grated" },
        { name: "Extra Virgin Olive Oil", sub: "High quality" },
      ],
      steps: [
        { title: "Make the Dough", desc: "Mound flour on clean surface, make a well, crack in eggs. Gradually incorporate flour with a fork then knead 8–10 minutes until silky smooth.", imgLabel: "DOUGH PREP", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80", chips: ["Pasta Flour", "Fresh Eggs"] },
        { title: "Rest Dough", desc: "Wrap dough in cling film and rest 30 minutes at room temperature. This lets the gluten relax for easier rolling.", imgLabel: "REST", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80" },
        { title: "Make Pesto", desc: "Blend basil, pine nuts, parmesan, and garlic. Stream in olive oil while blending until smooth and vibrant green.", imgLabel: "PESTO", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80", chips: ["Fresh Basil", "Pine Nuts", "Parmesan"] },
        { title: "Roll & Cut", desc: "Roll dough thin (2mm), fold and cut into 5mm linguine strands. Dust with flour to prevent sticking.", imgLabel: "ROLLING", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80" },
        { title: "Cook & Toss", desc: "Cook fresh pasta 2–3 minutes in salted boiling water. Reserve pasta water, drain and toss generously with pesto.", imgLabel: "FINISHING", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80" },
      ],
    },
    {
      title: "Sesame Glazed Salmon Bowl",
      desc: "Quick weeknight win. Added pickled ginger for extra zing. The kids actually ate the salmon!",
      time: "20 min", difficulty: "Easy", rating: "4.9", nutrition: "510 kcal",
      badge: "New Recipe", badgeType: "peach", date: "March 8, 2024",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
      ingredients: [
        { name: "2 Salmon Fillets", sub: "Skin-on, 200g each" },
        { name: "3 tbsp Soy Sauce", sub: "Low sodium" },
        { name: "2 tbsp Sesame Oil", sub: "Toasted" },
        { name: "1 tbsp Honey", sub: "For glaze" },
        { name: "Steamed Jasmine Rice", sub: "2 cups cooked" },
        { name: "Pickled Ginger", sub: "To serve" },
      ],
      steps: [
        { title: "Make Glaze", desc: "Whisk together soy sauce, sesame oil, honey, and minced ginger until combined.", imgLabel: "GLAZE", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80", chips: ["Soy Sauce", "Sesame Oil", "Honey"] },
        { title: "Marinate", desc: "Coat salmon fillets in half the glaze. Marinate 5 minutes while the pan heats up.", imgLabel: "MARINATE", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80" },
        { title: "Sear Salmon", desc: "Heat pan to medium-high. Sear salmon skin-side down 4 minutes until crispy. Flip, brush remaining glaze, cook 3 more minutes.", imgLabel: "SEARING", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80", chips: ["Salmon Fillets", "Glaze"] },
        { title: "Assemble Bowl", desc: "Serve salmon over steamed rice. Garnish with sesame seeds, pickled ginger, and sliced avocado.", imgLabel: "PLATING", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80" },
      ],
    },
  ];
}
if (!state.saved) {
  state.saved = [
    { title: "Mediterranean Herb Roasted Chicken", desc: "Used extra rosemary — the skin was perfectly crisp.", time: "45 min", difficulty: "Medium", category: "Dinner", badge: "Chef's Choice", badgeType: "green", date: "March 15, 2024", rating: "4.8", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&w=900&q=80" },
    { title: "Hand-Rolled Pesto Linguine", desc: "First time making dough from scratch. The basil from the garden was incredible.", time: "60 min", difficulty: "Hard", category: "Italian", badge: "Healthy", badgeType: "green", date: "March 12, 2024", rating: "4.5", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80" },
    { title: "Sesame Glazed Salmon Bowl", desc: "Quick weeknight win. The kids actually ate the salmon!", time: "20 min", difficulty: "Easy", category: "Dinner", badge: "New Recipe", badgeType: "terracotta", date: "March 8, 2024", rating: "4.9", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80" },
  ];
}

const init = () => {
  if (state.darkMode) { document.body.classList.add("dark"); const t = document.getElementById("dark-mode-toggle"); if (t) t.checked = true; }
  renderIngredients();
  renderStaples();
  renderMatchChart();
  renderJournalCards();
  renderSavedCards();
  renderSavedFilters();
  renderSavedStats();
  renderDetail();
  renderPreferences();
  renderSkills();
  renderWeeklyChart();
  renderProfileStats();
  updateTokenStatus();
  // Restore About Me from localStorage
  const savedAbout = localStorage.getItem("aboutMe");
  if (savedAbout) {
    const ta = document.getElementById("about-me-textarea");
    if (ta) ta.value = savedAbout;
  }
};


init();

// ─── GLOBAL CLICK HANDLER ─────────────────────────────────────────────────────
document.body.addEventListener("click", (e) => {
  // Nav
  const navBtn = e.target.closest("[data-nav]");
  if (navBtn) { showView(navBtn.dataset.nav); return; }

  // Toast targets
  const toastBtn = e.target.closest("[data-toast]");
  if (toastBtn) {
    // Special handling for Save Profile button
    if (toastBtn.classList.contains("save-profile-btn")) {
      const aboutTA = document.getElementById("about-me-textarea");
      if (aboutTA) localStorage.setItem("aboutMe", aboutTA.value);
      renderProfileStats();
    }
    showToast(toastBtn.dataset.toast);
  }
});

// ─── SPECIFIC EVENT LISTENERS ─────────────────────────────────────────────────

// Add ingredient
document.getElementById("add-ingredient").addEventListener("click", addIngredient);
document.getElementById("ingredient-input").addEventListener("keydown", e => { if (e.key === "Enter") addIngredient(); });

// Remove ingredient
ingredientListEl.addEventListener("click", e => {
  const btn = e.target.closest("[data-remove]");
  if (btn) removeIngredient(parseInt(btn.dataset.remove));
});

// Ingredient checkboxes in detail
document.getElementById("detail-ingredients").addEventListener("click", e => {
  const chk = e.target.closest("[data-check]");
  if (chk) chk.classList.toggle("checked");
});

// Staples
document.getElementById("staple-list").addEventListener("click", e => {
  const btn = e.target.closest("[data-staple]");
  if (!btn) return;
  const i = parseInt(btn.dataset.staple);
  state.staples[i].selected = !state.staples[i].selected;
  renderStaples();
  showToast(state.staples[i].name + (state.staples[i].selected ? " added" : " removed"));
  localStorage.setItem("staples", JSON.stringify(state.staples));
});

// Generate
document.getElementById("generate-recipe").addEventListener("click", generateRecipe);

// Discovery journal card click
document.getElementById("discovery-recipes").addEventListener("click", e => {
  const card = e.target.closest("[data-recipe-idx]");
  if (card) {
    state.currentRecipe = state.recipes[parseInt(card.dataset.recipeIdx)];
    renderDetail();
    showView("detail");
  }
});

// Detail back button — go back to discovery
const detailBackBtn = document.getElementById("detail-back-btn");
if (detailBackBtn) detailBackBtn.addEventListener("click", () => showView("discovery"));

// Start Cooking button — launch cooking mode
const startCookingBtn = document.getElementById("start-cooking-btn");
if (startCookingBtn) {
  startCookingBtn.addEventListener("click", () => {
    if (!state.currentRecipe || !state.currentRecipe.steps) {
      showToast("No cooking steps available"); return;
    }
    state.cookingStep = 0;
    showView("cooking");
  });
}

// Cooking Next Step
const cookingNextBtn = document.getElementById("cooking-next-btn");
if (cookingNextBtn) {
  cookingNextBtn.addEventListener("click", () => {
    const recipe = state.currentRecipe;
    if (!recipe || !recipe.steps) return;
    const total = recipe.steps.length;
    if (state.cookingStep >= total - 1) {
      // Done — show Bon Appétit screen
      state.cookedCount++;
      localStorage.setItem("cookedCount", JSON.stringify(state.cookedCount));
      addXP(250);
      // Populate bonjour screen
      const bonjourImg = document.getElementById("bonjour-img");
      if (bonjourImg) bonjourImg.src = recipe.image;
      const bonjourDiff = document.getElementById("bonjour-difficulty");
      if (bonjourDiff) bonjourDiff.textContent = recipe.difficulty || "Intermediate";
      renderSavedStats(); renderProfileStats(); renderWeeklyChart();
      showView("bonjour");
    } else {
      state.cookingStep++;
      renderCookingStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// Saved card click
document.getElementById("saved-recipes").addEventListener("click", e => {
  // Unsave
  const unsaveBtn = e.target.closest("[data-unsave]");
  if (unsaveBtn) {
    const idx = parseInt(unsaveBtn.dataset.unsave);
    const title = (state.saved[idx] || {}).title || "";
    state.saved.splice(idx, 1);
    localStorage.setItem("saved", JSON.stringify(state.saved));
    renderSavedCards(); renderSavedStats();
    showToast("Removed: " + title);
    return;
  }
  // Star rating
  const star = e.target.closest("[data-rating]");
  if (star) {
    state.userRatings[star.dataset.recipe] = parseInt(star.dataset.rating);
    localStorage.setItem("userRatings", JSON.stringify(state.userRatings));
    renderSavedCards(); renderSavedStats();
    showToast("Rated " + star.dataset.rating + "/5");
    return;
  }
  // Open detail
  const card = e.target.closest(".journal-card");
  if (card && !e.target.closest("[data-unsave]") && !e.target.closest(".star-btn")) {
    const idx = state.saved.findIndex(r => r.title === card.querySelector(".journal-card-title")?.textContent);
    if (idx >= 0) { state.currentRecipe = state.saved[idx]; renderDetail(); showView("detail"); }
  }
});

// Saved filter chips
document.getElementById("saved-filters").addEventListener("click", e => {
  const btn = e.target.closest("[data-saved-filter]");
  if (!btn) return;
  state.activeFilter = btn.dataset.savedFilter;
  renderSavedFilters(); renderSavedCards();
});

// Saved search toggle
const savedSearchToggle = document.getElementById("saved-search-toggle");
const savedSearchBar    = document.getElementById("saved-search-bar");
if (savedSearchToggle) {
  savedSearchToggle.addEventListener("click", () => {
    const open = savedSearchBar.style.display === "none";
    savedSearchBar.style.display = open ? "block" : "none";
    if (!open) { state.searchQuery = ""; const inp = document.getElementById("saved-search-input"); if(inp) inp.value = ""; renderSavedCards(); }
  });
}
const savedSearchInput = document.getElementById("saved-search-input");
if (savedSearchInput) savedSearchInput.addEventListener("input", e => { state.searchQuery = e.target.value; renderSavedCards(); });

// Favorite (bookmark) in detail
const favBtn = document.getElementById("favorite-detail");
let isFaved = false;
if (favBtn) {
  favBtn.addEventListener("click", () => {
    isFaved = !isFaved;
    favBtn.querySelector("span").textContent = isFaved ? "bookmark" : "bookmark_border";
    if (isFaved && state.currentRecipe) {
      if (!state.saved.find(r => r.title === state.currentRecipe.title)) {
        state.saved.push({
          title: state.currentRecipe.title, desc: state.currentRecipe.desc,
          time: state.currentRecipe.time, difficulty: state.currentRecipe.difficulty,
          category: state.currentRecipe.category || "Generated",
          badge: "New Recipe", badgeType: "peach",
          date: new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }),
          image: state.currentRecipe.image, rating: state.currentRecipe.rating,
        });
        localStorage.setItem("saved", JSON.stringify(state.saved));
        renderSavedCards(); addXP(20);
      }
      showToast("Saved to journal! +20 XP");
    } else { showToast("Removed from journal"); }
  });
}

// I Cooked This!
const cookedBtn = document.getElementById("cooked-this-btn");
if (cookedBtn) {
  cookedBtn.addEventListener("click", () => {
    if (!state.currentRecipe) return;
    openStarRatingModal();
  });
}

// Star Rating Modal
const openStarRatingModal = () => {
  let modal = document.getElementById("star-rating-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "star-rating-modal";
    modal.innerHTML = `
      <div class="star-modal-backdrop" id="star-modal-backdrop"></div>
      <div class="star-modal-sheet">
        <div class="timer-header">
          <span class="timer-title">🍽️ How was it?</span>
          <button class="timer-close" id="star-modal-close" aria-label="Close"><span class="material-symbols-rounded">close</span></button>
        </div>
        <p class="star-modal-sub">Rate your cooking experience</p>
        <div class="star-modal-stars" id="star-modal-row">
          ${[1,2,3,4,5].map(i => `<button class="star-modal-btn" data-star="${i}">★</button>`).join('')}
        </div>
        <button class="star-modal-skip" id="star-modal-skip">Skip & Log Without Rating</button>
      </div>`;
    document.body.appendChild(modal);

    document.getElementById("star-modal-backdrop").addEventListener("click", closeStarRatingModal);
    document.getElementById("star-modal-close").addEventListener("click", closeStarRatingModal);
    document.getElementById("star-modal-skip").addEventListener("click", () => {
      logCookedRecipe(null); closeStarRatingModal();
    });
    modal.querySelectorAll(".star-modal-btn").forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        const hov = parseInt(btn.dataset.star);
        modal.querySelectorAll(".star-modal-btn").forEach((b, i) => b.classList.toggle("hovered", i < hov));
      });
      btn.addEventListener("mouseleave", () => {
        modal.querySelectorAll(".star-modal-btn").forEach(b => b.classList.remove("hovered"));
      });
      btn.addEventListener("click", () => {
        const stars = parseInt(btn.dataset.star);
        if (state.currentRecipe) {
          state.userRatings[state.currentRecipe.title] = stars;
          localStorage.setItem("userRatings", JSON.stringify(state.userRatings));
          renderDetail();
        }
        logCookedRecipe(stars);
        closeStarRatingModal();
      });
    });
  }
  modal.classList.add("open");
};

const closeStarRatingModal = () => {
  const m = document.getElementById("star-rating-modal");
  if (m) m.classList.remove("open");
};

const logCookedRecipe = (stars) => {
  if (!state.currentRecipe) return;
  const t = state.currentRecipe.title;
  if (!state.cookedRecipes.includes(t)) { state.cookedRecipes.push(t); localStorage.setItem("cookedRecipes", JSON.stringify(state.cookedRecipes)); }
  state.cookedCount++;
  localStorage.setItem("cookedCount", JSON.stringify(state.cookedCount));
  addXP(100);
  renderSavedStats(); renderProfileStats(); renderWeeklyChart();
  const msg = stars ? `Magnifique! ${stars}⭐ — Logged! +100 XP` : "Cooked logged! +100 XP 🍳";
  showToast(msg);
};

// Translate
const translateBtn = document.getElementById("translate-recipe-btn");
if (translateBtn) translateBtn.addEventListener("click", translateRecipeToHinglish);

// ─── PWA — REGISTER SERVICE WORKER ───────────────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      console.log("[SW] Registered:", reg.scope);
    }).catch((err) => {
      console.warn("[SW] Registration failed:", err);
    });
  });
}

// Preferences
document.getElementById("preference-tags").addEventListener("click", e => {
  const btn = e.target.closest("[data-pref]");
  if (!btn) return;
  const i = parseInt(btn.dataset.pref);
  state.preferences[i].selected = !state.preferences[i].selected;
  localStorage.setItem("preferences", JSON.stringify(state.preferences));
  renderPreferences();
});

// Skills
document.getElementById("skill-levels").addEventListener("click", e => {
  const tab = e.target.closest("[data-skill]");
  if (!tab) return;
  const i = parseInt(tab.dataset.skill);
  state.skills = state.skills.map((s, idx) => ({ ...s, selected: idx === i }));
  localStorage.setItem("skills", JSON.stringify(state.skills));
  renderSkills();
  showToast(state.skills[i].title + " selected");
});

// Clear all ingredients
document.getElementById("clear-ingredients").addEventListener("click", () => {
  state.ingredients = [];
  renderIngredients();
  showToast("Pantry cleared");
});

// Dark mode
const darkToggle = document.getElementById("dark-mode-toggle");
if (darkToggle) {
  darkToggle.addEventListener("change", e => {
    state.darkMode = e.target.checked;
    document.body.classList.toggle("dark", state.darkMode);
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  });
}

// Save API token
const saveTokenBtn = document.getElementById("save-token-btn");
if (saveTokenBtn) {
  saveTokenBtn.addEventListener("click", () => {
    const input = document.getElementById("hf-api-token");
    const token = (input?.value || "").trim();
    state.hfToken = token;
    localStorage.setItem("hfToken", token);
    updateTokenStatus();
    showToast(token ? "AI token saved!" : "Token cleared");
  });
}

// AI Vision image upload
const uploadBtn  = document.getElementById("upload-image-btn");
const fileInput  = document.getElementById("image-upload");
if (uploadBtn)  uploadBtn.addEventListener("click", () => fileInput.click());
if (fileInput)  fileInput.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (file) { await processImageWithAI(file); e.target.value = ""; }
});
