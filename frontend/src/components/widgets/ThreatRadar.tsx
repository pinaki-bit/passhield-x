import { motion } from 'framer-motion';
import { Radio, AlertTriangle } from 'lucide-react';

const THREAT_COLORS: Record<string, string> = {
  'Dictionary Attack': '#ef4444',
  'Sequential Walk': '#f59e0b',
  'Character Repetition': '#f97316',
};

export default function ThreatRadar({ threats }: { threats: string[] }) {
  const hasThreats = threats.length > 0;

  return (
    <div className="w-full h-full flex flex-col relative">
      <p className="font-jetbrains text-[10px] tracking-widest text-gray-500 mb-4">THREAT RADAR</p>

      {/* Radar display */}
      <div className="flex justify-center mb-4">
        <div className="relative w-36 h-36">
          {/* Concentric circles */}
          {[36, 54, 70].map((size, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border"
              style={{
                width: size * 2, height: size * 2,
                transform: 'translate(-50%, -50%)',
                borderColor: hasThreats ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
              }}
            />
          ))}

          {/* Cross hairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px" style={{ background: hasThreats ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px" style={{ background: hasThreats ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)' }} />
          </div>

          {/* Sweep arm */}
          <motion.div
            className="absolute top-1/2 left-1/2 origin-left h-px w-[70px]"
            style={{
              background: `linear-gradient(90deg, ${hasThreats ? '#ef4444' : '#10b981'}, transparent)`,
              opacity: 0.7,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Radio
              size={18}
              style={{ color: hasThreats ? '#ef4444' : '#10b981', filter: `drop-shadow(0 0 6px ${hasThreats ? '#ef4444' : '#10b981'})` }}
            />
          </div>

          {/* Threat blips */}
          {hasThreats && threats.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-500"
              style={{
                top: `${25 + i * 15}%`,
                left: `${30 + i * 20}%`,
                boxShadow: '0 0 8px #ef4444',
              }}
              animate={{ opacity: [1, 0, 1], scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Threat list */}
      <div className="flex flex-col gap-2 flex-1">
        {threats.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-cyber-green font-jetbrains text-xs"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            NO THREATS DETECTED
          </motion.div>
        ) : (
          threats.map((threat, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border"
              style={{
                borderColor: (THREAT_COLORS[threat] ?? '#ef4444') + '40',
                backgroundColor: (THREAT_COLORS[threat] ?? '#ef4444') + '10',
              }}
            >
              <AlertTriangle size={12} style={{ color: THREAT_COLORS[threat] ?? '#ef4444' }} />
              <span className="font-jetbrains text-[10px] tracking-widest flex-1" style={{ color: THREAT_COLORS[threat] ?? '#ef4444' }}>
                {threat.toUpperCase()}
              </span>
              <motion.span
                className="font-jetbrains text-[9px] text-red-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                LIVE
              </motion.span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
