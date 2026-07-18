import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-[1140px] px-5 py-12 md:px-6 md:py-16">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
