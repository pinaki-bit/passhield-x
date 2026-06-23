import { motion } from 'framer-motion';

interface NavbarProps {
  onSignIn?: () => void;
}

export default function Navbar({ onSignIn }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 px-6 pt-6"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-2xl glass-panel">
        
        {/* Minimalist Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-black" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            PASSHIELD-X
          </span>
        </div>

        {/* Elegant Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--muted)]">
          {['Technology', 'Architecture', 'Enterprise'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Premium CTA */}
        <button
          onClick={onSignIn}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 text-white"
        >
          Sign In
        </button>

      </div>
    </motion.nav>
  );
}
