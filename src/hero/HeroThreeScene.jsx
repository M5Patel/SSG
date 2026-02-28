import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls, Environment, Float, Stars } from '@react-three/drei';

// A simple red cricket ball representation
const CricketBall = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#aa0000"
                    roughness={0.4}
                    metalness={0.1}
                    bumpScale={0.02}
                />
                {/* The Seam (simplified as a torus around the middle) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.01, 0.03, 16, 100]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.8} />
                </mesh>
            </mesh>
        </Float>
    );
};

// Abstract glowing orbs for stadium aesthetic
const DistortedOrb = ({ color, position, scale, distort, speed }) => {
    return (
        <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[1, 32, 32]} position={position} scale={scale}>
                <MeshDistortMaterial
                    color={color}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.5}
                    roughness={0.2}
                    distort={distort}
                    speed={speed}
                />
            </Sphere>
        </Float>
    );
};

const HeroThreeScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <spotLight position={[-10, 10, -5]} intensity={2} color="#00E5FF" angle={0.3} penumbra={1} />
                <spotLight position={[10, -10, 5]} intensity={2} color="#FF0055" angle={0.3} penumbra={1} />

                {/* Background Stars/Particles */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Central Cricket Ball */}
                <CricketBall />

                {/* Floating abstract glowing elements representing stadium energy */}
                <DistortedOrb color="#00E5FF" position={[-4, 2, -2]} scale={0.8} distort={0.4} speed={2} />
                <DistortedOrb color="#FF0055" position={[4, -2, -1]} scale={0.6} distort={0.5} speed={3} />
                <DistortedOrb color="#FFD700" position={[-3, -3, 0]} scale={0.4} distort={0.6} speed={4} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default HeroThreeScene;
