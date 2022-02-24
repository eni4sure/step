import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import type { NextPage } from "next";

export const IcosahedronGeometryMeshComponent: React.FC = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);

    // Hold state for hover and clicked events
    const [hovered, setHover] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));

    let scale = 1;
    if (hovered) scale = 1.5;
    if (clicked) scale = 2;

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={scale}
            onClick={(event) => setClicked(!clicked)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <icosahedronGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color={hovered ? "blue" : "white"} />
        </mesh>
    );
};

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen bg-gray-500">
            <Canvas>
                <Stars />
                <OrbitControls />
                <ambientLight intensity={2} />

                <IcosahedronGeometryMeshComponent />
            </Canvas>
        </main>
    );
};

export default Home;
