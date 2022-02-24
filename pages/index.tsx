import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";

import type { NextPage } from "next";

export const IcosahedronGeometryMeshComponent: React.FC = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);

    // Hold state for hover and clicked events
    const [hovered, setHover] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));

    let scale = 2;
    if (hovered) scale = 2.5;
    if (clicked) scale = 3;

    return (
        <React.Fragment>
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

            <EffectComposer autoClear={false}>
                <Outline blur={true} selection={meshRef} visibleEdgeColor={0x000000} edgeStrength={5} />
            </EffectComposer>
        </React.Fragment>
    );
};

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen bg-gray-500">
            <Canvas dpr={[1, 2]}>
                <Stars />
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <IcosahedronGeometryMeshComponent />
            </Canvas>
        </main>
    );
};

export default Home;
