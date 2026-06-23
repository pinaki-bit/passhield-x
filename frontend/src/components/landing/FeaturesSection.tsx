import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Fingerprint, Lock, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: ShieldAlert, title: 'Zero-Knowledge', desc: 'Your master password never leaves your device. We cannot access your data even if we tried.' },
  { icon: Fingerprint, title: 'Biometric Auth', desc: 'Seamlessly integrate with Windows Hello, Touch ID, and Face ID for instant access.' },
  { icon: Lock, title: 'AES-256 GCM', desc: 'The gold standard of encryption algorithms, safeguarding your vault against quantum threats.' },
  { icon: Zap, title: 'Real-Time Sync', desc: 'Instantaneous synchronization across all your devices with end-to-end encryption.' },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative w-full min-h-screen py-32 z-10 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            Engineered for <span className="text-gradient-premium">Absolute Security</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A beautiful shell hiding an impenetrable fortress. Every feature is designed with zero-knowledge, privacy-first principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-panel p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <feature.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-white tracking-tight">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed font-light text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
