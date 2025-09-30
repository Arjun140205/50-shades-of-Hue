"use client";

import { WebGLShader } from "../../components/ui/web-gl-shader";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[80vh] overflow-hidden relative">
      {/* WebGL Background */}
      <div className="fixed inset-0 -top-40 sm:-top-60 z-0">
        <WebGLShader />
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center px-4 md:px-0 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-lg mb-6 text-center">
            Contact
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-neutral-300 max-w-xl font-medium mb-8 text-center leading-relaxed"
        >
          Have questions, feedback, or want to collaborate? Reach out to the 50 Shades of Hue team!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transform transition-all duration-300" />
          
          <div className="relative w-full backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl p-8 flex flex-col gap-8 border border-white/10">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group/item"
            >
              <span className="block text-neutral-300 text-sm mb-2 transition-colors">Email</span>
              <a 
                href="mailto:arjunbirsingh1699@gmail.com" 
                className="inline-flex items-center text-lg text-white group-hover/item:text-blue-400 transition-colors"
              >
                <span className="relative">
                  arjunbirsingh1699@gmail.com
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="group/item"
            >
              <span className="block text-neutral-300 text-sm mb-2 transition-colors">GitHub</span>
              <a 
                href="https://github.com/Arjun140205" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-lg text-white group-hover/item:text-blue-400 transition-colors"
              >
                <span className="relative">
                  github.com/arjunbirsingh
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>

            {/* Twitter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="group/item"
            >
              <span className="block text-neutral-300 text-sm mb-2 transition-colors">Twitter</span>
              <a 
                href="https://x.com/Arjunbir_singhh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-lg text-white group-hover/item:text-blue-400 transition-colors"
              >
                <span className="relative">
                  @Arjunbirsingh
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
