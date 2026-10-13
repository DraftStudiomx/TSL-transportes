import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

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
    trailingSlash: true,
    images: { unoptimized: true },
    reactStrictMode: true,
  };
}
