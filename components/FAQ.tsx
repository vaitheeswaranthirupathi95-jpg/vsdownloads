"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What platforms are supported?",
      a: "VSdownloads currently supports publicly accessible YouTube video URLs (standard watch URLs, Shorts, and embed links) and Instagram public posts, TV, and Reels.",
    },
    {
      q: "What formats are available?",
      a: "You can download MP4 video files in resolutions provided by the source (up to 1080p, 720p, 480p, 360p) and MP3 audio files in bitrates up to 320 kbps.",
    },
    {
      q: "Can I download private videos?",
      a: "No. VSdownloads strictly respects creator privacy and access controls. Private videos, age-restricted content, paywalled media, or private account posts cannot be processed.",
    },
    {
      q: "Why is a particular quality unavailable?",
      a: "VSdownloads only displays resolutions and qualities actually provided by the original source stream. We do not artificially upscale or promise resolutions that the original creator did not upload.",
    },
    {
      q: "How long are temporary files stored?",
      a: "Files are stored temporarily in isolated server folders for up to 15 minutes to allow user download, after which they are automatically purged.",
    },
    {
      q: "Can I convert video to MP3?",
      a: "Yes! Selecting the MP3 Audio option uses FFmpeg to extract and encode the audio stream into MP3 format.",
    },
    {
      q: "Is downloaded content automatically stored permanently?",
      a: "No. VSdownloads never permanently stores downloaded media files on server storage.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Everything you need to know about using VSdownloads.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 text-base sm:text-lg"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
