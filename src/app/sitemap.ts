import type { MetadataRoute } from "next";
import { nav } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((l) => ({
    url: `https://tslmexico.com${l.href}`,
    changeFrequency: "monthly",
    priority: l.href === "/" ? 1 : 0.8,
  }));
}
