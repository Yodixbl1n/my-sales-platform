import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});



const SITE_URL = "https://np-sales.vercel.app";

export const metadata = {
  title: "NP Sales — система обучения продажам",
  description: "Закрытый курс для менеджеров, фрилансеров и предпринимателей: от первого контакта до закрытия сделки. 8 модулей, 75 уроков, 100% практика.",
  openGraph: {
    title: "NP Sales — система обучения продажам",
    description: "От первого контакта до закрытия сделки. СПИН, MEDDIC, нейрохакинг, отработка возражений. 8 модулей, 75 уроков, 100% практика.",
    siteName: "NP Sales",
    images: [{ url: SITE_URL + "/og.png", width: 1200, height: 630, alt: "NP Sales" }],
    type: "website",
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.svg",
    },
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "NP Sales — система обучения продажам",
    description: "От первого контакта до закрытия сделки. 8 модулей, 75 уроков, 100% практика.",
    images: [SITE_URL + "/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
