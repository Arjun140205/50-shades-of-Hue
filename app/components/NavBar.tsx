"use client";

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Link from 'next/link';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-neutral-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 font-black text-2xl tracking-tight text-white group"
          >
            <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" fill="white" className="transition-all duration-300 group-hover:r-7"/>
                <circle cx="10" cy="10" r="6" fill="#22d3ee" className="transition-all duration-300 group-hover:r-5"/>
              </svg>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              50 Shades of Hue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-neutral-300 hover:text-white font-semibold text-base transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-green-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
                  isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out",
                  isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 px-6 pt-2 pb-4 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-neutral-300 hover:text-white font-semibold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}