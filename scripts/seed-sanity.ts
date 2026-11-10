/**
 * Pasa el contenido actual del sitio (src/lib/site.ts + textos por defecto) a Sanity,
 * para que el cliente encuentre todo capturado en el panel.
 *
 * Uso:
 *   1. Crea un token con permiso "Editor" en sanity.io/manage → proyecto → API → Tokens.
 *   2. Guárdalo en `.env.local` (no se sube a GitHub):  SANITY_WRITE_TOKEN=xxxx
 *   3. npm run seed          → crea los documentos que no existan (no pisa lo editado)
 *      npm run seed -- --force → reemplaza todo con el contenido por defecto
 */
import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@sanity/client";
import { defaults, sanityConfig } from "../src/lib/content";
import type { Photo } from "../src/lib/site";

// Lee .env.local sin dependencias extra
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Falta SANITY_WRITE_TOKEN en .env.local (ver instrucciones al inicio del archivo).");
  process.exit(1);
}
const force = process.argv.includes("--force");
const client = createClient({ ...sanityConfig, token, useCdn: false });

/** Sanity necesita una _key única en cada objeto dentro de una lista. */
const keyed = <T extends object>(list: T[]) => list.map((item, i) => ({ _key: `k${i}`, ...item }));

async function main() {
  const d = defaults;

  // Las fotos reales del sitio (public/img/...) se suben a Sanity para que el cliente las vea en el panel
  const localSrcs = new Set(
    [d.advisor, ...d.basesDetail.map((b) => b.photo), ...d.operationPhotos, ...d.unitPhotos]
      .map((p) => p.src)
      .filter((src): src is string => !!src && src.startsWith("/img/"))
  );
  const assets = new Map<string, string>();
  for (const src of localSrcs) {
    const asset = await client.assets.upload("image", readFileSync(`public${src}`), { filename: src.split("/").pop() });
    assets.set(src, asset._id);
    console.log("Imagen subida:", src);
  }
  const image = (src?: string) =>
    src && assets.has(src) ? { image: { _type: "image", asset: { _type: "reference", _ref: assets.get(src) } } } : {};
  const photoDoc = (p: Photo) => ({ ...image(p.src), label: p.label, ...(p.hint ? { hint: p.hint } : {}) });

  const docs: ({ _id: string; _type: string } & Record<string, unknown>)[] = [
    {
      _id: "ajustes",
      _type: "ajustes",
      contact: d.contact,
      tickerItems: d.tickerItems,
      stats: keyed(d.stats),
      legal: d.legal,
    },
    {
      _id: "textos",
      _type: "textos",
      heroLede: d.texts.heroLede,
      introLead: d.texts.introLead,
      introLeadDim: d.texts.introLeadDim,
      problems: keyed(d.problems),
      heroServicios: d.texts.heroServicios,
      heroCobertura: d.texts.heroCobertura,
      heroNosotros: d.texts.heroNosotros,
      heroContacto: d.texts.heroContacto,
      aboutQuote: d.texts.aboutQuote,
      aboutParagraphs: d.texts.aboutParagraphs,
      aboutValues: keyed(d.aboutValues),
      safety: keyed(d.safety.map(({ title, desc }) => ({ title, desc }))),
      differentiators: keyed(d.differentiators),
      cycle: keyed(d.cycle),
      serviceModes: keyed(d.serviceModes),
    },
    {
      _id: "flotilla",
      _type: "flotilla",
      units: keyed(d.units.map((u) => ({ ...u, count: u.count ?? undefined }))),
      cargo: d.cargo,
      unitPhotos: keyed(d.unitPhotos.map((u) => ({ unit: u.unit, ...photoDoc(u) }))),
      basesDetail: keyed(
        d.basesDetail.map((b) => ({ city: b.city, kind: b.kind, photo: photoDoc(b.photo), units: keyed(b.units) }))
      ),
      offices: keyed(d.offices),
      crossings: keyed(d.crossings),
      crossingServices: keyed(d.crossingServices),
      regions: keyed(d.regions),
    },
    {
      _id: "gente",
      _type: "gente",
      leader: { photo: photoDoc(d.leader.photo), quote: d.leader.quote, name: d.leader.name, role: d.leader.role },
      team: keyed(d.team.map((m) => ({ photo: photoDoc(m.photo), name: m.name, role: m.role }))),
      advisor: photoDoc(d.advisor),
      operationPhotos: keyed(d.operationPhotos.map(photoDoc)),
      testimonials: keyed(d.testimonials),
      clientLogos: keyed(d.clientLogos.map((l) => ({ name: l.name }))),
    },
    { _id: "preguntas", _type: "preguntas", items: keyed(d.faqs) },
  ];

  const tx = client.transaction();
  for (const doc of docs) (force ? tx.createOrReplace(doc) : tx.createIfNotExists(doc));
  await tx.commit();
  console.log(`Listo: ${docs.length} documentos ${force ? "reemplazados" : "creados (los existentes no se tocaron)"}.`);
}

main().catch((err) => {
  console.error("Error al cargar el contenido:", err.message);
  process.exit(1);
});
