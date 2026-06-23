import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export default function CyberShield() {
  const gridRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Animate grid moving towards camera
    if (gridRef.current) {
      gridRef.current.position.z += delta * 2;
      if (gridRef.current.position.z > 2) {
        gridRef.current.position.z = 0;
      }
    }
    
    // Rotate core cube
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.5;
      coreRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group>
      {/* Moving Cyberpunk Grid */}
      <mesh ref={gridRef} position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial 
          color="#ff003c" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Floating Neon Core (Replaces Sphere) */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[0, 0, -2]}>
        <mesh ref={coreRef}>
          {/* Cyberpunk Cube */}
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#020005" 
            emissive="#00f0ff"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        
        {/* Inner solid core */}
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshBasicMaterial color="#020005" />
        </mesh>
      </Float>

      {/* Accents - Floating rings around the cube */}
      <Float speed={2} rotationIntensity={2} position={[0, 0, -2]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#fcee0a" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ff003c" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
