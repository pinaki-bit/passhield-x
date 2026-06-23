import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Cpu, Lock } from 'lucide-react';
import EntropyReactor from './widgets/EntropyReactor';
import SecurityShield from './widgets/SecurityShield';
import ThreatRadar from './widgets/ThreatRadar';
import CrackTimeSimulator from './widgets/CrackTimeSimulator';
import PasswordGenome from './widgets/PasswordGenome';
import AICopilot from './widgets/AICopilot';

const DEFAULT_STATE = {
  score: 0, entropy: 0, strength: 'STANDBY', threats: [],
  feedback: ['System awaiting input...'],
  crack_times: { rtx: 'N/A', quantum: 'N/A' },
  classes: { lower: false, upper: false, digit: false, special: false },
  length: 0,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3 } },
};

export default function Dashboard() {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [analysis, setAnalysis] = useState<any>(DEFAULT_STATE);

  useEffect(() => {
    if (!password) { setAnalysis(DEFAULT_STATE); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const data = await res.json();
        setAnalysis(data);
      } catch { setAnalysis({ ...DEFAULT_STATE, feedback: ['API offline — run backend server'] }); }
    }, 10);
    return () => clearTimeout(timer);
  }, [password]);

  const strengthColor = {
    STANDBY: '#71717a', CRITICAL: '#ef4444',
    VULNERABLE: '#f59e0b', SECURE: '#3b82f6', IMPENETRABLE: '#8b5cf6'
  }[analysis.strength as string] ?? '#71717a';

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Top Nav Bar ───────────────────────────────────── */}
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass-panel rounded-none border-t-0 border-x-0"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-black" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            PASSHIELD-X
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2 px-3 py-1 rounded-md border border-white/10 bg-white/5"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] text-blue-400 tracking-widest uppercase font-medium">SYSTEMS ONLINE</span>
          </motion.div>
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-gray-400" />
            <span className="text-[10px] text-gray-500 tracking-widest uppercase font-medium">ENTROPY ENGINE v2.0</span>
          </div>
        </div>
      </motion.nav>

      {/* ── Password Input ─────────────────────────────────── */}
      <div className="px-6 py-8 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="glass-panel p-px rounded-xl overflow-hidden" style={{ boxShadow: `0 0 30px ${strengthColor}22` }}>
            <motion.div
              className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${strengthColor}22, transparent)` }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative flex items-center bg-black/40 rounded-xl px-5">
              {/* Status Dot */}
              <motion.div
                className="w-3 h-3 rounded-full mr-4 flex-shrink-0"
                style={{ backgroundColor: strengthColor, boxShadow: `0 0 10px ${strengthColor}` }}
                animate={{ scale: password ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <input
                type={showPwd ? 'text' : 'password'}
                className="flex-1 bg-transparent py-5 text-lg text-white font-jetbrains focus:outline-none tracking-widest placeholder-gray-600"
                placeholder="ENTER AUTHENTICATION KEY..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPwd(!showPwd)}
                className="ml-4 text-gray-500 hover:text-cyber-cyan transition-colors"
              >
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
              <div className="ml-4 flex items-center gap-2 border-l border-violet-500/20 pl-4">
                <Lock size={14} className="text-violet-500" />
                <span className="font-jetbrains text-xs tracking-widest" style={{ color: strengthColor }}>
                  {analysis.strength}
                </span>
              </div>
            </div>
          </div>

          {/* Strength Progress Bar */}
          <div className="mt-2 h-0.5 w-full bg-gray-800/50 rounded overflow-hidden">
            <motion.div
              className="h-full rounded"
              style={{ background: `linear-gradient(90deg, #7c3aed, ${strengthColor})` }}
              initial={{ width: 0 }}
              animate={{ width: `${analysis.score}%` }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <span className="font-jetbrains text-[10px] text-gray-600 tracking-widest">STRENGTH ANALYSIS</span>
            <span className="font-jetbrains text-[10px] tracking-widest" style={{ color: strengthColor }}>
              {analysis.score}/100
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Widget Grid ─────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 pb-10 max-w-7xl mx-auto w-full"
      >
        <motion.div variants={item} className="glass-panel p-6 min-h-[320px] relative group hover:border-white/20 transition-all">
          <SecurityShield strength={analysis.strength} score={analysis.score} />
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 min-h-[320px] relative group hover:border-white/20 transition-all">
          <EntropyReactor entropy={analysis.entropy} score={analysis.score} />
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 min-h-[320px] relative group hover:border-white/20 transition-all">
          <CrackTimeSimulator times={analysis.crack_times} />
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 min-h-[280px] lg:col-span-2 relative group hover:border-white/20 transition-all">
          <PasswordGenome password={password} classes={analysis.classes} />
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 min-h-[280px] relative group hover:border-white/20 transition-all">
          <ThreatRadar threats={analysis.threats} />
        </motion.div>

        <motion.div variants={item} className="glass-panel p-6 lg:col-span-3 min-h-[160px] relative group hover:border-white/20 transition-all">
          <AICopilot feedback={analysis.feedback} strength={analysis.strength} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
