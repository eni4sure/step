import React from "react";
import * as THREE from "three";
import { Canvas, useLoader, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars, Edges, useTexture } from "@react-three/drei";

import type { NextPage } from "next";

export const IcosahedronGeometryMeshComponent: React.FC = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);
    const geometryRef = React.useRef<THREE.IcosahedronGeometry>(null!);

    // Hold state for hover and clicked events
    const [scale] = React.useState<number>(2);
    const [hovered, setHover] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01));

    // Highlight face when mesh is clicked
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        // Get the face that was clicked
        console.log("face", event.face);
        console.log("faceIndex", event.faceIndex);

        setClicked(!clicked);
    };

    return (
        <React.Fragment>
            <mesh
                {...props}
                ref={meshRef}
                scale={scale}
                onClick={(event) => handleClick(event)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
            >
                <icosahedronGeometry ref={geometryRef} attach="geometry" />
                <meshStandardMaterial attach="material" color={"white"} />
                <Edges visible={true} scale={1} renderOrder={200}>
                    <meshBasicMaterial color="#000" depthTest={true} />
                </Edges>
            </mesh>
        </React.Fragment>
    );
};

const Home: NextPage = () => {
    return (
        <main className="w-screen h-screen bg-gray-400">
            <Canvas>
                <Stars />
                <OrbitControls />
                <ambientLight intensity={3} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <React.Suspense fallback={null}>
                    <IcosahedronGeometryMeshComponent />
                </React.Suspense>
            </Canvas>
        </main>
    );
};

export default Home;
