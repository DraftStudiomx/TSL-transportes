import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// BASE_PATH solo se define en el deploy de GitHub Pages (/TSL-transportes). En cPanel el sitio vive en la raíz.
const basePath = process.env.BASE_PATH || "";

/**
 * Export estático: `next build` genera /out para subirlo al cPanel de hosting-mexico.net.
 * El build de Next 15 siempre escribe sus archivos intermedios en `.next`, así que el servidor
 * local usa su propia carpeta (`.next-dev`). Así correr un build con `next dev` prendido no
 * corrompe la caché del servidor.
 */
export default function config(phase) {
  return {
    output: "export",
    ...(phase === PHASE_DEVELOPMENT_SERVER && { distDir: ".next-dev" }),
    basePath,
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    trailingSlash: true,
    images: { unoptimized: true },
    reactStrictMode: true,
  };
}
