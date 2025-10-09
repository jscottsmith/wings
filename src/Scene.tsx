import React from "react";
import { Canvas } from "@react-three/fiber";
import { SceneEvents } from "./SceneEvents";
import { FlyBy } from "./FlyBy";
import { SceneCamera } from "./SceneCamera";

export function Scene() {
  return (
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
  );
}
