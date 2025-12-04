# Blue Christmas Tree

A high-quality, stylized 3D Christmas tree web application built with React Three Fiber.

![Blue Christmas Tree](https://github.com/leoxouyang/Blue-Christmas-Tree/assets/placeholder.png)
*(Note: You can replace this with a real screenshot)*

## Overview

This project features a "volumetric" Christmas tree rendered in real-time using WebGL. It uses a particle/instance-based approach to create lush foliage and is decorated with a strictly blue and white color palette.

## Features

- **Volumetric Foliage**: Thousands of instanced meshes create a dense, realistic tree structure.
- **Dynamic Lighting**: Glowing LED lights with emissive materials and bloom post-processing.
- **Decorations**: Frosty blue baubles, glossy white spheres, and a custom 5-pointed star topper.
- **Atmosphere**: Deep blue background with gently falling snow particles.
- **Interactive**:
  - **Auto-Rotate**: Toggle rotation on/off.
  - **Zoom**: Adjust camera distance.
- **Performance**: Optimized using `InstancedMesh` for rendering thousands of objects efficiently.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Engine**: Three.js + React Three Fiber (@react-three/fiber)
- **Helpers**: @react-three/drei
- **Post-Processing**: @react-three/postprocessing
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/leoxouyang/Blue-Christmas-Tree.git
    cd Blue-Christmas-Tree
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## License

MIT
