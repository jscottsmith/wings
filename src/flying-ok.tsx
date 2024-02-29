import React, { useRef } from "react";
import { Wings } from "./wings";
import { Ok } from "./ok";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export function FlyingOk(props: JSX.IntrinsicElements["group"]) {
  const myMesh = useRef<Mesh>();
  const seed = useRef(Math.random());
  useFrame(({ clock }, delta, xrFrame) => {
    if (myMesh?.current?.position) {
      myMesh.current.position.z += 0.05 * seed.current;
      myMesh.current.position.y += Math.sin(clock.getElapsedTime() * 3) * 0.05;
      if (myMesh.current.position.z > 40) {
        myMesh.current.position.z = -40;
      }
    }
  });
  return (
    <group ref={myMesh} {...props}>
      <Wings />
      <group>
        <Ok
          rotation={[0, Math.PI / 2, 0]}
          // scale={[1.1, 1.1, 1.1]}
          position={[0, -0.2, 0]}
        />
      </group>
    </group>
  );
}
