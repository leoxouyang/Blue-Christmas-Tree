import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const SNOW_COUNT = 1000

export const Snow = () => {
    const points = useRef<THREE.Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(SNOW_COUNT * 3)

        for (let i = 0; i < SNOW_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20 // x
            positions[i * 3 + 1] = Math.random() * 15 // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
        }

        return positions
    }, [])

    useFrame((state) => {
        if (!points.current) return

        const positions = points.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < SNOW_COUNT; i++) {
            // Move down
            positions[i * 3 + 1] -= 0.02 + Math.random() * 0.02

            // Reset if below ground
            if (positions[i * 3 + 1] < -2) {
                positions[i * 3 + 1] = 10 + Math.random() * 5
                positions[i * 3] = (Math.random() - 0.5) * 20
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20
            }

            // Slight wind wobble
            positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002
        }

        points.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}
