import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import type { VaultState } from './AuthVault';

// ─── Procedural Spider Geometry ──────────────────────────────────────────────
function useSpiderGeometry() {
  return useMemo(() => {
    const pts: number[] = [];

    // Sample a CatmullRom curve → push to pts array
    const sampleCurve = (cpts: [number, number, number][], n: number) => {
      const curve = new THREE.CatmullRomCurve3(cpts.map(p => new THREE.Vector3(...p)));
      curve.getPoints(n).forEach(p => pts.push(p.x, p.y, p.z));
    };

    // Scatter random points inside an ellipse
    const ellipseFill = (cx: number, cy: number, rx: number, ry: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random());
        pts.push(cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r, (Math.random() - 0.5) * 0.06);
      }
    };

    // ── 8 Legs (4 per side, mirrored) ────────────────────────────────────────
    const leftLegs: [number, number, number][][] = [
      // L1 – top front (rises high outward)
      [[-0.5, 0.65, 0], [-1.2, 1.5, 0.05], [-2.2, 2.55, 0.12], [-3.1, 2.1, 0.05], [-3.8, 1.1, 0]],
      // L2 – mid front
      [[-0.5, 0.25, 0], [-1.4, 0.75, 0.05], [-2.7, 1.05, 0.1], [-3.8, 0.25, 0], [-4.2, -0.5, 0]],
      // L3 – mid back
      [[-0.5,-0.15, 0], [-1.5,-0.55, 0.05], [-2.8,-0.25, 0.1], [-3.9,-0.9, 0], [-4.2,-1.7, 0]],
      // L4 – back (sweeps low)
      [[-0.5,-0.55, 0], [-1.4,-1.4, 0.05], [-2.5,-1.3, 0.1], [-3.3,-2.1, 0], [-3.5,-3.1, 0]],
    ];

    leftLegs.forEach(leg => {
      sampleCurve(leg, 50);
      sampleCurve(leg.map(([x, y, z]) => [-x, y, z] as [number, number, number]), 50);
    });

    // ── Body sections ─────────────────────────────────────────────────────────
    ellipseFill(0, -1.9, 1.15, 2.1, 220); // Abdomen (large, bottom)
    ellipseFill(0,  0.3,  0.6,  0.7,  110); // Thorax (middle)
    ellipseFill(0,  1.45, 0.36, 0.37,  55); // Head (small, top)

    // ── Pedipalps (front feelers) ─────────────────────────────────────────────
    sampleCurve([[0.25, 1.45, 0], [0.72, 1.85, 0], [1.25, 2.05, 0], [1.6, 1.8, 0]], 22);
    sampleCurve([[-0.25, 1.45, 0], [-0.72, 1.85, 0], [-1.25, 2.05, 0], [-1.6, 1.8, 0]], 22);

    // ── Chelicerae (downward fangs from head) ─────────────────────────────────
    sampleCurve([[0.18, 1.1, 0], [0.42, 0.72, 0], [0.28, 0.38, 0]], 18);
    sampleCurve([[-0.18, 1.1, 0], [-0.42, 0.72, 0], [-0.28, 0.38, 0]], 18);

    // ── Spinnerets (bottom of abdomen) ────────────────────────────────────────
    sampleCurve([[0.1, -3.8, 0], [0.05, -4.2, 0], [0, -4.5, 0]], 12);
    sampleCurve([[-0.1, -3.8, 0], [-0.05, -4.2, 0], [0, -4.5, 0]], 12);

    return new Float32Array(pts);
  }, []);
}

// ─── Core Glow Orb ────────────────────────────────────────────────────────────
function CoreOrb({ vaultState }: { vaultState: VaultState }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const flareRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * (vaultState === 'scanning' ? 6 : 2.5)) * 0.12;

    if (outerRef.current) {
      outerRef.current.scale.setScalar(pulse);
      (outerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        (vaultState === 'scanning' || vaultState === 'unlocking') ? 5 + Math.sin(t * 8) * 2 : 3 + Math.sin(t * 3) * 1.2;
    }
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.2);
    }
    if (flareRef.current) {
      flareRef.current.rotation.z = t * 1.5;
      flareRef.current.scale.setScalar(0.9 + Math.sin(t * 3) * 0.15);
    }
  });

  return (
    <group position={[0, 0.3, 0.1]}>
      {/* Outer diffuse glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#cff4ff" emissive="#06b6d4" emissiveIntensity={3} transparent opacity={0.7} />
      </mesh>
      {/* Bright inner core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={10} />
      </mesh>
      {/* Rotating star flare */}
      <mesh ref={flareRef}>
        <boxGeometry args={[0.5, 0.018, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={8} />
      </mesh>
      <mesh ref={flareRef} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 0.018, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={8} />
      </mesh>
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VaultDoorModel({ vaultState }: { vaultState: VaultState }) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const reflGroupRef = useRef<THREE.Group>(null);
  const spiderPtsRef = useRef<THREE.Points>(null);

  const positions = useSpiderGeometry();

  // State-driven GSAP transitions
  useEffect(() => {
    if (!mainGroupRef.current) return;

    if (vaultState === 'scanning') {
      // Subtle forward lean toward camera
      gsap.to(mainGroupRef.current.rotation, { x: -0.06, duration: 2.5, ease: 'power2.inOut' });
      gsap.to(mainGroupRef.current.scale, { x: 1.04, y: 1.04, z: 1.04, duration: 2, ease: 'power2.out' });
    }
    if (vaultState === 'unlocking') {
      gsap.to(mainGroupRef.current.rotation, { x: 0, y: 0.1, duration: 2, ease: 'power2.inOut' });
    }
    if (vaultState === 'form_reveal') {
      // Spider recedes into background
      gsap.to(mainGroupRef.current.position, { z: -3, duration: 2, ease: 'power3.inOut' });
      gsap.to(mainGroupRef.current.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 2, ease: 'power3.inOut' });
      if (spiderPtsRef.current) {
        gsap.to((spiderPtsRef.current.material as THREE.PointsMaterial), { opacity: 0.25, duration: 2 });
      }
      if (reflGroupRef.current) {
        gsap.to(reflGroupRef.current, { visible: false, duration: 0.1, delay: 1 });
      }
    }
    if (vaultState === 'success') {
      gsap.to(mainGroupRef.current.position, { z: 15, duration: 1.5, ease: 'power4.in' });
    }
  }, [vaultState]);

  // Idle breathing
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mainGroupRef.current && vaultState !== 'form_reveal' && vaultState !== 'success') {
      mainGroupRef.current.position.y = Math.sin(t * 0.35) * 0.07;
      mainGroupRef.current.rotation.y = Math.sin(t * 0.18) * 0.025;
    }
    // Mirror reflection follows Y offset
    if (reflGroupRef.current && mainGroupRef.current) {
      reflGroupRef.current.position.y = -9.4 - Math.sin(t * 0.35) * 0.07;
    }
  });

  return (
    <>
      {/* ── Primary Spider ── */}
      <group ref={mainGroupRef}>
        <points ref={spiderPtsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.048}
            color="#c8f2ff"
            transparent
            opacity={0.88}
            sizeAttenuation
          />
        </points>
        <CoreOrb vaultState={vaultState} />
      </group>

      {/* ── Mirror Reflection (below) ── */}
      <group ref={reflGroupRef} scale={[1, -1, 1]} position={[0, -9.4, 0]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.032} color="#8ad8f0" transparent opacity={0.22} sizeAttenuation />
        </points>
        {/* Faint reflection core */}
        <mesh position={[0, 0.3, 0.1]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}
