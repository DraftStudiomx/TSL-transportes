// Contenido de la página principal. Cuando entre Sanity, estos datos se moverán al CMS.

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
  { label: "Inicio", href: "#inicio" },
  { label: "Flotilla", href: "#flotilla" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

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
