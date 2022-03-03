import React from "react";
import * as THREE from "three";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars, Edges, useTexture } from "@react-three/drei";

import type { NextPage } from "next";
import { Vector3 } from "three";

type TrianglePropType = {
    position: Vector3;

    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
};

export const TriangleMeshComponent = (props: TrianglePropType) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);

    // Hold state for hover and clicked events
    const [scale] = React.useState<number>(0.02);
    const [hovered, setHover] = React.useState<boolean>(false);
    const [clicked, setClicked] = React.useState<boolean>(false);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01));
    useFrame((state) => {
        if (props.rotateX) meshRef.current.rotation.x = props.rotateX;
        if (props.rotateY) meshRef.current.rotation.y = props.rotateY;
        if (props.rotateZ) meshRef.current.rotation.z = props.rotateZ;
        // meshRef.current.rotation.x += 0.01;
        // meshRef.current.rotation.y += 0.01;
    });

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
                <cylinderGeometry args={[0, 75, 100, 2]} />
                <meshStandardMaterial color={hovered ? "yellow" : "white"} />
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
                <spotLight position={new THREE.Vector3(10, 10, 10)} angle={0.15} penumbra={1} />
                <pointLight position={new THREE.Vector3(-10, -10, -10)} />

                <React.Suspense fallback={null}>
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 0)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 1.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 3)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 4.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 6)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 7.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 9)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 10.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 0, 12)} />

                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 1.5)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 3)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 4.5)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 6)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 7.5)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 9)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 2, 10.5)} />

                    <TriangleMeshComponent position={new THREE.Vector3(0, 4, 3)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 4, 4.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 4, 6)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 4, 7.5)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 4, 9)} />

                    <TriangleMeshComponent position={new THREE.Vector3(0, 6, 4.5)} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 6, 6)} rotateX={Math.PI} />
                    <TriangleMeshComponent position={new THREE.Vector3(0, 6, 7.5)} />

                    <TriangleMeshComponent position={new THREE.Vector3(0, 8, 6)} />
                </React.Suspense>
            </Canvas>
        </main>
    );
};

export default Home;
