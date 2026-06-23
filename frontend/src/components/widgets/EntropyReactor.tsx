import { motion } from 'framer-motion';

export default function EntropyReactor({ entropy, score }: { entropy: number; score: number }) {
  const color = score < 40 ? '#ef4444' : score < 70 ? '#f59e0b' : score < 90 ? '#06b6d4' : '#10b981';
  const ringColor = score < 40 ? '#7f1d1d' : score < 70 ? '#78350f' : score < 90 ? '#164e63' : '#064e3b';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <p className="absolute top-0 left-0 font-jetbrains text-[10px] tracking-widest text-gray-500">ENTROPY CORE</p>

      <div className="relative w-48 h-48 flex items-center justify-center mt-4">

        {/* Outer dashed orbit */}
        <motion.div
          className="absolute w-44 h-44 rounded-full border border-dashed"
          style={{ borderColor: color + '40' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Mid ring */}
        <motion.div
          className="absolute w-36 h-36 rounded-full border-2"
          style={{ borderColor: color, borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner accent ring */}
        <motion.div
          className="absolute w-28 h-28 rounded-full border border-dashed opacity-40"
          style={{ borderColor: color }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glow core */}
        <motion.div
          className="absolute w-24 h-24 rounded-full blur-2xl"
          style={{ backgroundColor: color, opacity: 0.3 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Value */}
        <div className="relative z-10 text-center">
          <motion.div
            key={entropy}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-orbitron font-black text-4xl"
            style={{ color, textShadow: `0 0 20px ${color}` }}
          >
            {entropy}
          </motion.div>
          <div className="font-jetbrains text-[9px] text-gray-500 tracking-widest mt-1">BITS OF ENTROPY</div>
        </div>
      </div>

      {/* Segment bars at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 px-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-1 rounded-sm"
            style={{ backgroundColor: i < (score / 5) ? color : ringColor }}
            animate={{ opacity: i < (score / 5) ? [0.7, 1, 0.7] : 0.3 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}
