function mostrarPagina(pagina) {

  document.querySelectorAll('.pagina').forEach(p => {
    p.classList.remove('activa');
  });
  

  document.getElementById('pagina-' + pagina).classList.add('activa');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  document.getElementById('tab-' + pagina)?.classList.add('active');
}
const fotosEjemplo = [
  { id: 1, titulo: "Valle de la Luna", categoria: "naturaleza", emoji: "🌄", url: null },
  { id: 2, titulo: "Danza de la Morenada", categoria: "tradicion", emoji: "🎭", url: null },
  { id: 3, titulo: "Mercado de las Brujas", categoria: "ciudad", emoji: "🏙️", url: null },
  { id: 4, titulo: "Salteñas paceñas", categoria: "gastronomia", emoji: "🥟", url: null },
  { id: 5, titulo: "Lago Titicaca al amanecer", categoria: "naturaleza", emoji: "🌊", url: null },
  { id: 6, titulo: "Cholita luchadora", categoria: "tradicion", emoji: "🤼", url: null },
];

const articulosEjemplo = [
  {
    id: 1,
    titulo: "El Ekeko: guardián de los sueños paceños",
    autor: "María Condori",
    categoria: "Leyendas",
    fecha: "2026-01-15",
    emoji: "🪆",
    imagen: null,
    contenido: `## ¿Quién es el Ekeko?

El **Ekeko** es una de las figuras más emblemáticas de la cultura andina. Este pequeño dios de la abundancia, representado como un hombre sonriente cargado de miniaturas, forma parte de la identidad paceña desde tiempos precolombinos.

Se dice que el Ekeko tiene el poder de convertir los deseos en realidad. Sus devotos le cuelgan billetes, casas en miniatura, alimentos y todo aquello que anhelan obtener.

## La Feria de Alasitas

Cada 24 de enero, La Paz se transforma durante la **Feria de Alasitas**, donde miles de personas compran miniaturas para que el Ekeko las "bendiga" y los ayude a cumplir sus metas durante el año.

> "Alasita" proviene del aymara y significa "cómprame". Es una invitación al Ekeko para que tome los deseos y los haga realidad.

La tradición dice que las miniaturas deben ser "ch'alladas" (bendecidas con alcohol y pétalos de flores) para activar su poder.`,
  },
  {
    id: 2,
    titulo: "La salteña: arte y sabor en cada mordida",
    autor: "Roberto Mamani",
    categoria: "Gastronomía",
    fecha: "2026-02-03",
    emoji: "🥟",
    imagen: null,
    contenido: `## Un desayuno con historia

La **salteña** es quizás el emblema gastronómico más reconocible de Bolivia. A diferencia de lo que su nombre sugiere, este jugoso empanado es cien por ciento boliviano.

## El secreto está en el jigote

El relleno, llamado **jigote**, lleva un equilibrio preciso entre caldo gelificado, carne, papas, aceitunas, pasas y ají. El arte está en conseguir que, al hornear, el caldo se mantenga líquido dentro de la masa crujiente.

- El color dorado de la masa viene del ají amarillo
- La forma de media luna es característica y tiene su técnica especial
- Se come de mañana, antes del mediodía

> Las mejores salteñas de La Paz se encuentran en pequeñas salteñerías de barrio, abiertas solo por las mañanas.

Cada familia guarda su receta como un secreto de estado. La rivalidad entre salteñerías es tan apasionada como la del fútbol.`,
  },
  {
    id: 3,
    titulo: "El Carnaval de Oruro: patrimonio de la humanidad",
    autor: "Ana Quispe",
    categoria: "Tradiciones",
    fecha: "2026-03-10",
    emoji: "🎺",
    imagen: null,
    contenido: `## Una festividad única en el mundo

El **Carnaval de Oruro** fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2001. Es una fusión extraordinaria de ritualidad andina y tradición cristiana.

## La Diablada: el baile más icónico

La danza más representativa es la **Diablada**, protagonizada por el Diablo Supay y sus legiones de diablos y demonios, que al final son vencidos por el Arcángel Miguel y la Virgen del Socavón.

## Datos impresionantes

- Participan más de **28,000 bailarines** y 10,000 músicos
- Los trajes pueden costar entre 500 y 5,000 dólares
- El desfile recorre **4 kilómetros** por las calles de Oruro

> Estar en el Carnaval de Oruro es vivir la Bolivia más profunda y colorida. Es entender que la cultura no se preserva en museos, sino en las calles.`,
  },
];

// ===== ALMACENAMIENTO LOCAL =====
function cargarFotos() {
  const guardadas = localStorage.getItem('cultura_fotos');
  return guardadas ? JSON.parse(guardadas) : fotosEjemplo;
}
function guardarFotos(fotos) {
  localStorage.setItem('cultura_fotos', JSON.stringify(fotos));
}
function cargarArticulos() {
  const guardados = localStorage.getItem('cultura_articulos');
  return guardados ? JSON.parse(guardados) : articulosEjemplo;
}
function guardarArticulos(articulos) {
  localStorage.setItem('cultura_articulos', JSON.stringify(articulos));
}

let fotos = cargarFotos();
let articulos = cargarArticulos();
let categoriaActiva = 'all';

// ===== RENDERIZAR GALERÍA =====
function renderGaleria(cat) {
  const grid = document.getElementById('galeriaGrid');
  const filtradas = cat === 'all' ? fotos : fotos.filter(f => f.categoria === cat);

  if (filtradas.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-icon">📷</div>
          <p>No hay fotos en esta categoría todavía. ¡Sé el primero en agregar una!</p>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = filtradas.map(foto => `
    <div class="col-6 col-md-4 col-lg-3" data-cat="${foto.categoria}">
      <div class="foto-card" onclick="verFoto(${foto.id})">
        ${foto.url
          ? `<img src="${foto.url}" alt="${foto.titulo}" loading="lazy">`
          : `<div class="foto-placeholder"><span>${foto.emoji || '🖼️'}</span></div>`
        }
        <div class="foto-overlay">
          <span>${foto.categoria}</span>
          <p>${foto.titulo}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== VER FOTO GRANDE =====
function verFoto(id) {
  const foto = fotos.find(f => f.id === id);
  if (!foto) return;
  document.getElementById('modalFotoTitulo').textContent = foto.titulo;
  const imgEl = document.getElementById('modalFotoImg');
  if (foto.url) {
    imgEl.src = foto.url;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }
  new bootstrap.Modal(document.getElementById('modalFoto')).show();
}

// ===== SUBIR FOTO =====
document.getElementById('btnSubirFoto').addEventListener('click', () => {
  const titulo = document.getElementById('fotoTitulo').value.trim();
  const cat = document.getElementById('fotoCategoria').value;
  const archivo = document.getElementById('fotoArchivo').files[0];

  if (!titulo) { alert('Por favor escribí un título para la foto.'); return; }

  const nueva = {
    id: Date.now(),
    titulo,
    categoria: cat,
    emoji: { naturaleza: '🌿', tradicion: '🎭', ciudad: '🏙️', gastronomia: '🍽️' }[cat] || '📷',
    url: null
  };

  if (archivo) {
    const reader = new FileReader();
    reader.onload = e => {
      nueva.url = e.target.result;
      fotos.unshift(nueva);
      guardarFotos(fotos);
      renderGaleria(categoriaActiva);
      limpiarSubida();
    };
    reader.readAsDataURL(archivo);
  } else {
    fotos.unshift(nueva);
    guardarFotos(fotos);
    renderGaleria(categoriaActiva);
    limpiarSubida();
  }
});

function limpiarSubida() {
  document.getElementById('fotoTitulo').value = '';
  document.getElementById('fotoArchivo').value = '';
}

// ===== FILTROS GALERÍA =====
document.getElementById('filtros').addEventListener('click', e => {
  const btn = e.target.closest('.btn-filtro');
  if (!btn) return;
  document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  categoriaActiva = btn.dataset.cat;
  renderGaleria(categoriaActiva);
});

// ===== RENDERIZAR ARTÍCULOS =====
function renderArticulos() {
  const grid = document.getElementById('articulosGrid');

  if (articulos.length === 0) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-icon">✍️</div>
          <p>Todavía no hay artículos. ¡Publicá el primero!</p>
          <a href="#nuevo-articulo" class="btn btn-morado mt-2">Escribir ahora</a>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = articulos.map(art => `
    <div class="col-md-6 col-lg-4">
      <div class="articulo-card">
        <div class="articulo-img">
          ${art.imagen
            ? `<img src="${art.imagen}" alt="${art.titulo}">`
            : `<span>${art.emoji || '📝'}</span>`
          }
        </div>
        <div class="articulo-body">
          <span class="articulo-badge">${art.categoria}</span>
          <div class="articulo-titulo">${art.titulo}</div>
          <div class="articulo-extracto">${extractoTexto(art.contenido)}</div>
          <div class="articulo-meta">
            <span class="articulo-autor">✍️ ${art.autor}</span>
            <span class="articulo-fecha">${formatFecha(art.fecha)}</span>
          </div>
          <button class="btn-leer" onclick="leerArticulo(${art.id})">Leer artículo →</button>
        </div>
      </div>
    </div>
  `).join('');
}

function extractoTexto(md) {
  return md.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/_/g, '').replace(/>/g, '').replace(/- /g, '').substring(0, 150) + '...';
}

function formatFecha(f) {
  if (!f) return '';
  const d = new Date(f + 'T00:00:00');
  return d.toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ===== LEER ARTÍCULO =====
function leerArticulo(id) {
  const art = articulos.find(a => a.id === id);
  if (!art) return;

  const html = `
    ${art.imagen ? `<img src="${art.imagen}" alt="${art.titulo}" class="modal-imagen">` : ''}
    <div class="articulo-badge mb-3">${art.categoria}</div>
    <h1>${art.titulo}</h1>
    <div class="modal-meta">✍️ ${art.autor} &nbsp;·&nbsp; 📅 ${formatFecha(art.fecha)}</div>
    <div class="modal-texto">${convertirMarkdown(art.contenido)}</div>
  `;
  document.getElementById('modalCuerpo').innerHTML = html;
  new bootstrap.Modal(document.getElementById('modalArticulo')).show();
}

// ===== MARKDOWN SIMPLE =====
function convertirMarkdown(texto) {
  return texto
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/^#{2,3}\s(.+)$/gm, '<h2>$1</h2>')
    .replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbup])(.+)$/gm, (m) => m.trim() ? m : '')
    .replace(/<p>\s*<\/p>/g, '')
    .split('\n').filter(l => l.trim()).join('\n');
}

// ===== PUBLICAR ARTÍCULO =====
document.getElementById('btnPublicar').addEventListener('click', () => {
  const titulo = document.getElementById('artTitulo').value.trim();
  const autor = document.getElementById('artAutor').value.trim() || 'Anónimo';
  const categoria = document.getElementById('artCategoria').value;
  const contenido = document.getElementById('artContenido').value.trim();
  const archivo = document.getElementById('artImagen').files[0];
  const msg = document.getElementById('msgPublicacion');

  if (!titulo) { msg.innerHTML = '<span style="color:red">⚠️ Por favor escribí un título.</span>'; return; }
  if (!contenido) { msg.innerHTML = '<span style="color:red">⚠️ Por favor escribí el contenido del artículo.</span>'; return; }

  const nuevo = {
    id: Date.now(),
    titulo,
    autor,
    categoria,
    fecha: new Date().toISOString().split('T')[0],
    contenido,
    emoji: { Tradiciones:'🎭', Historia:'📜', Gastronomía:'🍽️', Arte:'🎨', Música:'🎵', Leyendas:'🌙', Viajes:'🗺️' }[categoria] || '📝',
    imagen: null
  };

  if (archivo) {
    const reader = new FileReader();
    reader.onload = e => {
      nuevo.imagen = e.target.result;
      finalizarPublicacion(nuevo, msg);
    };
    reader.readAsDataURL(archivo);
  } else {
    finalizarPublicacion(nuevo, msg);
  }
});

function finalizarPublicacion(nuevo, msg) {
  articulos.unshift(nuevo);
  guardarArticulos(articulos);
  renderArticulos();
  msg.innerHTML = '<span style="color:green">✅ ¡Artículo publicado exitosamente!</span>';
  document.getElementById('artTitulo').value = '';
  document.getElementById('artAutor').value = '';
  document.getElementById('artContenido').value = '';
  document.getElementById('artImagen').value = '';
  document.getElementById('previstaContenido').style.display = 'none';
  setTimeout(() => {
    msg.innerHTML = '';
    document.querySelector('#articulos').scrollIntoView({ behavior: 'smooth' });
  }, 2000);
}

// ===== LIMPIAR FORMULARIO =====
document.getElementById('btnLimpiar').addEventListener('click', () => {
  document.getElementById('artTitulo').value = '';
  document.getElementById('artAutor').value = '';
  document.getElementById('artContenido').value = '';
  document.getElementById('artImagen').value = '';
  document.getElementById('previstaContenido').style.display = 'none';
  document.getElementById('msgPublicacion').innerHTML = '';
});

// ===== PREVISUALIZACIÓN =====
document.getElementById('btnPrevistar').addEventListener('click', () => {
  const contenido = document.getElementById('artContenido').value;
  const prevista = document.getElementById('previstaContenido');
  if (prevista.style.display === 'none') {
    prevista.innerHTML = convertirMarkdown(contenido) || '<em>Nada para mostrar todavía.</em>';
    prevista.style.display = 'block';
    document.getElementById('btnPrevistar').textContent = '🙈 Ocultar previsualización';
  } else {
    prevista.style.display = 'none';
    document.getElementById('btnPrevistar').textContent = '👁 Ver previsualización';
  }
});

// ===== INSERTAR FORMATO EN TEXTAREA =====
function insertarFormato(antes, despues) {
  const ta = document.getElementById('artContenido');
  const ini = ta.selectionStart;
  const fin = ta.selectionEnd;
  const seleccion = ta.value.substring(ini, fin);
  ta.value = ta.value.substring(0, ini) + antes + seleccion + despues + ta.value.substring(fin);
  ta.focus();
  ta.selectionStart = ini + antes.length;
  ta.selectionEnd = fin + antes.length;
}

// ===== MENÚ MÓVIL =====
document.getElementById('menuToggle').addEventListener('click', () => {
  const nav = document.getElementById('mobileNav');
  if (nav.style.display === 'none' || nav.style.display === '') {
    nav.style.setProperty('display', 'flex', 'important');
    nav.style.flexDirection = 'column';
  } else {
    nav.style.setProperty('display', 'none', 'important');
  }
});

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
  renderGaleria('all');
  renderArticulos();
});
