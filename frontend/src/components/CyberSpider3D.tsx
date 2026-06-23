import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

// ─── Custom Shader for Image Point Cloud ─────────────────────────────────────
const HologramMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uDepth: { value: 2.0 }, // How far bright pixels protrude
    uPointSize: { value: 2.5 },
  },
  vertexShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uDepth;
    uniform float uPointSize;
    
    varying vec2 vUv;
    varying vec3 vColor;
    
    void main() {
      vUv = uv;
      // Sample the texture at this vertex
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Calculate brightness (luminance)
      float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      vColor = texColor.rgb;
      
      // Displace z-axis based on brightness
      vec3 pos = position;
      
      // Add subtle wave animation to the depth
      float wave = sin(pos.x * 2.0 + uTime * 1.5) * 0.05 + cos(pos.y * 2.0 + uTime * 1.0) * 0.05;
      
      pos.z += brightness * uDepth + wave;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size attenuation based on depth
      gl_PointSize = uPointSize * (20.0 / -mvPosition.z);
      
      // If the pixel is too dark, we shrink it to 0 so it disappears
      if (brightness < 0.05) {
        gl_PointSize = 0.0;
      }
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vColor;
    
    void main() {
      // Make particles circular with soft edges
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;
      
      // Soft glow falloff
      float alpha = smoothstep(0.5, 0.1, dist);
      
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};

// ─── Shader-Based Hologram Mesh ──────────────────────────────────────────────
function ShaderHologram() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load the exact reference image
  const texture = useLoader(THREE.TextureLoader, '/spider-reference.png');
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Image is highly vertical, let's keep exact proportions
  // e.g., if image is 1080x1920, aspect is 0.5625
  const aspect = texture.image.width / texture.image.height;
  const height = 18;
  const width = height * aspect;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      // Subtle hovering
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
      meshRef.current.rotation.y = Math.sin(t * 0.25) * 0.06;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      {/* Dense plane geometry: creates a vertex for almost every pixel group */}
      <planeGeometry args={[width, height, 400, Math.floor(400 / aspect)]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          ...HologramMaterial.uniforms,
          uTexture: { value: texture },
        }}
        vertexShader={HologramMaterial.vertexShader}
        fragmentShader={HologramMaterial.fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Camera ───────────────────────────────────────────────────────────────────
function CameraController() {
  const { camera, pointer } = useThree();
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(0, 0, 16);
    gsap.to(camera.position, { z: 12.5, duration: 4, ease: 'power2.out' });
  }, [camera]);

  useFrame(() => {
    targetRef.current.x = pointer.x * 0.9;
    targetRef.current.y = pointer.y * 0.9;

    camera.position.x += (targetRef.current.x - camera.position.x) * 0.04;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── The Full Scene ────────────────────────────────────────────────────────────
export default function CyberSpider3D() {
  return (
    <Canvas
      camera={{ fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 2]}
    >
      {/* Pure black background to match image exactly */}
      <color attach="background" args={['#000000']} />
      
      <ShaderHologram />
      <CameraController />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.8}
          intensity={1.8}
          blendFunction={BlendFunction.ADD}
        />
        {/* Subtle chromatic aberration to give it that lens feel without ruining colors */}
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0006, 0.0006)}
        />
      </EffectComposer>
    </Canvas>
  );
}
