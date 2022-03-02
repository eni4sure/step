import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Edges } from "@react-three/drei";

import type { NextPage } from "next";

export const IcosahedronGeometryMeshComponent: React.FC = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);

    // Hold state for hover and clicked events
    const [hovered, setHover] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));

    const scale = 2;

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
                <Edges visible={true} scale={1} renderOrder={200}>
                    <meshBasicMaterial color="#000" depthTest={true} />
                </Edges>
            </mesh>
        </React.Fragment>
    );
};

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen bg-gray-500">
            <Canvas dpr={[1, 2]}>
                <Stars />
                <OrbitControls />
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <IcosahedronGeometryMeshComponent />
            </Canvas>
        </main>
    );
};

export default Home;
