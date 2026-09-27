import { Link, Settings, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Link,
      step: "01",
      title: "Paste URL",
      description: "Copy a public video URL from YouTube or Instagram and paste it into the search input above.",
    },
    {
      icon: Settings,
      step: "02",
      title: "Choose Format",
      description: "Analyze the link to preview media details. Select your desired MP4 resolution or MP3 audio bitrate.",
    },
    {
      icon: Download,
      step: "03",
      title: "Download",
      description: "Click download to start the remux/conversion pipeline and save the file directly to your device.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Three simple steps to process and download permitted public media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 space-y-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-slate-200 dark:text-slate-800">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
