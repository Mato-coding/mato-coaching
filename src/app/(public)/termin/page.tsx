"use client";

import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookingPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#09173b" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background py-32 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-primary font-medium mb-4">
            Erstgespräch vereinbaren
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            Wähle einen passenden Zeitpunkt für unser kostenfreies Kennenlernen. Der Termin findet per Video-Call statt.
          </p>
        </div>

        <div className="bg-surface rounded-2xl shadow-sm min-h-[600px] border border-primary/5 flex items-center justify-center p-4 overflow-hidden">
          {/* Vorerst ein öffentlicher Cal.com Test-Link. Wird später durch deinen ersetzt. */}
          <Cal 
            calLink="lasse-kluever/erstgespraech" 
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
          />
        </div>
      </div>
    </div>
  );
}