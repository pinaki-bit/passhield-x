import { motion } from 'framer-motion';
import { Shield, Fingerprint, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  isAuthenticating: boolean;
  isSuccess: boolean;
  onSubmit: () => void;
}

export default function GlassLoginForm({ isAuthenticating, isSuccess, onSubmit }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      animate={{
        rotateY: mousePosition.x * 10,
        rotateX: -mousePosition.y * 10,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 0.5 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="w-full max-w-md p-1 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_80px_rgba(6,182,212,0.15)] backdrop-blur-xl relative"
    >
      <div className="bg-[#050010]/60 rounded-[30px] p-8 relative overflow-hidden border border-white/5 backdrop-blur-2xl">
        
        {/* Subtle glowing orb inside the glass */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/30 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-500/30 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            {isSuccess ? (
              <CheckCircle2 size={28} className="text-emerald-400" />
            ) : (
              <Shield size={28} className="text-cyan-400" />
            )}
          </div>

          <h2 className="font-sans font-medium text-2xl text-white tracking-tight mb-2">
            {isSuccess ? 'Access Granted' : 'Secure Authentication'}
          </h2>
          <p className="font-sans text-xs text-gray-400 mb-8 tracking-[0.05em] text-center">
            {isSuccess 
              ? 'Establishing encrypted connection to enterprise dashboard...' 
              : 'Enter your credentials or use biometric login.'}
          </p>

          {!isSuccess && (
            <div className="w-full space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enterprise Email"
                  disabled={isAuthenticating}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Encryption Key"
                  disabled={isAuthenticating}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-sans text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
                />
                <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-600 bg-white/5 focus:ring-cyan-500 focus:ring-offset-0 text-cyan-500" />
                  <span className="font-sans text-[11px] text-gray-400">Remember node</span>
                </label>
                <a href="#" className="font-sans text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors">Recover Access</a>
              </div>

              <button
                onClick={onSubmit}
                disabled={isAuthenticating}
                className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white rounded-xl py-3.5 font-sans text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait relative overflow-hidden group"
              >
                {isAuthenticating ? (
                  <>
                    <motion.div 
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Initialize Session
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                
                {/* Sweep effect on hover */}
                {!isAuthenticating && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                )}
              </button>

              <div className="relative mt-8 mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-[#050010] px-3 text-gray-500">Or Continue With</span>
                </div>
              </div>

              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 font-sans text-sm font-medium flex items-center justify-center gap-3 transition-colors">
                <Fingerprint size={16} className="text-cyan-400" />
                Biometric Login
              </button>
            </div>
          )}

          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-400"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
