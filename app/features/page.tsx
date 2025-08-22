export default function FeaturesPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] pt-10 pb-10 overflow-x-hidden bg-neutral-950">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-14 px-4 md:px-14 py-12">
        <div className="flex-1 flex flex-col gap-7 items-start">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">50 Shades of Hue Features</h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-medium">Explore specialized color tools for every creative need. Choose a category below to see what's coming soon!</p>
        </div>
      </div>
      {/* Feature Cards */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
        <a href="/features/home-interior" className="flex-1 rounded-2xl shadow-xl bg-neutral-900 p-10 flex flex-col items-center border border-neutral-800 hover:scale-105 hover:shadow-2xl transition-all min-h-[220px] group cursor-pointer">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3 group-hover:underline">Home Interior</h2>
          <p className="text-neutral-300 text-lg mb-2">Curated palettes and inspiration for your home.</p>
          <span className="text-sm text-indigo-400 font-semibold">Coming Soon</span>
        </a>
        <a href="/features/presentations" className="flex-1 rounded-2xl shadow-xl bg-neutral-900 p-10 flex flex-col items-center border border-neutral-800 hover:scale-105 hover:shadow-2xl transition-all min-h-[220px] group cursor-pointer">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3 group-hover:underline">Presentations</h2>
          <p className="text-neutral-300 text-lg mb-2">Professional color combos for slides and decks.</p>
          <span className="text-sm text-indigo-400 font-semibold">Coming Soon</span>
        </a>
        <a href="/features/websites" className="flex-1 rounded-2xl shadow-xl bg-neutral-900 p-10 flex flex-col items-center border border-neutral-800 hover:scale-105 hover:shadow-2xl transition-all min-h-[220px] group cursor-pointer">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3 group-hover:underline">Websites</h2>
          <p className="text-neutral-300 text-lg mb-2">Modern palettes for web design.</p>
          <span className="text-sm text-indigo-400 font-semibold">Coming Soon</span>
        </a>
      </div>
    </section>
  );
}
