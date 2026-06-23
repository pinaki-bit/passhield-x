import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassLoginForm from './GlassLoginForm';

export type VaultState =
  | 'idle'
  | 'scanning'
  | 'unlocking'
  | 'opening'
  | 'form_reveal'
  | 'authenticating'
  | 'success';

interface TerminalLine {
  text: string;
  color?: string;
}

const TERMINAL: Record<string, TerminalLine[]> = {
  scanning: [
    { text: '> BIOMETRIC NEURAL SCAN INITIATED...', color: '#06b6d4' },
    { text: '> ANALYZING THREAT SIGNATURE...', color: '#06b6d4' },
    { text: '> IDENTITY MATRIX CROSS-REFERENCE: RUNNING', color: '#7c3aed' },
  ],
  unlocking: [
    { text: '> CRYPTOGRAPHIC PINS: RETRACTING', color: '#7c3aed' },
    { text: '> ZERO-TRUST POLICY: PASS ✓', color: '#10b981' },
    { text: '> SECURE ENCLAVE: AUTHORIZED', color: '#10b981' },
  ],
  opening: [
    { text: '> VAULT SEAL DISENGAGING...', color: '#06b6d4' },
    { text: '> AES-256 CHANNEL: ESTABLISHED', color: '#10b981' },
  ],
};

export default function AuthVault({ onSuccess }: { onSuccess: () => void }) {
  const [vaultState, setVaultState] = useState<VaultState>('form_reveal');
  const [termLines, setTermLines] = useState<TerminalLine[]>([]);

  const triggerAuth = () => {
    if (vaultState === 'idle') setVaultState('scanning');
  };

  // State machine
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    if (vaultState === 'scanning') {
      setTermLines([]);
      const lines = TERMINAL.scanning;
      lines.forEach((line, i) => {
        timers.push(setTimeout(() => setTermLines(prev => [...prev, line]), i * 900));
      });
      timers.push(setTimeout(() => setVaultState('unlocking'), 3200));
    }

    if (vaultState === 'unlocking') {
      setTermLines([]);
      const lines = TERMINAL.unlocking;
      lines.forEach((line, i) => {
        timers.push(setTimeout(() => setTermLines(prev => [...prev, line]), i * 800));
      });
      timers.push(setTimeout(() => setVaultState('opening'), 3800));
    }

    if (vaultState === 'opening') {
      setTermLines([]);
      const lines = TERMINAL.opening;
      lines.forEach((line, i) => {
        timers.push(setTimeout(() => setTermLines(prev => [...prev, line]), i * 700));
      });
      timers.push(setTimeout(() => setVaultState('form_reveal'), 2500));
    }

    if (vaultState === 'authenticating') {
      timers.push(setTimeout(() => setVaultState('success'), 3000));
    }

    if (vaultState === 'success') {
      timers.push(setTimeout(() => onSuccess(), 2200));
    }

    return () => timers.forEach(clearTimeout);
  }, [vaultState, onSuccess]);

  const showTerminal = vaultState === 'scanning' || vaultState === 'unlocking' || vaultState === 'opening';
  const stageIndex = ['scanning', 'unlocking', 'opening'].indexOf(vaultState);

  return (
    <div className="relative w-full h-full bg-[#000308] overflow-hidden select-none">

      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0 z-0">
        {/* VaultScene removed */}
      </div>

      {/* ── Vignette overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,3,8,0.75) 100%)',
        }}
      />

      {/* ── Corner UI Brackets ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* TL */}
        <div className="absolute top-5 left-5 w-9 h-9 border-t-[1.5px] border-l-[1.5px] border-cyan-500/70" />
        {/* TR */}
        <div className="absolute top-5 right-5 w-9 h-9 border-t-[1.5px] border-r-[1.5px] border-cyan-500/70" />
        {/* BL */}
        <div className="absolute bottom-5 left-5 w-9 h-9 border-b-[1.5px] border-l-[1.5px] border-cyan-500/70" />
        {/* BR */}
        <div className="absolute bottom-5 right-5 w-9 h-9 border-b-[1.5px] border-r-[1.5px] border-cyan-500/70" />

        {/* Top bar */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-[30px] h-[1px] bg-cyan-500/40" />
          <span className="font-mono text-[10px] tracking-[0.35em] text-cyan-500/60 uppercase">
            PASSHIELD&#8209;X&nbsp;//&nbsp;VAULT&nbsp;ACCESS&nbsp;TERMINAL
          </span>
          <div className="w-[30px] h-[1px] bg-cyan-500/40" />
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          <span className="font-mono text-[9px] text-cyan-500/45 tracking-[0.22em] uppercase">
            ENCRYPTION: AES&#8209;256&nbsp;//&nbsp;TLS&nbsp;1.3&nbsp;//&nbsp;ZERO&nbsp;TRUST
          </span>
        </div>

        {/* Side version tags */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <span
            className="font-mono text-[8px] text-cyan-500/25 tracking-widest uppercase"
            style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}
          >
            NEURAL CIPHER v3.1
          </span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <span
            className="font-mono text-[8px] text-cyan-500/25 tracking-widest uppercase"
            style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}
          >
            SECURE ENCLAVE ACTIVE
          </span>
        </div>
      </div>

      {/* ── State Overlays ── */}
      <AnimatePresence mode="wait">

        {/* IDLE — Initialize button (exactly matching reference style) */}
        {vaultState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 cursor-pointer"
            onClick={triggerAuth}
          >
            {/* Main button — rectangular with neon border (matches reference) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-12 py-3 border border-cyan-500/60 bg-black/55 backdrop-blur-sm overflow-hidden group"
              style={{ boxShadow: '0 0 20px rgba(6,182,212,0.15), inset 0 0 20px rgba(6,182,212,0.05)' }}
            >
              {/* Sweep shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />

              {/* Corner accents on button */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

              <span className="relative font-mono text-[11px] tracking-[0.42em] text-cyan-300 uppercase font-medium">
                Initialize Vault Access
              </span>
            </motion.button>

            {/* Pulsing label below */}
            <motion.p
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
              className="mt-3 font-mono text-[8px] text-cyan-500/40 tracking-[0.35em] uppercase"
            >
              Click anywhere to authenticate
            </motion.p>
          </motion.div>
        )}

        {/* SCANNING / UNLOCKING / OPENING — Terminal feed */}
        {showTerminal && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-4 w-full max-w-md px-4"
          >
            {/* Terminal lines */}
            <div className="w-full space-y-1">
              <AnimatePresence>
                {termLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: line.color ?? '#06b6d4' }}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            {/* Scanning sweep line */}
            {vaultState === 'scanning' && (
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/3 bg-white/90"
                  animate={{ x: ['-30%', '130%'] }}
                  transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
                />
              </div>
            )}

            {/* 3-segment progress bar */}
            <div className="flex gap-1.5">
              {['scanning', 'unlocking', 'opening'].map((s, i) => (
                <motion.div
                  key={s}
                  className="h-[2px] w-12 rounded-full"
                  animate={{
                    backgroundColor: stageIndex >= i ? '#06b6d4' : 'rgba(6,182,212,0.12)',
                    boxShadow: stageIndex >= i ? '0 0 8px #06b6d4' : 'none',
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* FORM REVEAL — login card */}
        {(vaultState === 'form_reveal' || vaultState === 'authenticating' || vaultState === 'success') && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <GlassLoginForm
              isAuthenticating={vaultState === 'authenticating'}
              isSuccess={vaultState === 'success'}
              onSubmit={() => setVaultState('authenticating')}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
