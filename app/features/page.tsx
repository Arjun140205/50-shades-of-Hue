"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebGLShader } from "../../components/ui/web-gl-shader";
import { useRef, useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  href: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, gradient, href, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      <motion.div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: gradient,
          filter: "blur(60px)",
          opacity: 0.2,
        }}
        animate={{
          opacity: hovered ? 0.3 : 0.2,
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <a href={href} className="block">
        <motion.div
          className="relative h-full rounded-2xl bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800 hover:border-neutral-700 p-8 overflow-hidden"
          animate={{
            y: hovered ? -5 : 0,
            scale: hovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative h-full flex flex-col">
            {/* Icon Section */}
            <div className="inline-block mb-4 text-blue-400/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400">
              {icon}
            </div>

            {/* Content Section */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 mb-4">
                  {title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {description}
                </p>
              </div>

              <motion.div 
                className="flex items-center space-x-2 text-white/80"
                animate={{
                  x: hovered ? 10 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium">Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-3xl bg-gradient-to-br opacity-30 transform translate-x-1/2 -translate-y-1/2" 
              style={{ background: gradient }} />
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default function FeaturesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="w-full min-h-screen relative overflow-hidden bg-neutral-950">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <WebGLShader />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-90" />
      </div>

      {/* Header Content */}
      <div ref={containerRef} className="relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-24 pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 mb-6">
              Features
            </h1>
            <div className="relative inline-block">
              <motion.p 
                className="text-xl md:text-2xl text-neutral-300 max-w-3xl font-medium mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Explore specialized color tools crafted for every creative workflow.
                <br />Discover the perfect palette for your next project.
              </motion.p>
              <motion.div 
                className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Home Interior"
            description="Curate sophisticated color palettes for your living spaces. Transform interiors with AI-powered harmony suggestions and real-time visualizations."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            }
            gradient="linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
            href="/features/home-interior"
            index={0}
          />

          <FeatureCard
            title="Presentations"
            description="Design stunning presentations with accessible color schemes. Generate professional palettes that enhance readability and visual impact."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            }
            gradient="linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
            href="/features/presentations"
            index={1}
          />

          <FeatureCard
            title="Websites"
            description="Modern color palettes for cutting-edge web design. Create stunning digital experiences that captivate users."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
              </svg>
            }
            gradient="linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
            href="/features/websites"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
