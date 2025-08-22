export default function ContactPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] pt-10 pb-10 overflow-x-hidden bg-neutral-950">
      <div className="w-full max-w-2xl flex flex-col items-center px-4 md:px-0 py-12">
  <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm mb-6">Contact</h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-xl font-medium mb-8 text-center">
          Have questions, feedback, or want to collaborate? Reach out to the 50 Shades of Hue team!
        </p>
        <div className="w-full bg-neutral-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-neutral-800">
          <div>
            <span className="block text-neutral-400 text-sm mb-1">Email</span>
            <a href="mailto:hello@50shadesofhue.com" className="text-lg text-blue-400 hover:underline">hello@50shadesofhue.com</a>
          </div>
          <div>
            <span className="block text-neutral-400 text-sm mb-1">GitHub</span>
            <a href="https://github.com/arjunbirsingh" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-400 hover:underline">github.com/arjunbirsingh</a>
          </div>
          <div>
            <span className="block text-neutral-400 text-sm mb-1">Twitter</span>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-400 hover:underline">@50shadesofhue</a>
          </div>
        </div>
      </div>
    </section>
  );
}
