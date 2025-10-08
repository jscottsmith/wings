import React from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SceneCamera } from "./SceneCamera";
import { FlyBy } from "./FlyBy";
import { SceneEvents } from "./SceneEvents";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas style={{ background: "#111" }}>
        <SceneEvents />
        {/* <Wings /> */}
        <FlyBy />
        {/* <Grid args={[100, 100]} /> */}
        <fog attach="fog" color="#111" near={3} far={8} />

        {/* <OrbitControls /> */}
        <ambientLight intensity={1.2} color="#d4c2ff" />
        <directionalLight color="#fffcb0" position={[0, 2, -2]} />
        <SceneCamera position={[-2, 3, -1]} lookAt={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/wings-rigged-animated-2.glb");
