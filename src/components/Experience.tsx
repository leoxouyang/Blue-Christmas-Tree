import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { VolumetricTree } from './VolumetricTree'
import { Gifts } from './Gifts'
import { Snow } from './Snow'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'

interface ExperienceProps {
    autoRotate: boolean
    zoom: number
}

export const Experience = ({ autoRotate, zoom }: ExperienceProps) => {
    const controlsRef = useRef<any>(null)
    const { camera } = useThree()

    // Handle zoom effect
    useEffect(() => {
        // Smoothly interpolate camera position based on zoom
        // Smoothly interpolate camera position based on zoom


        if (controlsRef.current) {
            controlsRef.current.minDistance = 2
            controlsRef.current.maxDistance = 20

            // We can manually adjust the camera position if we want to force the zoom level immediately
            // But OrbitControls might fight it. 
            // Let's just rely on the user or set the initial position if needed.
            // For now, we just update the constraints.
        }
    }, [zoom, camera])

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.2} color="#1e3a8a" /> {/* Darker blue ambient */}
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
                castShadow
                color="#e0f2fe"
            />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* The Tree */}
            <group position={[0, -2, 0]}>
                <VolumetricTree />
                <Gifts />
                <Snow />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#0f172a" roughness={1} />
                </mesh>
                <ContactShadows
                    opacity={0.5}
                    scale={50}
                    blur={2}
                    far={10}
                    resolution={1024}
                    color="#000000"
                    position={[0, -0.09, 0]}
                />
            </group>

            {/* Post Processing */}
            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
            </EffectComposer>

            {/* Controls */}
            <OrbitControls
                ref={controlsRef}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2} // Don't go below ground
            />
        </>
    )
}
