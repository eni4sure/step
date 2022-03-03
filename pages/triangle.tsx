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

    trianglesBroken: number;
    setTrianglesBroken?: (trianglesBroken: number) => void;
};

export const TriangleMeshComponent = (props: TrianglePropType) => {
    // This reference gives us direct access to the THREE.Mesh object
    const meshRef = React.useRef<THREE.Mesh>(null!);

    const { rotateX, rotateY, rotateZ, trianglesBroken, setTrianglesBroken, ...remaining_prop } = props;

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

    // When mesh is clicked
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        if (props.setTrianglesBroken) {
            // Increment the broken counter
            props.setTrianglesBroken(props.trianglesBroken + 1);
            return;
        }

        setClicked(!clicked);
    };

    return (
        <React.Fragment>
            <mesh
                ref={meshRef}
                scale={scale}
                onClick={(event) => handleClick(event)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                {...remaining_prop}
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
    const [trianglesBroken, setTrianglesBroken] = React.useState<number>(0);

    console.log(trianglesBroken);
    return (
        <main className="w-screen h-screen bg-gray-400">
            <Canvas>
                <Stars />
                <OrbitControls />
                <ambientLight intensity={3} />
                <spotLight position={new THREE.Vector3(10, 10, 10)} angle={0.15} penumbra={1} />
                <pointLight position={new THREE.Vector3(-10, -10, -10)} />

                {trianglesBroken === 0 && (
                    <TriangleMeshComponent
                        position={new THREE.Vector3(0, 0, 3)}
                        trianglesBroken={trianglesBroken}
                        setTrianglesBroken={setTrianglesBroken}
                    />
                )}

                {trianglesBroken > 0 &&
                    Array(trianglesBroken)
                        .fill(1)
                        .map((_, i) => {
                            return (
                                <React.Suspense fallback={null} key={i}>
                                    <TriangleMeshComponent
                                        setTrianglesBroken={setTrianglesBroken}
                                        trianglesBroken={trianglesBroken}
                                        position={new THREE.Vector3(0, i + i, 3)}
                                    />
                                    <TriangleMeshComponent
                                        setTrianglesBroken={setTrianglesBroken}
                                        trianglesBroken={trianglesBroken}
                                        position={new THREE.Vector3(0, i + i, 6)}
                                    />
                                    <TriangleMeshComponent
                                        setTrianglesBroken={setTrianglesBroken}
                                        trianglesBroken={trianglesBroken}
                                        position={new THREE.Vector3(0, i + i, 9)}
                                    />
                                    <TriangleMeshComponent
                                        setTrianglesBroken={setTrianglesBroken}
                                        trianglesBroken={trianglesBroken}
                                        position={new THREE.Vector3(0, i + i, 12)}
                                    />
                                </React.Suspense>
                            );
                        })}
            </Canvas>
        </main>
    );
};

export default Home;
