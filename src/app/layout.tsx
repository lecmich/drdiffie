import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.lecmich.it"),
  title: "Dr. Diffie, Tierarzt auf sehr kurzen Beinen",
  description: "Haben Sie Wurst dabei? Dann hat Dr. Diffie jetzt Zeit für Sie. Die humorvolle Praxisseite eines Dackels.",
  openGraph: {
    title: "Dr. Diffie, Tierarzt auf sehr kurzen Beinen",
    description: "Haben Sie Wurst dabei? Dann hat der Doktor jetzt Zeit für Sie.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
