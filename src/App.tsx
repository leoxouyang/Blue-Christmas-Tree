import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { useState } from 'react'

function App() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 45 }}
        className="w-full h-full"
      >
        <Experience autoRotate={autoRotate} zoom={zoom} />
      </Canvas>
      <Overlay
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        zoom={zoom}
        setZoom={setZoom}
      />
    </>
  )
}

export default App
