import { OrbitControls, Environment } from '@react-three/drei'
import { VolumetricTree } from './VolumetricTree'
import { Gifts } from './Gifts'
import { Snow } from './Snow'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ExperienceProps {
    autoRotate: boolean
    zoom: number
    floorColor: string
    floorBrightness: number
    floorSaturation: number
    spotlightOn: boolean
    spotlightIntensity: number
    spotlightColor: string
    ornamentGlow: number
    lightGlow: number
    lightOpacity: number
}

export const Experience = ({
    autoRotate,
    zoom,
    floorColor,
    floorBrightness,
    floorSaturation,
    spotlightOn,
    spotlightIntensity,
    spotlightColor,
    ornamentGlow,
    lightGlow,
    lightOpacity
}: ExperienceProps) => {
    const controlsRef = useRef<any>(null)
    const { camera } = useThree()

    // Handle zoom effect
    useEffect(() => {
        if (controlsRef.current) {
            // Smoothly interpolate camera distance or position based on zoom
            // Here we just set the min/max distance to constrain the user, 
            // but to actually "zoom" we might want to move the camera.
            // Let's try to adjust the camera position relative to target.
            // A simple way is to scale the vector from target to camera.

            // For now, let's just use the zoom prop to control the distance
            const targetDistance = 10 / zoom
            const currentPos = camera.position.clone()
            const target = controlsRef.current.target
            const direction = currentPos.sub(target).normalize()
            const desiredPos = direction.multiplyScalar(targetDistance).add(target)

            camera.position.lerp(desiredPos, 0.1)

            // Allow mouse zoom but constrain it
            controlsRef.current.minDistance = 2
            controlsRef.current.maxDistance = 20
        }
    }, [zoom, camera])

    // Calculate floor color based on brightness and saturation
    const finalFloorColor = new THREE.Color(floorColor)
    const hsl = { h: 0, s: 0, l: 0 }
    finalFloorColor.getHSL(hsl)
    finalFloorColor.setHSL(hsl.h, hsl.s * floorSaturation, hsl.l * floorBrightness)

    return (
        <>
            {/* Background Color */}
            <color attach="background" args={[finalFloorColor]} />

            {/* Lighting */}
            <ambientLight intensity={0.2} color="#1e3a8a" /> {/* Darker blue ambient */}

            {spotlightOn && (
                <spotLight
                    position={[0, 15, 0]}
                    angle={0.3}
                    penumbra={0.5}
                    intensity={spotlightIntensity}
                    castShadow
                    color={spotlightColor}
                    distance={30}
                    decay={2}
                />
            )}

            <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* The Tree */}
            <group position={[0, -2, 0]}>
                <VolumetricTree
                    ornamentGlow={ornamentGlow}
                    lightGlow={lightGlow}
                    lightOpacity={lightOpacity}
                />
                <Gifts />
                <Snow />

                {/* Infinite Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial
                        color={finalFloorColor}
                        roughness={0.8} // Increased roughness to reduce reflection
                        metalness={0.1}
                    />
                </mesh>

                {/* Removed ContactShadows to prevent flickering/z-fighting with the floor */}
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
