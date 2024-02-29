import React from "react";
import { Wing } from "./wing";
import { GroupProps } from "@react-three/fiber";

export function Wings(props: GroupProps) {
  return (
    <group {...props}>
      <Wing position={[0.2, 0, 0]} scale={[1, 1, -1]} />
      <Wing position={[-0.2, 0, 0]} scale={[-1, 1, -1]} />
    </group>
  );
}
