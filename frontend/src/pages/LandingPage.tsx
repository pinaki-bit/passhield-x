import Navbar from '../components/layout/Navbar';
import Scene from '../components/3d/Scene';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

interface LandingProps {
  onSignIn?: () => void;
  onEnter?: () => void;
}

export default function LandingPage({ onSignIn, onEnter }: LandingProps) {
  return (
    <div className="relative w-full min-h-screen bg-[var(--background)] overflow-x-hidden text-white font-sans">
      <Navbar onSignIn={onSignIn} />
      
      {/* 3D Background - fixed and spans entire viewport */}
      <Scene />
      
      {/* Foreground Content */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection onSignIn={onSignIn} onEnter={onEnter} />
        <FeaturesSection />
        
        {/* Simple Footer directly embedded for now */}
        <footer className="w-full py-8 text-center text-gray-500 text-sm bg-black/50 backdrop-blur-md border-t border-white/5">
          <p>© {new Date().getFullYear()} PASSHIELD-X. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
