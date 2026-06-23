import { motion } from 'framer-motion';
import { Cpu, Zap, Clock } from 'lucide-react';

export default function CrackTimeSimulator({ times }: { times: { rtx: string; quantum: string } }) {
  const rtxInstant = times.rtx === 'Instantly' || times.rtx.includes('s') || times.rtx.includes('m');
  const qInstant = times.quantum === 'Instantly' || times.quantum.includes('s') || times.quantum.includes('m');

  return (
    <div className="w-full h-full flex flex-col relative">
      <p className="font-jetbrains text-[10px] tracking-widest text-gray-500 mb-5">ATTACK SIMULATION</p>

      <div className="flex-1 flex flex-col justify-center gap-6">

        {/* RTX Attack */}
        <div className="relative p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 relative overflow-hidden flex-shrink-0">
              <Cpu size={20} className="text-blue-400 relative z-10" />
              <motion.div className="absolute inset-0 bg-blue-500/30" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-jetbrains text-[9px] text-gray-500 tracking-widest mb-1">RTX 4090 CLUSTER · 100B/s</div>
              <motion.div
                key={times.rtx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-orbitron font-bold text-lg text-blue-400"
                style={{ textShadow: '0 0 10px rgba(96,165,250,0.5)' }}
              >
                {times.rtx}
              </motion.div>
              {/* Progress drain */}
              <div className="mt-2 h-0.5 bg-gray-900 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-blue-400 rounded"
                  initial={{ width: '100%' }}
                  animate={rtxInstant ? { width: ['100%', '0%'] } : { width: '100%' }}
                  transition={{ duration: rtxInstant ? 1.5 : undefined, repeat: rtxInstant ? Infinity : undefined }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quantum Attack */}
        <div className="relative p-4 rounded-xl border border-pink-500/20 bg-pink-500/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30 relative overflow-hidden flex-shrink-0">
              <Zap size={20} className="text-pink-400 relative z-10" />
              <motion.div className="absolute inset-0 bg-pink-500/30" animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 0.7, repeat: Infinity }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-jetbrains text-[9px] text-gray-500 tracking-widest mb-1">QUANTUM ANNEALER · 1Q/s</div>
              <motion.div
                key={times.quantum}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-orbitron font-bold text-lg text-pink-400"
                style={{ textShadow: '0 0 10px rgba(244,114,182,0.5)' }}
              >
                {times.quantum}
              </motion.div>
              <div className="mt-2 h-0.5 bg-gray-900 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-pink-400 rounded"
                  initial={{ width: '100%' }}
                  animate={qInstant ? { width: ['100%', '0%'] } : { width: '100%' }}
                  transition={{ duration: qInstant ? 0.3 : undefined, repeat: qInstant ? Infinity : undefined }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-3">
        <Clock size={10} className="text-gray-600" />
        <span className="font-jetbrains text-[9px] text-gray-600 tracking-widest">REAL-TIME THREAT PROJECTION</span>
      </div>
    </div>
  );
}
