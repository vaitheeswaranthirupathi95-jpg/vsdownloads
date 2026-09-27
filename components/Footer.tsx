import Link from "next/link";
import { Download, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/icons";

// UPDATE YOUR INSTAGRAM HANDLE HERE
const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/s_lovely_alone?stkn=MXdmNzhpd2U4cHo0eA==";
const INSTAGRAM_HANDLE = "@s_lovely_alone";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Compliance Notice Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Legal Usage & Rights Disclaimer</span>
          </div>
          <p>
            Use this service only for media you have permission to download or otherwise have the legal right to access and use. Respect copyright, creator rights, and the terms of the platform where the media is hosted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <Download className="w-4 h-4" />
            </div>
            <span>VSdownloads</span>
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy Policy
            </Link>
            <a
              href={INSTAGRAM_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500 shrink-0" />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} VSdownloads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
