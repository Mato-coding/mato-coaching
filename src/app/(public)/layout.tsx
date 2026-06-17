import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mato-coaching.de"),
  title: {
    default: "Somatic Breathwork & Coaching in Hamburg | Lasse Klüver",
    template: "%s | Lasse Klüver",
  },
  description:
    "Somatic Breathwork, Coaching und IFS-orientierte Prozessbegleitung in Hamburg und online. Begleitung bei innerer Unruhe, Anspannung und Erschöpfung.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.mato-coaching.de",
    siteName: "Lasse Klüver",
    title: "Somatic Breathwork & Coaching in Hamburg | Lasse Klüver",
    description:
      "Begleitung bei innerer Unruhe, Anspannung und Erschöpfung. Somatic Breathwork, Coaching und IFS in Hamburg und online.",
    images: [
      {
        url: "/portrait-lasse-sw.jpg",
        width: 600,
        height: 800,
        alt: "Lasse Klüver",
      },
    ],
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}