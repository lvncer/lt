import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LightningTalks - Share Quick Tech Presentations",
  description:
    "A platform for registering and sharing lightning talks with your tech community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
