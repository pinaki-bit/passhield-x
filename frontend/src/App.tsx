import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import AuthVault from './components/vault/AuthVault';
import LandingPage from './pages/LandingPage';
import './index.css';

type Stage = 'hero' | 'auth' | 'dashboard';

export default function App() {
  const [stage, setStage] = useState<Stage>('hero');

  return (
    <div className="relative w-full min-h-screen bg-[var(--background)] overflow-x-hidden">
      <AnimatePresence mode="wait">

        {stage === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <LandingPage 
              onEnter={() => setStage('dashboard')} 
              onSignIn={() => setStage('auth')} 
            />
          </motion.div>
        )}

        {stage === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full z-50 bg-[var(--background)]"
          >
            <AuthVault onSuccess={() => setStage('dashboard')} />
          </motion.div>
        )}

        {stage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen"
            style={{ background: 'var(--background)' }}
          >
            <Dashboard />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
