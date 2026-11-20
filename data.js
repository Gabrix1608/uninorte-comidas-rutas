// Base de datos completa extraída de las capturas de pantalla de Menus du Nord (Uninorte)
// Organizada desde Bocas de Ceniza hasta Postres y Café

const ARBOL_PREFERENCIAS = [
  {
    id: "almuerzos",
    nombre: "1. Almuerzos y Platos Fuertes",
    subcategorias: [
      { id: "menu_dia", nombre: "Menú del Día / Ejecutivo" },
      { id: "carnes_asados", nombre: "Carnes, Parrilla y Asados" },
      { id: "pollo_aves", nombre: "Pollo y Aves" },
      { id: "pescados_mariscos", nombre: "Pescados y Mariscos" },
      { id: "pastas_lasanas", nombre: "Pastas y Lasañas" },
      { id: "arroces_bowls", nombre: "Arroces y Bowls" },
      { id: "arabe_mediterraneo", nombre: "Comida Árabe y Mediterránea" }
    ]
  },
  {
    id: "comida_rapida",
    nombre: "2. Comida Rápida, Sándwiches y Pizzas",
    subcategorias: [
      { id: "pizzas", nombre: "Pizzas" },
      { id: "hamburguesas_perros", nombre: "Hamburguesas y Perros Calientes" },
      { id: "sandwiches", nombre: "Sándwiches y Club Sándwich" },
      { id: "crepes_salados", nombre: "Crepes Salados" },
      { id: "papas_patacones", nombre: "Papas, Patacones y Picadas" }
    ]
  },
  {
    id: "desayunos_fritos",
    nombre: "3. Desayunos, Fritos y Panadería",
    subcategorias: [
      { id: "desayunos_brunch", nombre: "Desayunos y Brunch" },
      { id: "fritos_tradicionales", nombre: "Fritos Tradicionales" },
      { id: "horneados_integrales", nombre: "Horneados e Integrales" }
    ]
  },
  {
    id: "saludable_vegetariano",
    nombre: "4. Saludable, Ligero y Vegetariano",
    subcategorias: [
      { id: "ensaladas", nombre: "Ensaladas" },
      { id: "vegetariano_fit", nombre: "Opciones Vegetarianas / Fit" },
      { id: "sopas_cremas", nombre: "Sopas y Cremas" }
    ]
  },
  {
    id: "postres_dulces",
    nombre: "5. Postres, Dulces y Helados",
    subcategorias: [
      { id: "crepes_gofres_obleas", nombre: "Crepes Dulces, Gofres y Obleas" },
      { id: "tortas_brownies", nombre: "Tortas, Brownies y Cheesecake" },
      { id: "galletas_artesanales", nombre: "Galletas Artesanales" },
      { id: "helados_malteadas", nombre: "Helados, Paletas y Malteadas" }
    ]
  },
  {
    id: "bebidas_cafeteria",
    nombre: "6. Bebidas y Cafetería",
    subcategorias: [
      { id: "cafe_caliente", nombre: "Cafés y Bebidas Calientes" },
      { id: "cafe_frio_frappes", nombre: "Cafés Fríos y Frappés" },
      { id: "jugos_limonadas_smoothies", nombre: "Jugos, Limonadas y Smoothies" },
      { id: "sodas_refrescantes", nombre: "Sodas Saborizadas y Caña" },
      { id: "embotellados_lacteos", nombre: "Embotellados y Lácteos" }
    ]
  },
  {
    id: "snacks_paquetes",
    nombre: "7. Snacks y Paquetes",
    subcategorias: [
      { id: "snacks_salados", nombre: "Snacks Salados y Maní" },
      { id: "dulces_paquete", nombre: "Dulces y Galletas de Paquete" }
    ]
  }
];

const LOCALES_UNINORTE = [
  {
    id: "bocas_de_ceniza",
    orden: 1,
    nombre: "Bocas de Ceniza",
    tipo: "Restaurante a la Carta y Café",
    nodoId: "bloque_j",
    ubicacionDetalle: "Bloque J, piso 9"
  },
  {
    id: "cafe_du_nord",
    orden: 2,
    nombre: "Café du Nord",
    tipo: "Cafetería y Brunch",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza"
  },
  {
    id: "casa_de_la_plaza",
    orden: 3,
    nombre: "La Casa de la Plaza",
    tipo: "Desayunos, Fritos y Asados",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza"
  },
  {
    id: "la_creperia",
    orden: 4,
    nombre: "La Crepería by du Nord",
    tipo: "Crepes, Gofres y Obleas",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza, segundo piso"
  },
  {
    id: "la_esquina",
    orden: 5,
    nombre: "La Esquina du Nord",
    tipo: "Menú del Día, Rápidos y Snacks",
    nodoId: "la_esquina_express",
    ubicacionDetalle: "Frente a du Nord Express"
  },
  {
    id: "du_nord_express",
    orden: 6,
    nombre: "du Nord Express",
    tipo: "Comida Rápida, Snacks y Bebidas",
    nodoId: "du_nord_express",
    ubicacionDetalle: "Junto a La Esquina du Nord / Laboratorio 3"
  },
  {
    id: "le_petit",
    orden: 7,
    nombre: "Le Petit by du Nord",
    tipo: "Café, Sándwiches y Pastelería",
    nodoId: "bloque_k",
    ubicacionDetalle: "Bloque K, cuarto piso"
  },
  {
    id: "du_nord_terrasse",
    orden: 8,
    nombre: "du Nord Terrasse",
    tipo: "Restaurante Árabe, Parrilla y Pizzas",
    nodoId: "du_nord_terrasse",
    ubicacionDetalle: "Esquina superior del Coliseo"
  },
  {
    id: "gli_amici",
    orden: 9,
    nombre: "Gli Amici",
    tipo: "Pastas, Pizzas y Lasañas",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza"
  },
  {
    id: "punto_light",
    orden: 10,
    nombre: "Punto Light",
    tipo: "Sándwiches, Bowls, Ensaladas y Smoothies",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza"
  },
  {
    id: "postres_y_cafe",
    orden: 11,
    nombre: "Postres y Café",
    tipo: "Pastelería y Cafetería",
    nodoId: "bloque_f",
    ubicacionDetalle: "Bloque F / du Nord Plaza"
  }
];

// Lista completa de platos con: localId, nombre, precio, categoria, subcategoria
const CATALOGO_COMIDAS = [
  // ==========================================
  // 1. BOCAS DE CENIZA
  // ==========================================
  { localId: "bocas_de_ceniza", nombre: "Arepa de Huevo", precio: 5900, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "bocas_de_ceniza", nombre: "Arepa de Choclo", precio: 16600, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "bocas_de_ceniza", nombre: "Dedito de Olaya (x1)", precio: 5600, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "bocas_de_ceniza", nombre: "Dedito de Olaya (x3)", precio: 16500, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "bocas_de_ceniza", nombre: "Dedito de Olaya (x6)", precio: 31800, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "bocas_de_ceniza", nombre: "Cayeye Samario", precio: 21500, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "bocas_de_ceniza", nombre: "Huevos Bocas de Ceniza", precio: 16500, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "bocas_de_ceniza", nombre: "Huevos Bocas de Ceniza con Cayeye", precio: 26000, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "bocas_de_ceniza", nombre: "Porción de Frutas", precio: 10800, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "bocas_de_ceniza", nombre: "Sándwich de Huevo con Tocineta", precio: 12900, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "bocas_de_ceniza", nombre: "Canoa de Camarones al Ajillo", precio: 29200, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Maíz Desgranado Crocante", precio: 29100, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "bocas_de_ceniza", nombre: "Tostones del Mar (x4)", precio: 30600, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "bocas_de_ceniza", nombre: "Tostones Precolombinos (x4)", precio: 25600, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "bocas_de_ceniza", nombre: "Tostones del Malecón (x8)", precio: 20300, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "bocas_de_ceniza", nombre: "Langostinos Bocas de Ceniza", precio: 32800, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Mote de Queso", precio: 29400, categoria: "saludable_vegetariano", subcategoria: "sopas_cremas" },
  { localId: "bocas_de_ceniza", nombre: "Ensalada Jardín del Caribe (Salmón y Quinoa)", precio: 37100, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "bocas_de_ceniza", nombre: "Ensalada Conquistador (Pollo y Pecorino)", precio: 37800, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "bocas_de_ceniza", nombre: "Arroz de Camarón", precio: 37500, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "bocas_de_ceniza", nombre: "Arroz de Chicharrón", precio: 33900, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "bocas_de_ceniza", nombre: "Róbalo Costero", precio: 47700, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Salmón en Reducción de Bisquets", precio: 46200, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Filete de Pescado Costra Plátano", precio: 36800, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Pastas del Mar", precio: 38600, categoria: "almuerzos", subcategoria: "pastas_lasanas" },
  { localId: "bocas_de_ceniza", nombre: "Langostinos Caribeños", precio: 42000, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "bocas_de_ceniza", nombre: "Bowl Cartagenero (Posta Negra)", precio: 26800, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "bocas_de_ceniza", nombre: "Posta Cartagenera", precio: 34800, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "bocas_de_ceniza", nombre: "Chuletón de Cerdo en Coco", precio: 49400, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "bocas_de_ceniza", nombre: "Chicharrón Bowl", precio: 33500, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "bocas_de_ceniza", nombre: "Baby Beef (200g Lomo Fino)", precio: 47100, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "bocas_de_ceniza", nombre: "Pechuga en Salsa de Champiñones", precio: 36100, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "bocas_de_ceniza", nombre: "Pechuga al Limón", precio: 35600, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "bocas_de_ceniza", nombre: "Pechuga Napolitana", precio: 39000, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "bocas_de_ceniza", nombre: "Bowl Vegetariano (Lenteja)", precio: 22900, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "bocas_de_ceniza", nombre: "Lasaña de Espinaca y Vegetales", precio: 27000, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "bocas_de_ceniza", nombre: "Brownie de Milo con Gelato de Vainilla", precio: 18900, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "bocas_de_ceniza", nombre: "Porción Cheesecake de Arequipe", precio: 24200, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "bocas_de_ceniza", nombre: "Porción Cheesecake Alegría", precio: 24200, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "bocas_de_ceniza", nombre: "Milhoja de Arequipe", precio: 19100, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "bocas_de_ceniza", nombre: "Expresso", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Americano", precio: 4900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Expresso Doble", precio: 6000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Macchiato", precio: 7000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Café Latte", precio: 7200, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Americano Doble", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Macchiato en Leche de Almendra", precio: 8900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Cappuccino", precio: 9600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Milo Caliente", precio: 9700, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Cappuccino de Vainilla", precio: 10000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Latte en Leche de Almendra", precio: 14600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Cappuccino en Leche de Almendra", precio: 16900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "bocas_de_ceniza", nombre: "Milo Frappé", precio: 9800, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Frappuccino (14 oz)", precio: 10600, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Frappuccino (22 oz)", precio: 16300, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Ice Caramel Coffee (14 oz)", precio: 11600, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Ice Caramel Coffee (22 oz)", precio: 13500, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Ice Chocolate Coffee (14 oz)", precio: 12200, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Ice Chocolate Coffee (22 oz)", precio: 16000, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "bocas_de_ceniza", nombre: "Limonada Natural", precio: 10000, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "bocas_de_ceniza", nombre: "Limonada Cerezada", precio: 11500, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "bocas_de_ceniza", nombre: "Limonada Hierbabuena", precio: 12200, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "bocas_de_ceniza", nombre: "Limonada de Coco", precio: 13100, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "bocas_de_ceniza", nombre: "Soda de Corozo", precio: 10500, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "bocas_de_ceniza", nombre: "Soda de Tamarindo", precio: 11700, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "bocas_de_ceniza", nombre: "Soda de Frutos Amarillos", precio: 12200, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "bocas_de_ceniza", nombre: "Caña (Bebida de Panela)", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "bocas_de_ceniza", nombre: "Agua PET 600 ml", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "bocas_de_ceniza", nombre: "Gaseosa PET 400 ml", precio: 5400, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "bocas_de_ceniza", nombre: "H2O PET 600 ml", precio: 6700, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "bocas_de_ceniza", nombre: "Té Hatsu 400 ml", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 2. CAFÉ DU NORD (MENÚ BRUNCH Y BEBIDAS)
  // ==========================================
  { localId: "cafe_du_nord", nombre: "Omelette Jamón y Queso", precio: 10000, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "cafe_du_nord", nombre: "Sándwich Campesino", precio: 13200, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "cafe_du_nord", nombre: "Huevos Pomodoro", precio: 15300, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "cafe_du_nord", nombre: "Huevos con Pancake y Tocineta", precio: 15300, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "cafe_du_nord", nombre: "Huevos Estrellados", precio: 15300, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "cafe_du_nord", nombre: "Parfait (Yogurt Griego, Granola y Frutas)", precio: 16800, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "cafe_du_nord", nombre: "Aromática", precio: 4300, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Expreso", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Americano", precio: 4900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Expreso Doble", precio: 6000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Machiatto", precio: 7000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Café Latte", precio: 7200, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Americano Doble", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Machiato Leche de Almendra", precio: 8900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Capuccino", precio: 9600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Milo Caliente", precio: 9700, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Café Andrés", precio: 11200, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Capuccino con Almendra", precio: 11500, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "cafe_du_nord", nombre: "Agua PET 600", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Hit Botella", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Pony Malta", precio: 5200, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Gaseosa PET 400", precio: 5400, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Bretaña", precio: 5600, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "H2O PET 600", precio: 6700, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Soda de Maracuyá", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "cafe_du_nord", nombre: "Soda de Frutos Rojos", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "cafe_du_nord", nombre: "Soda de Fresa", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "cafe_du_nord", nombre: "Café Frappé 12 oz", precio: 8100, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Limonada", precio: 8600, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "cafe_du_nord", nombre: "Milo Frappé", precio: 9800, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Café Frío 14 oz", precio: 10800, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Té Hatsu 400 ml", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "cafe_du_nord", nombre: "Limonada Cerezada", precio: 11500, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "cafe_du_nord", nombre: "Café Frío de Arequipe 14 oz", precio: 11600, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Café Frío de Hershey 14 oz", precio: 12200, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Café Frío de Vainilla 14 oz", precio: 12800, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Limonada de Coco", precio: 13100, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "cafe_du_nord", nombre: "Café Frío Arequipe ALMD 14 oz", precio: 13900, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "cafe_du_nord", nombre: "Café Frío ALMD 14 oz", precio: 14800, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },

  // ==========================================
  // 3. LA CASA DE LA PLAZA
  // ==========================================
  { localId: "casa_de_la_plaza", nombre: "Desayuno Cayeye", precio: 9800, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "casa_de_la_plaza", nombre: "Desayuno Barranquillero", precio: 13300, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "casa_de_la_plaza", nombre: "Huevos al Gusto", precio: 13700, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "casa_de_la_plaza", nombre: "Arepa Dulce", precio: 4100, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "casa_de_la_plaza", nombre: "Arepa de Queso", precio: 4400, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "casa_de_la_plaza", nombre: "Arepa de Huevo", precio: 5900, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "casa_de_la_plaza", nombre: "Frito Variado (Butifarra/Ranchera/Chorizo/Hawaiana/Pollo)", precio: 5000, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "casa_de_la_plaza", nombre: "Pan de Bono", precio: 3600, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "casa_de_la_plaza", nombre: "Pastelería Horneada", precio: 4800, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "casa_de_la_plaza", nombre: "Platanitos", precio: 10500, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "casa_de_la_plaza", nombre: "Pollo a la Parrilla + Gaseosa", precio: 34100, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "casa_de_la_plaza", nombre: "Lomo de Cerdo Agridulce + Gaseosa", precio: 34100, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "casa_de_la_plaza", nombre: "Churrasco + Gaseosa", precio: 37000, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "casa_de_la_plaza", nombre: "Agua en Botella", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "casa_de_la_plaza", nombre: "Agua de Panela", precio: 3600, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "casa_de_la_plaza", nombre: "Hit Botella", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "casa_de_la_plaza", nombre: "Pony Malta", precio: 5200, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "casa_de_la_plaza", nombre: "Soda", precio: 5600, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "casa_de_la_plaza", nombre: "Gaseosa PET 400", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "casa_de_la_plaza", nombre: "Jugo de Naranja", precio: 7300, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "casa_de_la_plaza", nombre: "Milo Frío", precio: 7300, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 4. LA CREPERÍA BY DU NORD
  // ==========================================
  { localId: "la_creperia", nombre: "Salchicrepe", precio: 10700, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Jamón y Queso", precio: 17400, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Espinaca y Queso", precio: 17800, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Capresse", precio: 18900, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe de Pollo Champiñones", precio: 19400, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Peperoni", precio: 19500, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Omelette", precio: 20500, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Crepe Pollo Tocineta", precio: 22300, categoria: "comida_rapida", subcategoria: "crepes_salados" },
  { localId: "la_creperia", nombre: "Helado Sencillo", precio: 7600, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_creperia", nombre: "Helado Doble", precio: 11100, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_creperia", nombre: "Gofre con Arequipe", precio: 13100, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Crepe de Dulce de Leche", precio: 14800, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Gofre Nutella", precio: 15700, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Crepe con Nutella", precio: 15900, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Gofre con Helado y Salsa", precio: 15900, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Crepe Helado Oreo", precio: 17000, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Gofre Nutella y Frutas", precio: 17100, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Crepe Nutella con Fruta", precio: 18100, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Gofre con Helado Frutos Rojos", precio: 22200, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Dulce de Leche", precio: 6300, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Arequipe Queso", precio: 9400, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Arequipe Queso Frutos Rojos", precio: 9700, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Nutella Fresas", precio: 12900, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Nutella Fresas Almendra", precio: 14600, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Oblea Nutella Ganache Pistacho", precio: 17200, categoria: "postres_dulces", subcategoria: "crepes_gofres_obleas" },
  { localId: "la_creperia", nombre: "Agua Botella", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_creperia", nombre: "Gaseosa", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_creperia", nombre: "H2O Botella", precio: 6700, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_creperia", nombre: "Té Hatsu", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 5. LA ESQUINA DU NORD
  // ==========================================
  { localId: "la_esquina", nombre: "Menú del Día", precio: 13300, categoria: "almuerzos", subcategoria: "menu_dia" },
  { localId: "la_esquina", nombre: "Frito Variado", precio: 5000, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "la_esquina", nombre: "Pastelito Horneado", precio: 4800, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "la_esquina", nombre: "Perro Caliente", precio: 9000, categoria: "comida_rapida", subcategoria: "hamburguesas_perros" },
  { localId: "la_esquina", nombre: "Sándwich Jamón", precio: 8300, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "la_esquina", nombre: "Sándwich Frío Jamón con Tocineta", precio: 10000, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "la_esquina", nombre: "Hamburguesa de Carne", precio: 11900, categoria: "comida_rapida", subcategoria: "hamburguesas_perros" },
  { localId: "la_esquina", nombre: "Cuarto de Pollo", precio: 16800, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "la_esquina", nombre: "Arroz Chino To Go", precio: 17500, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "la_esquina", nombre: "Lasaña Bolognesa", precio: 19500, categoria: "almuerzos", subcategoria: "pastas_lasanas" },
  { localId: "la_esquina", nombre: "Lasaña Pollo Roja", precio: 20600, categoria: "almuerzos", subcategoria: "pastas_lasanas" },
  { localId: "la_esquina", nombre: "Frappe de Mango", precio: 8900, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "la_esquina", nombre: "Pony Malta", precio: 5200, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Agua Cristal PET 600", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Gatorade", precio: 6500, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Té Hatsu", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Gaseosa PET 400", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Avena Finesse", precio: 5900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Avena Alpina", precio: 5300, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Bonyurt", precio: 6000, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "la_esquina", nombre: "Paleta Aloha Fresa", precio: 3300, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_esquina", nombre: "Helado Casero Coco", precio: 4000, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_esquina", nombre: "Helado Artesanal 3 Leches", precio: 5000, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_esquina", nombre: "Platillo de Helado", precio: 6300, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_esquina", nombre: "Paleta Polet", precio: 8700, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "la_esquina", nombre: "Bon Bon Bum Fresa", precio: 1400, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Jet Tradicional Pequeño", precio: 1500, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Maní Salado", precio: 2300, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Galleta Oreo", precio: 2400, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Trident Menta", precio: 2500, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Sparkies", precio: 2500, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Galleta Milo", precio: 2600, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Galleta Chokis Black / Clásica", precio: 2700, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Bolichetos", precio: 2700, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Minichips", precio: 2800, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "la_esquina", nombre: "Cheese Trix", precio: 3500, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Crispetas de la Casa", precio: 3700, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Margarita FritoLay", precio: 4000, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Dorito Mega Queso", precio: 4100, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Maní Arándanos / Nueces / Pasas", precio: 4700, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "Papas Monte Rojo", precio: 4700, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "la_esquina", nombre: "DeTodito", precio: 5500, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },

  // ==========================================
  // 5B. DU NORD EXPRESS
  // ==========================================
  { localId: "du_nord_express", nombre: "Empanada Horneada", precio: 4800, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "du_nord_express", nombre: "Dedito de Queso", precio: 4600, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "du_nord_express", nombre: "Perro Caliente Express", precio: 9500, categoria: "comida_rapida", subcategoria: "hamburguesas_perros" },
  { localId: "du_nord_express", nombre: "Sándwich Express Jamón y Queso", precio: 9800, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "du_nord_express", nombre: "Gaseosa PET 400 ml", precio: 5400, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_express", nombre: "Agua Cristal PET 600 ml", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_express", nombre: "Pony Malta", precio: 5200, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_express", nombre: "Café Americano Express", precio: 4500, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "du_nord_express", nombre: "DeTodito / Paquete Express", precio: 5500, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },

  // ==========================================
  // 6. LE PETIT BY DU NORD
  // ==========================================
  { localId: "le_petit", nombre: "Pan de Bono", precio: 3600, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Arepa con Queso", precio: 4400, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "le_petit", nombre: "Pastelito Horneado", precio: 4800, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Frito Variado", precio: 5000, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "le_petit", nombre: "Quibbe", precio: 5800, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "le_petit", nombre: "Dedito de Queso Integral", precio: 7000, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Empanada Integral Espinaca", precio: 8300, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Chicken Bake", precio: 11800, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Ensalada Fruta", precio: 17300, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "le_petit", nombre: "Ensalada César", precio: 18900, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "le_petit", nombre: "Sandwich Terrasse", precio: 11900, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "le_petit", nombre: "Sandwich Frío de Jamón y Queso", precio: 13200, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "le_petit", nombre: "Sandwich de Pollo", precio: 18100, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "le_petit", nombre: "Combo: Arepa de Queso + Pony", precio: 8700, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "le_petit", nombre: "Combo: 2 Pan de Bono + Milo", precio: 14700, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "le_petit", nombre: "Combo: Sandwich Terrasse + Gaseosa", precio: 16600, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "le_petit", nombre: "Galleta Chips Chocolate", precio: 4700, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "le_petit", nombre: "Brownie Tradicional", precio: 7300, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "le_petit", nombre: "Brownie Tradicional Arequipe", precio: 7700, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "le_petit", nombre: "Galleta Chocoalmendra", precio: 8000, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "le_petit", nombre: "Galleta Bocadillo", precio: 8400, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "le_petit", nombre: "Porción Torta Zanahoria", precio: 8500, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "le_petit", nombre: "Galleta Chocomasmelo", precio: 9000, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "le_petit", nombre: "Galleta Red Velvet", precio: 9100, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "le_petit", nombre: "Minichips Chocolate", precio: 2800, categoria: "snacks_paquetes", subcategoria: "dulces_paquete" },
  { localId: "le_petit", nombre: "Papas Monterojo", precio: 4700, categoria: "snacks_paquetes", subcategoria: "snacks_salados" },
  { localId: "le_petit", nombre: "Aromática", precio: 4300, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Expreso", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Americano", precio: 4900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Expreso Doble", precio: 6000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Machiatto", precio: 7000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Café Latte", precio: 7200, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Americano Doble", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Cappuccino", precio: 9600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Milo Caliente", precio: 9700, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Cappuccino Moca", precio: 10500, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Café Vainilla", precio: 12800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "le_petit", nombre: "Ice Caramel Coffee (14 oz)", precio: 11600, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "le_petit", nombre: "Ice Caramel Coffee (22 oz)", precio: 13500, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "le_petit", nombre: "Ice Chocolate Coffee (14 oz)", precio: 12200, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "le_petit", nombre: "Ice Chocolate Coffee (22 oz)", precio: 14100, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "le_petit", nombre: "Agua PET 600 ml", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Hit Botella", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Pony Malta", precio: 5200, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Té Helado", precio: 5800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Gaseosa PET 400", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "H2O PET 600 ml", precio: 6700, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Jugo de Naranja", precio: 7300, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "le_petit", nombre: "Milo Frío", precio: 7300, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "le_petit", nombre: "Té Hatsu 400 ml", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 7. DU NORD TERRASSE
  // ==========================================
  { localId: "du_nord_terrasse", nombre: "Huevos al Gusto", precio: 10500, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "du_nord_terrasse", nombre: "Waffle Sándwich", precio: 11700, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "du_nord_terrasse", nombre: "Huevos Napolitanos", precio: 14300, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "du_nord_terrasse", nombre: "Omelette Bacon Caramel", precio: 16100, categoria: "desayunos_fritos", subcategoria: "desayunos_brunch" },
  { localId: "du_nord_terrasse", nombre: "Media Mezza Caribe (Para compartir)", precio: 30500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Mezza Caribeña (Para compartir)", precio: 41200, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Manihot Yuquitas", precio: 11200, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "du_nord_terrasse", nombre: "Nachos Árabes", precio: 12900, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "du_nord_terrasse", nombre: "Medio Hummus Tocinet", precio: 28600, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Hummus con Tocineta", precio: 39800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Ensalada Fatush", precio: 26200, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "du_nord_terrasse", nombre: "Ensalada Portobello", precio: 36000, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "du_nord_terrasse", nombre: "Sopa de Pollo", precio: 11000, categoria: "saludable_vegetariano", subcategoria: "sopas_cremas" },
  { localId: "du_nord_terrasse", nombre: "Crema de Pollo y Champiñones", precio: 14000, categoria: "saludable_vegetariano", subcategoria: "sopas_cremas" },
  { localId: "du_nord_terrasse", nombre: "Sopa de Lentejas", precio: 14300, categoria: "saludable_vegetariano", subcategoria: "sopas_cremas" },
  { localId: "du_nord_terrasse", nombre: "Kafta x2", precio: 12300, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Falafel", precio: 17800, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "du_nord_terrasse", nombre: "1/2 Tabbule", precio: 21800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Marmaón", precio: 27500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Marmaón", precio: 39700, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Mezza Árabe", precio: 57800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Shawarma Quibbe", precio: 23200, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Shawarma Gourmet Mixto", precio: 24400, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Shawarma Gourmet Pollo", precio: 26200, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Shawarma Gourmet Vegetariano", precio: 31400, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "du_nord_terrasse", nombre: "Shawarma Gourmet Carne", precio: 32300, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Quibbe Frito", precio: 6400, categoria: "desayunos_fritos", subcategoria: "fritos_tradicionales" },
  { localId: "du_nord_terrasse", nombre: "Quibbe Asado", precio: 33500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Brocheta de Pollo y Pimentón", precio: 28800, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "du_nord_terrasse", nombre: "Brocheta de Pollo y Champiñones", precio: 28800, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "du_nord_terrasse", nombre: "Medio Pollo a la Parrilla", precio: 38500, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "du_nord_terrasse", nombre: "Pechuga a la Parrilla", precio: 38400, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "du_nord_terrasse", nombre: "Pechuga Limón y Pimienta", precio: 39700, categoria: "almuerzos", subcategoria: "pollo_aves" },
  { localId: "du_nord_terrasse", nombre: "Lomo de Cerdo (Teriyaki o BBQ)", precio: 41400, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Lomo Encebollado", precio: 42500, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Churrasco (300g)", precio: 43600, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Lomo Encebollado con Tahine", precio: 48800, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Lomo a la Pimienta Árabe", precio: 55600, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Punta Gorda", precio: 57100, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Steak Almendra y Tahine", precio: 59200, categoria: "almuerzos", subcategoria: "carnes_asados" },
  { localId: "du_nord_terrasse", nombre: "Filete de Pescado en Salsa", precio: 40700, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "du_nord_terrasse", nombre: "Salmón en Salsa", precio: 61400, categoria: "almuerzos", subcategoria: "pescados_mariscos" },
  { localId: "du_nord_terrasse", nombre: "Arroz de Lenteja", precio: 24000, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "Arroz Mixto", precio: 34400, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "Arroz Mini Quibbe", precio: 35900, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "Arroz al Pescador", precio: 36300, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "Arroz de Almendra", precio: 38200, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "Arroz Punta Gorda", precio: 38600, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "du_nord_terrasse", nombre: "1/2 Tahine", precio: 21200, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Tahine Berenjena", precio: 21300, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Tahine Especial", precio: 27900, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Plato Tahine", precio: 30800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Tahine de Berenjena", precio: 34300, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Tahine Especial", precio: 39300, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Plato Mixto Vegetariano", precio: 25700, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "du_nord_terrasse", nombre: "Plato Mixto Árabe", precio: 29600, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Plato Especial Vegetariano", precio: 34800, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "du_nord_terrasse", nombre: "Plato Mixto Especial", precio: 36200, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Pote Veggie", precio: 16500, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "du_nord_terrasse", nombre: "Pote Pollo", precio: 22700, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Pote Árabe", precio: 25800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Pote Kafta", precio: 27800, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Berenjena Rellena (x1)", precio: 7100, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Berenjena Rellena (x2)", precio: 12500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Repollito", precio: 17500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "1/2 Hoja de Parra", precio: 18500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Plato Repollitos", precio: 28500, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Hoja de Parra", precio: 31400, categoria: "almuerzos", subcategoria: "arabe_mediterraneo" },
  { localId: "du_nord_terrasse", nombre: "Pizza Ohana", precio: 16000, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "du_nord_terrasse", nombre: "Pizza Cebollas Caramelizadas", precio: 16200, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "du_nord_terrasse", nombre: "Pizza Carbonara", precio: 21700, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "du_nord_terrasse", nombre: "Papas Hollywood", precio: 18500, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "du_nord_terrasse", nombre: "Papas Peperoni", precio: 19600, categoria: "comida_rapida", subcategoria: "papas_patacones" },
  { localId: "du_nord_terrasse", nombre: "Hamburguesa Falafel", precio: 25800, categoria: "comida_rapida", subcategoria: "hamburguesas_perros" },
  { localId: "du_nord_terrasse", nombre: "Club Sandwich", precio: 29500, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "du_nord_terrasse", nombre: "Galleta Arequipe", precio: 5700, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "du_nord_terrasse", nombre: "Galleta Nutella", precio: 7900, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "du_nord_terrasse", nombre: "Brownie de la Casa", precio: 14100, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "du_nord_terrasse", nombre: "Malteada Sencilla", precio: 14800, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "du_nord_terrasse", nombre: "Porción Cookie Pie", precio: 16700, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "du_nord_terrasse", nombre: "Malteada de Brownie", precio: 19500, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "du_nord_terrasse", nombre: "Malteada Oreo", precio: 22600, categoria: "postres_dulces", subcategoria: "helados_malteadas" },
  { localId: "du_nord_terrasse", nombre: "Cookie Pie Entero", precio: 30600, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "du_nord_terrasse", nombre: "Agua PET 600 ml", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_terrasse", nombre: "Soda", precio: 5600, categoria: "bebidas_cafeteria", subcategoria: "sodas_refrescantes" },
  { localId: "du_nord_terrasse", nombre: "Gaseosa PET 400", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_terrasse", nombre: "H2O PET 600 ml", precio: 6700, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "du_nord_terrasse", nombre: "Limonada Natural", precio: 7100, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "du_nord_terrasse", nombre: "Limonada Cerezada", precio: 7800, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "du_nord_terrasse", nombre: "Limonada Maracumangococo", precio: 8900, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "du_nord_terrasse", nombre: "Té Hatsu 400 ml", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 8. GLI AMICI
  // ==========================================
  { localId: "gli_amici", nombre: "Pasta 2go (Boloñesa / Queso / Pollo) + Gaseosa", precio: 17200, categoria: "almuerzos", subcategoria: "pastas_lasanas" },
  { localId: "gli_amici", nombre: "Pizza Napolitana", precio: 15900, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Hawaiana", precio: 16600, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Pollo", precio: 17700, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Jamón", precio: 17700, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Pollo Champiñones", precio: 18300, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Salami", precio: 21600, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza 3 Carnes", precio: 22400, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Pepperoni", precio: 23800, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza Gli Amici", precio: 25000, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Pizza 5 Carnes", precio: 27800, categoria: "comida_rapida", subcategoria: "pizzas" },
  { localId: "gli_amici", nombre: "Lasaña (Pollo Salsa Roja / Pollo Salsa Blanca / Boloñesa)", precio: 24400, categoria: "almuerzos", subcategoria: "pastas_lasanas" },
  { localId: "gli_amici", nombre: "Agua PET 600", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "gli_amici", nombre: "Hit Botella", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "gli_amici", nombre: "Gaseosa PET 400", precio: 6100, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 9. PUNTO LIGHT
  // ==========================================
  { localId: "punto_light", nombre: "Almuerzo del Día Saludable", precio: 25100, categoria: "almuerzos", subcategoria: "menu_dia" },
  { localId: "punto_light", nombre: "Sándwich Frío Jamón y Queso", precio: 12600, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Frío Pollo", precio: 14400, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Frío Atún", precio: 16400, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Berenjena (Medio)", precio: 14100, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "punto_light", nombre: "Sándwich Berenjena (Entero)", precio: 20700, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "punto_light", nombre: "Sándwich Jamón Pietrán (Medio)", precio: 15300, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Jamón Pietrán (Entero)", precio: 24400, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Pollo (Medio)", precio: 16500, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Pollo (Entero)", precio: 26100, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Salami (Medio)", precio: 18500, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Salami (Entero)", precio: 28200, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Atún (Medio)", precio: 19000, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Atún (Entero)", precio: 31200, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Roastbeef (Medio)", precio: 19500, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Roastbeef (Entero)", precio: 32300, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Tres Carnes (Medio)", precio: 19500, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Sándwich Tres Carnes (Entero)", precio: 32900, categoria: "comida_rapida", subcategoria: "sandwiches" },
  { localId: "punto_light", nombre: "Bowl Pollo Lechuga", precio: 24400, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "punto_light", nombre: "Bowl Tofu Quinoa", precio: 28100, categoria: "saludable_vegetariano", subcategoria: "vegetariano_fit" },
  { localId: "punto_light", nombre: "Bowl Shrimp Quinoa (Camarón)", precio: 32100, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "punto_light", nombre: "Bowl Lomo Arroz Integral", precio: 33500, categoria: "almuerzos", subcategoria: "arroces_bowls" },
  { localId: "punto_light", nombre: "Ensalada Manzana", precio: 8000, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "punto_light", nombre: "Ensalada Mango", precio: 10100, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "punto_light", nombre: "Ensalada Sencilla (12 oz)", precio: 10200, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "punto_light", nombre: "Ensalada Especial (16 oz)", precio: 17500, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "punto_light", nombre: "Ensalada Gourmet", precio: 19300, categoria: "saludable_vegetariano", subcategoria: "ensaladas" },
  { localId: "punto_light", nombre: "Dedito de Queso Integral", precio: 7000, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "punto_light", nombre: "Empanada Integral", precio: 8300, categoria: "desayunos_fritos", subcategoria: "horneados_integrales" },
  { localId: "punto_light", nombre: "Smoothie Hakuna Matata", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Smoothie Caribbean Evergreen", precio: 12900, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Smoothie Nutcracker", precio: 15500, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Smoothie XOXO", precio: 15500, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Smoothie Paraíso Funk", precio: 15900, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Smoothie Twilight Zone", precio: 16500, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Agua PET 600", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "punto_light", nombre: "Jugo de Naranja", precio: 7300, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "punto_light", nombre: "Té Hatsu", precio: 10900, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },

  // ==========================================
  // 10. POSTRES Y CAFÉ
  // ==========================================
  { localId: "postres_y_cafe", nombre: "Galleta Coco", precio: 5800, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "postres_y_cafe", nombre: "Galleta Chocochip", precio: 6100, categoria: "postres_dulces", subcategoria: "galletas_artesanales" },
  { localId: "postres_y_cafe", nombre: "Brownie", precio: 7300, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Torta de Zanahoria (Pastelería)", precio: 8500, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Torta de Chocolate", precio: 10500, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Torta de Arequipe", precio: 11300, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Porción Cheesecake", precio: 12900, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Torta de Zanahoria Especial", precio: 13500, categoria: "postres_dulces", subcategoria: "tortas_brownies" },
  { localId: "postres_y_cafe", nombre: "Agua Botella PET 600", precio: 2800, categoria: "bebidas_cafeteria", subcategoria: "embotellados_lacteos" },
  { localId: "postres_y_cafe", nombre: "Aromática", precio: 4300, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Expreso", precio: 4800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Americano", precio: 4900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Expreso Doble", precio: 6000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Machiatto", precio: 7000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Café Latte", precio: 7200, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Americano Doble", precio: 7400, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Milo Frappé", precio: 7900, categoria: "bebidas_cafeteria", subcategoria: "cafe_frio_frappes" },
  { localId: "postres_y_cafe", nombre: "Machiatto Almendra", precio: 8900, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Jugo de Fruta", precio: 9300, categoria: "bebidas_cafeteria", subcategoria: "jugos_limonadas_smoothies" },
  { localId: "postres_y_cafe", nombre: "Cappuccino", precio: 9600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Milo Caliente", precio: 9700, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Swiss Miss Chocolate", precio: 10000, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Capuccino Almendra", precio: 11500, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Caramelo Latte", precio: 13500, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Latte Grande", precio: 13600, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Chocolate Latte", precio: 14100, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" },
  { localId: "postres_y_cafe", nombre: "Latte Vainilla", precio: 14800, categoria: "bebidas_cafeteria", subcategoria: "cafe_caliente" }
];

// ============================================================================
// GRAFO PONDERADO DEL CAMPUS DE LA UNIVERSIDAD DEL NORTE: G = (V, E, w)
// Basado en el Mapa Campus UN (Bloques A-M, Espacios Comunes, Puertas y Locales)
// Pesos w(u, v) representan distancia peatonal aproximada en metros (m)
// ============================================================================
const GRAFO_CAMPUS_UNINORTE = {
  anchoMapa: 1513,
  altoMapa: 2048,
  vertices: [
    // ========================================================================
    // A. LUGARES SELECCIONABLES DEL CAMPUS (Ubicados exactamente en su entrada peatonal)
    // ========================================================================
    // 1. Bloques Académicos
    { id: "bloque_a", nombre: "Bloque A", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 465, y: 730 },
    { id: "bloque_b", nombre: "Bloque B", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 525, y: 730 },
    { id: "bloque_c", nombre: "Bloque C", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 600, y: 730 },
    { id: "bloque_d", nombre: "Bloque D", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 460, y: 1030 },
    { id: "bloque_e", nombre: "Bloque E", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 520, y: 1030 },
    { id: "bloque_f", nombre: "Bloque F / du Nord Plaza", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: true, x: 602, y: 1030 },
    { id: "bloque_g", nombre: "Bloque G", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 845, y: 1030 },
    { id: "bloque_i", nombre: "Bloque I", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 780, y: 810 },
    { id: "bloque_j", nombre: "Bloque J", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: true, x: 1045, y: 450 },
    { id: "bloque_k", nombre: "Bloque K", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: true, x: 940, y: 635 },
    { id: "bloque_l", nombre: "Bloque L", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 615, y: 580 },
    { id: "bloque_m", nombre: "Bloque M", grupo: "Bloques Académicos", seleccionable: true, esRestaurante: false, x: 965, y: 1715 },

    // 2. Espacios Comunes
    { id: "biblioteca_bkc", nombre: "Biblioteca", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 372, y: 1030 },
    { id: "casa_estudio", nombre: "Casa Estudio", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 252, y: 1055 },
    { id: "admisiones", nombre: "Admisiones", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 372, y: 745 },
    { id: "centro_medico", nombre: "Centro Médico", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 455, y: 595 },
    { id: "fuente_central", nombre: "Fuente", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 736, y: 1002 },
    { id: "bambu_1", nombre: "Bambú 1", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 705, y: 585 },
    { id: "bambu_2", nombre: "Bambú 2", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 1068, y: 560 },
    { id: "coliseo_h", nombre: "Coliseo", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 965, y: 890 },
    { id: "centro_deportivo", nombre: "Centro Deportivo", grupo: "Espacios Comunes", seleccionable: true, esRestaurante: false, x: 1205, y: 1925 },

    // 3. Puertas y Accesos Peatonales
    { id: "puerta_4", nombre: "Puerta 4", grupo: "Puertas y Accesos", seleccionable: true, esRestaurante: false, x: 215, y: 1125 },
    { id: "puerta_7", nombre: "Puerta 7", grupo: "Puertas y Accesos", seleccionable: true, esRestaurante: false, x: 736, y: 1125 },
    { id: "puerta_8", nombre: "Puerta 8", grupo: "Puertas y Accesos", seleccionable: true, esRestaurante: false, x: 935, y: 1150 },
    { id: "puerta_11", nombre: "Puerta 11", grupo: "Puertas y Accesos", seleccionable: true, esRestaurante: false, x: 1130, y: 455 },

    // 4. Zonas de Comida
    { id: "du_nord_express", nombre: "du Nord Express", grupo: "Zonas de Comida", seleccionable: true, esRestaurante: true, x: 660, y: 825 },
    { id: "la_esquina_express", nombre: "La Esquina du Nord", grupo: "Zonas de Comida", seleccionable: true, esRestaurante: true, x: 705, y: 825 },
    { id: "du_nord_terrasse", nombre: "du Nord Terrasse", grupo: "Zonas de Comida", seleccionable: true, esRestaurante: true, x: 905, y: 745 },

    // ========================================================================
    // B. NODOS DE ESQUINAS E INTERSECCIONES DE SENDEROS PEATONALES REALES (SOLO INTERIOR DEL CAMPUS)
    // ========================================================================
    // Acceso Peatonal Puerta 4 y Senderos Internos de Casa Estudio / Biblioteca / Admisiones
    { id: "int_p4_interno", nombre: "Plazoleta Interna Puerta 4 (Frente a Casa Estudio)", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 215, y: 1055 },
    { id: "int_ce_norte", nombre: "Plazoleta Norte de Casa Estudio", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 215, y: 980 },
    { id: "int_biblio_oeste", nombre: "Plazoleta Noroeste de Biblioteca", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 280, y: 980 },
    { id: "int_biblio_noroeste", nombre: "Sendero Norte de Biblioteca", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 345, y: 952 },
    { id: "int_adm_oeste", nombre: "Sendero Occidental de Jardines", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 215, y: 825 },
    { id: "int_adm_suroeste", nombre: "Plazoleta Sur de Admisiones", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 330, y: 825 },

    // Corredor Occidental (Entre Biblioteca / Admisiones y Bloques A / D)
    { id: "int_biblio_este", nombre: "Pasillo entre Biblioteca y Bloque D", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 405, y: 1030 },
    { id: "int_biblio_norte", nombre: "Plazoleta Norte de Biblioteca", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 405, y: 952 },
    { id: "int_biblio_central", nombre: "Cruce Occidental Corredor Central", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 412, y: 825 },
    { id: "int_adm_este", nombre: "Pasillo entre Admisiones y Bloque A", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 412, y: 745 },
    { id: "int_adm_norte", nombre: "Esquina Noroeste Bulevar", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 412, y: 615 },

    // Bulevar Principal Norte (Siguiendo la curva real frente a Bloques A, B, C, L, Bambú 1, I y K)
    { id: "int_norte_cm", nombre: "Bulevar frente a Centro Médico", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 455, y: 615 },
    { id: "int_norte_ab", nombre: "Entrada Norte Pasillo A-B", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 482, y: 615 },
    { id: "int_norte_bc", nombre: "Entrada Norte Pasillo B-C", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 558, y: 615 },
    { id: "int_norte_l", nombre: "Bulevar frente a Bloque L", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 615, y: 615 },
    { id: "int_norte_c_exp", nombre: "Curva Bulevar junto a Bloque C", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 632, y: 625 },
    { id: "int_norte_bambu1", nombre: "Bulevar frente a Bambú 1", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 705, y: 650 },
    { id: "int_norte_idiomas", nombre: "Bulevar frente a Bloque I", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 780, y: 662 },
    { id: "int_k_oeste", nombre: "Cruce Bulevar entre Bloque I y Bloque K", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 855, y: 662 },
    { id: "int_k_sur", nombre: "Bulevar frente a Bloque K", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 940, y: 662 },
    { id: "int_k_este", nombre: "Esquina Este de Bloque K", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1068, y: 662 },
    { id: "int_j_sur", nombre: "Plazoleta Santo Domingo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1068, y: 505 },

    // Pasillos Verticales entre Bloques A, B, C y Express
    { id: "int_ab_medio", nombre: "Pasillo entre Bloques A y B", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 482, y: 730 },
    { id: "int_bc_medio", nombre: "Pasillo entre Bloques B y C", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 558, y: 730 },
    { id: "int_c_exp_medio", nombre: "Pasillo entre Bloque C y Express", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 632, y: 730 },
    { id: "int_idiomas_oeste", nombre: "Pasillo entre Express y Bloque I", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 705, y: 745 },
    { id: "int_idiomas_este", nombre: "Pasillo entre Bloque I y Terrasse", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 855, y: 745 },

    // Corredor Central Horizontal (y = 825, entre Bloques A-B-C y Laboratorios 1-2-3)
    { id: "int_central_ab", nombre: "Cruce Central Pasillo A-B", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 482, y: 825 },
    { id: "int_central_bc", nombre: "Cruce Central Pasillo B-C", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 558, y: 825 },
    { id: "int_central_cf", nombre: "Cruce Central junto a Laboratorio 3", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 632, y: 825 },
    { id: "int_idiomas_sur", nombre: "Pasillo Sur de Bloque I", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 780, y: 825 },
    { id: "int_idiomas_sureste", nombre: "Esquina Sureste de Bloque I", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 855, y: 825 },

    // Corredor Horizontal entre Laboratorios 1-2-3 y Bloques D-E-F (y = 952)
    { id: "int_de_norte", nombre: "Cruce entre Laboratorio 1 y Bloque D", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 482, y: 952 },
    { id: "int_ef_norte", nombre: "Cruce entre Laboratorio 2 y Bloque E", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 558, y: 952 },
    { id: "int_lab3_sureste", nombre: "Esquina entre Laboratorio 3 y Bloque F", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 650, y: 952 },

    // Pasillos entre Bloques D, E y F (y = 1030)
    { id: "int_de_medio", nombre: "Pasillo entre Bloques D y E", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 482, y: 1030 },
    { id: "int_ef_medio", nombre: "Pasillo entre Bloques E y F", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 558, y: 1030 },

    // Senderos Peatonales Curvos de la Fuente, Bloque G y Coliseo (Sin cruzar zonas verdes ni quiosco central)
    { id: "int_fuente_noroeste", nombre: "Sendero Noroeste de la Fuente", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 695, y: 905 },
    { id: "int_plaza_oeste", nombre: "Sendero Norte de la Fuente", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 736, y: 925 },
    { id: "int_plaza_norte", nombre: "Sendero Borde Norte del Quiosco", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 790, y: 865 },
    { id: "int_plaza_este", nombre: "Corredor entre Quiosco y Coliseo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 855, y: 885 },
    { id: "int_fuente_oeste", nombre: "Entrada Este de Bloque F / du Nord Plaza", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 650, y: 1030 },
    { id: "int_fuente_suroeste", nombre: "Sendero Suroeste de la Fuente", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 685, y: 1002 },
    { id: "int_fuente_este", nombre: "Sendero Este de la Fuente", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 790, y: 1002 },
    { id: "int_g_oeste", nombre: "Plazoleta Oeste de Bloque G", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 830, y: 1030 },
    { id: "int_g_norte", nombre: "Esquina Noroeste de Bloque G", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 855, y: 950 },
    { id: "int_coliseo_oeste", nombre: "Plazoleta Occidental del Coliseo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 910, y: 925 },
    { id: "int_coliseo_frente", nombre: "Plazoleta Entrada del Coliseo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 965, y: 925 },
    { id: "int_coliseo_sureste", nombre: "Esquina Sureste del Coliseo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1095, y: 925 },
    { id: "int_coliseo_este", nombre: "Corredor Oriental del Coliseo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1095, y: 800 },

    // Pasillo Interior Sur de Bloque G y Corredor Oriental hacia Puerta 8 (Dentro del campus, sin cruzar edificios)
    { id: "int_g_suroeste", nombre: "Esquina Suroeste de Bloque G", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 830, y: 1125 },
    { id: "int_g_sureste", nombre: "Plazoleta Interior junto a Puerta 8", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 935, y: 1125 },
    { id: "int_anexo_sureste", nombre: "Plazoleta Oriental junto al Edificio Anexo", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1095, y: 1125 },

    // Senderos Peatonales de la Zona Deportiva y Bloque M (Rodeando parqueaderos y canchas sin cruzarlas)
    { id: "int_p8_sur", nombre: "Entrada Sur Parqueaderos", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 935, y: 1200 },
    { id: "int_canchas_1", nombre: "Esquina Suroeste de Parqueaderos", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 960, y: 1320 },
    { id: "int_canchas_2", nombre: "Sendero entre Cabañas y Cancha de Fútbol", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1005, y: 1385 },
    { id: "int_canchas_3", nombre: "Sendero Occidental Cancha de Fútbol", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1025, y: 1525 },
    { id: "int_canchas_4", nombre: "Esquina Suroeste de Cancha de Fútbol", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1042, y: 1650 },
    { id: "int_m_este", nombre: "Pasillo frente a Bloque M", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1020, y: 1715 },
    { id: "int_deportivo_1", nombre: "Sendero Sur de Cancha de Fútbol", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1185, y: 1635 },
    { id: "int_deportivo_2", nombre: "Sendero entre Canchas Múltiples y Tenis", grupo: "Pasillos", seleccionable: false, esRestaurante: false, x: 1205, y: 1810 }
  ],

  aristas: [
    // 1. Acceso Peatonal Puerta 4 y Senderos Internos de Casa Estudio, Biblioteca y Admisiones (100% dentro del campus)
    { u: "puerta_4", v: "int_p4_interno", peso: 16, via: "Ingreso peatonal por Puerta 4 hacia el costado occidental de Casa Estudio" },
    { u: "int_p4_interno", v: "casa_estudio", peso: 9, via: "Entrada Occidental a Casa Estudio" },
    { u: "int_p4_interno", v: "int_ce_norte", peso: 18, via: "Sendero interno junto a Casa Estudio" },
    { u: "int_ce_norte", v: "int_biblio_oeste", peso: 16, via: "Sendero entre Casa Estudio y Biblioteca" },
    { u: "int_biblio_oeste", v: "int_biblio_noroeste", peso: 17, via: "Sendero bordeando el Norte de la Biblioteca" },
    { u: "int_biblio_noroeste", v: "int_biblio_norte", peso: 15, via: "Plazoleta Norte de Biblioteca" },
    { u: "int_ce_norte", v: "int_adm_oeste", peso: 36, via: "Sendero peatonal occidental entre jardines hacia Admisiones" },
    { u: "int_adm_oeste", v: "int_adm_suroeste", peso: 26, via: "Plazoleta Sur de Admisiones" },
    { u: "int_adm_suroeste", v: "admisiones", peso: 18, via: "Acceso Sur a Admisiones" },
    { u: "int_adm_suroeste", v: "int_biblio_central", peso: 19, via: "Corredor hacia el cruce central occidental" },
    { u: "int_biblio_oeste", v: "int_adm_suroeste", peso: 36, via: "Sendero diagonal por los jardines entre Biblioteca y Admisiones" },

    // Corredor entre Biblioteca, Bloque D y Admisiones (Sin atravesar paredes de bloques)
    { u: "biblioteca_bkc", v: "int_biblio_este", peso: 8, via: "Entrada Oriental de Biblioteca en el pasillo con Bloque D" },
    { u: "int_biblio_este", v: "int_biblio_norte", peso: 20, via: "Pasillo entre Biblioteca y Bloque D" },
    { u: "int_biblio_norte", v: "int_biblio_central", peso: 32, via: "Sendero entre jardines hacia Corredor Central" },
    { u: "int_biblio_central", v: "int_adm_este", peso: 20, via: "Pasillo entre Admisiones y Bloque A" },
    { u: "int_adm_este", v: "admisiones", peso: 10, via: "Entrada Oriental a Admisiones" },
    { u: "int_adm_este", v: "int_adm_norte", peso: 32, via: "Pasillo lateral de Admisiones hacia Bulevar Norte" },

    // 2. Bulevar Principal Norte (De Oeste a Este por el corredor gris superior)
    { u: "int_adm_norte", v: "int_norte_cm", peso: 12, via: "Bulevar Norte hacia Centro Médico" },
    { u: "int_norte_cm", v: "centro_medico", peso: 6, via: "Entrada a Centro Médico" },
    { u: "int_norte_cm", v: "int_norte_ab", peso: 8, via: "Bulevar Norte hacia Pasillo A-B" },
    { u: "int_norte_ab", v: "int_norte_bc", peso: 19, via: "Bulevar Norte frente a Bloque B" },
    { u: "int_norte_bc", v: "int_norte_l", peso: 14, via: "Bulevar Norte hacia Bloque L" },
    { u: "int_norte_l", v: "bloque_l", peso: 9, via: "Entrada a Bloque L" },
    { u: "int_norte_l", v: "int_norte_c_exp", peso: 6, via: "Bulevar Norte junto a Bloque C" },
    { u: "int_norte_c_exp", v: "int_norte_bambu1", peso: 19, via: "Bulevar Norte hacia Bambú 1" },
    { u: "int_norte_bambu1", v: "bambu_1", peso: 16, via: "Pasillo de entrada a Bambú 1" },
    { u: "int_norte_bambu1", v: "int_norte_idiomas", peso: 19, via: "Bulevar Norte frente a Bloque I" },
    { u: "int_norte_idiomas", v: "int_k_oeste", peso: 19, via: "Bulevar Norte hacia Bloque K" },
    { u: "int_k_oeste", v: "int_k_sur", peso: 21, via: "Plazoleta frente a Bloque K" },
    { u: "int_k_sur", v: "bloque_k", peso: 7, via: "Entrada principal a Bloque K" },
    { u: "int_k_sur", v: "int_k_este", peso: 32, via: "Corredor frente a Bloque K hacia el Este" },

    // 3. Zona Santo Domingo: Bambú 2, Bloque J y Puerta 11
    { u: "int_k_este", v: "bambu_2", peso: 25, via: "Sendero peatonal hacia Bambú 2" },
    { u: "bambu_2", v: "int_j_sur", peso: 14, via: "Camino de Bambú 2 a Plazoleta Santo Domingo" },
    { u: "int_j_sur", v: "bloque_j", peso: 15, via: "Entrada a Bloque J" },
    { u: "int_j_sur", v: "puerta_11", peso: 20, via: "Sendero peatonal interno hacia Puerta 11" },

    // 4. Pasillos Verticales entre Bloques A, B, C y Express
    { u: "int_norte_ab", v: "int_ab_medio", peso: 28, via: "Pasillo cubierto entre Bloques A y B" },
    { u: "int_ab_medio", v: "bloque_a", peso: 5, via: "Entrada a Bloque A" },
    { u: "int_ab_medio", v: "bloque_b", peso: 10, via: "Entrada Oeste a Bloque B" },
    { u: "int_ab_medio", v: "int_central_ab", peso: 24, via: "Pasillo entre Bloques A y B hacia Corredor Central" },

    { u: "int_norte_bc", v: "int_bc_medio", peso: 28, via: "Pasillo cubierto entre Bloques B y C" },
    { u: "int_bc_medio", v: "bloque_b", peso: 8, via: "Entrada Este a Bloque B" },
    { u: "int_bc_medio", v: "bloque_c", peso: 10, via: "Entrada Oeste a Bloque C" },
    { u: "int_bc_medio", v: "int_central_bc", peso: 24, via: "Pasillo entre Bloques B y C hacia Corredor Central" },

    { u: "int_norte_c_exp", v: "int_c_exp_medio", peso: 26, via: "Pasillo lateral Este de Bloque C" },
    { u: "int_c_exp_medio", v: "bloque_c", peso: 8, via: "Entrada Este a Bloque C" },
    { u: "int_c_exp_medio", v: "int_central_cf", peso: 24, via: "Pasillo lateral de Bloque C hacia Corredor Central" },

    // 5. Corredor Central Horizontal (Entre Bloques A-B-C y Laboratorios 1-2-3)
    { u: "int_biblio_central", v: "int_central_ab", peso: 18, via: "Corredor Central frente a Bloque A" },
    { u: "int_central_ab", v: "int_central_bc", peso: 19, via: "Corredor Central frente a Laboratorio 2" },
    { u: "int_central_bc", v: "int_central_cf", peso: 19, via: "Corredor Central frente a Laboratorio 3" },
    { u: "int_central_cf", v: "du_nord_express", peso: 8, via: "Pasillo hacia du Nord Express" },
    { u: "du_nord_express", v: "la_esquina_express", peso: 10, via: "Pasillo entre du Nord Express y La Esquina du Nord" },

    // 6. Pasillos Internos entre Laboratorios 1-2-3 y Bloques D, E, F (Rodeando los bloques por dentro del campus)
    { u: "int_biblio_norte", v: "int_de_norte", peso: 19, via: "Pasillo Norte frente a Bloque D" },
    { u: "int_central_ab", v: "int_de_norte", peso: 31, via: "Pasillo entre Laboratorio 1 y Laboratorio 2" },
    { u: "int_de_norte", v: "int_ef_norte", peso: 19, via: "Pasillo horizontal entre Laboratorios y Bloques D-E" },
    { u: "int_central_bc", v: "int_ef_norte", peso: 31, via: "Pasillo entre Laboratorio 2 y Laboratorio 3" },
    { u: "int_ef_norte", v: "int_lab3_sureste", peso: 23, via: "Pasillo Norte frente a Bloque F / du Nord Plaza" },

    { u: "int_de_norte", v: "int_de_medio", peso: 20, via: "Pasillo cubierto entre Bloques D y E" },
    { u: "int_de_medio", v: "bloque_d", peso: 6, via: "Entrada Oriental a Bloque D" },
    { u: "int_de_medio", v: "bloque_e", peso: 9, via: "Entrada Oeste a Bloque E" },

    { u: "int_ef_norte", v: "int_ef_medio", peso: 20, via: "Pasillo cubierto entre Bloques E y F" },
    { u: "int_ef_medio", v: "bloque_e", peso: 9, via: "Entrada Este a Bloque E" },
    { u: "int_ef_medio", v: "bloque_f", peso: 11, via: "Entrada Oeste a Bloque F / du Nord Plaza" },

    { u: "int_lab3_sureste", v: "int_fuente_oeste", peso: 20, via: "Corredor lateral Este de Bloque F / du Nord Plaza" },
    { u: "bloque_f", v: "int_fuente_oeste", peso: 12, via: "Acceso Este de Bloque F / du Nord Plaza hacia los jardines de la Fuente" },

    // 7. Accesos Internos desde Puerta 7 y Puerta 8 (Entrando hacia la Fuente y Bloque G, sin caminar por la calle exterior)
    { u: "puerta_7", v: "fuente_central", peso: 30, via: "Sendero peatonal de ingreso desde Puerta 7 hacia la Fuente" },
    { u: "puerta_7", v: "int_fuente_suroeste", peso: 32, via: "Sendero diagonal interno desde Puerta 7 hacia Bloque F / du Nord Plaza" },
    { u: "puerta_7", v: "int_g_suroeste", peso: 22, via: "Sendero interno desde Puerta 7 hacia el costado de Bloque G" },
    { u: "int_g_suroeste", v: "int_g_oeste", peso: 22, via: "Corredor lateral Oeste de Bloque G" },
    { u: "int_g_suroeste", v: "int_g_sureste", peso: 24, via: "Pasillo interior al Sur de Bloque G" },
    { u: "int_g_sureste", v: "puerta_8", peso: 8, via: "Acceso peatonal interno de Puerta 8" },

    // 8. Corredores alrededor de Bloque I, La Esquina, Fuente, Terrasse, Bloque G y Coliseo
    { u: "int_norte_bambu1", v: "int_idiomas_oeste", peso: 24, via: "Pasillo entre du Nord Express y Bloque I" },
    { u: "int_idiomas_oeste", v: "la_esquina_express", peso: 20, via: "Pasillo hacia La Esquina du Nord" },
    { u: "la_esquina_express", v: "int_idiomas_sur", peso: 21, via: "Pasillo Sur de Bloque I" },
    { u: "int_idiomas_sur", v: "bloque_i", peso: 6, via: "Entrada Sur a Bloque I" },
    { u: "int_idiomas_sur", v: "int_idiomas_sureste", peso: 19, via: "Corredor Sur de Bloque I hacia el Este" },

    { u: "la_esquina_express", v: "int_fuente_noroeste", peso: 20, via: "Bajada peatonal desde La Esquina hacia la Fuente" },
    { u: "int_fuente_noroeste", v: "int_lab3_sureste", peso: 16, via: "Sendero hacia Bloque F / du Nord Plaza" },
    { u: "int_fuente_noroeste", v: "int_plaza_oeste", peso: 12, via: "Sendero Norte de los jardines de la Fuente" },
    { u: "int_plaza_oeste", v: "fuente_central", peso: 19, via: "Sendero central hacia la Fuente" },
    { u: "int_fuente_oeste", v: "int_fuente_suroeste", peso: 11, via: "Sendero desde Bloque F / du Nord Plaza hacia la Fuente" },
    { u: "int_fuente_suroeste", v: "fuente_central", peso: 13, via: "Camino Occidental de la Fuente" },
    { u: "fuente_central", v: "int_fuente_este", peso: 14, via: "Camino Oriental de la Fuente" },
    { u: "int_fuente_este", v: "int_g_oeste", peso: 12, via: "Sendero hacia Bloque G" },
    { u: "int_g_oeste", v: "bloque_g", peso: 6, via: "Entrada Occidental a Bloque G" },
    { u: "int_g_oeste", v: "int_g_norte", peso: 21, via: "Subida lateral junto a Bloque G" },

    // Senderos que rodean el quiosco sin atravesarlo y conectan Bloque K, Terrasse y Coliseo
    { u: "int_plaza_oeste", v: "int_plaza_norte", peso: 18, via: "Sendero curvo al Norte del quiosco" },
    { u: "int_idiomas_sur", v: "int_plaza_norte", peso: 11, via: "Paso peatonal al Sur de Bloque I" },
    { u: "int_plaza_norte", v: "int_idiomas_sureste", peso: 18, via: "Diagonal peatonal hacia esquina de Bloque I" },
    { u: "int_k_oeste", v: "int_idiomas_este", peso: 21, via: "Pasillo entre Bloque I y Canchas de Racquetball" },
    { u: "int_idiomas_este", v: "du_nord_terrasse", peso: 12, via: "Pasillo hacia du Nord Terrasse en la esquina superior del Coliseo" },
    { u: "int_idiomas_este", v: "int_idiomas_sureste", peso: 20, via: "Continuación del pasillo entre Bloque I y Coliseo" },
    { u: "int_idiomas_sureste", v: "int_plaza_este", peso: 15, via: "Corredor entre el quiosco y el Coliseo" },
    { u: "int_plaza_este", v: "int_g_norte", peso: 16, via: "Sendero hacia la esquina Norte de Bloque G" },
    { u: "int_plaza_este", v: "int_coliseo_oeste", peso: 17, via: "Plazoleta Occidental del Coliseo" },
    { u: "int_g_norte", v: "int_coliseo_oeste", peso: 15, via: "Paso entre Bloque G y la plazoleta del Coliseo" },
    { u: "int_coliseo_oeste", v: "int_coliseo_frente", peso: 14, via: "Plazoleta frente a la entrada del Coliseo" },
    { u: "int_coliseo_frente", v: "coliseo_h", peso: 9, via: "Entrada principal al Coliseo" },

    // Corredor Oriental del Coliseo (Rodeando el Coliseo y el edificio anexo por el corredor gris oriental)
    { u: "int_k_este", v: "int_coliseo_este", peso: 35, via: "Avenida Oriental detrás del Coliseo" },
    { u: "int_coliseo_este", v: "int_coliseo_sureste", peso: 31, via: "Corredor Oriental del Coliseo" },
    { u: "int_coliseo_sureste", v: "int_coliseo_frente", peso: 32, via: "Plazoleta Sur del Coliseo" },
    { u: "int_coliseo_sureste", v: "int_anexo_sureste", peso: 38, via: "Corredor Oriental junto al edificio anexo" },
    { u: "int_anexo_sureste", v: "int_g_sureste", peso: 32, via: "Plazoleta interior hacia Puerta 8" },

    // 9. Conexión hacia Bloque M y Centro Deportivo cruzando desde Puerta 8
    { u: "puerta_8", v: "int_p8_sur", peso: 12, via: "Cruce peatonal desde Puerta 8 hacia la zona de parqueaderos y canchas" },
    { u: "int_p8_sur", v: "int_canchas_1", peso: 32, via: "Andén Occidental junto a los Parqueaderos" },
    { u: "int_canchas_1", v: "int_canchas_2", peso: 22, via: "Sendero entre Parqueaderos y Cancha de Fútbol" },
    { u: "int_canchas_2", v: "int_canchas_3", peso: 35, via: "Sendero peatonal al Oeste de la Cancha de Fútbol" },
    { u: "int_canchas_3", v: "int_canchas_4", peso: 31, via: "Continuación del sendero junto a la Cancha de Fútbol" },
    { u: "int_canchas_4", v: "int_m_este", peso: 16, via: "Corredor hacia Bloque M" },
    { u: "int_m_este", v: "bloque_m", peso: 15, via: "Entrada a Bloque M" },
    { u: "int_canchas_4", v: "int_deportivo_1", peso: 36, via: "Sendero transversal al Sur de la Cancha de Fútbol" },
    { u: "int_deportivo_1", v: "int_deportivo_2", peso: 44, via: "Sendero peatonal entre las canchas múltiples y de tenis" },
    { u: "int_deportivo_2", v: "centro_deportivo", peso: 28, via: "Llegada al Centro Deportivo" }
  ]
};
