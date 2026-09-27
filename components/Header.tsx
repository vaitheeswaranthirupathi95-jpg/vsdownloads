"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Download, Sun, Moon, Menu, X, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/icons";

// UPDATE YOUR INSTAGRAM HANDLE HERE
const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/s_lovely_alone?stkn=MXdmNzhpd2U4cHo0eA==";
const INSTAGRAM_HANDLE = "@s_lovely_alone";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Download className="w-5 h-5" />
          </div>
          <span>VS<span className="text-indigo-600 dark:text-indigo-400">downloads</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <Link href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            How It Works
          </Link>
          <Link href="#supported-platforms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Supported Platforms
          </Link>
          <Link href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Terms
          </Link>
          <a
            href={INSTAGRAM_ACCOUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-pink-500 shrink-0" />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 hidden dark:block text-amber-400" />
            <Moon className="w-5 h-5 block dark:hidden text-slate-700" />
          </button>

          <Link
            href="/privacy"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Secure & Compliant
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
          >
            How It Works
          </Link>
          <Link
            href="#supported-platforms"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
          >
            Supported Platforms
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
          >
            FAQ
          </Link>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
          >
            Terms & Privacy
          </Link>
          <a
            href={INSTAGRAM_ACCOUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-pink-600"
          >
            <InstagramIcon className="w-5 h-5 text-pink-500" />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      )}
    </header>
  );
}
