// Genera src/data/mexico-map.json: contorno de México + ciudades proyectadas (se corre una vez)
import { readFileSync, writeFileSync } from "node:fs";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const countries = feature(topo, topo.objects.countries);
const mx = countries.features.find((f) => f.id === "484");
const us = countries.features.find((f) => f.id === "840");

const W = 1000, H = 640;
const proj = geoMercator().fitExtent([[20, 20], [W - 20, H - 20]], mx);
proj.clipExtent([[-10, -10], [W + 10, H + 10]]);
const path = geoPath(proj);
path.digits?.(1);

const cities = {
  qro: ["Querétaro", -100.39, 20.59, "hub"],
  sma: ["San Miguel de Allende", -100.75, 20.91, "hub"],
  ags: ["Aguascalientes", -102.29, 21.88, "office"],
  pue: ["Puebla", -98.2, 19.04, "ally"],
  nld: ["Nuevo Laredo / Laredo TX", -99.51, 27.48, "border"],
  col: ["Colombia, N.L.", -99.73, 27.7, "border"],
  cdmx: ["CDMX", -99.13, 19.43], mty: ["Monterrey", -100.31, 25.67], gdl: ["Guadalajara", -103.35, 20.67],
  tij: ["Tijuana", -117.04, 32.51], mer: ["Mérida", -89.62, 20.97], cun: ["Cancún", -86.85, 21.16],
  chi: ["Chihuahua", -106.07, 28.63], her: ["Hermosillo", -110.96, 29.07], ver: ["Veracruz", -96.13, 19.17],
  oax: ["Oaxaca", -96.72, 17.06], cul: ["Culiacán", -107.39, 24.8], sal: ["Saltillo", -101.0, 25.42],
  slp: ["San Luis Potosí", -100.98, 22.15], leo: ["León", -101.68, 21.12], tux: ["Tuxtla", -93.12, 16.75],
  vsa: ["Villahermosa", -92.93, 17.99], mxl: ["Mexicali", -115.45, 32.62], lap: ["La Paz", -110.31, 24.14],
  dgo: ["Durango", -104.67, 24.02], zac: ["Zacatecas", -102.58, 22.77], mor: ["Morelia", -101.19, 19.7],
  aca: ["Acapulco", -99.88, 16.85], tam: ["Tampico", -97.86, 22.25], cam: ["Campeche", -90.53, 19.85],
};
const out = {
  width: W, height: H,
  mexico: path(mx),
  us: path(us),
  cities: Object.fromEntries(Object.entries(cities).map(([k, [name, lon, lat, kind]]) => {
    const [x, y] = proj([lon, lat]);
    return [k, { name, x: +x.toFixed(1), y: +y.toFixed(1), kind: kind ?? "dest" }];
  })),
};
writeFileSync("src/data/mexico-map.json", JSON.stringify(out));
console.log("ok", out.mexico.length, out.us.length);
