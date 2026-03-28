import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function CoffeeBeans({ count = 300 }) {
  const meshRef = useRef();
  
  // A simple coffee bean geometry: ellipsoid
  const beanGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.12, 16, 16);
    // Flatten on Y and squish slightly on Z, elongate on X
    geo.scale(1.3, 0.7, 0.9); 
    return geo;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-calculate positions and rotations
  const beansData = useMemo(() => {
    const data = [];
    
    // Distribute them widely around the scene
    for (let i = 0; i < count; i++) {
        const radius = 2 + Math.pow(Math.random(), 0.5) * 12; // Random radius from 2 to 14
        const angle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -2.45 + (Math.random() * 0.1); // On the floor plane
        
        const rotationX = Math.random() * Math.PI;
        const rotationY = Math.random() * Math.PI;
        const rotationZ = Math.random() * Math.PI;
        
        const scale = 0.7 + Math.random() * 0.5;
        
        data.push({ position: [x, y, z], rotation: [rotationX, rotationY, rotationZ], scale });
    }
    
    // Add a dense pile near the cup base
    for (let i = 0; i < count / 1.5; i++) {
        const radius = 1.3 + Math.random() * 2.5; 
        const angle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -2.45 + Math.random() * 0.3; // piled up slightly
        
        const rotationX = Math.random() * Math.PI;
        const rotationY = Math.random() * Math.PI;
        const rotationZ = Math.random() * Math.PI;
        
        const scale = 0.7 + Math.random() * 0.6;
        
        data.push({ position: [x, y, z], rotation: [rotationX, rotationY, rotationZ], scale });
    }
    
    return data;
  }, [count]);

  // Update instance matrices
  React.useEffect(() => {
    if (meshRef.current) {
        beansData.forEach((data, i) => {
            dummy.position.set(...data.position);
            dummy.rotation.set(...data.rotation);
            dummy.scale.set(data.scale, data.scale, data.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [beansData, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[beanGeometry, null, beansData.length]} castShadow receiveShadow>
        <meshStandardMaterial 
            color="#2a140d" 
            roughness={0.7} 
            metalness={0.1}
        />
    </instancedMesh>
  );
}
