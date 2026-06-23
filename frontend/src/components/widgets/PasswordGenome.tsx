import { motion, AnimatePresence } from 'framer-motion';

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  lower:   { color: '#06b6d4',  label: 'a–z' },
  upper:   { color: '#7c3aed',  label: 'A–Z' },
  digit:   { color: '#f59e0b',  label: '0–9' },
  special: { color: '#ec4899',  label: '#!@' },
};

function getCharType(char: string) {
  if (/[A-Z]/.test(char)) return 'upper';
  if (/\d/.test(char)) return 'digit';
  if (/[^a-zA-Z0-9]/.test(char)) return 'special';
  return 'lower';
}

export default function PasswordGenome({ password, classes }: { password: string; classes: Record<string, boolean> }) {
  return (
    <div className="w-full h-full flex flex-col relative">
      <p className="font-jetbrains text-[10px] tracking-widest text-gray-500 mb-4">GENOME MAP</p>

      {/* Character nodes */}
      <div className="flex-1 flex flex-wrap gap-2 items-center content-center overflow-hidden min-h-[100px]">
        <AnimatePresence mode="popLayout">
          {password.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-jetbrains text-xs text-gray-600 italic"
            >
              Awaiting key sequence...
            </motion.div>
          ) : (
            password.split('').map((char, i) => {
              const type = getCharType(char);
              const { color } = TYPE_CONFIG[type];
              return (
                <motion.div
                  key={`${i}-${char}`}
                  layout
                  initial={{ scale: 0, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0 }}
                  className="relative w-9 h-9 rounded-lg flex items-center justify-center font-jetbrains font-bold text-sm overflow-hidden cursor-default"
                  style={{
                    border: `1px solid ${color}60`,
                    backgroundColor: `${color}15`,
                    color,
                    boxShadow: `0 0 8px ${color}30`,
                  }}
                  whileHover={{ scale: 1.15, boxShadow: `0 0 15px ${color}70` }}
                >
                  {char === ' ' ? '_' : char}
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(180deg, transparent, ${color}, transparent)` }}
                    animate={{ top: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.08 }}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-800/50 mt-2">
        {Object.entries(TYPE_CONFIG).map(([key, { color, label }]) => (
          <div key={key} className="flex items-center gap-1.5">
            <motion.div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: color, opacity: classes?.[key] ? 1 : 0.2 }}
              animate={{ scale: classes?.[key] ? [1, 1.3, 1] : 1, opacity: classes?.[key] ? 1 : 0.2 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-jetbrains text-[9px] tracking-widest" style={{ color: classes?.[key] ? color : '#374151' }}>
              {label.toUpperCase()} {key.toUpperCase()}
            </span>
          </div>
        ))}
        <span className="ml-auto font-jetbrains text-[9px] text-gray-600 tracking-widest">
          LENGTH: <span className="text-cyber-cyan">{password.length}</span>
        </span>
      </div>
    </div>
  );
}
