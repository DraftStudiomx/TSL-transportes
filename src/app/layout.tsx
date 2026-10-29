import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import "./globals.css";
import "./pages.css";
import "./people.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TSL México | Transporte terrestre nacional e internacional",
    template: "%s | TSL México",
  },
  description:
    "Transportes y Soluciones Logísticas: 15 años moviendo carga en los 32 estados de México, con cruces a Laredo TX, certificación C-TPAT y seguimiento real 24/7.",
  metadataBase: new URL("https://tslmexico.com"),
  openGraph: {
    title: "TSL México — Tu carga, nuestra responsabilidad.",
    description: "Transporte terrestre nacional e internacional con cobertura en los 32 estados.",
    images: ["/img/og.jpg"],
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#01203f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que JS está activo para ocultar los elementos que entran animados (evita parpadeo) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
