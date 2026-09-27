import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — VSdownloads",
  description: "Privacy policy and data retention practices for VSdownloads.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to VSdownloads
        </Link>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
              <p className="text-xs text-slate-500 mt-1">Last Updated: September 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Data Collection & Privacy</h2>
              <p>
                VSdownloads does not require user registration, accounts, or personal information. We do not store browsing history or track individual users across sessions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Temporary File Lifetime</h2>
              <p>
                Temporary media files processed during conversion are assigned an isolated job directory and automatically deleted after a maximum TTL of 15 minutes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Server Security Logs</h2>
              <p>
                Minimal server logging is maintained for rate-limiting, security monitoring, and error reporting. Logged data includes timestamps, request operations, and status outcome without recording personal user tokens or authorization headers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
