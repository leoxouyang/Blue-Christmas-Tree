import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { useState } from 'react'

function App() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Floor State
  const [floorColor, setFloorColor] = useState('#0f172a')
  const [floorBrightness, setFloorBrightness] = useState(1)
  const [floorSaturation, setFloorSaturation] = useState(1)

  // Spotlight State
  const [spotlightOn, setSpotlightOn] = useState(true)
  const [spotlightIntensity, setSpotlightIntensity] = useState(2)
  const [spotlightColor, setSpotlightColor] = useState('#e0f2fe')

  // Tree State
  const [ornamentGlow, setOrnamentGlow] = useState(2)
  const [lightGlow, setLightGlow] = useState(2)
  const [lightOpacity, setLightOpacity] = useState(1)

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 45 }}
        className="w-full h-full"
      >
        <Experience
          autoRotate={autoRotate}
          zoom={zoom}
          floorColor={floorColor}
          floorBrightness={floorBrightness}
          floorSaturation={floorSaturation}
          spotlightOn={spotlightOn}
          spotlightIntensity={spotlightIntensity}
          spotlightColor={spotlightColor}
          ornamentGlow={ornamentGlow}
          lightGlow={lightGlow}
          lightOpacity={lightOpacity}
        />
      </Canvas>
      <Overlay
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        zoom={zoom}
        setZoom={setZoom}
        floorColor={floorColor}
        setFloorColor={setFloorColor}
        floorBrightness={floorBrightness}
        setFloorBrightness={setFloorBrightness}
        floorSaturation={floorSaturation}
        setFloorSaturation={setFloorSaturation}
        spotlightOn={spotlightOn}
        setSpotlightOn={setSpotlightOn}
        spotlightIntensity={spotlightIntensity}
        setSpotlightIntensity={setSpotlightIntensity}
        spotlightColor={spotlightColor}
        setSpotlightColor={setSpotlightColor}
        ornamentGlow={ornamentGlow}
        setOrnamentGlow={setOrnamentGlow}
        lightGlow={lightGlow}
        setLightGlow={setLightGlow}
        lightOpacity={lightOpacity}
        setLightOpacity={setLightOpacity}
      />
    </>
  )
}

export default App
