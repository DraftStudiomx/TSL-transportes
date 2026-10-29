// Contenido de la página principal. Cuando entre Sanity, estos datos se moverán al CMS.

/** Antepone el basePath (p. ej. /TSL-transportes en GitHub Pages) a rutas de /public. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const contact = {
  whatsapp: "524151223039",
  whatsappLabel: "415 122 3039",
  email: "ventas@tslmexico.com",
  phone: "4464041668",
  phoneLabel: "446 404 1668",
};

export const waLink = (msg = "Hola TSL, quiero cotizar un envío.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mailLink = `mailto:${contact.email}?subject=${encodeURIComponent("Cotización TSL")}`;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios/" },
  { label: "Cobertura", href: "/cobertura/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Contacto", href: "/contacto/" },
];

/** Marca como activa la página actual (y sus subrutas) en el menú. */
export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

export const tickerItems = [
  "Cobertura en los 32 estados",
  "Certificación C-TPAT",
  "Seguimiento real 24/7",
  "Cruces Laredo TX y Colombia N.L.",
  "15 años de operación",
  "135 unidades en flotilla",
];

export const stats = [
  { value: 15, suffix: "", unit: "años", label: "De operación sin interrupciones" },
  { value: 32, suffix: "/32", unit: "", label: "Estados con cobertura" },
  { value: 135, suffix: "", unit: "", label: "Unidades en flotilla" },
  { value: 24, suffix: "/7", unit: "", label: "Seguimiento real" },
];

export const problems = [
  { title: "Retrasos recurrentes", desc: "que afectan tu línea de producción." },
  { title: "Falta de visibilidad real", desc: "sobre dónde está tu carga." },
  { title: "Proveedores que desaparecen", desc: "después de la cotización." },
  { title: "Respuestas genéricas", desc: "que no entienden tu operación." },
];

export const units = [
  { name: "Cajas 53′", use: "Carga general y volumen", count: 57, detail: "20 en Querétaro · 37 en San Miguel de Allende" },
  { name: "Torton / Rabón", use: "Carga industrial de mediano volumen", count: 35, detail: "10 en Querétaro · 25 en San Miguel de Allende" },
  { name: "Camioneta 3.5 ton", use: "Entregas de menor volumen", count: 25, detail: "15 en Querétaro · 10 en San Miguel de Allende" },
  { name: "Camioneta 1.5 ton", use: "Envíos ligeros o puntuales", count: 18, detail: "12 en Querétaro · 6 en San Miguel de Allende" },
  { name: "Refrigerados", use: "Producto sensible a temperatura", count: null, detail: "Cadena de frío para grado alimenticio" },
  { name: "Plataformas", use: "Maquinaria pesada y sobredimensionada", count: null, detail: "Carga abierta, maniobras especiales" },
];

export const cargo = [
  "Plásticos",
  "Metales",
  "Autopartes",
  "Grado alimenticio",
  "Línea blanca",
  "Maquinaria",
  "Aeroespacial",
  "Materias primas",
  "Vehículos",
];

export const bases = [
  { kind: "Flotilla propia", city: "Querétaro", note: "57 unidades" },
  { kind: "Flotilla propia", city: "San Miguel de Allende, Gto.", note: "78 unidades" },
  { kind: "Oficina central", city: "Aguascalientes", note: "Administración" },
  { kind: "Aliado comercial", city: "Puebla", note: "Privada ND 47" },
  { kind: "Aliado comercial", city: "Nuevo Laredo", note: "República de Argentina 1055" },
];

export const crossings = [
  { city: "Laredo, TX", services: "Transfer · Power Only · Puerta a puerta" },
  { city: "Colombia, N.L.", services: "Transfer · Power Only · Puerta a puerta" },
];

export const safety = [
  {
    tag: "01",
    title: "Choferes certificados",
    desc: "Licencia tipo B, examen médico y antidoping vigentes. Cada operador maneja en condiciones óptimas.",
  },
  {
    tag: "02",
    title: "Certificación C-TPAT",
    desc: "Para operaciones con cruce a Estados Unidos. Cumplimos los estándares de seguridad aduanera más exigentes.",
  },
  {
    tag: "03",
    title: "Seguro de mercancías",
    desc: "Opción de asegurar tu mercancía con nuestros proveedores de seguros. Tu carga respaldada en todo momento.",
  },
];

export const differentiators = [
  { title: "Servicio personalizado", desc: "No eres un número de guía: tienes nombre y un equipo asignado." },
  { title: "15 años de operación", desc: "Sin interrupciones. Experiencia que se nota en cada ruta." },
  { title: "Seguimiento real 24/7", desc: "Verificable en cada servicio, a cualquier hora." },
  { title: "Flexibilidad", desc: "Movemos desde una pieza urgente hasta maquinaria pesada." },
  { title: "Entregas puntuales", desc: "Como estándar, no como excepción." },
];

export const cycle = [
  { title: "Solicitud", desc: "Nos cuentas qué necesitas mover, de dónde a dónde y cuándo." },
  { title: "Programación", desc: "Asignamos la unidad correcta y confirmamos fecha y hora de carga." },
  { title: "Recolección", desc: "Inicio de ruta con tu equipo asignado y un grupo exclusivo de WhatsApp." },
  { title: "Unidad en tránsito", desc: "Seguimiento real 24/7 con actualizaciones en cada tramo." },
  { title: "Entrega y cierre", desc: "Confirmamos la entrega con evidencia y cerramos el servicio." },
  { title: "Envío de factura", desc: "Facturación puntual para que tu administración no se detenga." },
];

export const faqs = [
  {
    q: "¿A qué estados llegan?",
    a: "Tenemos cobertura en los 32 estados de la República Mexicana, con rutas optimizadas por región y servicios consolidados o dedicados.",
  },
  {
    q: "¿Hacen cruces a Estados Unidos?",
    a: "Sí. Operamos Transfer, Power Only y Puerta a Puerta en las fronteras de Laredo, TX y Colombia, N.L., con certificación C-TPAT.",
  },
  {
    q: "¿Qué tipo de carga transportan?",
    a: "Plásticos, metales, autopartes, grado alimenticio, línea blanca, maquinaria, aeroespacial y materias primas, entre otras. Carga general y especializada.",
  },
  {
    q: "¿Qué unidades tienen disponibles?",
    a: "Cajas de 53′, torton y rabón, refrigerados, camionetas de 3.5 y 1.5 toneladas, plataformas y transporte de vehículos.",
  },
  {
    q: "¿Cómo doy seguimiento a mi carga?",
    a: "Cada servicio tiene un equipo asignado y un grupo exclusivo de WhatsApp, con seguimiento real 24/7 desde la recolección hasta la entrega.",
  },
  {
    q: "¿Puedo asegurar mi mercancía?",
    a: "Sí. Te damos la opción de asegurar tu mercancía a través de nuestros proveedores de seguros.",
  },
  {
    q: "¿Cómo solicito una cotización?",
    a: "Escríbenos por WhatsApp o correo con origen, destino, tipo de carga y fecha. Te respondemos el mismo día.",
  },
];

// ---------------------------------------------------------------------------
// Páginas internas (Servicios, Cobertura, Nosotros, Contacto)
// ---------------------------------------------------------------------------

export const serviceModes = [
  {
    tag: "Dedicado",
    title: "Servicio dedicado",
    desc: "Una unidad exclusiva para tu carga, de punta a punta, con la ruta y los horarios que tu operación necesita.",
    points: ["Unidad exclusiva", "Ruta directa", "Ideal para volumen y urgencias"],
  },
  {
    tag: "Consolidado",
    title: "Servicio consolidado",
    desc: "Compartes espacio con otras cargas compatibles en rutas optimizadas por región. Pagas solo lo que ocupas.",
    points: ["Rutas regionales", "Menor costo por envío", "Para envíos de menor volumen"],
  },
  {
    tag: "Frontera",
    title: "Cruce fronterizo",
    desc: "Operación en Laredo, TX y Colombia, N.L. con certificación C-TPAT para mover tu carga entre México y Estados Unidos.",
    points: ["Transfer", "Power Only", "Puerta a puerta"],
  },
];

export const crossingServices = [
  { title: "Transfer", desc: "Movemos tu caja de un lado a otro de la frontera para conectar con el transportista del otro país." },
  { title: "Power Only", desc: "Ponemos el tractocamión y el operador para mover tu propia caja o remolque." },
  { title: "Puerta a puerta", desc: "Recolectamos en origen y entregamos en destino, con el cruce incluido en un solo servicio." },
];

/** Detalle de infraestructura (presentación de ventas TSL). */
export const basesDetail = [
  {
    city: "Querétaro",
    kind: "Flotilla propia",
    total: 57,
    units: [
      { name: "Cajas 53′", n: 20 },
      { name: "Torton", n: 10 },
      { name: "Camioneta 3.5 ton", n: 15 },
      { name: "Camioneta 1.5 ton", n: 12 },
    ],
  },
  {
    city: "San Miguel de Allende, Gto.",
    kind: "Flotilla propia",
    total: 78,
    units: [
      { name: "Cajas 53′", n: 37 },
      { name: "Torton", n: 25 },
      { name: "Camioneta 3.5 ton", n: 10 },
      { name: "Camioneta 1.5 ton", n: 6 },
    ],
  },
];

export const offices = [
  { city: "Aguascalientes", kind: "Oficina administrativa central", address: "Administración y facturación" },
  { city: "Puebla", kind: "Aliado comercial", address: "Privada ND 47, Puebla" },
  { city: "Nuevo Laredo", kind: "Aliado comercial", address: "República de Argentina 1055, Fracc. América 1" },
];

export const regions = [
  { name: "Bajío", states: "Querétaro, Guanajuato, Aguascalientes, San Luis Potosí" },
  { name: "Centro", states: "CDMX, Estado de México, Puebla, Hidalgo, Tlaxcala, Morelos" },
  { name: "Norte y frontera", states: "Nuevo León, Coahuila, Tamaulipas, Chihuahua, Sonora, Baja California" },
  { name: "Occidente", states: "Jalisco, Michoacán, Colima, Nayarit, Zacatecas, Durango, Sinaloa" },
  { name: "Golfo y sureste", states: "Veracruz, Tabasco, Oaxaca, Chiapas, Guerrero" },
  { name: "Península", states: "Yucatán, Quintana Roo, Campeche, Baja California Sur" },
];

export const aboutValues = [
  { title: "Responsabilidad", desc: "Tu carga es nuestra responsabilidad desde que la recolectamos hasta que firmas de recibido." },
  { title: "Comunicación directa", desc: "Hablas con personas que conocen tu operación, no con un call center." },
  { title: "Puntualidad", desc: "Programamos con realismo y cumplimos lo que prometemos." },
  { title: "Seguridad", desc: "Operadores certificados, unidades en condiciones y procesos C-TPAT." },
];

export const cargoOptions = [
  "Carga general",
  "Plásticos",
  "Metales",
  "Autopartes",
  "Grado alimenticio",
  "Línea blanca",
  "Maquinaria",
  "Aeroespacial",
  "Materias primas",
  "Otro",
];

export const unitOptions = ["No sé / que me recomienden", "Caja 53′", "Torton / Rabón", "Refrigerado", "Camioneta 3.5 ton", "Camioneta 1.5 ton", "Plataforma"];

// ---------------------------------------------------------------------------
// Gente real: espacios reservados hasta recibir fotos y testimonios del cliente.
// Para publicar una foto: copiarla a /public/img/equipo/ y poner su ruta en `src`.
// ---------------------------------------------------------------------------

export type Photo = { src?: string; label: string; hint?: string };

export const leader = {
  photo: { label: "Director / fundador de TSL", hint: "Retrato en oficina o junto a una unidad" } as Photo,
  quote: "[Frase del director: por qué fundó TSL y qué le promete a cada cliente.]",
  name: "[Nombre del director]",
  role: "Director general, TSL México",
};

export const team: { photo: Photo; name: string; role: string }[] = [
  { photo: { label: "Asesor/a de ventas" }, name: "[Nombre]", role: "Ventas y cotizaciones" },
  { photo: { label: "Atención a clientes" }, name: "[Nombre]", role: "Seguimiento de servicios" },
  { photo: { label: "Coordinador/a de tráfico" }, name: "[Nombre]", role: "Operaciones y rutas" },
  { photo: { label: "Administración" }, name: "[Nombre]", role: "Facturación" },
];

export const operationPhotos: Photo[] = [
  { label: "Operador junto a su unidad", hint: "Con uniforme, mirando a cámara" },
  { label: "Maniobra de carga en andén" },
  { label: "Patio con unidades TSL", hint: "Querétaro o San Miguel de Allende" },
  { label: "Seguimiento en tiempo real", hint: "Persona con pantalla o celular" },
  { label: "Operadores en revisión de unidad" },
];

export const basePhotos: Record<string, Photo> = {
  "Querétaro": { label: "Patio Querétaro" },
  "San Miguel de Allende, Gto.": { label: "Patio San Miguel de Allende" },
};

export const testimonials = [
  {
    quote: "[Testimonio del cliente: 2 o 3 líneas sobre puntualidad, comunicación o seguimiento de su carga.]",
    name: "[Nombre del cliente]",
    role: "[Puesto]",
    company: "[Empresa]",
  },
  {
    quote: "[Testimonio del cliente: qué problema le resolvió TSL y desde cuándo trabajan juntos.]",
    name: "[Nombre del cliente]",
    role: "[Puesto]",
    company: "[Empresa]",
  },
  {
    quote: "[Testimonio del cliente: experiencia con cruces fronterizos o carga especializada.]",
    name: "[Nombre del cliente]",
    role: "[Puesto]",
    company: "[Empresa]",
  },
];

/** Logos de clientes (con permiso). Mientras tanto, espacios reservados. */
export const clientLogos: { src?: string; name: string }[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Cliente ${String(i + 1).padStart(2, "0")}`,
}));

// ---------------------------------------------------------------------------
// Datos legales para el Aviso de privacidad. Confirmar con TSL / su abogado.
// ---------------------------------------------------------------------------
export const legal = {
  company: "[Razón social de TSL]",
  brand: "TSL México (Transportes y Soluciones Logísticas)",
  address: "[Domicilio fiscal completo, Aguascalientes]",
  privacyEmail: "[correo para privacidad, p. ej. privacidad@tslmexico.com]",
  updated: "29 de octubre de 2026",
};
