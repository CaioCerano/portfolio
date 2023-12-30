import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TestMesh() {
    const meshRef = useRef<THREE.Points>(null);
    const numPoints = 10000;

    // Generate points
    const [positions] = useMemo(() => {
        const positions = new Float32Array(numPoints * 3); // 3 values per point (x, y, z)

        for (let i = 0; i < numPoints; i++) {
            const x = (i % 100) - 50;
            const y = Math.floor(i / 100) - 50;

            positions.set([x, y, 0], i * 3); // Set x, y, z for each point
        }

        return [positions];
    }, [numPoints]);

    // Animate points
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (meshRef.current) {
            const positions = meshRef.current.geometry.attributes.position.array;

            for (let i = 0; i < numPoints; i++) {
                const x = positions[i * 3];
                const y = positions[i * 3 + 1];

                const waveX1 = 0.5 * Math.sin(x / 2 + time);
                const waveX2 = 0.25 * Math.sin(x / 3 + time * 2);
                const waveY1 = 0.1 * Math.sin(y + time);

                positions[i * 3 + 2] = waveX1 + waveX2 + waveY1; // Update z position
            }

            meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Canvas style={{ background: 'red' }}>
            <points ref={meshRef}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    attach="material"
                    color="white"
                    size={0.1}
                    sizeAttenuation
                />
            </points>
        </Canvas>
    );
}


export default TestMesh;
