// ============================================================================
// CONTROLADOR DE PESTAÑAS, FLUJO EN 5 PASOS Y MAPA CON RUTA ÓPTIMA (app.js)
// ============================================================================

const MAPA_LOCALES = {};
LOCALES_UNINORTE.forEach((loc) => {
  MAPA_LOCALES[loc.id] = loc;
});

const MAPA_CATEGORIAS = {};
const MAPA_SUBCATEGORIAS = {};
const SUBCATEGORIA_A_PADRE = {};

ARBOL_PREFERENCIAS.forEach((cat) => {
  MAPA_CATEGORIAS[cat.id] = cat.nombre;
  cat.subcategorias.forEach((sub) => {
    MAPA_SUBCATEGORIAS[sub.id] = sub.nombre;
    SUBCATEGORIA_A_PADRE[sub.id] = cat.id;
  });
});

// Construir el Árbol Jerárquico de Preferencias (se actualiza dinámicamente al registrar emprendimientos) y el Grafo Ponderado del Campus
let ARBOL_RAIZ = construirArbolJerarquico(ARBOL_PREFERENCIAS, CATALOGO_COMIDAS);
const GRAFO_CAMPUS = construirGrafoCampus(GRAFO_CAMPUS_UNINORTE);

const CLAVE_STORAGE_EMPRENDIMIENTOS = "uninorte_emprendimientos_registrados";
let listaEmprendimientos = [];
let productosTemporalesEmprendimiento = [];
const lugaresFrecuentesSeleccionadosEmp = new Set(["bambu_1"]);
let idEmprendimientoEnEdicion = null;

function sincronizarCatalogoConEmprendimientos() {
  // Limpiar primero locales de emprendimientos previos en MAPA_LOCALES
  Object.keys(MAPA_LOCALES).forEach((id) => {
    if (MAPA_LOCALES[id].esEmprendimiento) {
      delete MAPA_LOCALES[id];
    }
  });

  const catalogoCombinado = [...CATALOGO_COMIDAS];

  listaEmprendimientos.forEach((emp, idx) => {
    const nodoPrincipal = emp.nodoPrincipalId && GRAFO_CAMPUS.mapaVertices[emp.nodoPrincipalId]
      ? emp.nodoPrincipalId
      : "bambu_1";

    const conjuntoNodos = Array.isArray(emp.nodosFrecuentes) && emp.nodosFrecuentes.length > 0
      ? emp.nodosFrecuentes.filter((nid) => GRAFO_CAMPUS.mapaVertices[nid])
      : [nodoPrincipal];

    if (!conjuntoNodos.includes(nodoPrincipal)) {
      conjuntoNodos.unshift(nodoPrincipal);
    }

    const nombresLugares = conjuntoNodos
      .map((nid) => GRAFO_CAMPUS.mapaVertices[nid].nombre)
      .join(", ");

    const estadoDisp = emp.disponibilidad || "Disponible ahora";
    const franjaHoraria = emp.horario || "Todo el día (8:00 a.m. - 6:00 p.m.)";

    MAPA_LOCALES[emp.id] = {
      id: emp.id,
      orden: 100 + idx,
      nombre: emp.nombre,
      tipo: "Emprendimiento Estudiantil",
      nodoId: nodoPrincipal,
      nodoPrincipalId: nodoPrincipal,
      nodosFrecuentes: conjuntoNodos,
      disponibilidad: estadoDisp,
      horario: franjaHoraria,
      ubicacionDetalle: `Zonas: ${nombresLugares} | Estado: ${estadoDisp} (${franjaHoraria}) | Contacto: ${emp.contacto}`,
      contacto: emp.contacto,
      esEmprendimiento: true
    };

    if (Array.isArray(emp.productos)) {
      emp.productos.forEach((prod) => {
        catalogoCombinado.push({
          localId: emp.id,
          nombre: prod.nombre,
          precio: Number(prod.precio) || 0,
          categoria: prod.categoria,
          subcategoria: prod.subcategoria,
          esEmprendimiento: true,
          disponibilidad: estadoDisp,
          horario: franjaHoraria,
          contacto: emp.contacto
        });
      });
    }
  });

  ARBOL_RAIZ = construirArbolJerarquico(ARBOL_PREFERENCIAS, catalogoCombinado);
}

// Estado global de selección del usuario
const subcategoriasSeleccionadas = new Set();
let nodoOrigenActual = "bloque_k";
let destinoSeleccionado = {
  localId: "casa_de_la_plaza",
  platoNombre: null,
  platoPrecio: null,
  nodoDestinoManual: null // null = automático (el punto recurrente más cercano), o el ID de uno de los puntos recurrentes del emprendedor
};
let ultimoRankingLocales = [];
let ultimosPlatosConPuntaje = [];
let ultimosCombosRecomendados = [];
let ultimoResultadoDijkstra = null;
let modoVistaMapa = "completo"; // "ruta" | "campus" | "completo"

function formatearCOP(valor) {
  return "$" + Number(valor).toLocaleString("es-CO");
}

// ============================================================================
// NAVEGACIÓN ENTRE LAS 2 PESTAÑAS PRINCIPALES
// ============================================================================
function mostrarPestana(nombrePestana) {
  const vistaApp = document.getElementById("vistaPestanaApp");
  const vistaEmp = document.getElementById("vistaPestanaEmprendimientos");
  const btnApp = document.getElementById("btnTabApp");
  const btnEmp = document.getElementById("btnTabEmprendimientos");

  if (nombrePestana === "app") {
    vistaApp.classList.remove("pestana-oculta");
    vistaEmp.classList.add("pestana-oculta");
    btnApp.classList.add("pestana-activa");
    btnEmp.classList.remove("pestana-activa");
  } else {
    vistaApp.classList.add("pestana-oculta");
    vistaEmp.classList.remove("pestana-oculta");
    btnApp.classList.remove("pestana-activa");
    btnEmp.classList.add("pestana-activa");
    renderizarEmprendimientosRegistrados();
  }
}

// ============================================================================
// NAVEGACIÓN POR PASOS DENTRO DE LA PESTAÑA 1 (Pasos 1 al 5)
// ============================================================================
function mostrarPaso(numeroPaso) {
  const secciones = [
    document.getElementById("seccionPaso1"),
    document.getElementById("seccionPaso2"),
    document.getElementById("seccionPaso3"),
    document.getElementById("seccionPaso4"),
    document.getElementById("seccionPaso5")
  ];

  const botones = [
    document.getElementById("navPaso1"),
    document.getElementById("navPaso2"),
    document.getElementById("navPaso3"),
    document.getElementById("navPaso4"),
    document.getElementById("navPaso5")
  ];

  secciones.forEach((s) => {
    if (s) s.classList.add("paso-oculto");
  });
  botones.forEach((b) => {
    if (b) b.classList.remove("paso-activo");
  });

  const idx = numeroPaso - 1;
  if (secciones[idx]) {
    secciones[idx].classList.remove("paso-oculto");
  }
  if (botones[idx]) {
    botones[idx].classList.add("paso-activo");
  }

  ejecutarRecomendacion();
}

// ============================================================================
// ACCESO RÁPIDO DE PRESUPUESTO (CHIPS DE BOLSILLO) Y TEMA CLARO / OSCURO
// ============================================================================
function fijarPresupuestoRapido(valor) {
  const inputNum = document.getElementById("inputPresupuestoMax");
  const slider = document.getElementById("sliderPresupuestoMax");
  if (inputNum) inputNum.value = String(valor);
  if (slider) slider.value = String(valor);
  ejecutarRecomendacion();
}

const CLAVE_STORAGE_TEMA = "uninorte_tema_visual_v1";

function aplicarTemaVisual(tema) {
  const htmlEl = document.documentElement;
  const icono = document.getElementById("iconoTemaVisual");
  const texto = document.getElementById("textoTemaVisual");

  if (tema === "oscuro") {
    htmlEl.setAttribute("data-tema", "oscuro");
    if (icono) icono.innerHTML = "&#9728;";
    if (texto) texto.textContent = "Modo claro";
  } else {
    htmlEl.removeAttribute("data-tema");
    if (icono) icono.innerHTML = "&#9790;";
    if (texto) texto.textContent = "Modo oscuro";
  }
}

function alternarTemaVisual() {
  const esOscuro = document.documentElement.getAttribute("data-tema") === "oscuro";
  const nuevoTema = esOscuro ? "claro" : "oscuro";
  aplicarTemaVisual(nuevoTema);
  try {
    localStorage.setItem(CLAVE_STORAGE_TEMA, nuevoTema);
  } catch (e) {
    // Ignorar errores de almacenamiento local
  }
}

function inicializarTemaVisual() {
  let temaGuardado = "claro";
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE_TEMA);
    if (guardado === "oscuro" || guardado === "claro") {
      temaGuardado = guardado;
    }
  } catch (e) {
    temaGuardado = "claro";
  }
  aplicarTemaVisual(temaGuardado);
}

// ============================================================================
// PASO 1: RENDERIZAR CAJAS DE PREFERENCIAS SIN PARÉNTESIS ADICIONALES
// ============================================================================
function renderizarPreferencias() {
  const contenedor = document.getElementById("contenedorPreferencias");
  contenedor.innerHTML = "";

  ARBOL_PREFERENCIAS.forEach((cat) => {
    const divCat = document.createElement("div");
    divCat.className = "caja-categoria";

    const labelCat = document.createElement("label");
    const checkCat = document.createElement("input");
    checkCat.type = "checkbox";
    checkCat.id = `cat_${cat.id}`;
    checkCat.dataset.catId = cat.id;

    const strongCat = document.createElement("strong");
    strongCat.textContent = " " + cat.nombre;
    labelCat.appendChild(checkCat);
    labelCat.appendChild(strongCat);
    divCat.appendChild(labelCat);

    const ulSub = document.createElement("ul");
    ulSub.className = "lista-subcategorias";

    cat.subcategorias.forEach((sub) => {
      const li = document.createElement("li");
      const labelSub = document.createElement("label");
      const checkSub = document.createElement("input");
      checkSub.type = "checkbox";
      checkSub.className = `subcheck subcheck_${cat.id}`;
      checkSub.value = sub.id;
      checkSub.checked = subcategoriasSeleccionadas.has(sub.id);

      checkSub.addEventListener("change", () => {
        if (checkSub.checked) {
          subcategoriasSeleccionadas.add(sub.id);
        } else {
          subcategoriasSeleccionadas.delete(sub.id);
        }
        actualizarEstadoCheckboxPadre(cat);
        ejecutarRecomendacion();
      });

      labelSub.appendChild(checkSub);
      labelSub.appendChild(document.createTextNode(" " + sub.nombre));
      li.appendChild(labelSub);
      ulSub.appendChild(li);
    });

    checkCat.addEventListener("change", () => {
      const checksHijos = divCat.querySelectorAll(`.subcheck_${cat.id}`);
      checksHijos.forEach((ch) => {
        ch.checked = checkCat.checked;
        if (checkCat.checked) {
          subcategoriasSeleccionadas.add(ch.value);
        } else {
          subcategoriasSeleccionadas.delete(ch.value);
        }
      });
      checkCat.indeterminate = false;
      ejecutarRecomendacion();
    });

    divCat.appendChild(ulSub);
    contenedor.appendChild(divCat);
    actualizarEstadoCheckboxPadre(cat);
  });
}

function actualizarEstadoCheckboxPadre(cat) {
  const checkCat = document.getElementById(`cat_${cat.id}`);
  if (!checkCat) return;
  const totalHijos = cat.subcategorias.length;
  let marcados = 0;
  cat.subcategorias.forEach((sub) => {
    if (subcategoriasSeleccionadas.has(sub.id)) marcados++;
  });

  if (marcados === 0) {
    checkCat.checked = false;
    checkCat.indeterminate = false;
  } else if (marcados === totalHijos) {
    checkCat.checked = true;
    checkCat.indeterminate = false;
  } else {
    checkCat.checked = false;
    checkCat.indeterminate = true;
  }
}

// ============================================================================
// PASO 4: RENDERIZAR OPCIONES DE UBICACIÓN DEL USUARIO
// ============================================================================
function renderizarUbicacionesCampus() {
  const selectPaso4 = document.getElementById("selectUbicacionPaso4");
  const contenedorTarjetas = document.getElementById("contenedorTarjetasUbicacion");

  const grupos = {};
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.seleccionable !== false)
    .forEach((v) => {
      if (!grupos[v.grupo]) grupos[v.grupo] = [];
      grupos[v.grupo].push(v);
    });

  selectPaso4.innerHTML = "";
  Object.keys(grupos).forEach((nombreGrupo) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = nombreGrupo;
    grupos[nombreGrupo].forEach((v) => {
      const option = document.createElement("option");
      option.value = v.id;
      option.textContent = v.nombre;
      if (v.id === nodoOrigenActual) option.selected = true;
      optgroup.appendChild(option);
    });
    selectPaso4.appendChild(optgroup);
  });

  contenedorTarjetas.innerHTML = "";
  Object.keys(grupos).forEach((nombreGrupo) => {
    const divGrupo = document.createElement("div");
    divGrupo.className = "caja-categoria";
    const titulo = document.createElement("strong");
    titulo.textContent = nombreGrupo;
    divGrupo.appendChild(titulo);

    const ul = document.createElement("ul");
    ul.className = "lista-subcategorias";

    grupos[nombreGrupo].forEach((v) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "radioUbicacionCampus";
      radio.value = v.id;
      radio.checked = v.id === nodoOrigenActual;

      radio.addEventListener("change", () => {
        if (radio.checked) {
          actualizarUbicacionOrigen(v.id);
        }
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + v.nombre));
      li.appendChild(label);
      ul.appendChild(li);
    });

    divGrupo.appendChild(ul);
    contenedorTarjetas.appendChild(divGrupo);
  });
}

function actualizarUbicacionOrigen(nuevoNodoId) {
  nodoOrigenActual = nuevoNodoId;
  const selectPaso4 = document.getElementById("selectUbicacionPaso4");
  if (selectPaso4) selectPaso4.value = nuevoNodoId;

  const radios = document.querySelectorAll('input[name="radioUbicacionCampus"]');
  radios.forEach((r) => {
    r.checked = r.value === nuevoNodoId;
  });

  ejecutarRecomendacion();
}

// ============================================================================
// ACCIÓN DEL VÍNCULO "CÓMO LLEGAR" DESDE EL PASO 3 -> PASO 4
// ============================================================================
function irAComoLlegarPlato(indicePlato) {
  const plato = ultimosPlatosConPuntaje[indicePlato];
  if (!plato) return;
  destinoSeleccionado = {
    localId: plato.localId,
    platoNombre: plato.nombre,
    platoPrecio: plato.precio,
    nodoDestinoManual: null,
    esComboMultiParada: false,
    paradasComboIds: null
  };
  mostrarPaso(4);
}

function irAComoLlegarCombo(indiceCombo) {
  const combo = ultimosCombosRecomendados[indiceCombo];
  if (!combo) return;
  const nombresCombo = combo.items
    .map((it) => `${it.nombre} (${it.nombreLocal})`)
    .join(" + ");

  const localesUnicosIds = Array.isArray(combo.localesIds) && combo.localesIds.length > 0
    ? combo.localesIds
    : Array.from(new Set(combo.items.map((it) => it.localId)));

  destinoSeleccionado = {
    localId: localesUnicosIds[0] || combo.localPrincipalId,
    platoNombre: `Combo: ${nombresCombo}`,
    platoPrecio: combo.precioTotal,
    nodoDestinoManual: null,
    esComboMultiParada: localesUnicosIds.length > 1,
    paradasComboIds: localesUnicosIds,
    itemsCombo: combo.items
  };
  mostrarPaso(4);
}

function irAComoLlegarLocal(localId) {
  if (!MAPA_LOCALES[localId]) return;
  destinoSeleccionado = {
    localId: localId,
    platoNombre: null,
    platoPrecio: null,
    nodoDestinoManual: null,
    esComboMultiParada: false,
    paradasComboIds: null
  };
  mostrarPaso(4);
}

function cambiarPuntoDestinoEmprendimiento(nuevoValor) {
  destinoSeleccionado.nodoDestinoManual =
    !nuevoValor || nuevoValor === "__auto__" ? null : nuevoValor;
  ejecutarRecomendacion();
}

function manejarClicNodoEnMapa(nodoId) {
  if (!GRAFO_CAMPUS.mapaVertices[nodoId]) return;
  const radioModo = document.querySelector('input[name="radioModoClicMapa"]:checked');
  const modo = radioModo ? radioModo.value : "origen";

  if (modo === "origen") {
    actualizarUbicacionOrigen(nodoId);
    return;
  }

  // Modo "destino": si el destino actual es un emprendimiento y el nodo está entre sus puntos recurrentes, ir a ese punto
  const locActual = MAPA_LOCALES[destinoSeleccionado.localId];
  if (
    locActual &&
    locActual.esEmprendimiento &&
    Array.isArray(locActual.nodosFrecuentes) &&
    locActual.nodosFrecuentes.includes(nodoId)
  ) {
    destinoSeleccionado.nodoDestinoManual = nodoId;
    destinoSeleccionado.esComboMultiParada = false;
    destinoSeleccionado.paradasComboIds = null;
    ejecutarRecomendacion();
    return;
  }

  // Buscar un restaurante o emprendimiento asociado a ese nodo del campus
  const localEnNodo =
    ultimoRankingLocales.find(
      (st) =>
        st.local.nodoId === nodoId ||
        (Array.isArray(st.local.nodosFrecuentes) && st.local.nodosFrecuentes.includes(nodoId))
    )?.local ||
    Object.values(MAPA_LOCALES).find(
      (l) =>
        l.nodoId === nodoId ||
        (Array.isArray(l.nodosFrecuentes) && l.nodosFrecuentes.includes(nodoId))
    );

  if (localEnNodo) {
    destinoSeleccionado = {
      localId: localEnNodo.id,
      platoNombre: null,
      platoPrecio: null,
      nodoDestinoManual: localEnNodo.esEmprendimiento ? nodoId : null,
      esComboMultiParada: false,
      paradasComboIds: null
    };
    ejecutarRecomendacion();
  } else {
    // Permitir elegir cualquier bloque o nodo del campus directamente como destino en el mapa
    const verticeCampus = GRAFO_CAMPUS.mapaVertices[nodoId];
    const idTemp = `nodo_directo_${nodoId}`;
    MAPA_LOCALES[idTemp] = {
      id: idTemp,
      nombre: verticeCampus.nombre,
      tipo: verticeCampus.grupo || "Punto del Campus",
      nodoId: nodoId,
      ubicacionDetalle: verticeCampus.grupo || "Campus Uninorte",
      esEmprendimiento: false
    };
    destinoSeleccionado = {
      localId: idTemp,
      platoNombre: null,
      platoPrecio: null,
      nodoDestinoManual: null,
      esComboMultiParada: false,
      paradasComboIds: null
    };
    ejecutarRecomendacion();
  }
}

// ============================================================================
// CONFIGURAR CONTROLES, SLIDERS Y NAVEGACIÓN
// ============================================================================
function configurarControles() {
  document.getElementById("btnTabApp").addEventListener("click", () => mostrarPestana("app"));
  document.getElementById("btnTabEmprendimientos").addEventListener("click", () => mostrarPestana("emprendimientos"));

  const sliderMax = document.getElementById("sliderPresupuestoMax");
  const inputMax = document.getElementById("inputPresupuestoMax");
  const sliderMin = document.getElementById("sliderPresupuestoMin");
  const inputMin = document.getElementById("inputPresupuestoMin");
  const selectOrden = document.getElementById("selectOrden");

  sliderMax.addEventListener("input", () => {
    inputMax.value = sliderMax.value;
    ejecutarRecomendacion();
  });
  inputMax.addEventListener("input", () => {
    const val = Math.max(0, Number(inputMax.value) || 0);
    sliderMax.value = Math.min(62000, Math.max(1400, val));
    ejecutarRecomendacion();
  });

  sliderMin.addEventListener("input", () => {
    inputMin.value = sliderMin.value;
    ejecutarRecomendacion();
  });
  inputMin.addEventListener("input", () => {
    const val = Math.max(0, Number(inputMin.value) || 0);
    sliderMin.value = Math.min(60000, val);
    ejecutarRecomendacion();
  });

  selectOrden.addEventListener("change", ejecutarRecomendacion);

  const selectFiltroTipoLocal = document.getElementById("selectFiltroTipoLocal");
  if (selectFiltroTipoLocal) {
    selectFiltroTipoLocal.addEventListener("change", ejecutarRecomendacion);
  }

  const selectEstructuraCombo = document.getElementById("selectEstructuraCombo");
  if (selectEstructuraCombo) {
    selectEstructuraCombo.addEventListener("change", ejecutarRecomendacion);
  }

  const checkComboMismoLocal = document.getElementById("checkComboMismoLocal");
  if (checkComboMismoLocal) {
    checkComboMismoLocal.addEventListener("change", ejecutarRecomendacion);
  }

  document.getElementById("selectUbicacionPaso4").addEventListener("change", (e) => {
    actualizarUbicacionOrigen(e.target.value);
  });

  document.getElementById("btnSeleccionarTodo").addEventListener("click", () => {
    Object.keys(MAPA_SUBCATEGORIAS).forEach((id) => subcategoriasSeleccionadas.add(id));
    renderizarPreferencias();
    ejecutarRecomendacion();
  });

  document.getElementById("btnLimpiarTodo").addEventListener("click", () => {
    subcategoriasSeleccionadas.clear();
    renderizarPreferencias();
    ejecutarRecomendacion();
  });

  // Navegación entre los 5 pasos
  document.getElementById("navPaso1").addEventListener("click", () => mostrarPaso(1));
  document.getElementById("navPaso2").addEventListener("click", () => mostrarPaso(2));
  document.getElementById("navPaso3").addEventListener("click", () => mostrarPaso(3));
  document.getElementById("navPaso4").addEventListener("click", () => mostrarPaso(4));
  document.getElementById("navPaso5").addEventListener("click", () => mostrarPaso(5));

  document.getElementById("btnIrPaso2").addEventListener("click", () => mostrarPaso(2));
  document.getElementById("btnVolverPaso1").addEventListener("click", () => mostrarPaso(1));
  document.getElementById("btnIrPaso3").addEventListener("click", () => mostrarPaso(3));
  document.getElementById("btnVolverPaso2Desde3").addEventListener("click", () => mostrarPaso(2));
  document.getElementById("btnVolverPaso1Desde3").addEventListener("click", () => mostrarPaso(1));

  document.getElementById("btnVolverPaso3Desde4").addEventListener("click", () => mostrarPaso(3));
  document.getElementById("btnIrPaso5").addEventListener("click", () => mostrarPaso(5));

  document.getElementById("btnVolverPaso4Desde5").addEventListener("click", () => mostrarPaso(4));
  document.getElementById("btnVolverPaso3Desde5").addEventListener("click", () => mostrarPaso(3));

  document.getElementById("btnZoomRuta").addEventListener("click", () => {
    modoVistaMapa = "ruta";
    ejecutarRecomendacion();
  });
  document.getElementById("btnZoomCampus").addEventListener("click", () => {
    modoVistaMapa = "campus";
    ejecutarRecomendacion();
  });
  document.getElementById("btnZoomCompleto").addEventListener("click", () => {
    modoVistaMapa = "completo";
    ejecutarRecomendacion();
  });
}

// ============================================================================
// EJECUCIÓN DEL PIPELINE Y ACTUALIZACIÓN DE VISTAS
// ============================================================================
function ejecutarRecomendacion() {
  const presupuestoMax = Number(document.getElementById("inputPresupuestoMax").value) || 0;
  const presupuestoMin = Number(document.getElementById("inputPresupuestoMin").value) || 0;
  const criterioOrden = document.getElementById("selectOrden").value;

  const totalSubs = Object.keys(MAPA_SUBCATEGORIAS).length;
  const contadorEl = document.getElementById("contadorPreferencias");
  if (subcategoriasSeleccionadas.size === 0) {
    contadorEl.textContent = " Ninguna marcada aún, se incluirán todas las categorías";
  } else {
    contadorEl.textContent = ` ${subcategoriasSeleccionadas.size} de ${totalSubs} subcategorías seleccionadas`;
  }

  const categoriasPadreSeleccionadas = new Set();
  subcategoriasSeleccionadas.forEach((subId) => {
    categoriasPadreSeleccionadas.add(SUBCATEGORIA_A_PADRE[subId]);
  });

  // PASO A: Recorrido DFS sobre el Árbol Jerárquico de Preferencias con Poda
  const { hojasAceptadas, nodosVisitados, ramasPodadas } = filtrarPorArbolDFS(
    ARBOL_RAIZ,
    subcategoriasSeleccionadas
  );

  let minPrecioPref = Infinity;
  let maxPrecioPref = 0;
  hojasAceptadas.forEach((p) => {
    if (p.precio < minPrecioPref) minPrecioPref = p.precio;
    if (p.precio > maxPrecioPref) maxPrecioPref = p.precio;
  });

  const textoPreferencias =
    subcategoriasSeleccionadas.size === 0
      ? `Todas las categorías, ${hojasAceptadas.length} platos en total`
      : `${subcategoriasSeleccionadas.size} subcategorías elegidas, ${hojasAceptadas.length} platos coinciden entre ${formatearCOP(minPrecioPref)} y ${formatearCOP(maxPrecioPref)}`;

  document.getElementById("resumenPaso1").innerHTML = `
    <strong>Opciones que coinciden con tus preferencias:</strong> ${textoPreferencias}.
  `;

  document.getElementById("resumenPreferenciasEnPaso2").innerHTML = `
    <strong>Preferencias elegidas:</strong> ${textoPreferencias}.
  `;

  // PASO B: Búsqueda por Rango en Árbol BST
  const { raiz: raizBST, totalNodosPrecio } = construirBSTBalanceado(hojasAceptadas);
  const { resultados: platosCandidatosBST, nodosExploradosBST } = buscarRangoBST(
    raizBST,
    presupuestoMin,
    presupuestoMax
  );

  // Aplicar filtro por tipo de local (Todos, Solo Restaurantes del Campus, Solo Emprendimientos, Solo Emprendimientos Disponibles Ahora)
  const filtroTipoLocal = document.getElementById("selectFiltroTipoLocal")?.value || "todos";
  const platosCandidatos = platosCandidatosBST.filter((p) => {
    const locObj = MAPA_LOCALES[p.localId];
    if (!locObj) return false;
    if (filtroTipoLocal === "restaurantes") return !locObj.esEmprendimiento;
    if (filtroTipoLocal === "emprendimientos") return locObj.esEmprendimiento === true;
    if (filtroTipoLocal === "emprendimientos_activos") {
      return locObj.esEmprendimiento === true && locObj.disponibilidad === "Disponible ahora";
    }
    return true;
  });

  document.getElementById("vistaPreviaPaso2").innerHTML = `
    <strong>Platos disponibles entre ${formatearCOP(presupuestoMin)} y ${formatearCOP(presupuestoMax)}:</strong>
    Hay <strong>${platosCandidatos.length}</strong> opciones de comida que cumplen tus preferencias y presupuesto.
  `;

  // PASO C: Algoritmo de Dijkstra en el Grafo del Campus
  // Para locales fijos calcula el camino a su nodoId; para emprendimientos evalúa su conjunto de nodos frecuentes S y halla el más cercano al usuario
  const resultadoDijkstra = ejecutarDijkstraCampus(GRAFO_CAMPUS, nodoOrigenActual);
  ultimoResultadoDijkstra = resultadoDijkstra;
  const caminosPorLocal = {};
  const todosLosLocales = Object.values(MAPA_LOCALES);

  todosLosLocales.forEach((loc) => {
    if (loc.esEmprendimiento && Array.isArray(loc.nodosFrecuentes) && loc.nodosFrecuentes.length > 0) {
      let mejorNodoId = loc.nodoPrincipalId || loc.nodosFrecuentes[0];
      let menorDistancia = Infinity;

      loc.nodosFrecuentes.forEach((nid) => {
        const dist = resultadoDijkstra.distancias[nid];
        if (dist !== undefined && dist < menorDistancia) {
          menorDistancia = dist;
          mejorNodoId = nid;
        }
      });

      const caminoOptimoEmp = obtenerCaminoOptimo(resultadoDijkstra, GRAFO_CAMPUS, mejorNodoId);
      caminoOptimoEmp.nodoElegidoId = mejorNodoId;
      caminoOptimoEmp.nodoMasCercanoId = mejorNodoId;
      caminoOptimoEmp.nodosFrecuentes = loc.nodosFrecuentes;
      caminosPorLocal[loc.id] = caminoOptimoEmp;
    } else if (loc.nodoId) {
      const caminoLocal = obtenerCaminoOptimo(resultadoDijkstra, GRAFO_CAMPUS, loc.nodoId);
      caminoLocal.nodoElegidoId = loc.nodoId;
      caminosPorLocal[loc.id] = caminoLocal;
    }
  });

  // Estadísticas por Local y Emprendimiento para el Grafo Bipartito Usuario-Locales
  const statsPorLocal = {};
  todosLosLocales.forEach((loc) => {
    statsPorLocal[loc.id] = {
      local: loc,
      camino: caminosPorLocal[loc.id],
      distanciaMetros: caminosPorLocal[loc.id] ? caminosPorLocal[loc.id].distanciaTotal : Infinity,
      opcionesValidas: 0,
      platos: [],
      precioMin: Infinity,
      precioMax: 0,
      sumaAfinidad: 0
    };
  });

  platosCandidatos.forEach((p) => {
    if (statsPorLocal[p.localId]) {
      statsPorLocal[p.localId].opcionesValidas++;
    }
  });

  // PASO D: Evaluación de la Red Neuronal para cada plato
  const paramsUsuario = {
    presupuestoMax,
    subcategoriasSeleccionadas,
    categoriasPadreSeleccionadas
  };

  const platosConPuntaje = platosCandidatos.map((plato) => {
    const evalRN = evaluarRedNeuronalPlato(plato, paramsUsuario, statsPorLocal[plato.localId]);
    const locObj = MAPA_LOCALES[plato.localId];
    const itemEnriquecido = {
      ...plato,
      nombreLocal: locObj.nombre,
      ubicacionDetalle: locObj.ubicacionDetalle,
      nombreCategoria: MAPA_CATEGORIAS[plato.categoria],
      nombreSubcategoria: MAPA_SUBCATEGORIAS[plato.subcategoria],
      afinidad: evalRN.afinidad,
      entradasRed: evalRN.entradasRed
    };

    const st = statsPorLocal[plato.localId];
    st.platos.push(itemEnriquecido);
    st.precioMin = Math.min(st.precioMin, plato.precio);
    st.precioMax = Math.max(st.precioMax, plato.precio);
    st.sumaAfinidad += evalRN.afinidad;

    return itemEnriquecido;
  });

  // Ranking de Locales
  const localesRanking = Object.values(statsPorLocal)
    .filter((st) => st.opcionesValidas > 0)
    .map((st) => {
      st.platos.sort((a, b) => b.afinidad - a.afinidad || a.precio - b.precio);
      const afinidadPromedio = st.sumaAfinidad / st.opcionesValidas;
      const bonusVariedad = Math.min(8, st.opcionesValidas * 0.6);
      const afinidadLocal = Math.min(100, Math.round(afinidadPromedio + bonusVariedad));
      return {
        ...st,
        afinidadLocal
      };
    })
    .sort((a, b) => b.afinidadLocal - a.afinidadLocal || b.opcionesValidas - a.opcionesValidas);

  ultimoRankingLocales = localesRanking;

  // Ordenar la lista general de platos
  if (criterioOrden === "afinidad") {
    platosConPuntaje.sort((a, b) => b.afinidad - a.afinidad || a.precio - b.precio);
  } else if (criterioOrden === "precio_asc") {
    platosConPuntaje.sort((a, b) => a.precio - b.precio || b.afinidad - a.afinidad);
  } else if (criterioOrden === "precio_desc") {
    platosConPuntaje.sort((a, b) => b.precio - a.precio || b.afinidad - a.afinidad);
  }

  ultimosPlatosConPuntaje = platosConPuntaje;

  // PASO E: Armador de Combos dentro del presupuesto (Combinatoria con poda)
  // Para armar combos tomamos todos los platos individuales filtrados por tipo de local que cuestan <= presupuestoMax
  const todosPlatosParaCombo = CATALOGO_COMIDAS.concat(
    listaEmprendimientos.flatMap((emp) =>
      (emp.productos || []).map((prod) => ({
        localId: emp.id,
        nombre: prod.nombre,
        precio: Number(prod.precio) || 0,
        categoria: prod.categoria,
        subcategoria: prod.subcategoria,
        esEmprendimiento: true
      }))
    )
  )
    .filter((p) => {
      const locObj = MAPA_LOCALES[p.localId];
      if (!locObj || p.precio > presupuestoMax) return false;
      if (filtroTipoLocal === "restaurantes") return !locObj.esEmprendimiento;
      if (filtroTipoLocal === "emprendimientos") return locObj.esEmprendimiento === true;
      if (filtroTipoLocal === "emprendimientos_activos") {
        return locObj.esEmprendimiento === true && locObj.disponibilidad === "Disponible ahora";
      }
      return true;
    })
    .map((p, idx) => {
      const locObj = MAPA_LOCALES[p.localId];
      const stLocal = statsPorLocal[p.localId] || { opcionesValidas: 5 };
      const evalRN = evaluarRedNeuronalPlato(p, paramsUsuario, stLocal);
      return {
        ...p,
        id: `combo_cand_${idx}`,
        nombreLocal: locObj.nombre,
        afinidad: evalRN.afinidad
      };
    });

  const estructuraCombo = document.getElementById("selectEstructuraCombo")?.value || "principal_bebida";
  const comboMismoLocal = document.getElementById("checkComboMismoLocal")
    ? document.getElementById("checkComboMismoLocal").checked
    : true;

  const resultadoCombos = generarCombosOptimos(todosPlatosParaCombo, {
    estructura: estructuraCombo,
    mismoLocal: comboMismoLocal,
    presupuestoMin,
    presupuestoMax,
    limiteResultados: 10
  });
  ultimosCombosRecomendados = resultadoCombos.combos;

  // Si aún no hay un local con nodo en el mapa válido en destinoSeleccionado, usar el primero recomendado con ubicación en el campus
  const localDestinoActual = MAPA_LOCALES[destinoSeleccionado.localId];
  if (!destinoSeleccionado.localId || !localDestinoActual || !localDestinoActual.nodoId) {
    const primerLocalConMapa = localesRanking.find((st) => st.local.nodoId);
    if (primerLocalConMapa) {
      destinoSeleccionado.localId = primerLocalConMapa.local.id;
    } else {
      destinoSeleccionado.localId = "casa_de_la_plaza";
    }
  }

  // Renderizar Paso 3, Paso 4 y Paso 5
  renderizarCombosRecomendados(resultadoCombos, presupuestoMax);
  renderizarPlatosRecomendados(platosConPuntaje);
  renderizarLocalesRecomendados(localesRanking);
  renderizarInfoDestinoPaso4();
  renderizarPaso5MapaYRuta(caminosPorLocal);
}

// ============================================================================
// PASO 3: RENDERIZAR COMBOS, COMIDAS Y LOCALES CON VÍNCULO "CÓMO LLEGAR"
// ============================================================================
function renderizarCombosRecomendados(resultadoCombos, presupuestoMax) {
  const contenedor = document.getElementById("contenedorCombosRecomendados");
  if (!contenedor) return;

  const { combos, totalCombosEncontrados } = resultadoCombos;

  if (!combos || combos.length === 0) {
    contenedor.innerHTML = `
      <p><strong>No encontramos combos completos con un presupuesto máximo de ${formatearCOP(presupuestoMax)} y los filtros seleccionados.</strong>
      Prueba subiendo un poco el presupuesto o desmarcando la casilla de "Comprar todo en un mismo local".</p>
    `;
    return;
  }

  let html = `
    <p>
      Encontramos <strong>${totalCombosEncontrados}</strong> combinaciones posibles dentro de tu presupuesto de <strong>${formatearCOP(presupuestoMax)}</strong>.
      Aquí tienes las <strong>${combos.length} mejores opciones</strong>:
    </p>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Productos del combo</th>
          <th>Dónde comprarlo</th>
          <th>Total</th>
          <th>Te sobra</th>
          <th>Afinidad</th>
          <th>Ruta</th>
        </tr>
      </thead>
      <tbody>
  `;

  combos.forEach((c, idx) => {
    const detalleItems = c.items
      .map((it) => `<strong>${it.nombre}</strong> <span class="texto-suave">(${formatearCOP(it.precio)})</span>`)
      .join(" + ");

    html += `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td>${detalleItems}</td>
        <td>${c.nombreLocal}</td>
        <td><span class="precio-destacado">${formatearCOP(c.precioTotal)}</span></td>
        <td><span class="etiqueta-badge badge-verde">+${formatearCOP(c.ahorro)}</span></td>
        <td><span class="etiqueta-badge badge-ambar">${c.afinidadCombo}%</span></td>
        <td><a class="vinculo-llegar" onclick="irAComoLlegarCombo(${idx})">Cómo llegar &rarr;</a></td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  contenedor.innerHTML = html;
}
function renderizarPlatosRecomendados(platos) {
  const contenedor = document.getElementById("contenedorPlatosRecomendados");
  if (platos.length === 0) {
    contenedor.innerHTML = "<p><strong>No hay comidas disponibles con los filtros actuales.</strong></p>";
    return;
  }

  let html = `
    <p>Mostrando <strong>${platos.length}</strong> comidas que se ajustan a lo que buscas:</p>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Plato o producto</th>
          <th>Lugar</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Afinidad</th>
          <th>Ruta</th>
        </tr>
      </thead>
      <tbody>
  `;

  platos.forEach((p, idx) => {
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${p.nombre}</strong></td>
        <td><strong>${p.nombreLocal}</strong><br><small>${p.ubicacionDetalle}</small></td>
        <td>${p.nombreCategoria} &rarr; <em>${p.nombreSubcategoria}</em></td>
        <td><span class="precio-destacado">${formatearCOP(p.precio)}</span></td>
        <td><span class="etiqueta-badge badge-ambar">${p.afinidad}%</span></td>
        <td><a class="vinculo-llegar" onclick="irAComoLlegarPlato(${idx})">Cómo llegar &rarr;</a></td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  contenedor.innerHTML = html;
}

function renderizarLocalesRecomendados(localesRanking) {
  const contenedor = document.getElementById("contenedorLocalesRecomendados");
  if (localesRanking.length === 0) {
    contenedor.innerHTML = "<p><strong>No se encontraron locales compatibles con tus filtros.</strong></p>";
    return;
  }

  let html = `
    <p>Encontramos <strong>${localesRanking.length}</strong> puntos de comida con opciones para ti:</p>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>Puesto</th>
          <th>Restaurante / Punto</th>
          <th>Afinidad</th>
          <th>Opciones dentro de tu filtro</th>
          <th>Rango de precios</th>
          <th>Platos recomendados</th>
          <th>Ruta</th>
        </tr>
      </thead>
      <tbody>
  `;

  localesRanking.forEach((item, index) => {
    const top3 = item.platos
      .slice(0, 3)
      .map((p) => `${p.nombre} — <strong>${formatearCOP(p.precio)}</strong>`)
      .join("<br>");

    html += `
      <tr>
        <td><strong>#${index + 1}</strong></td>
        <td>
          <strong>${item.local.nombre}</strong><br>
          <small>${item.local.ubicacionDetalle}</small>
        </td>
        <td><span class="etiqueta-badge badge-ambar">${item.afinidadLocal}%</span></td>
        <td><span class="etiqueta-badge badge-verde">${item.opcionesValidas} opciones</span></td>
        <td>${formatearCOP(item.precioMin)} – ${formatearCOP(item.precioMax)}</td>
        <td>${top3}</td>
        <td><a class="vinculo-llegar" onclick="irAComoLlegarLocal('${item.local.id}')">Cómo llegar &rarr;</a></td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  contenedor.innerHTML = html;
}

// ============================================================================
// PASO 4: MOSTRAR EL DESTINO SELECCIONADO AL PREGUNTAR DÓNDE SE ENCUENTRA
// ============================================================================
function renderizarInfoDestinoPaso4() {
  const div = document.getElementById("infoDestinoSeleccionadoPaso4");
  const loc = MAPA_LOCALES[destinoSeleccionado.localId];
  if (!loc) {
    div.innerHTML = "";
    return;
  }

  if (
    destinoSeleccionado.esComboMultiParada &&
    Array.isArray(destinoSeleccionado.paradasComboIds) &&
    destinoSeleccionado.paradasComboIds.length > 1
  ) {
    const nombresParadas = destinoSeleccionado.paradasComboIds
      .map((id, idx) => {
        const lObj = MAPA_LOCALES[id];
        return lObj ? `<strong>Parada ${idx + 1}:</strong> ${lObj.nombre} (${lObj.ubicacionDetalle})` : id;
      })
      .join("<br>");

    div.innerHTML = `
      <p>
        <strong>${destinoSeleccionado.platoNombre}</strong> — ${formatearCOP(destinoSeleccionado.platoPrecio)}<br>
        ${nombresParadas}
      </p>
    `;
    return;
  }

  if (destinoSeleccionado.platoNombre) {
    div.innerHTML = `
      <p>
        <strong>Comida elegida:</strong> ${destinoSeleccionado.platoNombre} — ${formatearCOP(destinoSeleccionado.platoPrecio)}<br>
        <strong>Local de destino:</strong> ${loc.nombre} — ${loc.ubicacionDetalle}
      </p>
    `;
  } else {
    div.innerHTML = `
      <p>
        <strong>Local de destino:</strong> ${loc.nombre} — ${loc.ubicacionDetalle}
      </p>
    `;
  }
}

// ============================================================================
// PASO 5: DIBUJAR EL CAMINO EN EL MAPA DEL CAMPUS Y LAS INDICACIONES
// ============================================================================
function obtenerNodoMasCercanoLocal(loc, nodoPartidaId) {
  const dij = ejecutarDijkstraCampus(GRAFO_CAMPUS, nodoPartidaId);
  if (!dij) return { nodoId: loc.nodoId, camino: null };

  if (loc.esEmprendimiento && Array.isArray(loc.nodosFrecuentes) && loc.nodosFrecuentes.length > 0) {
    let mejorNodoId = loc.nodoPrincipalId || loc.nodosFrecuentes[0];
    let menorDist = Infinity;
    loc.nodosFrecuentes.forEach((nid) => {
      const d = dij.distancias[nid];
      if (d !== undefined && d < menorDist) {
        menorDist = d;
        mejorNodoId = nid;
      }
    });
    const camino = obtenerCaminoOptimo(dij, GRAFO_CAMPUS, mejorNodoId);
    return { nodoId: mejorNodoId, camino };
  }

  const camino = obtenerCaminoOptimo(dij, GRAFO_CAMPUS, loc.nodoId);
  return { nodoId: loc.nodoId, camino };
}

function renderizarPaso5MapaYRuta(caminosPorLocal) {
  const loc = MAPA_LOCALES[destinoSeleccionado.localId];
  if (!loc) return;

  const nodoOrigen = GRAFO_CAMPUS.mapaVertices[nodoOrigenActual];
  const divSelectorPuntoEmp = document.getElementById("contenedorSelectorPuntoEmprendimientoPaso5");

  // CASO ESPECIAL: COMBO EN 2 O MÁS LUGARES (DIBUJA CAMINO 1 AL PRIMER LUGAR Y CAMINO 2 AL SIGUIENTE)
  if (
    destinoSeleccionado.esComboMultiParada &&
    Array.isArray(destinoSeleccionado.paradasComboIds) &&
    destinoSeleccionado.paradasComboIds.length > 1
  ) {
    if (divSelectorPuntoEmp) divSelectorPuntoEmp.innerHTML = "";

    const tramosCombo = [];
    let nodoActualId = nodoOrigenActual;
    let distanciaTotalCombo = 0;

    destinoSeleccionado.paradasComboIds.forEach((idLocalParada, idx) => {
      const localParada = MAPA_LOCALES[idLocalParada];
      if (!localParada) return;

      const { nodoId: nodoLlegadaId, camino: caminoTramo } = obtenerNodoMasCercanoLocal(
        localParada,
        nodoActualId
      );
      if (!caminoTramo) return;

      const nodoSalidaObj = GRAFO_CAMPUS.mapaVertices[nodoActualId];
      const nodoLlegadaObj = GRAFO_CAMPUS.mapaVertices[nodoLlegadaId];
      const itemsEnEsteLocal = Array.isArray(destinoSeleccionado.itemsCombo)
        ? destinoSeleccionado.itemsCombo
            .filter((it) => it.localId === idLocalParada)
            .map((it) => it.nombre)
            .join(" + ")
        : "";

      tramosCombo.push({
        numero: idx + 1,
        local: localParada,
        itemsTexto: itemsEnEsteLocal,
        nodoSalida: nodoSalidaObj,
        nodoLlegada: nodoLlegadaObj,
        camino: caminoTramo
      });

      distanciaTotalCombo += caminoTramo.distanciaTotal || 0;
      nodoActualId = nodoLlegadaId;
    });

    if (tramosCombo.length >= 2) {
      const tiempoTotalCombo = calcularTiempoPeatonal(distanciaTotalCombo);
      const divResumen = document.getElementById("resumenRutaPaso5");

      const itemsResumenTramos = tramosCombo
        .map(
          (tr) =>
            `<li><strong>Camino ${tr.numero} (${tr.numero === 1 ? "Rojo" : "Azul"} en el mapa):</strong> De <strong>${tr.nodoSalida.nombre}</strong> hacia <strong>${tr.local.nombre}</strong> (${tr.nodoLlegada.nombre}) ${tr.itemsTexto ? `para comprar <em>${tr.itemsTexto}</em>` : ""} — <strong>${tr.camino.distanciaTotal} m</strong> (${tr.camino.resumenTexto})</li>`
        )
        .join("");

      divResumen.innerHTML = `
        <ul>
          <li><strong>${destinoSeleccionado.platoNombre}</strong> — Total: <strong>${formatearCOP(destinoSeleccionado.platoPrecio)}</strong></li>
          <li><strong>Punto de partida inicial:</strong> ${nodoOrigen.nombre}</li>
          ${itemsResumenTramos}
          <li><strong>Distancia total sumando ambos caminos:</strong> <strong>${distanciaTotalCombo} metros</strong> (${tiempoTotalCombo.texto})</li>
        </ul>
      `;

      // Dibujar los 2 caminos sobre el mapa
      dibujarMultiplesCaminosComboEnMapaSVG(tramosCombo, nodoOrigen);

      // Mostrar las 2 tablas de indicaciones paso a paso (Camino 1 y Camino 2)
      const contenedorDetalle = document.getElementById("contenedorDetalleRuta");
      let htmlTablas = "";

      tramosCombo.forEach((tr) => {
        const tituloTramo = `Camino ${tr.numero}: De ${tr.nodoSalida.nombre} a ${tr.local.nombre} (${tr.nodoLlegada.nombre})`;
        if (tr.camino.tramos.length === 0) {
          htmlTablas += `
            <h3>${tituloTramo}</h3>
            <p><strong>Ya te encuentras en ${tr.nodoLlegada.nombre}</strong> (${tr.local.nombre}).</p>
          `;
        } else {
          let filas = "";
          tr.camino.tramos.forEach((paso) => {
            filas += `
              <tr>
                <td><strong>Paso ${paso.paso}</strong></td>
                <td>${paso.desdeNombre}</td>
                <td><strong>${paso.haciaNombre}</strong></td>
                <td>${paso.via}</td>
                <td>${paso.peso} m</td>
                <td><strong>${paso.distanciaAcumulada} m</strong></td>
              </tr>
            `;
          });
          htmlTablas += `
            <h3>${tituloTramo} — ${tr.camino.distanciaTotal} m</h3>
            <div class="contenedor-tabla-scroll" style="margin-bottom: 14px;">
              <table>
                <thead>
                  <tr>
                    <th>Paso</th>
                    <th>Desde</th>
                    <th>Hacia</th>
                    <th>Por dónde caminar</th>
                    <th>Distancia del tramo</th>
                    <th>Distancia acumulada</th>
                  </tr>
                </thead>
                <tbody>${filas}</tbody>
              </table>
            </div>
          `;
        }
      });

      contenedorDetalle.innerHTML = htmlTablas;
      return;
    }
  }

  const caminoBase = caminosPorLocal[loc.id];
  if (!caminoBase) return;

  // Determinar a cuál punto recurrente calcularle la ruta si es un emprendimiento
  let idNodoDestino = caminoBase.nodoElegidoId || loc.nodoId;
  let camino = caminoBase;

  if (loc.esEmprendimiento && Array.isArray(loc.nodosFrecuentes) && loc.nodosFrecuentes.length > 0) {
    const idMasCercano = caminoBase.nodoMasCercanoId || loc.nodoPrincipalId || loc.nodosFrecuentes[0];
    const tieneOverrideValido =
      destinoSeleccionado.nodoDestinoManual &&
      loc.nodosFrecuentes.includes(destinoSeleccionado.nodoDestinoManual);

    idNodoDestino = tieneOverrideValido ? destinoSeleccionado.nodoDestinoManual : idMasCercano;

    if (ultimoResultadoDijkstra && idNodoDestino !== caminoBase.nodoElegidoId) {
      camino = obtenerCaminoOptimo(ultimoResultadoDijkstra, GRAFO_CAMPUS, idNodoDestino);
      camino.nodoElegidoId = idNodoDestino;
      camino.nodoMasCercanoId = idMasCercano;
      camino.nodosFrecuentes = loc.nodosFrecuentes;
    }

    if (divSelectorPuntoEmp) {
      const nodoMasCercanoObj = GRAFO_CAMPUS.mapaVertices[idMasCercano];
      const distMasCercana = ultimoResultadoDijkstra?.distancias[idMasCercano] ?? caminoBase.distanciaTotal;

      let opcionesHtml = `
        <option value="__auto__" ${!tieneOverrideValido ? "selected" : ""}>
          Automático — Punto recurrente más cercano: ${nodoMasCercanoObj ? nodoMasCercanoObj.nombre : idMasCercano} (${distMasCercana} m)
        </option>
      `;

      loc.nodosFrecuentes.forEach((nid) => {
        const nObj = GRAFO_CAMPUS.mapaVertices[nid];
        const distNodo = ultimoResultadoDijkstra?.distancias[nid] ?? "?";
        const etiquetas = [];
        if (nid === loc.nodoPrincipalId) etiquetas.push("Lugar principal");
        if (nid === idMasCercano) etiquetas.push("Más cercano a ti");
        const sufijo = etiquetas.length > 0 ? ` [${etiquetas.join(" · ")}]` : "";
        const selectedAttr = tieneOverrideValido && destinoSeleccionado.nodoDestinoManual === nid ? "selected" : "";
        opcionesHtml += `
          <option value="${nid}" ${selectedAttr}>
            ${nObj ? nObj.nombre : nid} — a ${distNodo} m${sufijo}
          </option>
        `;
      });

      divSelectorPuntoEmp.innerHTML = `
        <label for="selectPuntoRecurrentePaso5"><strong>Escoge a cuál de los puntos recurrentes del emprendedor quieres ver cómo llegar:</strong></label><br>
        <select id="selectPuntoRecurrentePaso5" onchange="cambiarPuntoDestinoEmprendimiento(this.value)" style="padding: 4px; margin-top: 4px;">
          ${opcionesHtml}
        </select>
      `;
    }
  } else if (divSelectorPuntoEmp) {
    divSelectorPuntoEmp.innerHTML = "";
  }

  const nodoDestino = GRAFO_CAMPUS.mapaVertices[idNodoDestino];

  const divResumen = document.getElementById("resumenRutaPaso5");
  const textoPlato = destinoSeleccionado.platoNombre
    ? `<li><strong>Comida elegida:</strong> ${destinoSeleccionado.platoNombre} — ${formatearCOP(destinoSeleccionado.platoPrecio)}</li>`
    : "";

  let infoUbicacionDestino = `<li><strong>Destino:</strong> ${loc.nombre}, ubicado en ${loc.ubicacionDetalle}</li>`;
  if (loc.esEmprendimiento && Array.isArray(loc.nodosFrecuentes)) {
    const listaZonas = loc.nodosFrecuentes
      .map((nid) => GRAFO_CAMPUS.mapaVertices[nid]?.nombre || nid)
      .join(", ");
    const esElMasCercano = idNodoDestino === (caminoBase.nodoMasCercanoId || idNodoDestino);
    const etiquetaPunto = esElMasCercano
      ? `${nodoDestino.nombre} <em>(punto recurrente más cercano a tu ubicación)</em>`
      : `${nodoDestino.nombre} <em>(punto recurrente elegido en el menú desplegable)</em>`;
    infoUbicacionDestino = `
      <li><strong>Emprendimiento:</strong> ${loc.nombre} — Contacto: <strong>${loc.contacto}</strong></li>
      <li><strong>Disponibilidad y horario:</strong> ${loc.disponibilidad || "Disponible ahora"} (${loc.horario || "Todo el día"})</li>
      <li><strong>Puntos recurrentes del emprendedor:</strong> ${listaZonas}</li>
      <li><strong>Punto de encuentro seleccionado en el mapa:</strong> ${etiquetaPunto}</li>
    `;
  }

  const tiempoPeatonal = calcularTiempoPeatonal(camino.distanciaTotal);
  const rutaAlternativa = calcularCaminoAlternativo(
    GRAFO_CAMPUS,
    nodoOrigenActual,
    idNodoDestino,
    camino
  );

  const infoComparacionAlternativa =
    rutaAlternativa && rutaAlternativa.ahorroMetros > 0
      ? `<li><strong>Comparación con camino alternativo:</strong> La ruta óptima te ahorra <strong>${rutaAlternativa.ahorroMetros} metros</strong> frente a la ruta secundaria (${rutaAlternativa.distanciaReal} m por: <em>${rutaAlternativa.resumenTexto}</em>).</li>`
      : "";

  divResumen.innerHTML = `
    <ul>
      ${textoPlato}
      <li><strong>Punto de partida:</strong> ${nodoOrigen.nombre}</li>
      ${infoUbicacionDestino}
      <li><strong>Distancia total y tiempo estimado a pie:</strong> <strong>${camino.distanciaTotal} metros</strong> (${tiempoPeatonal.texto} a paso promedio de 1.3 m/s)</li>
      <li><strong>Recorrido óptimo:</strong> ${camino.resumenTexto}</li>
      ${infoComparacionAlternativa}
    </ul>
  `;

  // 1. Dibujar el camino sobre el mapa en el SVG
  dibujarCaminoEnMapaSVG(camino, nodoOrigen, nodoDestino, loc);

  // 2. Mostrar la tabla de pasos debajo del mapa
  const contenedorDetalle = document.getElementById("contenedorDetalleRuta");
  if (camino.tramos.length === 0) {
    const accionFinal = loc.esEmprendimiento
      ? `Contacta a <strong>${loc.nombre}</strong> al <strong>${loc.contacto}</strong> para recibir tu pedido ahí mismo.`
      : `Dirígete a <strong>${loc.ubicacionDetalle}</strong> para entrar a <strong>${loc.nombre}</strong>.`;
    contenedorDetalle.innerHTML = `
      <p><strong>Ya te encuentras en ${nodoOrigen.nombre}.</strong> ${accionFinal}</p>
    `;
    return;
  }

  let htmlTabla = `
    <h3>Indicaciones paso a paso</h3>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>Paso</th>
          <th>Desde</th>
          <th>Hacia</th>
          <th>Por dónde caminar</th>
          <th>Distancia del tramo</th>
          <th>Distancia acumulada</th>
        </tr>
      </thead>
      <tbody>
  `;

  camino.tramos.forEach((t) => {
    htmlTabla += `
      <tr>
        <td><strong>Paso ${t.paso}</strong></td>
        <td>${t.desdeNombre}</td>
        <td><strong>${t.haciaNombre}</strong></td>
        <td>${t.via}</td>
        <td>${t.peso} m</td>
        <td><strong>${t.distanciaAcumulada} m</strong></td>
      </tr>
    `;
  });

  const textoLlegada = loc.esEmprendimiento
    ? `<p style="margin-top: 12px;"><strong>Al llegar a ${nodoDestino.nombre}:</strong> encuéntrate con <strong>${loc.nombre}</strong> — Contacto: <strong>${loc.contacto}</strong>.</p>`
    : `<p style="margin-top: 12px;"><strong>Al llegar a ${nodoDestino.nombre}:</strong> entra a <strong>${loc.nombre}</strong> en <strong>${loc.ubicacionDetalle}</strong>.</p>`;

  htmlTabla += `
      </tbody>
    </table>
    </div>
    ${textoLlegada}
  `;

  contenedorDetalle.innerHTML = htmlTabla;
}

function dibujarCaminoEnMapaSVG(camino, nodoOrigen, nodoDestino, loc) {
  const svg = document.getElementById("svgMapaRuta");
  if (!svg) return;

  // Vista amplia por defecto para que se vean todas las entradas (Puertas 4, 7, 8, 11), Bloque M y Centro Deportivo
  if (modoVistaMapa === "completo") {
    svg.setAttribute("viewBox", "110 280 1260 1720");
  } else if (modoVistaMapa === "ruta" && camino.nodosCamino.length > 0) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    camino.nodosCamino.forEach((n) => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });
    const margen = 150;
    const vx = Math.max(100, minX - margen);
    const vy = Math.max(280, minY - margen);
    const vw = Math.max(500, Math.min(1300, maxX - minX + margen * 2));
    const vh = Math.max(400, Math.min(1720, maxY - minY + margen * 2));
    svg.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
  } else {
    svg.setAttribute("viewBox", "110 280 1120 960");
  }

  let contenidoSVG = `
    <defs>
      <marker id="flechaRuta" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#d60000" />
      </marker>
    </defs>
    <image href="mapa_campus.png" x="0" y="0" width="1513" height="2048" />
  `;

  // 1. Dibujar todas las aristas peatonales del grafo (pasillos y senderos reales)
  GRAFO_CAMPUS_UNINORTE.aristas.forEach((ar) => {
    const u = GRAFO_CAMPUS.mapaVertices[ar.u];
    const v = GRAFO_CAMPUS.mapaVertices[ar.v];
    if (u && v) {
      contenidoSVG += `
        <line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}"
              stroke="rgba(0, 90, 210, 0.38)" stroke-width="2.2" stroke-dasharray="4,4" />
      `;
    }
  });

  // 2. Dibujar los tramos del camino óptimo siguiendo estrictamente los pasillos
  if (camino.nodosCamino.length > 1) {
    const puntosPolyline = camino.nodosCamino.map((n) => `${n.x},${n.y}`).join(" ");
    contenidoSVG += `
      <polyline points="${puntosPolyline}" fill="none" stroke="#ffff00" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
    `;

    for (let i = 0; i < camino.nodosCamino.length - 1; i++) {
      const a = camino.nodosCamino[i];
      const b = camino.nodosCamino[i + 1];
      contenidoSVG += `
        <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
              stroke="#d60000" stroke-width="5" stroke-linecap="round" marker-end="url(#flechaRuta)" />
      `;
    }
  }

  // 3. Dibujar los nodos no restaurantes del camino óptimo (pasillos y punto de partida si no es restaurante)
  camino.nodosCamino.forEach((nodo, idx) => {
    const esInicio = idx === 0;
    const esDestino = idx === camino.nodosCamino.length - 1;
    if (!nodo.esRestaurante) {
      const colorRelleno = esInicio ? "#008000" : esDestino ? "#d60000" : "#ff6600";
      const radio = esInicio || esDestino ? 11 : 7.5;
      const attrInteractivo =
        nodo.seleccionable !== false
          ? `style="cursor: pointer;" onclick="manejarClicNodoEnMapa('${nodo.id}')"`
          : "";
      contenidoSVG += `
        <circle cx="${nodo.x}" cy="${nodo.y}" r="${radio}" fill="${colorRelleno}" stroke="#ffffff" stroke-width="2.5" ${attrInteractivo}>
          <title>${nodo.nombre} (Haz clic para seleccionarlo)</title>
        </circle>
      `;
      if (!esInicio && !esDestino) {
        contenidoSVG += `
          <text x="${nodo.x}" y="${nodo.y + 3.5}" fill="#ffffff" font-size="9.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" pointer-events="none">${idx}</text>
        `;
      }
    }
  });

  // 3a. Dibujar marcadores interactivos sutiles en los demás bloques y lugares seleccionables del campus para poder elegirlos con un clic
  const idsCaminoSet = new Set(camino.nodosCamino.map((n) => n.id));
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.seleccionable !== false && !v.esRestaurante && !idsCaminoSet.has(v.id))
    .forEach((v) => {
      contenidoSVG += `
        <circle cx="${v.x}" cy="${v.y}" r="7" fill="rgba(0, 80, 180, 0.55)" stroke="#ffffff" stroke-width="1.8" style="cursor: pointer;" onclick="manejarClicNodoEnMapa('${v.id}')">
          <title>${v.nombre} — Haz clic para elegir como punto de partida o destino</title>
        </circle>
      `;
    });

  // 3b. Si el destino es un emprendimiento con varias zonas frecuentes, resaltar en el mapa sus otros puntos de movimiento
  if (loc && loc.esEmprendimiento && Array.isArray(loc.nodosFrecuentes)) {
    loc.nodosFrecuentes.forEach((nid) => {
      const nZona = GRAFO_CAMPUS.mapaVertices[nid];
      if (!nZona) return;
      const esElElegido = nodoDestino && nid === nodoDestino.id;
      if (!esElElegido) {
        contenidoSVG += `
          <g style="cursor: pointer;" onclick="cambiarPuntoDestinoEmprendimiento('${nZona.id}')">
            <title>Punto recurrente de ${loc.nombre}: ${nZona.nombre} (Haz clic para trazar ruta hasta aquí)</title>
            <circle cx="${nZona.x}" cy="${nZona.y}" r="12" fill="rgba(128, 0, 200, 0.25)" stroke="#7a00cc" stroke-width="2.5" stroke-dasharray="3,2" />
            <circle cx="${nZona.x}" cy="${nZona.y}" r="6" fill="#7a00cc" stroke="#ffffff" stroke-width="1.5" />
          </g>
        `;
      }
    });
  }

  // 4. Dibujar ÍCONO DE TENEDOR únicamente en los nodos que son restaurantes (esRestaurante === true)
  const idsEnCamino = new Set(camino.nodosCamino.map((n) => n.id));
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.esRestaurante === true)
    .forEach((rest) => {
      const esInicio = nodoOrigen && rest.id === nodoOrigen.id;
      const esDestino = nodoDestino && rest.id === nodoDestino.id;
      const enCamino = idsEnCamino.has(rest.id);

      const colorFondo = esDestino
        ? "#d60000"
        : esInicio
        ? "#008000"
        : enCamino
        ? "#ff6600"
        : "#b33c00";
      const radioIcono = esDestino || esInicio ? 15 : 13;

      // Círculo base y dibujo vectorial de tenedor centrado en (rest.x, rest.y)
      contenidoSVG += `
        <g transform="translate(${rest.x}, ${rest.y})" style="cursor: pointer;" onclick="manejarClicNodoEnMapa('${rest.id}')">
          <title>${rest.nombre} — Haz clic para seleccionar en el mapa</title>
          <circle cx="0" cy="0" r="${radioIcono}" fill="${colorFondo}" stroke="#ffffff" stroke-width="2.5" />
          <path d="M -4 -8 L -4 -1.5 C -4 1.5 -1.5 2.5 -1.5 4 L -1.5 8.5 L 1.5 8.5 L 1.5 4 C 1.5 2.5 4 1.5 4 -1.5 L 4 -8 L 2.2 -8 L 2.2 -2.5 L 0.8 -2.5 L 0.8 -8 L -0.8 -8 L -0.8 -2.5 L -2.2 -2.5 L -2.2 -8 Z" fill="#ffffff" />
        </g>
      `;
    });

  // 5. Dibujar etiquetas de Inicio y Destino encima para máxima legibilidad
  camino.nodosCamino.forEach((nodo, idx) => {
    const esInicio = idx === 0;
    const esDestino = idx === camino.nodosCamino.length - 1;
    if (esInicio || esDestino) {
      const colorBorde = esInicio ? "#008000" : "#d60000";
      const textoDestino = loc.esEmprendimiento
        ? `Destino: ${loc.nombre} (${nodo.nombre})`
        : `Destino: ${loc.nombre}`;
      const textoEtiqueta = esInicio && esDestino
        ? `Aquí: ${loc.nombre} (${nodo.nombre})`
        : esInicio
        ? `Inicio: ${nodo.nombre}`
        : textoDestino;
      const anchoCaja = Math.max(135, textoEtiqueta.length * 8.4 + 20);
      const posX = Math.min(1513 - anchoCaja - 8, Math.max(8, nodo.x - anchoCaja / 2));
      const posY = esInicio ? Math.max(8, nodo.y - 40) : Math.min(2048 - 30, nodo.y + 18);

      contenidoSVG += `
        <rect x="${posX}" y="${posY}" width="${anchoCaja}" height="25" rx="4" fill="rgba(0, 0, 0, 0.9)" stroke="${colorBorde}" stroke-width="2" />
        <text x="${posX + anchoCaja / 2}" y="${posY + 17}" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">${textoEtiqueta}</text>
      `;
    }
  });

  svg.innerHTML = contenidoSVG;
}

// Dibuja 2 (o más) caminos consecutivos cuando un combo involucra más de un lugar en el campus
function dibujarMultiplesCaminosComboEnMapaSVG(tramosCombo, nodoOrigen) {
  const svg = document.getElementById("svgMapaRuta");
  if (!svg) return;

  const todosLosNodosRecorrido = [];
  tramosCombo.forEach((tr) => {
    tr.camino.nodosCamino.forEach((n) => todosLosNodosRecorrido.push(n));
  });

  if (modoVistaMapa === "completo") {
    svg.setAttribute("viewBox", "110 280 1260 1720");
  } else if (modoVistaMapa === "ruta" && todosLosNodosRecorrido.length > 0) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    todosLosNodosRecorrido.forEach((n) => {
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });
    const margen = 150;
    const vx = Math.max(100, minX - margen);
    const vy = Math.max(280, minY - margen);
    const vw = Math.max(500, Math.min(1300, maxX - minX + margen * 2));
    const vh = Math.max(400, Math.min(1720, maxY - minY + margen * 2));
    svg.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
  } else {
    svg.setAttribute("viewBox", "110 280 1120 960");
  }

  let contenidoSVG = `
    <defs>
      <marker id="flechaRuta1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#d60000" />
      </marker>
      <marker id="flechaRuta2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0055cc" />
      </marker>
    </defs>
    <image href="mapa_campus.png" x="0" y="0" width="1513" height="2048" />
  `;

  // 1. Aristas base del campus
  GRAFO_CAMPUS_UNINORTE.aristas.forEach((ar) => {
    const u = GRAFO_CAMPUS.mapaVertices[ar.u];
    const v = GRAFO_CAMPUS.mapaVertices[ar.v];
    if (u && v) {
      contenidoSVG += `
        <line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}"
              stroke="rgba(0, 90, 210, 0.35)" stroke-width="2" stroke-dasharray="4,4" />
      `;
    }
  });

  // 2. Dibujar cada tramo con color diferenciado: Camino 1 (Rojo con borde amarillo), Camino 2 (Azul con borde celeste)
  tramosCombo.forEach((tr, idxTramo) => {
    const nodos = tr.camino.nodosCamino;
    if (nodos.length > 1) {
      const esPrimerTramo = idxTramo === 0;
      const colorFondo = esPrimerTramo ? "#ffff00" : "#80d4ff";
      const colorLinea = esPrimerTramo ? "#d60000" : "#0055cc";
      const idFlecha = esPrimerTramo ? "flechaRuta1" : "flechaRuta2";
      const puntosPolyline = nodos.map((n) => `${n.x},${n.y}`).join(" ");

      contenidoSVG += `
        <polyline points="${puntosPolyline}" fill="none" stroke="${colorFondo}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
      `;

      for (let i = 0; i < nodos.length - 1; i++) {
        const a = nodos[i];
        const b = nodos[i + 1];
        contenidoSVG += `
          <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
                stroke="${colorLinea}" stroke-width="5" stroke-linecap="round" marker-end="url(#${idFlecha})" />
        `;
      }
    }
  });

  // 3. Nodos intermedios de ambos caminos
  const idsParadas = new Set(tramosCombo.map((tr) => tr.nodoLlegada.id));
  todosLosNodosRecorrido.forEach((nodo) => {
    if (!nodo.esRestaurante && nodo.id !== nodoOrigen.id && !idsParadas.has(nodo.id)) {
      contenidoSVG += `
        <circle cx="${nodo.x}" cy="${nodo.y}" r="7" fill="#ff6600" stroke="#ffffff" stroke-width="2" />
      `;
    }
  });

  // 4. Nodos seleccionables del campus
  const idsRecorridoSet = new Set(todosLosNodosRecorrido.map((n) => n.id));
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.seleccionable !== false && !v.esRestaurante && !idsRecorridoSet.has(v.id))
    .forEach((v) => {
      contenidoSVG += `
        <circle cx="${v.x}" cy="${v.y}" r="7" fill="rgba(0, 80, 180, 0.55)" stroke="#ffffff" stroke-width="1.8" style="cursor: pointer;" onclick="manejarClicNodoEnMapa('${v.id}')">
          <title>${v.nombre} — Haz clic para elegir en el mapa</title>
        </circle>
      `;
    });

  // 5. Restaurantes con ícono de tenedor
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.esRestaurante === true)
    .forEach((rest) => {
      const esInicio = nodoOrigen && rest.id === nodoOrigen.id;
      const esParada1 = tramosCombo[0]?.nodoLlegada.id === rest.id;
      const esParada2 = tramosCombo[1]?.nodoLlegada.id === rest.id;
      const colorFondo = esParada1
        ? "#d60000"
        : esParada2
        ? "#0055cc"
        : esInicio
        ? "#008000"
        : "#b33c00";
      const radioIcono = esParada1 || esParada2 || esInicio ? 15 : 13;

      contenidoSVG += `
        <g transform="translate(${rest.x}, ${rest.y})" style="cursor: pointer;" onclick="manejarClicNodoEnMapa('${rest.id}')">
          <title>${rest.nombre} — Haz clic para seleccionar en el mapa</title>
          <circle cx="0" cy="0" r="${radioIcono}" fill="${colorFondo}" stroke="#ffffff" stroke-width="2.5" />
          <path d="M -4 -8 L -4 -1.5 C -4 1.5 -1.5 2.5 -1.5 4 L -1.5 8.5 L 1.5 8.5 L 1.5 4 C 1.5 2.5 4 1.5 4 -1.5 L 4 -8 L 2.2 -8 L 2.2 -2.5 L 0.8 -2.5 L 0.8 -8 L -0.8 -8 L -0.8 -2.5 L -2.2 -2.5 L -2.2 -8 Z" fill="#ffffff" />
        </g>
      `;
    });

  // 6. Círculo para inicio o paradas si no son restaurantes
  if (!nodoOrigen.esRestaurante) {
    contenidoSVG += `
      <circle cx="${nodoOrigen.x}" cy="${nodoOrigen.y}" r="11" fill="#008000" stroke="#ffffff" stroke-width="2.5" />
    `;
  }
  tramosCombo.forEach((tr, idxTramo) => {
    if (!tr.nodoLlegada.esRestaurante) {
      const colorParada = idxTramo === 0 ? "#d60000" : "#0055cc";
      contenidoSVG += `
        <circle cx="${tr.nodoLlegada.x}" cy="${tr.nodoLlegada.y}" r="11" fill="${colorParada}" stroke="#ffffff" stroke-width="2.5" />
      `;
    }
  });

  // 7. Etiquetas de Inicio, Parada 1 y Parada 2
  const etiquetas = [
    {
      nodo: nodoOrigen,
      texto: `Inicio: ${nodoOrigen.nombre}`,
      color: "#008000",
      offsetY: -40
    }
  ];
  tramosCombo.forEach((tr, idxTramo) => {
    etiquetas.push({
      nodo: tr.nodoLlegada,
      texto: `Parada ${idxTramo + 1}: ${tr.local.nombre}`,
      color: idxTramo === 0 ? "#d60000" : "#0055cc",
      offsetY: idxTramo === 0 ? 18 : -42
    });
  });

  etiquetas.forEach((et) => {
    const anchoCaja = Math.max(140, et.texto.length * 8.2 + 20);
    const posX = Math.min(1513 - anchoCaja - 8, Math.max(8, et.nodo.x - anchoCaja / 2));
    const posY = Math.min(2048 - 30, Math.max(8, et.nodo.y + et.offsetY));
    contenidoSVG += `
      <rect x="${posX}" y="${posY}" width="${anchoCaja}" height="25" rx="4" fill="rgba(0, 0, 0, 0.9)" stroke="${et.color}" stroke-width="2" />
      <text x="${posX + anchoCaja / 2}" y="${posY + 17}" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">${et.texto}</text>
    `;
  });

  svg.innerHTML = contenidoSVG;
}

// ============================================================================
// PESTAÑA 2: REGISTRO DE EMPRENDIMIENTOS Y PRODUCTOS
// ============================================================================
function cargarEmprendimientosGuardados() {
  try {
    const raw = localStorage.getItem(CLAVE_STORAGE_EMPRENDIMIENTOS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        listaEmprendimientos = parsed;
      }
    }
  } catch (e) {
    listaEmprendimientos = [];
  }
  sincronizarCatalogoConEmprendimientos();
}

function guardarEmprendimientosEnStorage() {
  try {
    localStorage.setItem(CLAVE_STORAGE_EMPRENDIMIENTOS, JSON.stringify(listaEmprendimientos));
  } catch (e) {
    // Si localStorage no está disponible, se mantiene en memoria durante la sesión
  }
}

function renderizarSelectorLugaresEmprendimiento() {
  const selectPrincipal = document.getElementById("selectLugarPrincipalEmp");
  const contenedorCheckboxes = document.getElementById("contenedorLugaresFrecuentesEmp");
  if (!selectPrincipal || !contenedorCheckboxes) return;

  const grupos = {};
  GRAFO_CAMPUS_UNINORTE.vertices
    .filter((v) => v.seleccionable !== false)
    .forEach((v) => {
      if (!grupos[v.grupo]) grupos[v.grupo] = [];
      grupos[v.grupo].push(v);
    });

  const valorPrevioPrincipal = selectPrincipal.value || "bambu_1";
  selectPrincipal.innerHTML = "";

  Object.keys(grupos).forEach((nombreGrupo) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = nombreGrupo;
    grupos[nombreGrupo].forEach((v) => {
      const option = document.createElement("option");
      option.value = v.id;
      option.textContent = v.nombre;
      if (v.id === valorPrevioPrincipal) option.selected = true;
      optgroup.appendChild(option);
    });
    selectPrincipal.appendChild(optgroup);
  });

  lugaresFrecuentesSeleccionadosEmp.add(selectPrincipal.value);

  function renderizarCheckboxesLugares() {
    contenedorCheckboxes.innerHTML = "";
    const idPrincipalActual = selectPrincipal.value;
    lugaresFrecuentesSeleccionadosEmp.add(idPrincipalActual);

    Object.keys(grupos).forEach((nombreGrupo) => {
      const divGrupo = document.createElement("div");
      divGrupo.className = "caja-categoria";
      const titulo = document.createElement("strong");
      titulo.textContent = nombreGrupo;
      divGrupo.appendChild(titulo);

      const ul = document.createElement("ul");
      ul.className = "lista-subcategorias";

      grupos[nombreGrupo].forEach((v) => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.value = v.id;
        check.checked = lugaresFrecuentesSeleccionadosEmp.has(v.id);

        if (v.id === idPrincipalActual) {
          check.disabled = true;
        }

        check.addEventListener("change", () => {
          if (check.checked) {
            lugaresFrecuentesSeleccionadosEmp.add(v.id);
          } else {
            lugaresFrecuentesSeleccionadosEmp.delete(v.id);
          }
        });

        label.appendChild(check);
        label.appendChild(
          document.createTextNode(
            " " + v.nombre + (v.id === idPrincipalActual ? " [Lugar principal]" : "")
          )
        );
        li.appendChild(label);
        ul.appendChild(li);
      });

      divGrupo.appendChild(ul);
      contenedorCheckboxes.appendChild(divGrupo);
    });
  }

  selectPrincipal.onchange = () => {
    lugaresFrecuentesSeleccionadosEmp.add(selectPrincipal.value);
    renderizarCheckboxesLugares();
  };

  renderizarCheckboxesLugares();
}

function inicializarFormularioEmprendimientos() {
  cargarEmprendimientosGuardados();
  renderizarSelectorLugaresEmprendimiento();

  const selectCat = document.getElementById("selectCategoriaProductoEmp");
  const selectSub = document.getElementById("selectSubcategoriaProductoEmp");
  if (!selectCat || !selectSub) return;

  selectCat.innerHTML = "";
  ARBOL_PREFERENCIAS.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.nombre;
    selectCat.appendChild(opt);
  });

  function actualizarSubcategoriasSelect() {
    const catId = selectCat.value;
    const catObj = ARBOL_PREFERENCIAS.find((c) => c.id === catId);
    selectSub.innerHTML = "";
    if (!catObj) return;
    catObj.subcategorias.forEach((sub) => {
      const opt = document.createElement("option");
      opt.value = sub.id;
      opt.textContent = sub.nombre;
      selectSub.appendChild(opt);
    });
  }

  selectCat.addEventListener("change", actualizarSubcategoriasSelect);
  actualizarSubcategoriasSelect();

  document.getElementById("btnAgregarProductoTemporal").addEventListener("click", agregarProductoTemporal);
  document.getElementById("btnGuardarEmprendimiento").addEventListener("click", guardarEmprendimiento);
  document.getElementById("btnLimpiarFormularioEmprendimiento").addEventListener("click", limpiarFormularioEmprendimiento);

  renderizarProductosTemporales();
  renderizarEmprendimientosRegistrados();
}

function mostrarMensajeEmprendimiento(texto, esError = false) {
  const div = document.getElementById("mensajeEstadoEmprendimiento");
  if (!div) return;
  if (!texto) {
    div.innerHTML = "";
    return;
  }
  const color = esError ? "var(--rojo-error)" : "var(--verde-campus)";
  div.innerHTML = `<p style="color: ${color};"><strong>${texto}</strong></p>`;
}

function agregarProductoTemporal() {
  const inputNombreProd = document.getElementById("inputNombreProductoEmp");
  const inputPrecioProd = document.getElementById("inputPrecioProductoEmp");
  const selectCat = document.getElementById("selectCategoriaProductoEmp");
  const selectSub = document.getElementById("selectSubcategoriaProductoEmp");

  const nombre = inputNombreProd.value.trim();
  const precio = Number(inputPrecioProd.value) || 0;
  const categoriaId = selectCat.value;
  const subcategoriaId = selectSub.value;

  if (!nombre) {
    mostrarMensajeEmprendimiento("Escribe el nombre del producto antes de añadirlo.", true);
    return;
  }
  if (precio <= 0) {
    mostrarMensajeEmprendimiento("Ingresa un precio válido mayor a $0.", true);
    return;
  }

  productosTemporalesEmprendimiento.push({
    nombre,
    precio,
    categoria: categoriaId,
    subcategoria: subcategoriaId,
    nombreCategoria: MAPA_CATEGORIAS[categoriaId] || categoriaId,
    nombreSubcategoria: MAPA_SUBCATEGORIAS[subcategoriaId] || subcategoriaId
  });

  inputNombreProd.value = "";
  mostrarMensajeEmprendimiento("");
  renderizarProductosTemporales();
}

function eliminarProductoTemporal(indice) {
  productosTemporalesEmprendimiento.splice(indice, 1);
  renderizarProductosTemporales();
}

function renderizarProductosTemporales() {
  const contenedor = document.getElementById("contenedorProductosTemporales");
  if (!contenedor) return;

  if (productosTemporalesEmprendimiento.length === 0) {
    contenedor.innerHTML = "<p><em>Aún no has añadido productos a este emprendimiento.</em></p>";
    return;
  }

  let html = `
    <p><strong>Productos por registrar en este emprendimiento (${productosTemporalesEmprendimiento.length}):</strong></p>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Subcategoría</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
  `;

  productosTemporalesEmprendimiento.forEach((prod, idx) => {
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${prod.nombre}</strong></td>
        <td><span class="precio-destacado">${formatearCOP(prod.precio)}</span></td>
        <td>${prod.nombreCategoria}</td>
        <td>${prod.nombreSubcategoria}</td>
        <td><button type="button" onclick="eliminarProductoTemporal(${idx})">Quitar</button></td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  contenedor.innerHTML = html;
}

function guardarEmprendimiento() {
  const inputNombreEmp = document.getElementById("inputNombreEmprendimiento");
  const inputContactoEmp = document.getElementById("inputContactoEmprendimiento");
  const inputNombreProd = document.getElementById("inputNombreProductoEmp");
  const selectDisponibilidad = document.getElementById("selectDisponibilidadEmp");
  const selectHorario = document.getElementById("selectHorarioEmp");

  const nombreEmprendimiento = inputNombreEmp.value.trim();
  const contacto = inputContactoEmp.value.trim();
  const disponibilidad = selectDisponibilidad ? selectDisponibilidad.value : "Disponible ahora";
  const horario = selectHorario ? selectHorario.value : "Todo el día (8:00 a.m. - 6:00 p.m.)";

  if (!nombreEmprendimiento) {
    mostrarMensajeEmprendimiento("Ingresa el nombre del emprendimiento.", true);
    return;
  }
  if (!contacto) {
    mostrarMensajeEmprendimiento("Ingresa un dato de contacto para el emprendimiento.", true);
    return;
  }

  // Si el usuario escribió un producto en las cajas pero no presionó "+ Añadir producto a la lista", lo agregamos automáticamente
  if (productosTemporalesEmprendimiento.length === 0 && inputNombreProd.value.trim() !== "") {
    agregarProductoTemporal();
  }

  if (productosTemporalesEmprendimiento.length === 0) {
    mostrarMensajeEmprendimiento("Añade al menos un producto antes de guardar el emprendimiento.", true);
    return;
  }

  const selectPrincipal = document.getElementById("selectLugarPrincipalEmp");
  const nodoPrincipalId = selectPrincipal ? selectPrincipal.value : "bambu_1";
  const nodosFrecuentes = Array.from(lugaresFrecuentesSeleccionadosEmp);
  if (!nodosFrecuentes.includes(nodoPrincipalId)) {
    nodosFrecuentes.unshift(nodoPrincipalId);
  }

  const datosEmprendimiento = {
    id: idEmprendimientoEnEdicion || "emp_" + Date.now(),
    nombre: nombreEmprendimiento,
    contacto: contacto,
    disponibilidad: disponibilidad,
    horario: horario,
    nodoPrincipalId: nodoPrincipalId,
    nodosFrecuentes: nodosFrecuentes,
    productos: [...productosTemporalesEmprendimiento]
  };

  const estabaEditando = Boolean(idEmprendimientoEnEdicion);
  if (estabaEditando) {
    const idxExistente = listaEmprendimientos.findIndex((e) => e.id === idEmprendimientoEnEdicion);
    if (idxExistente !== -1) {
      listaEmprendimientos[idxExistente] = datosEmprendimiento;
    } else {
      listaEmprendimientos.push(datosEmprendimiento);
    }
  } else {
    listaEmprendimientos.push(datosEmprendimiento);
  }

  idEmprendimientoEnEdicion = null;
  const btnGuardar = document.getElementById("btnGuardarEmprendimiento");
  if (btnGuardar) btnGuardar.innerHTML = "<strong>Guardar Emprendimiento</strong>";

  guardarEmprendimientosEnStorage();
  sincronizarCatalogoConEmprendimientos();
  ejecutarRecomendacion();

  inputNombreEmp.value = "";
  inputContactoEmp.value = "";
  inputNombreProd.value = "";
  if (selectDisponibilidad) selectDisponibilidad.value = "Disponible ahora";
  if (selectHorario) selectHorario.value = "Todo el día (8:00 a.m. - 6:00 p.m.)";
  productosTemporalesEmprendimiento = [];
  lugaresFrecuentesSeleccionadosEmp.clear();
  lugaresFrecuentesSeleccionadosEmp.add(nodoPrincipalId);
  renderizarSelectorLugaresEmprendimiento();

  renderizarProductosTemporales();
  renderizarEmprendimientosRegistrados();
  mostrarMensajeEmprendimiento(
    estabaEditando
      ? `Emprendimiento "${datosEmprendimiento.nombre}" actualizado correctamente.`
      : `Emprendimiento "${datosEmprendimiento.nombre}" guardado e integrado al recomendador.`
  );
}

function editarEmprendimientoRegistrado(idEmprendimiento) {
  const emp = listaEmprendimientos.find((e) => e.id === idEmprendimiento);
  if (!emp) return;

  idEmprendimientoEnEdicion = emp.id;
  document.getElementById("inputNombreEmprendimiento").value = emp.nombre || "";
  document.getElementById("inputContactoEmprendimiento").value = emp.contacto || "";

  const selectDisponibilidad = document.getElementById("selectDisponibilidadEmp");
  if (selectDisponibilidad && emp.disponibilidad) {
    selectDisponibilidad.value = emp.disponibilidad;
  }
  const selectHorario = document.getElementById("selectHorarioEmp");
  if (selectHorario && emp.horario) {
    selectHorario.value = emp.horario;
  }

  const selectPrincipal = document.getElementById("selectLugarPrincipalEmp");
  const nodoPrincipal = emp.nodoPrincipalId || "bambu_1";
  if (selectPrincipal) selectPrincipal.value = nodoPrincipal;

  lugaresFrecuentesSeleccionadosEmp.clear();
  lugaresFrecuentesSeleccionadosEmp.add(nodoPrincipal);
  if (Array.isArray(emp.nodosFrecuentes)) {
    emp.nodosFrecuentes.forEach((nid) => lugaresFrecuentesSeleccionadosEmp.add(nid));
  }
  renderizarSelectorLugaresEmprendimiento();

  productosTemporalesEmprendimiento = (emp.productos || []).map((p) => ({ ...p }));
  renderizarProductosTemporales();

  const btnGuardar = document.getElementById("btnGuardarEmprendimiento");
  if (btnGuardar) {
    btnGuardar.innerHTML = "<strong>Actualizar Emprendimiento</strong>";
  }

  mostrarMensajeEmprendimiento(`Editando el emprendimiento "${emp.nombre}". Modifica los datos o productos y presiona "Actualizar Emprendimiento".`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cambiarEstadoRapidoEmprendimiento(idEmprendimiento, nuevoEstado) {
  const emp = listaEmprendimientos.find((e) => e.id === idEmprendimiento);
  if (!emp) return;
  emp.disponibilidad = nuevoEstado;
  guardarEmprendimientosEnStorage();
  sincronizarCatalogoConEmprendimientos();
  ejecutarRecomendacion();
  renderizarEmprendimientosRegistrados();
}

function limpiarFormularioEmprendimiento() {
  idEmprendimientoEnEdicion = null;
  const btnGuardar = document.getElementById("btnGuardarEmprendimiento");
  if (btnGuardar) btnGuardar.innerHTML = "<strong>Guardar Emprendimiento</strong>";

  document.getElementById("inputNombreEmprendimiento").value = "";
  document.getElementById("inputContactoEmprendimiento").value = "";
  document.getElementById("inputNombreProductoEmp").value = "";
  document.getElementById("inputPrecioProductoEmp").value = "5000";
  const selectDisponibilidad = document.getElementById("selectDisponibilidadEmp");
  if (selectDisponibilidad) selectDisponibilidad.value = "Disponible ahora";
  const selectHorario = document.getElementById("selectHorarioEmp");
  if (selectHorario) selectHorario.value = "Todo el día (8:00 a.m. - 6:00 p.m.)";

  productosTemporalesEmprendimiento = [];
  lugaresFrecuentesSeleccionadosEmp.clear();
  lugaresFrecuentesSeleccionadosEmp.add("bambu_1");
  const selectPrincipal = document.getElementById("selectLugarPrincipalEmp");
  if (selectPrincipal) selectPrincipal.value = "bambu_1";
  renderizarSelectorLugaresEmprendimiento();
  mostrarMensajeEmprendimiento("");
  renderizarProductosTemporales();
}

function eliminarEmprendimientoRegistrado(idEmprendimiento) {
  if (idEmprendimientoEnEdicion === idEmprendimiento) {
    limpiarFormularioEmprendimiento();
  }
  listaEmprendimientos = listaEmprendimientos.filter((e) => e.id !== idEmprendimiento);
  guardarEmprendimientosEnStorage();
  sincronizarCatalogoConEmprendimientos();
  ejecutarRecomendacion();
  renderizarEmprendimientosRegistrados();
}

function renderizarEmprendimientosRegistrados() {
  const contenedor = document.getElementById("contenedorEmprendimientosRegistrados");
  if (!contenedor) return;

  if (listaEmprendimientos.length === 0) {
    contenedor.innerHTML = "<p>No hay emprendimientos registrados todavía.</p>";
    return;
  }

  let html = `
    <p>Emprendimientos estudiantiles activos en el directorio: <strong>${listaEmprendimientos.length}</strong></p>
    <div class="contenedor-tabla-scroll">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Emprendimiento</th>
          <th>Contacto</th>
          <th>Estado y horario</th>
          <th>Puntos donde entrega</th>
          <th>Catálogo de productos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  listaEmprendimientos.forEach((emp, idx) => {
    const listaProdsHtml = (emp.productos || [])
      .map(
        (p) =>
          `<li><strong>${p.nombre}</strong> — <span class="precio-destacado">${formatearCOP(p.precio)}</span> <small>(${p.nombreCategoria} &rarr; ${p.nombreSubcategoria})</small></li>`
      )
      .join("");

    const nodoPrincipalObj = emp.nodoPrincipalId
      ? GRAFO_CAMPUS.mapaVertices[emp.nodoPrincipalId]
      : null;
    const nombrePrincipal = nodoPrincipalObj
      ? `${nodoPrincipalObj.nombre} (${nodoPrincipalObj.grupo})`
      : "No especificado";

    const listaNodosFrec = Array.isArray(emp.nodosFrecuentes) && emp.nodosFrecuentes.length > 0
      ? emp.nodosFrecuentes
      : emp.nodoPrincipalId
        ? [emp.nodoPrincipalId]
        : [];
    const nombresZonas = listaNodosFrec
      .map((nId) =>
        GRAFO_CAMPUS.mapaVertices[nId]
          ? GRAFO_CAMPUS.mapaVertices[nId].nombre
          : nId
      )
      .join(", ");

    const estadoActual = emp.disponibilidad || "Disponible ahora";
    const horarioActual = emp.horario || "Todo el día (8:00 a.m. - 6:00 p.m.)";

    html += `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td><span class="etiqueta-badge badge-morado">Emprendimiento</span><br><strong>${emp.nombre}</strong></td>
        <td>${emp.contacto}</td>
        <td>
          <select onchange="cambiarEstadoRapidoEmprendimiento('${emp.id}', this.value)" style="padding: 4px 8px; margin-bottom: 6px;">
            <option value="Disponible ahora" ${estadoActual === "Disponible ahora" ? "selected" : ""}>Disponible ahora</option>
            <option value="Solo por encargo" ${estadoActual === "Solo por encargo" ? "selected" : ""}>Solo por encargo</option>
            <option value="No disponible hoy" ${estadoActual === "No disponible hoy" ? "selected" : ""}>No disponible hoy</option>
          </select><br>
          <small><strong>Horario:</strong> ${horarioActual}</small>
        </td>
        <td>
          <strong>Punto fijo:</strong> ${nombrePrincipal}<br>
          <small><strong>También se mueve por:</strong> ${nombresZonas || "Ninguna"}</small>
        </td>
        <td><ul style="margin: 0; padding-left: 18px;">${listaProdsHtml}</ul></td>
        <td>
          <button type="button" onclick="editarEmprendimientoRegistrado('${emp.id}')" style="margin-bottom: 6px;">Editar</button><br>
          <button type="button" onclick="eliminarEmprendimientoRegistrado('${emp.id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table></div>`;
  contenedor.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarTemaVisual();
  renderizarPreferencias();
  renderizarUbicacionesCampus();
  inicializarFormularioEmprendimientos();
  configurarControles();
  mostrarPestana("app");
  mostrarPaso(1);
});
