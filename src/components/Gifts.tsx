import { useMemo } from 'react'


const GIFT_COUNT = 20

export const Gifts = () => {
    const gifts = useMemo(() => {
        const temp = []
        const palette = ['#1e40af', '#3b82f6', '#ffffff', '#94a3b8'] // Blue, Light Blue, White, Silver

        for (let i = 0; i < GIFT_COUNT; i++) {
            // Random position around the tree base
            const angle = Math.random() * Math.PI * 2
            const minR = 2.5 // Outside the trunk/lower branches
            const maxR = 5.0
            const r = minR + Math.random() * (maxR - minR)

            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            // Random size
            const size = 0.4 + Math.random() * 0.4
            const height = size * (0.8 + Math.random() * 0.4)

            // Random rotation
            const rotation = Math.random() * Math.PI

            // Color
            const color = palette[Math.floor(Math.random() * palette.length)]

            temp.push({ position: [x, height / 2, z], size: [size, height, size], rotation: [0, rotation, 0], color })
        }
        return temp
    }, [])

    return (
        <group>
            {gifts.map((gift, i) => (
                <group key={i} position={gift.position as [number, number, number]} rotation={gift.rotation as [number, number, number]}>
                    {/* Box */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={gift.size as [number, number, number]} />
                        <meshStandardMaterial color={gift.color} roughness={0.3} />
                    </mesh>

                    {/* Ribbon (Vertical) */}
                    <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 0.2]}>
                        <boxGeometry args={gift.size as [number, number, number]} />
                        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.5} />
                    </mesh>

                    {/* Ribbon (Horizontal) */}
                    <mesh position={[0, 0, 0]} scale={[0.2, 1.02, 1.02]}>
                        <boxGeometry args={gift.size as [number, number, number]} />
                        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}
