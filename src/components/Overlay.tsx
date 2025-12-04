import { motion } from 'framer-motion'

interface OverlayProps {
    autoRotate: boolean
    setAutoRotate: (v: boolean) => void
    zoom: number
    setZoom: (v: number) => void
}

export const Overlay = ({ autoRotate, setAutoRotate, zoom, setZoom }: OverlayProps) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 flex flex-col justify-between">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-start"
            >
                <div>
                    <h1 className="text-3xl font-light text-white tracking-tight">Blue Christmas</h1>
                    <p className="text-slate-300 text-sm mt-1">Volumetric Edition</p>
                </div>
            </motion.header>

            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center pointer-events-auto"
            >
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex gap-6 items-center">
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${autoRotate
                            ? 'bg-blue-500 text-white shadow-blue-500/30 shadow-lg'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
                    </button>

                    <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Zoom</span>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.1"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-32 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>
            </motion.footer>
        </div>
    )
}
