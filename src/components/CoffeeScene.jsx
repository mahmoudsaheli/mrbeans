import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { CoffeeCup } from './CoffeeCup';

export function CoffeeScene() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[700px]">
      <Canvas style={{ pointerEvents: 'none', touchAction: 'auto' }} camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.4} penumbra={1} intensity={2} color="#ce9d4f" />
        <spotLight position={[5, 0, -5]} angle={0.3} penumbra={1} intensity={1.5} color="#ce9d4f" />
        
        <Suspense fallback={null}>
          <CoffeeCup rotation={[0.15, -Math.PI / 3, 0]} scale={isMobile ? 0.65 : 1} />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.6} 
            scale={15} 
            blur={2.5} 
            far={4.5} 
            color="#ce9d4f"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
