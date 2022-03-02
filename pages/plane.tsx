import React from "react";
import * as THREE from "three";
import { OrbitControls, Stars, Edges } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useLoader } from "@react-three/fiber";

import type { NextPage } from "next";

type SurfacePropType = {
    position: number[];

    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;

    opacity?: number;
};

export const Surface = (props: SurfacePropType) => {
    const ref = React.useRef<THREE.Mesh>(null!);
    const texture = useLoader(THREE.TextureLoader, "/dice1.jpeg");

    const [hovered, setHover] = React.useState<boolean>(false);

    useFrame((state) => {
        if (props.rotateX) ref.current.rotation.x = props.rotateX;
        if (props.rotateY) ref.current.rotation.y = props.rotateY;
        if (props.rotateZ) ref.current.rotation.z = props.rotateZ;
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.01;
    });

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        console.log("face", event.face);
    };

    return (
        <mesh
            {...props}
            ref={ref}
            args={[2, 2]}
            onClick={(event) => handleClick(event)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <planeGeometry attach="geometry" />

            <meshStandardMaterial
                attach="material"
                side={THREE.DoubleSide}
                opacity={props.opacity ? props.opacity : 1}
                color={hovered ? "green" : "white"}
                map={texture}
            />

            <Edges visible={true} scale={1} renderOrder={200}>
                <meshBasicMaterial color="#000" depthTest={true} />
            </Edges>
        </mesh>
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
                    <Surface position={[0, 0, 0]} />
                    <Surface position={[0, 0, 1]} />

                    <Surface position={[0, 1, 0.5]} rotateX={Math.PI / 2} />
                    <Surface position={[0, -1, 0.5]} rotateX={Math.PI / 2} />

                    <Surface position={[1, 0, 0.5]} rotateY={Math.PI / 2} />
                    <Surface position={[-1, 0, 0.5]} rotateY={Math.PI / 2} />

                    <Surface position={[-0.8, 0.8, 0.5]} rotateX={Math.PI / 2} rotateY={Math.PI / 4} />
                    <Surface position={[0.8, -0.8, 0.5]} rotateX={Math.PI / 2} rotateY={Math.PI / 4} />

                    <Surface position={[0.8, 0.8, 0.5]} rotateX={Math.PI / 2} rotateY={-Math.PI / 4} />
                    <Surface position={[-0.8, -0.8, 0.5]} rotateX={Math.PI / 2} rotateY={-Math.PI / 4} />
                </React.Suspense>
            </Canvas>
        </main>
    );
};

export default Home;
