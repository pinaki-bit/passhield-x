import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Activity } from 'lucide-react';
import PremiumHero3D from './PremiumHero3D';

export default function HeroSection({ onEnter: _onEnter, onSignIn }: { onEnter: () => void; onSignIn: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-[#000205]">

      {/* ── Full-Screen 3D Canvas ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <PremiumHero3D />
      </div>

      {/* ── Cinematic Vignette ────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,2,5,0.65) 100%)',
        }}
      />

      {/* ── Top Navigation ────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Shield
            size={18}
            className="text-cyan-400"
            style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.8))' }}
          />
          <span className="font-mono text-[13px] font-bold tracking-[0.28em] text-white uppercase">
            PASSHIELD<span className="text-cyan-400">‑X</span>
          </span>
        </div>

        {/* Status + Sign In */}
        <div className="flex items-center gap-5">
          <motion.div
            className="hidden md:flex items-center gap-2 px-3 py-1 border border-green-500/20 bg-green-500/5"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="font-mono text-[8px] text-green-400 tracking-[0.35em] uppercase">
              Systems Online
            </span>
          </motion.div>
          <button
            onClick={onSignIn}
            className="font-mono text-[10px] text-cyan-400/65 hover:text-cyan-300 tracking-[0.22em] uppercase transition-colors duration-300"
          >
            Sign In
          </button>
        </div>
      </motion.nav>

      {/* ── HUD Corner Brackets & Labels ─────────────────────────── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Corners */}
        <div className="absolute top-[72px] left-6 w-7 h-7 border-t border-l border-cyan-500/18" />
        <div className="absolute top-[72px] right-6 w-7 h-7 border-t border-r border-cyan-500/18" />
        <div className="absolute bottom-5 left-6 w-7 h-7 border-b border-l border-cyan-500/18" />
        <div className="absolute bottom-5 right-6 w-7 h-7 border-b border-r border-cyan-500/18" />

        {/* Top-left HUD label */}
        <div className="absolute top-[80px] left-8">
          <p className="font-mono text-[7.5px] text-cyan-500/22 tracking-[0.45em] uppercase mb-0.5">Threat Level</p>
          <p className="font-mono text-[9px] text-cyan-400/32 tracking-[0.3em]">MONITORING</p>
        </div>

        {/* Top-right HUD label */}
        <div className="absolute top-[80px] right-8 text-right">
          <p className="font-mono text-[7.5px] text-cyan-500/22 tracking-[0.45em] uppercase mb-0.5">Neural Cipher</p>
          <p className="font-mono text-[9px] text-cyan-400/32 tracking-[0.3em]">v3.1.0</p>
        </div>

        {/* Right-side vertical HUD markers */}
        <div className="absolute right-9 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {['Perimeter scanning', 'Pattern recognition', 'Threat detection', 'Neural mapping'].map(
            (label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3 + i * 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-[1px] bg-cyan-500/18" />
                <span className="font-mono text-[7px] text-cyan-500/22 tracking-[0.2em] uppercase whitespace-nowrap">
                  {label}
                </span>
              </motion.div>
            )
          )}
        </div>

        {/* Left side vertical text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="absolute left-5 top-1/2 -translate-y-1/2"
        >
          <span
            className="font-mono text-[7px] text-cyan-500/18 tracking-[0.4em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            SECURE ENCLAVE ACTIVE
          </span>
        </motion.div>
      </div>

      {/* ── Hero Headline (left-edge, does not overlap spider) ─────── */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-[240px]"
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity size={10} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }} />
          <span className="font-mono text-[8px] text-cyan-400/65 tracking-[0.42em] uppercase">
            Enterprise Grade
          </span>
        </div>

        <h1 className="font-sans font-black text-[28px] leading-[1.12] text-white mb-4" style={{ textShadow: '0 0 50px rgba(6,182,212,0.25)' }}>
          Enterprise<br />
          Security<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500">
            Beyond<br />Detection
          </span>
        </h1>

        <p className="font-sans text-[10.5px] text-gray-500 leading-relaxed mb-6 max-w-[200px]">
          AI-powered threat intelligence. Zero-trust architecture. Quantum-resistant encryption.
        </p>

        <motion.button
          onClick={onSignIn}
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.28em] text-white uppercase px-5 py-2.5 border border-cyan-500/35 bg-cyan-500/6 hover:border-cyan-400/65 hover:bg-cyan-500/12 transition-all duration-400 backdrop-blur-sm"
          style={{ boxShadow: '0 0 22px rgba(6,182,212,0.08)' }}
        >
          Enter Platform
          <ArrowRight size={11} className="text-cyan-400" />
        </motion.button>
      </motion.div>

      {/* ── Bottom pulse indicator ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 pointer-events-none"
      >
        <motion.p
          animate={{ opacity: [0.18, 0.45, 0.18] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
          className="font-mono text-[7px] text-cyan-500/40 tracking-[0.55em] uppercase"
        >
          Initializing Threat Intelligence
        </motion.p>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-cyan-500/40 to-transparent"
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </div>
  );
}
