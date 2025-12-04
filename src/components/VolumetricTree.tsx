import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const TREE_HEIGHT = 7
const TREE_RADIUS = 2.8
const FOLIAGE_COUNT = 4000
const BAUBLE_COUNT = 150
const LIGHT_COUNT = 200

export const VolumetricTree = () => {
    const foliageMesh = useRef<THREE.InstancedMesh>(null)
    const baubleMesh = useRef<THREE.InstancedMesh>(null)
    const lightMesh = useRef<THREE.InstancedMesh>(null)

    const updateInstances = (mesh: THREE.InstancedMesh, count: number, type: 'foliage' | 'bauble' | 'light') => {
        const tempObject = new THREE.Object3D()
        const color = new THREE.Color()

        for (let i = 0; i < count; i++) {
            let x, y, z, scale;

            if (type === 'foliage') {
                y = Math.random() * TREE_HEIGHT
                const maxR = TREE_RADIUS * (1 - y / TREE_HEIGHT)
                const r = Math.random() * maxR
                const angle = Math.random() * Math.PI * 2
                x = Math.cos(angle) * r
                z = Math.sin(angle) * r

                tempObject.position.set(x, y, z)
                tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
                scale = Math.random() * 0.2 + 0.1
                tempObject.scale.set(scale, scale, scale)

                // Color
                const palette = ['#0B1026', '#172554', '#1E3A8A', '#93C5FD'] // Dark blues to light blue
                // 5% chance of white (snow)
                const isSnow = Math.random() > 0.95
                color.set(isSnow ? '#ffffff' : palette[Math.floor(Math.random() * palette.length)])
                mesh.setColorAt(i, color)

            } else if (type === 'bauble') {
                y = Math.random() * (TREE_HEIGHT - 0.5) + 0.5 // Don't put at very bottom
                const maxR = TREE_RADIUS * (1 - y / TREE_HEIGHT)
                // Mostly on surface
                const r = maxR * (0.8 + Math.random() * 0.2)
                const angle = Math.random() * Math.PI * 2
                x = Math.cos(angle) * r
                z = Math.sin(angle) * r

                tempObject.position.set(x, y, z)
                tempObject.rotation.set(0, 0, 0)
                scale = Math.random() * 0.15 + 0.1
                tempObject.scale.set(scale, scale, scale)

                // Color: Frosty Blue, White, Silver
                const palette = ['#60A5FA', '#FFFFFF', '#CBD5E1', '#3B82F6']
                color.set(palette[Math.floor(Math.random() * palette.length)])
                mesh.setColorAt(i, color)

            } else if (type === 'light') {
                // Spiral wrapping
                const t = i / count
                y = t * TREE_HEIGHT
                const maxR = TREE_RADIUS * (1 - y / TREE_HEIGHT)
                const r = maxR + 0.1 // Slightly outside
                const angle = t * 30 // Many turns
                x = Math.cos(angle) * r
                z = Math.sin(angle) * r

                tempObject.position.set(x, y, z)
                scale = 0.05
                tempObject.scale.set(scale, scale, scale)

                // Color: Warm white / Blueish
                color.set(Math.random() > 0.5 ? '#bfdbfe' : '#fffff0')
                mesh.setColorAt(i, color)
            }

            tempObject.updateMatrix()
            mesh.setMatrixAt(i, tempObject.matrix)
        }
        mesh.instanceMatrix.needsUpdate = true
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    }

    useEffect(() => {
        if (foliageMesh.current) updateInstances(foliageMesh.current, FOLIAGE_COUNT, 'foliage')
        if (baubleMesh.current) updateInstances(baubleMesh.current, BAUBLE_COUNT, 'bauble')
        if (lightMesh.current) updateInstances(lightMesh.current, LIGHT_COUNT, 'light')
    }, [])

    // Animation for lights
    useFrame((state) => {
        if (lightMesh.current) {
            const time = state.clock.getElapsedTime()
            lightMesh.current.rotation.y = time * 0.05
        }
    })

    return (
        <group>
            {/* Foliage */}
            <instancedMesh ref={foliageMesh} args={[undefined, undefined, FOLIAGE_COUNT]}>
                <coneGeometry args={[1, 1, 4]} /> {/* Individual needle/branch shape */}
                <meshStandardMaterial
                    roughness={0.8}
                    color="#ffffff" // Base color, tinted by instance color
                />
            </instancedMesh>

            {/* Baubles */}
            <instancedMesh ref={baubleMesh} args={[undefined, undefined, BAUBLE_COUNT]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    roughness={0.1}
                    metalness={0.8}
                    color="#ffffff"
                />
            </instancedMesh>

            {/* Lights */}
            <instancedMesh ref={lightMesh} args={[undefined, undefined, LIGHT_COUNT]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshStandardMaterial
                    emissive="#ffffff"
                    emissiveIntensity={2}
                    toneMapped={false}
                    color="#ffffff"
                />
            </instancedMesh>

            {/* Central Trunk (Hidden mostly but good for structure) */}
            <mesh position={[0, TREE_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.2, 0.8, TREE_HEIGHT, 8]} />
                <meshStandardMaterial color="#3f2e20" />
            </mesh>

            {/* Star on top */}
            <StarTopper />
        </group>
    )
}

const StarTopper = () => {
    const shape = useMemo(() => {
        const starShape = new THREE.Shape()
        const points = 5
        const outerRadius = 0.6
        const innerRadius = 0.25

        for (let i = 0; i < points * 2; i++) {
            const angle = (i * Math.PI) / points + Math.PI / 2
            const radius = i % 2 === 0 ? outerRadius : innerRadius
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            if (i === 0) starShape.moveTo(x, y)
            else starShape.lineTo(x, y)
        }
        starShape.closePath()
        return starShape
    }, [])

    const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 2
    }

    return (
        <mesh position={[0, TREE_HEIGHT + 0.6, 0]} rotation={[0, 0, 0]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial
                emissive="#ffffff"
                emissiveIntensity={4}
                toneMapped={false}
                color="#e0f2fe"
            />
        </mesh>
    )
}
