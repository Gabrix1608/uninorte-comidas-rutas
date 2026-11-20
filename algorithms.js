// ============================================================================
// MÓDULO DE MATEMÁTICAS DISCRETAS (Fase 1: Árboles, Grafos Bipartitos y Red Neuronal)
// ============================================================================

// 1. ÁRBOL ENRAIZADO JERÁRQUICO DE PREFERENCIAS (Recorrido DFS con Poda)
class NodoArbolCategoria {
  constructor(id, nombre, nivel, tipo) {
    this.id = id;
    this.nombre = nombre;
    this.nivel = nivel; // 0: Raíz, 1: Categoría, 2: Subcategoría, 3: Plato (Hoja)
    this.tipo = tipo;
    this.hijos = [];
    this.platoData = null;
  }
}

function construirArbolJerarquico(arbolPreferencias, catalogo) {
  const raiz = new NodoArbolCategoria("root", "Catálogo Gastronómico Uninorte", 0, "raiz");
  const mapaSubcategorias = {};

  arbolPreferencias.forEach((cat) => {
    const nodoCat = new NodoArbolCategoria(cat.id, cat.nombre, 1, "categoria");
    cat.subcategorias.forEach((sub) => {
      const nodoSub = new NodoArbolCategoria(sub.id, sub.nombre, 2, "subcategoria");
      nodoCat.hijos.push(nodoSub);
      mapaSubcategorias[sub.id] = nodoSub;
    });
    raiz.hijos.push(nodoCat);
  });

  catalogo.forEach((item, idx) => {
    const nodoHoja = new NodoArbolCategoria(`item_${idx}`, item.nombre, 3, "hoja_plato");
    nodoHoja.platoData = { ...item, id: `item_${idx}` };
    if (mapaSubcategorias[item.subcategoria]) {
      mapaSubcategorias[item.subcategoria].hijos.push(nodoHoja);
    }
  });

  return raiz;
}

// Recorrido DFS sobre el Árbol Jerárquico con poda de ramas no seleccionadas
function filtrarPorArbolDFS(raiz, subcategoriasSeleccionadas) {
  const hojasAceptadas = [];
  let nodosVisitados = 0;
  let ramasPodadas = 0;
  const sinFiltroPreferencias = subcategoriasSeleccionadas.size === 0;

  function dfs(nodo) {
    nodosVisitados++;
    if (nodo.tipo === "hoja_plato") {
      hojasAceptadas.push(nodo.platoData);
      return;
    }

    for (const hijo of nodo.hijos) {
      if (hijo.tipo === "subcategoria" && !sinFiltroPreferencias) {
        if (!subcategoriasSeleccionadas.has(hijo.id)) {
          ramasPodadas++;
          continue; // Poda de rama completa en el árbol
        }
      }
      dfs(hijo);
    }
  }

  dfs(raiz);
  return { hojasAceptadas, nodosVisitados, ramasPodadas };
}

// 2. ÁRBOL BINARIO DE BÚSQUEDA (BST Balanceado) INDEXADO POR PRECIO
class NodoBSTPrecio {
  constructor(precio) {
    this.precio = precio;
    this.platos = [];
    this.izquierdo = null;
    this.derecho = null;
  }
}

function construirBSTBalanceado(platos) {
  const mapaPrecios = new Map();
  platos.forEach((p) => {
    if (!mapaPrecios.has(p.precio)) mapaPrecios.set(p.precio, []);
    mapaPrecios.get(p.precio).push(p);
  });

  const preciosOrdenados = Array.from(mapaPrecios.keys()).sort((a, b) => a - b);

  function construirRecursivo(inicio, fin) {
    if (inicio > fin) return null;
    const medio = Math.floor((inicio + fin) / 2);
    const precioActual = preciosOrdenados[medio];
    const nodo = new NodoBSTPrecio(precioActual);
    nodo.platos = mapaPrecios.get(precioActual);
    nodo.izquierdo = construirRecursivo(inicio, medio - 1);
    nodo.derecho = construirRecursivo(medio + 1, fin);
    return nodo;
  }

  return {
    raiz: construirRecursivo(0, preciosOrdenados.length - 1),
    totalNodosPrecio: preciosOrdenados.length
  };
}

// Búsqueda por rango [precioMin, precioMax] en el BST
function buscarRangoBST(raizBST, precioMin, precioMax) {
  const resultados = [];
  let nodosExploradosBST = 0;

  function recorrerRango(nodo) {
    if (!nodo) return;
    nodosExploradosBST++;

    if (nodo.precio > precioMin) {
      recorrerRango(nodo.izquierdo);
    }
    if (nodo.precio >= precioMin && nodo.precio <= precioMax) {
      resultados.push(...nodo.platos);
    }
    if (nodo.precio < precioMax) {
      recorrerRango(nodo.derecho);
    }
  }

  recorrerRango(raizBST);
  return { resultados, nodosExploradosBST };
}

// 3. RED NEURONAL MULTICAPA (DAG PONDERADO) + GRAFO BIPARTITO USUARIO-LOCAL
function relu(x) {
  return Math.max(0, x);
}

// Propagación hacia adelante (Forward Pass en orden topológico del DAG)
// Capa de Entrada (3 neuronas: Preferencia, Presupuesto, Cobertura del Local) -> Capa Oculta -> Salida
function evaluarRedNeuronalPlato(plato, paramsUsuario, statsLocal) {
  const { presupuestoMax, subcategoriasSeleccionadas, categoriasPadreSeleccionadas } = paramsUsuario;

  // x1: Coincidencia de Preferencia en el Árbol
  let x1_preferencia = 0.8;
  if (subcategoriasSeleccionadas.size > 0) {
    if (subcategoriasSeleccionadas.has(plato.subcategoria)) {
      x1_preferencia = 1.0;
    } else if (categoriasPadreSeleccionadas.has(plato.categoria)) {
      x1_preferencia = 0.5;
    } else {
      x1_preferencia = 0.0;
    }
  }

  // x2: Ajuste de Precio respecto al Presupuesto Máximo del usuario
  const ratioAhorro = Math.max(0, Math.min(1, (presupuestoMax - plato.precio) / Math.max(presupuestoMax, 1)));
  const x2_precio = 0.65 + 0.35 * ratioAhorro;

  // x3: Grado del nodo Local en el Grafo Bipartito (variedad de platos compatibles en ese local)
  const x3_densidadLocal = Math.min(1, statsLocal.opcionesValidas / 10);

  // Capa Oculta (Matriz de adyacencia ponderada W1)
  const h1 = relu(0.55 * x1_preferencia + 0.45 * x2_precio);
  const h2 = relu(0.45 * x1_preferencia + 0.35 * x2_precio + 0.20 * x3_densidadLocal);
  const h3 = relu(0.60 * x1_preferencia + 0.25 * x2_precio + 0.15 * x3_densidadLocal);

  // Capa de Salida (W2)
  const zOut = 0.40 * h1 + 0.35 * h2 + 0.25 * h3;
  const afinidadPorcentaje = Math.round(Math.max(0, Math.min(100, zOut * 100)));

  return {
    afinidad: afinidadPorcentaje,
    entradasRed: {
      x1_preferencia: Number(x1_preferencia.toFixed(2)),
      x2_precio: Number(x2_precio.toFixed(2)),
      x3_densidadLocal: Number(x3_densidadLocal.toFixed(2))
    }
  };
}

// ============================================================================
// 4. GRAFO PONDERADO DEL CAMPUS Y ALGORITMO DE DIJKSTRA (CAMINO MÁS CORTO)
// G = (V, E, w) no dirigido y conexo
// ============================================================================
function construirGrafoCampus(grafoData) {
  const mapaVertices = {};
  const listaAdyacencia = {};
  const grados = {};

  grafoData.vertices.forEach((v) => {
    mapaVertices[v.id] = v;
    listaAdyacencia[v.id] = [];
    grados[v.id] = 0;
  });

  grafoData.aristas.forEach((arista) => {
    const { u, v, peso, via } = arista;
    if (listaAdyacencia[u] && listaAdyacencia[v]) {
      listaAdyacencia[u].push({ vecino: v, peso, via });
      listaAdyacencia[v].push({ vecino: u, peso, via });
      grados[u]++;
      grados[v]++;
    }
  });

  const sumaGrados = Object.values(grados).reduce((acc, g) => acc + g, 0);

  return {
    mapaVertices,
    listaAdyacencia,
    grados,
    totalVertices: grafoData.vertices.length,
    totalAristas: grafoData.aristas.length,
    sumaGrados
  };
}

// Algoritmo de Dijkstra: Camino más corto desde nodoOrigenId hacia todos los vértices V
// Genera además el Árbol de Caminos Más Cortos (SPT) enraizado en nodoOrigenId
function ejecutarDijkstraCampus(grafoConstruido, nodoOrigenId) {
  const { listaAdyacencia, mapaVertices } = grafoConstruido;
  const distancias = {};
  const predecesores = {};
  const aristaPrevia = {};
  const visitados = new Set();
  const ordenExtraccion = [];
  let relajacionesExitosas = 0;
  let aristasInspeccionadas = 0;

  Object.keys(mapaVertices).forEach((id) => {
    distancias[id] = Infinity;
    predecesores[id] = null;
    aristaPrevia[id] = null;
  });

  if (!mapaVertices[nodoOrigenId]) {
    return null;
  }

  distancias[nodoOrigenId] = 0;

  while (visitados.size < Object.keys(mapaVertices).length) {
    // Seleccionar vértice u no visitado con menor distancia tentativa d(u)
    let u = null;
    let minDistancia = Infinity;

    for (const id of Object.keys(mapaVertices)) {
      if (!visitados.has(id) && distancias[id] < minDistancia) {
        minDistancia = distancias[id];
        u = id;
      }
    }

    if (u === null || minDistancia === Infinity) break;

    visitados.add(u);
    ordenExtraccion.push({
      paso: ordenExtraccion.length + 1,
      nodoId: u,
      nombre: mapaVertices[u].nombre,
      distanciaAcumulada: distancias[u]
    });

    // Relajación de las aristas incidentes a u: si d(u) + w(u, v) < d(v)
    for (const ady of listaAdyacencia[u]) {
      aristasInspeccionadas++;
      if (visitados.has(ady.vecino)) continue;

      const nuevaDist = distancias[u] + ady.peso;
      if (nuevaDist < distancias[ady.vecino]) {
        distancias[ady.vecino] = nuevaDist;
        predecesores[ady.vecino] = u;
        aristaPrevia[ady.vecino] = ady;
        relajacionesExitosas++;
      }
    }
  }

  return {
    nodoOrigenId,
    distancias,
    predecesores,
    aristaPrevia,
    ordenExtraccion,
    relajacionesExitosas,
    aristasInspeccionadas
  };
}

// Reconstruye la secuencia de vértices y aristas del camino óptimo u_0 -> ... -> u_k
function obtenerCaminoOptimo(resultadoDijkstra, grafoConstruido, nodoDestinoId) {
  if (!resultadoDijkstra || resultadoDijkstra.distancias[nodoDestinoId] === Infinity) {
    return {
      alcanzable: false,
      distanciaTotal: Infinity,
      nodosCamino: [],
      tramos: [],
      resumenTexto: "No alcanzable"
    };
  }

  const { mapaVertices } = grafoConstruido;
  const { nodoOrigenId, distancias, predecesores, aristaPrevia } = resultadoDijkstra;

  if (nodoOrigenId === nodoDestinoId) {
    return {
      alcanzable: true,
      distanciaTotal: 0,
      nodosCamino: [mapaVertices[nodoOrigenId]],
      tramos: [],
      resumenTexto: `Ya te encuentras en ${mapaVertices[nodoOrigenId].nombre}`
    };
  }

  const secuenciaIds = [];
  let actual = nodoDestinoId;
  while (actual !== null) {
    secuenciaIds.unshift(actual);
    actual = predecesores[actual];
  }

  const nodosCamino = secuenciaIds.map((id) => mapaVertices[id]);
  const tramos = [];

  for (let i = 1; i < secuenciaIds.length; i++) {
    const desdeId = secuenciaIds[i - 1];
    const haciaId = secuenciaIds[i];
    const infoArista = aristaPrevia[haciaId];
    tramos.push({
      paso: i,
      desdeId,
      haciaId,
      desdeNombre: mapaVertices[desdeId].nombre,
      haciaNombre: mapaVertices[haciaId].nombre,
      peso: infoArista ? infoArista.peso : 0,
      via: infoArista ? infoArista.via : "",
      distanciaAcumulada: distancias[haciaId]
    });
  }

  const resumenTexto = nodosCamino.map((n) => n.nombre).join(" → ");

  return {
    alcanzable: true,
    distanciaTotal: distancias[nodoDestinoId],
    nodosCamino,
    tramos,
    resumenTexto
  };
}

// ============================================================================
// 5. ARMADOR DE COMBOS (COMBINATORIA CON PODA POR PRESUPUESTO)
// Producto cartesiano podado C_1 x C_2 (x C_3) sujeto a sum(precio) <= P_max
// ============================================================================
function generarCombosOptimos(platosConPuntaje, configCombo) {
  const {
    estructura = "principal_bebida", // "principal_bebida" | "principal_bebida_postre" | "snack_bebida" | "snack_bebida_postre"
    mismoLocal = true,
    presupuestoMin = 0,
    presupuestoMax = 25000,
    limiteResultados = 10
  } = configCombo;

  // Conjuntos de categorías para cada componente del combo
  const CATS_COMIDA_FUERTE = new Set(["almuerzos", "comida_rapida", "desayunos_fritos", "saludable_vegetariano"]);
  const CATS_SNACK_LIGERO = new Set(["desayunos_fritos", "snacks_paquetes", "saludable_vegetariano", "comida_rapida"]);
  const CATS_BEBIDA = new Set(["bebidas_cafeteria"]);
  const CATS_POSTRE = new Set(["postres_dulces"]);

  let filtroRanura1 = (p) => CATS_COMIDA_FUERTE.has(p.categoria);
  let incluirPostre = false;

  if (estructura === "principal_bebida") {
    filtroRanura1 = (p) => CATS_COMIDA_FUERTE.has(p.categoria);
    incluirPostre = false;
  } else if (estructura === "principal_bebida_postre") {
    filtroRanura1 = (p) => CATS_COMIDA_FUERTE.has(p.categoria);
    incluirPostre = true;
  } else if (estructura === "snack_bebida") {
    filtroRanura1 = (p) => CATS_SNACK_LIGERO.has(p.categoria);
    incluirPostre = false;
  } else if (estructura === "snack_bebida_postre") {
    filtroRanura1 = (p) => CATS_SNACK_LIGERO.has(p.categoria);
    incluirPostre = true;
  }

  // Ordenar candidatos de cada conjunto por mayor afinidad y menor precio (acota búsqueda combinatoria)
  const ordenarCandidatos = (arr) =>
    arr
      .slice()
      .sort((a, b) => b.afinidad - a.afinidad || a.precio - b.precio)
      .slice(0, 35);

  const principales = ordenarCandidatos(platosConPuntaje.filter((p) => filtroRanura1(p) && p.precio <= presupuestoMax));
  const bebidas = ordenarCandidatos(platosConPuntaje.filter((p) => CATS_BEBIDA.has(p.categoria) && p.precio <= presupuestoMax));
  const postres = incluirPostre
    ? ordenarCandidatos(platosConPuntaje.filter((p) => CATS_POSTRE.has(p.categoria) && p.precio <= presupuestoMax))
    : [];

  const combosValidos = [];
  let combinacionesExploradas = 0;
  let ramasPodadasPresupuesto = 0;

  for (let i = 0; i < principales.length; i++) {
    const p1 = principales[i];
    if (p1.precio > presupuestoMax) {
      ramasPodadasPresupuesto++;
      continue;
    }

    for (let j = 0; j < bebidas.length; j++) {
      const p2 = bebidas[j];
      if (p1.id === p2.id) continue;
      if (mismoLocal && p1.localId !== p2.localId) continue;

      const subtotal12 = p1.precio + p2.precio;
      if (subtotal12 > presupuestoMax) {
        ramasPodadasPresupuesto++;
        continue; // Poda por presupuesto en nivel 2
      }

      if (!incluirPostre) {
        combinacionesExploradas++;
        if (subtotal12 >= presupuestoMin) {
          const afinidadPromedio = Math.round((p1.afinidad + p2.afinidad) / 2);
          const ahorro = presupuestoMax - subtotal12;
          const localesIds = Array.from(new Set([p1.localId, p2.localId]));
          const localesNombres = Array.from(new Set([p1.nombreLocal, p2.nombreLocal]));
          combosValidos.push({
            items: [p1, p2],
            precioTotal: subtotal12,
            ahorro,
            afinidadCombo: afinidadPromedio,
            mismoLocal: localesIds.length === 1,
            localPrincipalId: p1.localId,
            localesIds,
            nombreLocal: localesNombres.join(" + ")
          });
        }
      } else {
        for (let k = 0; k < postres.length; k++) {
          const p3 = postres[k];
          if (p3.id === p1.id || p3.id === p2.id) continue;
          if (mismoLocal && (p3.localId !== p1.localId || p3.localId !== p2.localId)) continue;

          combinacionesExploradas++;
          const total123 = subtotal12 + p3.precio;
          if (total123 > presupuestoMax) {
            ramasPodadasPresupuesto++;
            continue; // Poda por presupuesto en nivel 3
          }

          if (total123 >= presupuestoMin) {
            const afinidadPromedio = Math.round((p1.afinidad + p2.afinidad + p3.afinidad) / 3);
            const ahorro = presupuestoMax - total123;
            const localesIds = Array.from(new Set([p1.localId, p2.localId, p3.localId]));
            const localesUnicos = Array.from(new Set([p1.nombreLocal, p2.nombreLocal, p3.nombreLocal]));
            combosValidos.push({
              items: [p1, p2, p3],
              precioTotal: total123,
              ahorro,
              afinidadCombo: afinidadPromedio,
              mismoLocal: localesIds.length === 1,
              localPrincipalId: p1.localId,
              localesIds,
              nombreLocal: localesUnicos.join(" + ")
            });
          }
        }
      }
    }
  }

  // Ordenar por mayor afinidad del combo y, en caso de empate, menor precio total
  combosValidos.sort((a, b) => b.afinidadCombo - a.afinidadCombo || a.precioTotal - b.precioTotal);

  return {
    combos: combosValidos.slice(0, limiteResultados),
    totalCombosEncontrados: combosValidos.length,
    combinacionesExploradas,
    ramasPodadasPresupuesto
  };
}

// ============================================================================
// 6. TIEMPO ESTIMADO CAMINANDO Y SEGUNDO CAMINO ALTERNATIVO EN EL GRAFO
// Velocidad peatonal promedio en campus: 1.3 m/s (~78 metros por minuto)
// ============================================================================
function calcularTiempoPeatonal(distanciaMetros) {
  if (!Number.isFinite(distanciaMetros) || distanciaMetros <= 0) {
    return {
      segundosTotales: 0,
      minutos: 0,
      segundosRestantes: 0,
      texto: "0 seg (Ya estás aquí)"
    };
  }
  const velocidadMetrosPorSegundo = 1.3;
  const segundosTotales = Math.max(5, Math.round(distanciaMetros / velocidadMetrosPorSegundo));
  const minutos = Math.floor(segundosTotales / 60);
  const segundosRestantes = segundosTotales % 60;

  let texto = "";
  if (minutos === 0) {
    texto = `~${segundosRestantes} seg caminando`;
  } else if (segundosRestantes === 0) {
    texto = `~${minutos} min caminando`;
  } else {
    texto = `~${minutos} min ${segundosRestantes} seg caminando`;
  }

  return {
    segundosTotales,
    minutos,
    segundosRestantes,
    texto
  };
}

// Halla el mejor camino alternativo distinto al camino óptimo penalizando temporalmente las aristas intermedias del camino óptimo
function calcularCaminoAlternativo(grafoConstruido, nodoOrigenId, nodoDestinoId, caminoOptimo) {
  if (
    !caminoOptimo ||
    !caminoOptimo.alcanzable ||
    caminoOptimo.tramos.length === 0 ||
    nodoOrigenId === nodoDestinoId
  ) {
    return null;
  }

  const aristasOptimas = new Set();
  caminoOptimo.tramos.forEach((t) => {
    aristasOptimas.add(`${t.desdeId}__${t.haciaId}`);
    aristasOptimas.add(`${t.haciaId}__${t.desdeId}`);
  });

  // Crear copia ligera del grafo penalizando aristas del camino óptimo para encontrar una ruta alternativa real por otros pasillos
  const listaAdyacenciaAlt = {};
  Object.keys(grafoConstruido.listaAdyacencia).forEach((u) => {
    listaAdyacenciaAlt[u] = grafoConstruido.listaAdyacencia[u].map((ady) => {
      const clave = `${u}__${ady.vecino}`;
      return {
        ...ady,
        peso: aristasOptimas.has(clave) ? ady.peso * 2.5 : ady.peso
      };
    });
  });

  const grafoTemp = {
    ...grafoConstruido,
    listaAdyacencia: listaAdyacenciaAlt
  };

  const resAlt = ejecutarDijkstraCampus(grafoTemp, nodoOrigenId);
  const caminoAlt = obtenerCaminoOptimo(resAlt, grafoConstruido, nodoDestinoId);
  if (!caminoAlt || !caminoAlt.alcanzable || caminoAlt.resumenTexto === caminoOptimo.resumenTexto) {
    return null;
  }

  // Recalcular la distancia real en metros sin el factor de penalización
  let distanciaRealAlt = 0;
  for (let i = 0; i < caminoAlt.nodosCamino.length - 1; i++) {
    const uId = caminoAlt.nodosCamino[i].id;
    const vId = caminoAlt.nodosCamino[i + 1].id;
    const aristaOriginal = grafoConstruido.listaAdyacencia[uId]?.find((a) => a.vecino === vId);
    distanciaRealAlt += aristaOriginal ? aristaOriginal.peso : 0;
  }

  return {
    resumenTexto: caminoAlt.resumenTexto,
    distanciaReal: distanciaRealAlt,
    ahorroMetros: Math.max(0, distanciaRealAlt - caminoOptimo.distanciaTotal)
  };
}
