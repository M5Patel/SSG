import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';

const ThreeBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-[-2]">
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={0.1} />
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sparkles count={80} scale={15} size={3} speed={0.1} opacity={0.4} color="#facc15" noise={0.2} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sparkles count={60} scale={12} size={2} speed={0.15} opacity={0.3} color="#fef08a" />
      </Float>
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <Sparkles count={30} scale={20} size={5} speed={0.05} opacity={0.2} color="#f59e0b" />
      </Float>
    </Canvas>
  </div>
);

export default ThreeBackground;
