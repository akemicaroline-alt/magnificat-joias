import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { env } from "@/lib/env";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteName = "Magnificat Joias";
const description =
  "Joalheria sacra refinada em prata 950 e ouro 18k. Terços, cruzes, medalhas e alianças criados com devoção, em São Paulo, para todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${siteName} — Joias sacras refinadas em prata 950 e ouro 18k`,
    template: `%s · ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "joias sacras",
    "terço prata",
    "cruz ouro",
    "medalha Nossa Senhora",
    "joalheria católica",
    "alianças prata 950",
    "anjo da guarda joia",
  ],
  alternates: {
    canonical: env.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: env.siteUrl,
    siteName,
    title: `${siteName} — Joias que celebram a fé`,
    description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Magnificat Joias — joias sacras em prata 950 e ouro 18k",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Joias que celebram a fé`,
    description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "joalheria",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-bg-deep text-text antialiased">
        <Header />
        <main id="conteudo" className="relative">
          {children}
        </main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
