import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function SecurityShield({ strength, score }: { strength: string; score: number }) {
  const isStandby = strength === 'STANDBY';
  const isCritical = strength === 'CRITICAL';
  const isImpenetrable = strength === 'IMPENETRABLE';
  const color = isStandby ? '#64748b' : isCritical ? '#ef4444' : score < 70 ? '#f59e0b' : score < 90 ? '#06b6d4' : '#10b981';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <p className="absolute top-0 left-0 font-jetbrains text-[10px] tracking-widest text-gray-500">SHIELD INTEGRITY</p>

      {/* Shield Icon */}
      <motion.div
        className="mt-6 relative"
        animate={isCritical ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={isCritical ? { duration: 0.4, repeat: Infinity } : {}}
      >
        {/* Concentric rings */}
        {[80, 100, 120].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: size, height: size,
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              borderColor: color + (30 - i * 8).toString(16).padStart(2, '0'),
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Scanline sweep */}
        {!isStandby && (
          <motion.div
            className="absolute left-0 right-0 h-0.5 blur-sm z-20"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            initial={{ top: 0 }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <div className="relative z-10 p-4">
          {isImpenetrable ? (
            <ShieldCheck size={80} style={{ color, filter: `drop-shadow(0 0 20px ${color})` }} strokeWidth={1.5} />
          ) : isStandby ? (
            <Shield size={80} style={{ color }} strokeWidth={1} />
          ) : (
            <ShieldAlert size={80} style={{ color, filter: `drop-shadow(0 0 20px ${color})` }} strokeWidth={2} />
          )}
        </div>
      </motion.div>

      {/* Status Label */}
      <motion.div
        key={strength}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <div className="font-orbitron font-bold text-lg tracking-widest" style={{ color, textShadow: `0 0 10px ${color}` }}>
          {strength}
        </div>
      </motion.div>

      {/* Score Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-2">
        <div className="flex justify-between font-jetbrains text-[9px] text-gray-600 mb-1">
          <span>INTEGRITY</span><span style={{ color }}>{score}%</span>
        </div>
        <div className="h-1.5 bg-gray-900 rounded overflow-hidden">
          <motion.div
            className="h-full rounded"
            style={{ background: `linear-gradient(90deg, #7c3aed, ${color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ type: 'spring', stiffness: 60 }}
          />
        </div>
      </div>
    </div>
  );
}
