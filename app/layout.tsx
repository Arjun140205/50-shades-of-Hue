import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  variable: '--font-opensans',
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: '50 Shades of Hue',
  description: '50 Shades of Hue by Arjunbir Singh',
}



import { NavBar } from './components/NavBar';
import { SplashCursor } from './components/SplashCursor';

// Designer Footer
function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950/95 py-10 mt-auto relative z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="white"/><circle cx="10" cy="10" r="6" fill="#22d3ee"/></svg>
              </span>
              <span className="font-black text-white text-xl">50 Shades of Hue</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Your creative color companion for design inspiration and palette generation.
            </p>
          </div>

          {/* Features Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-white">Features</h3>
            <div className="flex flex-col space-y-2">
              <a href="/features/home-interior" className="text-neutral-400 hover:text-white transition-colors text-sm">Home Interior</a>
              <a href="/features/presentations" className="text-neutral-400 hover:text-white transition-colors text-sm">Presentations</a>
              <a href="/features/websites" className="text-neutral-400 hover:text-white transition-colors text-sm">Websites</a>
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <div className="flex flex-col space-y-2">
              <a href="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">About</a>
              <a href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>

          {/* Social Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-white">Connect</h3>
            <div className="flex flex-col space-y-2">
              <a href="https://github.com/Arjun140205" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="https://x.com/Arjunbir_singhh" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.39 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
                Twitter
              </a>
              <a href="mailto:hello@50shadesofhue.com" className="text-neutral-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm0 0l8 8m8-8l-8 8"/></svg>
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-8 border-t border-neutral-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} 50 Shades of Hue. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-neutral-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="/terms" className="text-neutral-500 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} bg-neutral-950 text-white`}>
        <SplashCursor />
        <div className="min-h-screen flex flex-col relative">
          <div className="z-50 relative">
            <NavBar />
          </div>
          <div className="flex-grow flex flex-col relative z-10">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
