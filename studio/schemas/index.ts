import { defineArrayMember, defineField, defineType } from "sanity";

/* ---------- Ayudantes para no repetir campos ---------- */

const text = (name: string, title: string, description?: string, rows?: number) =>
  defineField({ name, title, description, type: rows ? "text" : "string", ...(rows ? { rows } : {}) });

/** Lista de objetos { título, descripción } (diferenciadores, valores, pasos, etc.). */
const titleDescList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [text("title", "Título"), text("desc", "Descripción", undefined, 3)],
        preview: { select: { title: "title", subtitle: "desc" } },
      }),
    ],
  });

/** Foto con descripción: si no hay imagen, el sitio muestra un espacio "Foto pendiente" con esta etiqueta. */
const photoField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
      text("label", "Descripción de la foto", "También sirve como texto alternativo para accesibilidad y Google."),
      text("hint", "Indicación para la toma (opcional)", "Se muestra solo mientras la foto está pendiente."),
    ],
  });

const pageHero = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "lines", title: "Titular (una línea por renglón)", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "accentLine", title: "Renglón en turquesa (empieza en 0)", type: "number" }),
      text("lead", "Texto bajo el titular", undefined, 3),
    ],
  });

/* ---------- Documentos (cada uno existe una sola vez) ---------- */

export const ajustes = defineType({
  name: "ajustes",
  title: "Ajustes generales",
  type: "document",
  groups: [
    { name: "contacto", title: "Contacto", default: true },
    { name: "cifras", title: "Cifras" },
    { name: "legal", title: "Aviso de privacidad" },
  ],
  fields: [
    defineField({
      name: "contact",
      title: "Datos de contacto",
      type: "object",
      group: "contacto",
      fields: [
        text("whatsapp", "WhatsApp (con lada, sin espacios)", "Ej. 524151223039"),
        text("whatsappLabel", "WhatsApp como se muestra", "Ej. 415 122 3039"),
        text("phone", "Teléfono (10 dígitos)", "Ej. 4464041668"),
        text("phoneLabel", "Teléfono como se muestra", "Ej. 446 404 1668"),
        text("email", "Correo de ventas"),
      ],
    }),
    defineField({
      name: "tickerItems",
      title: "Frases de la barra superior",
      type: "array",
      group: "contacto",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stats",
      title: "Cifras clave",
      type: "array",
      group: "cifras",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Número", type: "number" }),
            text("suffix", "Complemento (ej. /32, /7)"),
            text("unit", "Unidad (ej. años)"),
            text("label", "Descripción"),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "legal",
      title: "Datos legales",
      type: "object",
      group: "legal",
      fields: [
        text("company", "Razón social"),
        text("address", "Domicilio fiscal"),
        text("privacyEmail", "Correo para temas de privacidad"),
        text("updated", "Fecha de última actualización del aviso", "Ej. 29 de octubre de 2026"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Ajustes generales" }) },
});

export const textos = defineType({
  name: "textos",
  title: "Textos de páginas",
  type: "document",
  groups: [
    { name: "inicio", title: "Inicio", default: true },
    { name: "paginas", title: "Encabezados" },
    { name: "nosotros", title: "Nosotros y seguridad" },
    { name: "servicio", title: "Servicio" },
  ],
  fields: [
    defineField({ ...text("heroLede", "Inicio · texto bajo el titular principal", undefined, 3), group: "inicio" }),
    defineField({ ...text("introLead", "Inicio · párrafo principal", undefined, 4), group: "inicio" }),
    defineField({ ...text("introLeadDim", "Inicio · párrafo secundario", undefined, 3), group: "inicio" }),
    defineField({ ...titleDescList("problems", "Inicio · problemas que ya conoces"), group: "inicio" }),
    defineField({ ...pageHero("heroServicios", "Encabezado de Servicios"), group: "paginas" }),
    defineField({ ...pageHero("heroCobertura", "Encabezado de Cobertura"), group: "paginas" }),
    defineField({ ...pageHero("heroNosotros", "Encabezado de Nosotros"), group: "paginas" }),
    defineField({ ...pageHero("heroContacto", "Encabezado de Contacto"), group: "paginas" }),
    defineField({ ...text("aboutQuote", "Nosotros · frase de la historia"), group: "nosotros" }),
    defineField({
      name: "aboutParagraphs",
      title: "Nosotros · párrafos de la historia",
      type: "array",
      group: "nosotros",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({ ...titleDescList("aboutValues", "Nosotros · compromisos"), group: "nosotros" }),
    defineField({ ...titleDescList("safety", "Seguridad · tarjetas"), group: "nosotros" }),
    defineField({ ...titleDescList("differentiators", "Lo que nos separa del resto"), group: "nosotros" }),
    defineField({ ...titleDescList("cycle", "Ciclo del servicio (6 pasos)"), group: "servicio" }),
    defineField({
      name: "serviceModes",
      title: "Modalidades de servicio",
      type: "array",
      group: "servicio",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            text("tag", "Etiqueta"),
            text("title", "Título"),
            text("desc", "Descripción", undefined, 3),
            defineField({ name: "points", title: "Puntos clave", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Textos de páginas" }) },
});

export const flotilla = defineType({
  name: "flotilla",
  title: "Flotilla y cobertura",
  type: "document",
  groups: [
    { name: "unidades", title: "Unidades", default: true },
    { name: "bases", title: "Bases y oficinas" },
    { name: "frontera", title: "Frontera y regiones" },
  ],
  fields: [
    defineField({
      name: "units",
      title: "Tipos de unidad",
      type: "array",
      group: "unidades",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            text("name", "Unidad"),
            text("use", "Para qué sirve"),
            defineField({ name: "count", title: "Cantidad (vacío = “Disponible”)", type: "number" }),
            text("detail", "Detalle"),
          ],
          preview: { select: { title: "name", subtitle: "use" } },
        }),
      ],
    }),
    defineField({ name: "cargo", title: "Tipos de carga", type: "array", group: "unidades", of: [{ type: "string" }] }),
    defineField({
      name: "unitPhotos",
      title: "Fotos por tipo de unidad (Servicios)",
      type: "array",
      group: "unidades",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            text("unit", "Tipo de unidad"),
            defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
            text("label", "Descripción de la foto"),
            text("hint", "Indicación para la toma (opcional)"),
          ],
          preview: { select: { title: "unit", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "basesDetail",
      title: "Bases con flotilla propia",
      type: "array",
      group: "bases",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            text("city", "Ciudad"),
            text("kind", "Tipo", "Ej. Flotilla propia"),
            photoField("photo", "Foto del patio"),
            defineField({
              name: "units",
              title: "Unidades en esta base",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [text("name", "Unidad"), defineField({ name: "n", title: "Cantidad", type: "number" })],
                  preview: { select: { title: "name", subtitle: "n" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "city", subtitle: "kind" } },
        }),
      ],
    }),
    defineField({
      name: "offices",
      title: "Oficinas y aliados",
      type: "array",
      group: "bases",
      of: [
        defineArrayMember({
          type: "object",
          fields: [text("city", "Ciudad"), text("kind", "Tipo"), text("address", "Dirección o nota")],
          preview: { select: { title: "city", subtitle: "kind" } },
        }),
      ],
    }),
    defineField({
      name: "crossings",
      title: "Cruces fronterizos",
      type: "array",
      group: "frontera",
      of: [
        defineArrayMember({
          type: "object",
          fields: [text("city", "Ciudad"), text("services", "Servicios")],
          preview: { select: { title: "city", subtitle: "services" } },
        }),
      ],
    }),
    defineField({ ...titleDescList("crossingServices", "Servicios de frontera"), group: "frontera" }),
    defineField({
      name: "regions",
      title: "Regiones",
      type: "array",
      group: "frontera",
      of: [
        defineArrayMember({
          type: "object",
          fields: [text("name", "Región"), text("states", "Estados")],
          preview: { select: { title: "name", subtitle: "states" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Flotilla y cobertura" }) },
});

export const gente = defineType({
  name: "gente",
  title: "Gente y clientes",
  type: "document",
  groups: [
    { name: "equipo", title: "Equipo", default: true },
    { name: "operacion", title: "Fotos de operación" },
    { name: "clientes", title: "Clientes" },
  ],
  fields: [
    defineField({
      name: "leader",
      title: "Director",
      type: "object",
      group: "equipo",
      fields: [photoField("photo", "Foto"), text("quote", "Frase", undefined, 3), text("name", "Nombre"), text("role", "Puesto")],
    }),
    defineField({
      name: "team",
      title: "Equipo",
      type: "array",
      group: "equipo",
      of: [
        defineArrayMember({
          type: "object",
          fields: [photoField("photo", "Foto"), text("name", "Nombre"), text("role", "Puesto")],
          preview: { select: { title: "name", subtitle: "role", media: "photo.image" } },
        }),
      ],
    }),
    photoField("advisor", "Foto de “Tu equipo asignado”"),
    defineField({
      name: "operationPhotos",
      title: "Galería “TSL en operación” (5 fotos)",
      type: "array",
      group: "operacion",
      validation: (r) => r.max(5),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
            text("label", "Descripción"),
            text("hint", "Indicación para la toma (opcional)"),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonios",
      type: "array",
      group: "clientes",
      of: [
        defineArrayMember({
          type: "object",
          fields: [text("quote", "Testimonio", undefined, 4), text("name", "Nombre"), text("role", "Puesto"), text("company", "Empresa")],
          preview: { select: { title: "name", subtitle: "company" } },
        }),
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Logos de clientes",
      type: "array",
      group: "clientes",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "image", title: "Logo", type: "image" }), text("name", "Empresa")],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Gente y clientes" }) },
});

export const preguntas = defineType({
  name: "preguntas",
  title: "Preguntas frecuentes",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Preguntas",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [text("q", "Pregunta"), text("a", "Respuesta", undefined, 4)],
          preview: { select: { title: "q" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Preguntas frecuentes" }) },
});

export const schemaTypes = [ajustes, textos, flotilla, gente, preguntas];

/** Documentos únicos: el panel los muestra como secciones fijas, sin “crear nuevo”. */
export const singletons = [
  { type: "ajustes", title: "Ajustes generales" },
  { type: "textos", title: "Textos de páginas" },
  { type: "flotilla", title: "Flotilla y cobertura" },
  { type: "gente", title: "Gente y clientes" },
  { type: "preguntas", title: "Preguntas frecuentes" },
];
