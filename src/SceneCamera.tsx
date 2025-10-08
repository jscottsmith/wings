import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

interface SceneCameraProps {
  position?: [number, number, number];
  lookAt?: [number, number, number];
}

export function SceneCamera({
  position = [0, 0, 10],
  lookAt = [0, 0, 0],
}: SceneCameraProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetPositionRef = useRef<{ x: number; z: number }>({ x: 0, z: 0 });
  const basePositionRef = useRef<[number, number, number]>(position);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse coordinates to [-1, 1]
      mouseRef.current.x = (clientX / innerWidth) * 2 - 1;
      mouseRef.current.y = -(clientY / innerHeight) * 2 + 1;

      // Calculate target translation based on mouse position
      // Use a multiplier to control the translation range
      const translationRangeX = 1; // Adjust this value to control how far the camera moves
      const translationRangeY = 1; // Adjust this value to control how far the camera moves
      targetPositionRef.current.x = mouseRef.current.x * translationRangeX;
      targetPositionRef.current.z = mouseRef.current.y * translationRangeY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth interpolation to target position
      const lerpFactor = 0.02;

      // Calculate new position based on base position + mouse translation
      const newX = basePositionRef.current[0] + targetPositionRef.current.x;
      const newZ = basePositionRef.current[2] + targetPositionRef.current.z;

      // Smoothly interpolate to the new position
      cameraRef.current.position.x = THREE.MathUtils.lerp(
        cameraRef.current.position.x,
        newX,
        lerpFactor
      );
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        newZ,
        lerpFactor
      );

      // Always look at the center
      cameraRef.current.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={position} />;
}
