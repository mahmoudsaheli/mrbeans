import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Decal, Float, RoundedBox } from '@react-three/drei';

export function CoffeeCup(props) {
  const cupRef = useRef();
  const texture = useTexture('/cup-label.svg');

  // Slowly rotate the cup continuously
  useFrame((state, delta) => {
    if (cupRef.current) {
      cupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={cupRef} {...props} dispose={null}>
        
        {/* Cup Body (Tapered Cylinder) */}
        <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
          <cylinderGeometry args={[1.3, 0.95, 3.5, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
          {/* Front Logo Decal */}
          <Decal
            position={[0, 0.1, 1.18]}
            rotation={[0, 0, 0]}
            scale={[1.7, 1.7, 1.7]}
            map={texture}
            depthTest={true}
          />
          {/* Back Logo Decal */}
          <Decal
            position={[0, 0.1, -1.18]}
            rotation={[0, Math.PI, 0]}
            scale={[1.7, 1.7, 1.7]}
            map={texture}
            depthTest={true}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
        
        {/* --- DETAILED TAKEAWAY LID --- */}
        <group position={[0, 1.55, 0]}>
          
          {/* Base Overlap Ring (Lowest rim that snaps onto the cup) */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[1.34, 0.05, 32, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.15} />
          </mesh>

          {/* Secondary Ridge (Locking mechanism indent) */}
          <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[1.32, 0.04, 32, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.15} />
          </mesh>

          {/* Main Upward Angled Wall */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.35, 0.22, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.15} />
          </mesh>

          {/* Top Prominent Edge Ring */}
          <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[1.16, 0.06, 32, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.2} />
          </mesh>

          {/* Inner Recessed Flat Area (Where coffee pools) */}
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[1.15, 1.15, 0.02, 64]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />
          </mesh>

          {/* Raised Drinking Spout/Mouthpiece Area */}
          <group position={[0, 0.32, 1.05]} rotation={[-0.08, 0, 0]}>
            {/* The raised ergonomic block for the lip */}
            <RoundedBox args={[0.65, 0.2, 0.35]} radius={0.06} smoothness={4} position={[0, 0.04, 0]} castShadow>
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.15} />
            </RoundedBox>
            
            {/* The recessed sip hole inside the block */}
            <RoundedBox args={[0.25, 0.05, 0.12]} radius={0.02} smoothness={2} position={[0, 0.14, 0.05]}>
              <meshBasicMaterial color="#050505" />
            </RoundedBox>
          </group>

          {/* Small breather hole opposite to the spout */}
          <mesh position={[0, 0.25, -0.9]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 16]} />
            <meshBasicMaterial color="#050505" />
          </mesh>

        </group>

      </group>
    </Float>
  );
}
