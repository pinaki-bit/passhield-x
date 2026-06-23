import { motion } from 'framer-motion';

interface HeroProps {
  onSignIn?: () => void;
  onEnter?: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' as const },
  }),
};

export default function HeroSection({ onSignIn, onEnter }: HeroProps) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
      
      <div className="pointer-events-auto flex flex-col items-center max-w-4xl mx-auto">
        
        {/* Subtle Top Badge */}
        <motion.div
          custom={0} initial="hidden" animate="visible" variants={fadeUp}
          className="mb-8"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md">
            Enterprise Grade Security
          </span>
        </motion.div>

        {/* Powerful, clean headline */}
        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.1]"
          style={{ color: '#ffffff' }}
        >
          Absolute Digital <br/>
          <span className="text-gradient-premium">Sovereignty.</span>
        </motion.h1>

        {/* Minimalist Subtitle */}
        <motion.p
          custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          The pinnacle of cryptographic architecture. Protect your most valuable assets with zero-knowledge encryption and seamless biometric integration.
        </motion.p>

        {/* Elegant CTA Buttons */}
        <motion.div
          custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={onSignIn}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Access Vault
          </button>
          
          <button
            onClick={onEnter}
            className="glass-button px-8 py-3.5 font-medium tracking-wide text-white"
          >
            Explore Technology
          </button>
        </motion.div>

      </div>
    </section>
  );
}
