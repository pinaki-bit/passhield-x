import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CyberNetwork() {
  const count = 200;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }
    // Connect nearby nodes
    const linePos: number[] = [];
    const threshold = 3.5;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z);
          linePos.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { positions: pos, linePositions: new Float32Array(linePos) };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04;
      pointsRef.current.rotation.x = t * 0.02;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.04;
      linesRef.current.rotation.x = t * 0.02;
    }
  });

  return (
    <>
      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.12} />
      </lineSegments>

      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.7} sizeAttenuation />
      </points>
    </>
  );
}

function FloatingOrbs() {
  const orbs = useRef<THREE.Mesh[]>([]);
  const orbData = useMemo(() => [
    { pos: [-4, 2, -3] as [number,number,number], color: '#7c3aed', size: 0.6 },
    { pos: [4, -2, -4] as [number,number,number], color: '#06b6d4', size: 0.4 },
    { pos: [0, 3, -5] as [number,number,number], color: '#ec4899', size: 0.5 },
    { pos: [-5, -3, -2] as [number,number,number], color: '#7c3aed', size: 0.3 },
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    orbs.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y = orbData[i].pos[1] + Math.sin(t * 0.5 + i) * 0.5;
        orb.position.x = orbData[i].pos[0] + Math.cos(t * 0.3 + i) * 0.3;
      }
    });
  });

  return (
    <>
      {orbData.map((d, i) => (
        <mesh key={i} position={d.pos} ref={(el) => { if (el) orbs.current[i] = el; }}>
          <sphereGeometry args={[d.size, 16, 16]} />
          <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 bg-[#080010]">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 5]} color="#7c3aed" intensity={2} />
        <CyberNetwork />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
