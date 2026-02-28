import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Environment } from '@react-three/drei';

// A simple spinning cricket ball representation
function CricketBall() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
        // float effect
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <group ref={meshRef}>
            <Sphere args={[1.5, 64, 64]}>
                <meshStandardMaterial
                    color="#d2143a"
                    roughness={0.4}
                    metalness={0.1}
                    bumpScale={0.02}
                />
            </Sphere>
            {/* Seam representation */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.51, 0.05, 16, 100]} />
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
        </group>
    );
}

export default function HeroThreeScene() {
    return (
        <div className="absolute inset-0 z-0 bg-[#0b0f1a]">
            {/* Glowing background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cricket-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00ff87" />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <React.Suspense fallback={null}>
                    <CricketBall />
                    <Environment preset="city" />
                </React.Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2 + 0.2}
                    minPolarAngle={Math.PI / 2 - 0.2}
                />
            </Canvas>

            {/* Overlay gradient to blend with next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cricket-dark to-transparent z-10" />
        </div>
    );
}
