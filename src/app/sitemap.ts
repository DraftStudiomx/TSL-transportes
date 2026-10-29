import type { MetadataRoute } from "next";
import { nav } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((l) => ({
    url: `https://tslmexico.com${l.href}`,
    changeFrequency: "monthly" as const,
    priority: l.href === "/" ? 1 : 0.8,
  }));
  return [...pages, { url: "https://tslmexico.com/aviso-de-privacidad/", changeFrequency: "yearly", priority: 0.3 }];
}
