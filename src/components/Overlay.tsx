import { motion } from 'framer-motion'
import { useState } from 'react'

interface OverlayProps {
    autoRotate: boolean
    setAutoRotate: (v: boolean) => void
    zoom: number
    setZoom: (v: number) => void
    floorColor: string
    setFloorColor: (v: string) => void
    floorBrightness: number
    setFloorBrightness: (v: number) => void
    floorSaturation: number
    setFloorSaturation: (v: number) => void
    spotlightOn: boolean
    setSpotlightOn: (v: boolean) => void
    spotlightIntensity: number
    setSpotlightIntensity: (v: number) => void
    spotlightColor: string
    setSpotlightColor: (v: string) => void
    ornamentGlow: number
    setOrnamentGlow: (v: number) => void
    lightGlow: number
    setLightGlow: (v: number) => void
    lightOpacity: number
    setLightOpacity: (v: number) => void
}

export const Overlay = ({
    autoRotate, setAutoRotate,
    zoom, setZoom,
    floorColor, setFloorColor,
    floorBrightness, setFloorBrightness,
    floorSaturation, setFloorSaturation,
    spotlightOn, setSpotlightOn,
    spotlightIntensity, setSpotlightIntensity,
    spotlightColor, setSpotlightColor,
    ornamentGlow, setOrnamentGlow,
    lightGlow, setLightGlow,
    lightOpacity, setLightOpacity
}: OverlayProps) => {
    const [activeTab, setActiveTab] = useState<'scene' | 'light'>('scene')

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-4 md:p-8 flex flex-col justify-between overflow-hidden">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-start pointer-events-auto"
            >
                <div>
                    <img src="/logo.jpg" alt="Blue Christmas" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    <p className="text-slate-300 text-sm mt-2 ml-1">Volumetric Edition</p>
                </div>

                {/* Side Controls - Desktop / Tablet */}
                <div className="hidden md:flex flex-col gap-4 bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 w-64">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Spotlight</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Power</span>
                            <button
                                onClick={() => setSpotlightOn(!spotlightOn)}
                                className={`w-10 h-5 rounded-full transition-colors relative ${spotlightOn ? 'bg-blue-500' : 'bg-slate-600'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${spotlightOn ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>

                        {spotlightOn && (
                            <>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                                        <span>Intensity</span>
                                        <span>{spotlightIntensity.toFixed(1)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={spotlightIntensity}
                                        onChange={(e) => setSpotlightIntensity(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                                        <span>Color</span>
                                    </div>
                                    <input
                                        type="color"
                                        value={spotlightColor}
                                        onChange={(e) => setSpotlightColor(e.target.value)}
                                        className="w-full h-8 rounded cursor-pointer bg-transparent border-none"
                                    />
                                </div>
                            </>
                        )}

                        <div className="h-px bg-white/10 my-2" />

                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tree</h3>
                        <div>
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                                <span>Ornament Glow</span>
                                <span>{ornamentGlow.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={ornamentGlow}
                                onChange={(e) => setOrnamentGlow(parseFloat(e.target.value))}
                                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                                <span>Light Glow</span>
                                <span>{lightGlow.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={lightGlow}
                                onChange={(e) => setLightGlow(parseFloat(e.target.value))}
                                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                                <span>Light Opacity</span>
                                <span>{lightOpacity.toFixed(2)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={lightOpacity}
                                onChange={(e) => setLightOpacity(parseFloat(e.target.value))}
                                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Controls Toggle */}
            <div className="md:hidden absolute top-24 right-4 pointer-events-auto">
                {/* Mobile simplified controls could go here if needed, but keeping it clean for now */}
            </div>

            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4 pointer-events-auto w-full max-w-2xl mx-auto"
            >
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('scene')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeTab === 'scene' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                            >
                                Scene
                            </button>
                            <button
                                onClick={() => setActiveTab('light')}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeTab === 'light' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                            >
                                Floor
                            </button>
                        </div>
                        <button
                            onClick={() => setAutoRotate(!autoRotate)}
                            className={`text-xs font-medium transition-colors ${autoRotate ? 'text-blue-400' : 'text-slate-400'}`}
                        >
                            {autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
                        </button>
                    </div>

                    {activeTab === 'scene' && (
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="flex justify-between text-xs text-slate-300 mb-1">
                                    <span>Zoom</span>
                                    <span>{zoom.toFixed(1)}x</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            <div className="md:hidden">
                                <div className="flex justify-between text-xs text-slate-300 mb-1">
                                    <span>Orn. Glow</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={ornamentGlow}
                                    onChange={(e) => setOrnamentGlow(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            <div className="md:hidden">
                                <div className="flex justify-between text-xs text-slate-300 mb-1">
                                    <span>Light Glow</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={lightGlow}
                                    onChange={(e) => setLightGlow(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            <div className="md:hidden">
                                <div className="flex justify-between text-xs text-slate-300 mb-1">
                                    <span>Opacity</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={lightOpacity}
                                    onChange={(e) => setLightOpacity(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'light' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                                        <span>Color</span>
                                    </div>
                                    <input
                                        type="color"
                                        value={floorColor}
                                        onChange={(e) => setFloorColor(e.target.value)}
                                        className="w-full h-8 rounded cursor-pointer bg-transparent border-none"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                                        <span>Brightness</span>
                                        <span>{Math.round(floorBrightness * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={floorBrightness}
                                        onChange={(e) => setFloorBrightness(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                                        <span>Saturation</span>
                                        <span>{Math.round(floorSaturation * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={floorSaturation}
                                        onChange={(e) => setFloorSaturation(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.footer>
        </div>
    )
}
