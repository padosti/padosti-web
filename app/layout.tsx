import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padosti — Where neighbours become friends",
  description:
    "Rent household items, furniture, sports gear, and more from trusted neighbours within 10 miles. Borrow what you need, share what you own.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}