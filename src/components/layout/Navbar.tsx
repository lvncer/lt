"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Zap, Menu, X, Home, List, PlusCircle, Bookmark } from "lucide-react";
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const syncUser = async () => {
      try {
        await fetch("/api/sync-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerk_user_id: user.id,
            username: user.username || user.fullName || "anonymous",
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl,
          }),
        });
      } catch (err) {
        console.error("ユーザー同期失敗", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-1 md:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg transition-colors hover:text-primary"
          >
            <Zap className="w-5 h-5 text-purple-500" />
            <span>LightningTalks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/talks"
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              Talks
            </Link>
            <Link
              href="/schedule"
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              Schedule
            </Link>
            <SignedOut>
              <Link href="/sign-in">
                <button className="ml-3 hover:bg-gray-100 p-2 rounded-md">
                  ログイン
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="-ml-3 border hover:bg-gray-100 p-2 rounded-md">
                  サインアップ
                </button>
              </Link>
            </SignedOut>
            <div className="flex justify-end items-center gap-8 h-16">
              <SignedIn>
                <Link
                  href="/register"
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Submit
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <div className="mr-0.5" />
                <UserButton />
              </SignedIn>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="flex justify-start items-center gap-4 h-16 mr-3">
              <SignedOut>
                <Link href="/sign-in">
                  <button className="-mr-1 border hover:bg-gray-100 p-1 rounded-md">
                    ログイン
                  </button>
                </Link>
              </SignedOut>
            </div>
            <div className="flex justify-start items-center gap-4 h-16 mr-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <button
              className="text-foreground p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/talks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <List size={18} />
              <span>Browse Talks</span>
            </Link>
            <Link
              href="/schedule"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <List size={18} />
              <span>Time Schedule</span>
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <PlusCircle size={18} />
              <span>Submit Talk</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
            >
              <Bookmark size={18} />
              <span>Dashboard</span>
            </Link>
          </nav>
          <SignedOut>
            <div className="container mx-auto mt-2 px-4 pb-6">
              <Link href="/sign-up">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md text-center">
                  サインアップ
                </button>
              </Link>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
