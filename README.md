# Sistema de Recomendación Gastronómica y Enrutamiento Peatonal en el Campus Uninorte

**Asignatura:** Matemáticas Discretas (MAT 4021) — Universidad del Norte  
**Docente:** MSc Iván Gómez  

---

## 1. Descripción del Proyecto y Problema de Impacto

Los estudiantes de nuevo ingreso y visitantes de la Universidad del Norte suelen desconocer dónde están ubicados los diferentes puntos de comida del campus, qué tipo de alimentos ofrecen y cuáles son sus precios, debido a la falta de señalización unificada. Además, los emprendimientos estudiantiles no aparecen en los mapas oficiales y se mueven por distintas zonas comunes.

Esta aplicación resuelve el problema modelando:
1. **Árbol Enraizado Jerárquico y Recorrido DFS con Poda:** Clasifica el catálogo real de *Menus du Nord* (11 locales y 248 productos oficiales) más los emprendimientos estudiantiles en 4 niveles (`Raíz -> 7 Categorías -> 26 Subcategorías -> Platos`).
2. **Árbol Binario de Búsqueda Balanceado (BST):** Indexa los platos por su precio en pesos colombianos (`$ COP`) para realizar búsquedas por rango `[P_min, P_max]` podando subárboles fuera del presupuesto.
3. **Grafo Bipartito Usuario–Locales y Red Neuronal Multicapa (Feedforward):** Evalúa cada plato y restaurante en una escala de `0%` a `100%` de afinidad usando funciones de activación `ReLU`.
4. **Combinatoria con Poda Presupuestal (Armador de Combos):** Genera combinaciones de 2 o 3 productos (`Plato Fuerte + Bebida [+ Postre]`) sin superar el presupuesto máximo, tanto en un mismo lugar como combinando productos de 2 lugares distintos.
5. **Grafo Ponderado del Campus `G = (V, E, w)` y Algoritmo de Dijkstra:** Modela los pasillos peatonales internos de la Universidad del Norte (`69 vértices` y `101 aristas`) para calcular la ruta más corta en metros y el tiempo estimado a pie (`1.3 m/s`), incluyendo:
   - Rutas a restaurantes fijos.
   - Rutas al punto recurrente más cercano (o elegido en menú desplegable) de un emprendimiento estudiantil.
   - **Doble camino encadenado (Camino 1 en rojo + Camino 2 en azul)** cuando el usuario elige un combo de 2 locales distintos.

---

## 2. Estructura de Archivos del Ejecutable

* `index.html`: Interfaz de usuario en 5 pasos + pestaña de registro de emprendimientos, con selector de **Modo Claro / Modo Oscuro** y colores institucionales (rojo y negro).
* `data.js`: Base de datos real extraída de *Menus du Nord* (11 locales, 248 productos con precios reales entre `$1.400` y `$49.400 COP`) y definición completa del grafo peatonal interno del campus (`GRAFO_CAMPUS_UNINORTE`).
* `algorithms.js`: Implementación desde cero de los algoritmos de Matemáticas Discretas (Construcción y DFS con poda en árbol jerárquico, construcción y búsqueda por rango en BST balanceado, red neuronal con activación ReLU, combinatoria con poda para combos, algoritmo de Dijkstra y ruta alternativa).
* `app.js`: Controlador de eventos, sincronización dinámica de emprendimientos estudiantiles en el árbol y renderizado interactivo del mapa en SVG.
* `mapa_campus.png`: Plano oficial del campus de la Universidad del Norte sobre el cual se trazan los caminos.
* `Documento_Proyecto_Final_Matematicas_Discretas.tex`: Documento escrito formal en LaTeX con formato APA (secciones 1 a 7).

---

## 3. Instrucciones para Ejecutar el Programa

El programa no requiere instalación de librerías externas ni servidores complejos:

1. Entra a la carpeta `proyecto con vainas`.
2. Haz doble clic sobre el archivo **`index.html`** para abrirlo en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Firefox o Safari).
3. En la barra superior puedes alternar entre:
   - **`1. Buscar qué comer`**: Flujo guiado en 5 pasos (1. Tus Gustos -> 2. Tu Presupuesto -> 3. Menú y Combos -> 4. ¿Dónde estás? -> 5. Mapa y Ruta).
   - **`2. Publicar emprendimiento`**: Formulario para registrar emprendimientos estudiantiles, sus productos, estado de disponibilidad, horario y sus zonas frecuentes de entrega en el campus.
   - **`Modo oscuro / Modo claro`**: Botón en la esquina superior derecha.

---

## 4. Casos de Prueba con Resultado Conocido

Puedes verificar el funcionamiento exacto de los algoritmos con los siguientes casos de prueba:

### Caso de Prueba 1: Ruta Peatonal 100% Interna desde Puerta 7 hasta Casa Estudio
* **Objetivo:** Verificar que el algoritmo de Dijkstra traza el camino únicamente por los pasillos internos del campus sin salir a caminar por la calle exterior.
* **Pasos:**
  1. En el **Paso 4 (`¿Dónde estás?`)**, selecciona **`Puerta 7`**.
  2. Pasa al **Paso 5 (`Mapa y Ruta`)**, marca la opción **`Cambiar destino`** sobre el mapa y haz clic en el nodo de **`Casa Estudio`** (al costado izquierdo del campus).
* **Resultado conocido:**
  - Distancia total: **`199 metros`** (`~2 min 33 seg caminando` a `1.3 m/s`).
  - Recorrido: `Puerta 7 -> Sendero Suroeste de la Fuente -> Entrada Este de Bloque F -> Esquina entre Laboratorio 3 y Bloque F -> Cruce entre Laboratorio 2 y Bloque E -> Cruce entre Laboratorio 1 y Bloque D -> Plazoleta Norte de Biblioteca -> Sendero Norte de Biblioteca -> Plazoleta Noroeste de Biblioteca -> Plazoleta Norte de Casa Estudio -> Plazoleta Interna Puerta 4 -> Casa Estudio`.
  - Si cambias tu punto de partida a **`Puerta 4`** (entrada occidental junto a Casa Estudio), la distancia cae a **`25 metros`** (`~19 seg caminando`).

### Caso de Prueba 2: Selección de `du Nord Express` y Ruta desde `Bloque C`
* **Objetivo:** Verificar el filtrado por presupuesto económico y la selección directa de `du Nord Express`.
* **Pasos:**
  1. En el **Paso 1**, marca la categoría **`3. Desayunos, Fritos y Panadería`**.
  2. En el **Paso 2**, fija el presupuesto máximo en **`$6.000 COP`**.
  3. En el **Paso 3**, haz clic en **`Cómo llegar`** sobre el *Dedito de Queso* (`$4.600`) o *Empanada Horneada* (`$4.800`) de **`du Nord Express`** (o cámbialo directamente haciendo clic sobre el ícono de `du Nord Express` en el mapa con el modo `Cambiar destino`).
  4. En el **Paso 4**, elige como ubicación actual **`Bloque C`** y pasa al **Paso 5**.
* **Resultado conocido:**
  - Distancia total: **`40 metros`** (`~31 seg caminando`) en 3 pasos: `Bloque C -> Pasillo entre Bloque C y Express (8 m) -> Cruce Central junto a Laboratorio 3 (24 m) -> du Nord Express (8 m)`.

### Caso de Prueba 3: Combo en 2 Lugares Distintos (Trazado de 2 Caminos en el Mapa)
* **Objetivo:** Verificar la combinatoria de combos entre dos locales distintos y el trazado simultáneo de dos rutas consecutivas.
* **Pasos:**
  1. Ve al **Paso 3 (`Menú y Combos`)** y baja a la sección **`Armador de Combos con tu Presupuesto`**.
  2. Desmarca la casilla **`Comprar todo en el mismo lugar`**.
  3. Elige cualquier combo de la tabla que combine dos sitios diferentes (por ejemplo, `La Casa de la Plaza + La Esquina du Nord` o `Le Petit + Café du Nord`) y presiona **`Cómo llegar`**.
  4. Elige tu ubicación en el **Paso 4** (por ejemplo, **`Bloque K`**) y pasa al **Paso 5**.
* **Resultado conocido:**
  - El mapa dibuja **2 caminos diferenciados**:
    - **Camino 1 (Rojo con borde amarillo):** Desde tu ubicación inicial hasta el primer lugar (Parada 1).
    - **Camino 2 (Azul con borde celeste):** Desde el primer lugar (Parada 1) hasta el segundo lugar (Parada 2).
  - Debajo del mapa aparecen las dos tablas de indicaciones paso a paso por separado y la suma total de metros.

### Caso de Prueba 4: Registro de Emprendimiento Estudiantil y Selección de Puntos Recurrentes
* **Objetivo:** Verificar la inserción dinámica en el árbol de preferencias y el cálculo de ruta hacia el conjunto de nodos frecuentes de un emprendedor.
* **Pasos:**
  1. Abre la pestaña **`2. Publicar emprendimiento`**.
  2. Escribe Nombre: `Brownies del Norte`, Contacto: `300 123 4567`, Lugar principal: `Bambú 1`, y marca también como zonas frecuentes `Fuente` y `Bloque K`.
  3. Añade un producto (`Brownie melcochudo`, `$5.000`, `5. Postres -> Tortas, Brownies y Cheesecake`) y presiona **`Guardar Emprendimiento en el Catálogo`**.
  4. Vuelve a **`1. Buscar qué comer`**, ve al **Paso 3**, busca `Brownie melcochudo` y haz clic en **`Cómo llegar`**.
  5. En el **Paso 4**, selecciona **`Puerta 7`** y pasa al **Paso 5**.
* **Resultado conocido:**
  - El sistema evalúa las distancias desde `Puerta 7` hacia los 3 puntos del emprendedor (`Fuente: 30 m`, `Bambú 1: 123 m`, `Bloque K: 148 m`) y selecciona automáticamente **`Fuente (30 m)`** por ser el más cercano.
  - En el menú desplegable superior del mapa puedes cambiar manualmente entre `Fuente`, `Bambú 1` y `Bloque K` para ver cómo llegar a cualquiera de sus puntos frecuentes.
