import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIW LightningTalks - Share Quick Tech Presentations",
  description:
    "A platform for registering and sharing lightning talks with your tech community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#1f2937",
          colorText: "#1f2937",
          colorTextSecondary: "#6b7280",
          borderRadius: "0.5rem",
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: "#8b5cf6",
            borderColor: "#8b5cf6",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#7c3aed",
              borderColor: "#7c3aed",
            },
            "&:focus": {
              backgroundColor: "#7c3aed",
              borderColor: "#7c3aed",
              boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
            },
          },
          card: {
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          headerTitle: {
            color: "#1f2937",
            fontSize: "1.5rem",
            fontWeight: "600",
          },
          headerSubtitle: {
            color: "#6b7280",
            fontSize: "0.875rem",
          },
          socialButtonsBlockButton: {
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              backgroundColor: "#f9fafb",
              borderColor: "#9ca3af",
            },
          },
          formFieldLabel: {
            color: "#374151",
            fontSize: "0.875rem",
            fontWeight: "500",
          },
          formFieldInput: {
            borderColor: "#d1d5db",
            "&:focus": {
              borderColor: "#8b5cf6",
              boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
            },
          },
          footerActionText: {
            color: "#6b7280",
            fontSize: "0.875rem",
          },
          footerActionLink: {
            color: "#8b5cf6",
            fontSize: "0.875rem",
            fontWeight: "500",
            "&:hover": {
              color: "#7c3aed",
            },
          },
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || (process.env.CI ? "pk_test_mock_key_for_ci_build" : "")}
    >
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
