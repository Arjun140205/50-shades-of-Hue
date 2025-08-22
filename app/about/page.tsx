export default function AboutPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] pt-10 pb-10 overflow-x-hidden bg-neutral-950">
      <div className="w-full max-w-4xl flex flex-col items-center px-4 md:px-0 py-12">
  <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm mb-6">About 50 Shades of Hue</h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-medium mb-8 text-center">
          50 Shades of Hue is your creative color companion, designed to make color palette generation effortless and premium. Whether you're a designer, developer, or home enthusiast, 50 Shades of Hue helps you extract, name, and use beautiful color palettes from any image or inspiration.
        </p>
        <ul className="text-lg text-neutral-300 space-y-3 mb-8">
          <li>🎨 Instant palette generation from images</li>
          <li>🖼️ Camera capture for real-world inspiration</li>
          <li>🔎 Accurate color naming and copying</li>
          <li>💡 Curated suggestions for web, presentations, and interiors</li>
          <li>⚡ Fast, modern, and mobile-friendly UI</li>
        </ul>
        <p className="text-neutral-500 text-base text-center">
          Built with Next.js, Tailwind CSS, and a passion for color by Arjunbir Singh.
        </p>
      </div>
    </section>
  );
}
