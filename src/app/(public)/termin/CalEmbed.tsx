"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CalEmbed() {
  const searchParams = useSearchParams();
  const cluster = searchParams.get("cluster");
  const result = searchParams.get("result");

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#09173b" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const config =
    cluster && result
      ? {
          notes: `Assessment: Cluster ${cluster}, Ergebnis ${result}`,
          "metadata[cluster]": cluster,
          "metadata[result]": result,
        }
      : undefined;

  return (
    <Cal
      calLink="lasse-kluever/erstgespraech"
      config={config}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
