import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karachi Brasserie | All Day Eatery in Saddar",
  description: "Artisanal coffee, gourmet breakfast and continental dining at Hotel Excelsior in Saddar, Karachi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
