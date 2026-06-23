import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Elegant Refractive Security Crystal ──────────────────────────────────────
function SecureEnclave() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.rotation.x = t * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.15;
      innerRef.current.rotation.z = t * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.5 + Math.PI / 2;
      ringRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* Inner Solid Core (The "Vault") */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#050507"
            roughness={0.2}
            metalness={0.9}
            envMapIntensity={2}
          />
        </mesh>

        {/* Outer Refractive Glass Shell (The "Shield") */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1.5}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
            transmission={1}
            roughness={0.05}
            ior={1.5}
          />
        </mesh>

        {/* Floating Minimalist Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[3.2, 0.008, 32, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#8BA6D5"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ─── Main Canvas ─────────────────────────────────────────────────────────────
export default function PremiumHero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ fov: 45, position: [0, 0, 9] }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 8, 20]} />

        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} color="#8BA6D5" />

        <SecureEnclave />

        {/* High-quality reflection environment */}
        <Environment preset="studio" />

        {/* Extremely subtle post-processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={1.2} // Only bloom very bright elements
            luminanceSmoothing={0.9}
            intensity={0.5}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
      
      {/* Soft Vignette Overlay to blend 3D with the page background */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, transparent 30%, #050507 100%)' }} 
      />
    </div>
  );
}
