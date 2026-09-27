import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Service — VSdownloads",
  description: "Terms of service and legal usage requirements for VSdownloads.",
};

export default function TermsPage() {
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Terms of Service</h1>
              <p className="text-xs text-slate-500 mt-1">Last Updated: September 2026</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Permitted Use</h2>
              <p>
                VSdownloads is provided strictly for analyzing and downloading media content that you have explicit permission to access, download, and store. You agree not to use this service for unauthorized downloading or distribution of copyrighted material.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Restrictions</h2>
              <p>
                Users must not use VSdownloads to bypass DRM (Digital Rights Management), defeat access controls, circumvent authentication paywalls, or download content from private accounts without permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Technical Terms & Platform Policies</h2>
              <p>
                VSdownloads complies with technical restrictions imposed by source platforms. Unsupported platforms, private URLs, or anti-bot protections will not be defeated or bypassed.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Temporary Processing</h2>
              <p>
                All processed files are stored temporarily and automatically purged after completion or TTL expiration. VSdownloads does not maintain permanent archives of processed media.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
