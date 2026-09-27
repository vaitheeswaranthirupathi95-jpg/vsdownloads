import { CheckCircle2, AlertTriangle } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/icons";

export function SupportedPlatforms() {
  return (
    <section id="supported-platforms" className="py-16 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Supported Platforms
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            VSdownloads processes publicly accessible media URLs from officially supported platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* YouTube Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 hover:border-red-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                <YoutubeIcon className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                Fully Active
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                YouTube Media
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Extract MP4 video resolutions up to 1080p and high-bitrate MP3 audio.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Supported URL Patterns:
              </span>
              <ul className="text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  youtube.com/watch?v=...
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  youtu.be/...
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  youtube.com/shorts/...
                </li>
              </ul>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 hover:border-pink-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white">
                <InstagramIcon className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                Public Content Only
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Instagram Public Posts & Reels
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Process public Reels and video posts without bypassing access restrictions.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Supported URL Patterns:
              </span>
              <ul className="text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  instagram.com/reel/...
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  instagram.com/p/...
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  instagram.com/tv/...
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Private content disclaimer */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
          <div>
            <p className="font-semibold">Privacy & Access Protection Notice</p>
            <p className="mt-0.5">
              VSdownloads will never attempt to access private Instagram accounts, age-gated media, paywalled content, or media protected by DRM and login requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
