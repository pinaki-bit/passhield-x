import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Terminal } from 'lucide-react';

const COLOR_MAP: Record<string, string> = {
  STANDBY: '#64748b',
  CRITICAL: '#ef4444',
  VULNERABLE: '#f59e0b',
  SECURE: '#06b6d4',
  IMPENETRABLE: '#10b981',
};

export default function AICopilot({ feedback, strength }: { feedback: string[]; strength: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = feedback.join('\n');
  const color = COLOR_MAP[strength] ?? '#7c3aed';

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + (fullText[i] ?? ''));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Bot size={18} style={{ color }} />
        </motion.div>
        <span className="font-jetbrains text-[10px] tracking-widest text-gray-500">AI SECURITY COPILOT</span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <div
        className="flex-1 relative rounded-xl p-4 overflow-hidden"
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${color}25`,
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800/60">
          <Terminal size={12} className="text-gray-600" />
          <span className="font-jetbrains text-[9px] text-gray-600 tracking-widest">passhield-x://analysis.sh</span>
          <div className="ml-auto flex gap-1">
            {['#ef4444', '#f59e0b', '#10b981'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        {/* Output text */}
        <div className="font-jetbrains text-sm leading-relaxed whitespace-pre-line" style={{ color }}>
          <span className="text-gray-600">$ </span>
          {displayedText}
          {displayedText.length < fullText.length && (
            <motion.span
              className="inline-block w-2 h-4 align-middle ml-0.5"
              style={{ backgroundColor: color }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </div>

        {/* Holographic scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          }}
        />
      </div>
    </div>
  );
}
