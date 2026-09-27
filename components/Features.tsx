import { Sparkles, Film, Zap, Clock } from "lucide-react";

export function Features() {
  const featureList = [
    {
      icon: Sparkles,
      title: "High Quality Downloads",
      description: "Extract the highest available original video resolutions and bitrates directly from permitted public sources.",
    },
    {
      icon: Film,
      title: "MP4 & MP3 Formats",
      description: "Choose between standard MP4 video streams or audio-only MP3 extractions based on source availability.",
    },
    {
      icon: Zap,
      title: "Fast Media Processing",
      description: "Optimized server engine processes permitted media streams efficiently for rapid delivery.",
    },
    {
      icon: Clock,
      title: "Temporary Processing",
      description: "Files are held in isolated temporary folders and automatically purged after download completion.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Built for Performance & Security
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Professional YouTube and Instagram media processing with security and privacy by design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 hover:border-indigo-500/30 transition-colors"
              >
                <div className="p-3 w-fit rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
