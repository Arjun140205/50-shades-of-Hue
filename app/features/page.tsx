"use client";
import { GlareCard } from "../components/GlareCard";

export default function FeaturesPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] pt-10 pb-10 overflow-x-hidden bg-neutral-950">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-14 px-4 md:px-14 py-12">
        <div className="flex-1 flex flex-col gap-7 items-start">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">50 Shades of Hue Features</h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-medium">Explore specialized color tools for every creative need. Choose a category below to see features!</p>
        </div>
      </div>
      {/* Feature Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 px-4">
        <a href="/features/home-interior" className="block h-[300px]">
          <GlareCard>
            <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Home Interior</h2>
              <p className="text-neutral-400">Curated palettes and inspiration for your home.</p>
              <span className="inline-flex items-center text-indigo-400 text-sm">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </GlareCard>
        </a>

        <a href="/features/presentations" className="block h-[300px]">
          <GlareCard>
            <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Presentations</h2>
              <p className="text-neutral-400">Professional color combos for slides and decks.</p>
              <span className="inline-flex items-center text-pink-400 text-sm">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </GlareCard>
        </a>

        <a href="/features/websites" className="block h-[300px]">
          <GlareCard>
            <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Websites</h2>
              <p className="text-neutral-400">Modern palettes for web design.</p>
              <span className="inline-flex items-center text-cyan-400 text-sm">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </GlareCard>
        </a>
      </div>
    </section>
  );
}
