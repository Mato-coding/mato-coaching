import { redirect } from "next/navigation";

// Solange es nur ein Programm gibt, leitet der Hub direkt weiter.
export default function ProgrammeHubPage() {
  redirect("/programme/ifs");
}
