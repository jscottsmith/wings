import React, { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Wings } from "./wings";

interface WingInstance {
  id: number;
  position: [number, number, number];
  speed: number;
  rotation: [number, number, number];
  animationStartTime: number;
  animationSpeed: number;
}

const CYCLE_SIZE = 10;
const CYCLE_HEIGHT = 0;

const NUMBER_OF_WINGS = 20;

// Speed up frequency but reduce amplitude for smoother movement
const FREQUENCY_X = 3.5; // Increase this to speed up the sine wave
const AMPLITUDE_X = 0.01; // Decrease this to minimize frame-to-frame changes
const FREQUENCY_Z = 5; // Increase this to speed up the sine wave
const AMPLITUDE_Z = 0.001; // Decrease this to minimize frame-to-frame changes

// Helper function to get random values between min and max
function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function FlyBy() {
  const groupRef = useRef<THREE.Group>(null);

  // Create reusable objects outside the animation loop for performance
  const euler = new THREE.Euler();
  const forward = new THREE.Vector3(0, 0, 1);

  // Create 10 wing instances with random positions and velocities
  const wingInstances = useMemo(() => {
    const instances: WingInstance[] = [];

    for (let i = 0; i < NUMBER_OF_WINGS; i++) {
      // Random position within the cycle space
      const x = randomBetween(-CYCLE_SIZE / 2, CYCLE_SIZE / 2);
      const y = randomBetween(-CYCLE_HEIGHT / 2, CYCLE_HEIGHT / 2);
      const z = randomBetween(-CYCLE_SIZE / 2, CYCLE_SIZE / 2);

      // Random speed
      const speed = randomBetween(-0.01, -0.02);

      // Random rotation
      const rx = randomBetween(0, 0);
      const ry = randomBetween(0, Math.PI * 0.1);
      const rz = randomBetween(0, 0);

      const animationStartTime = randomBetween(0, 2);
      const animationSpeed = randomBetween(0.5, 1.5);

      instances.push({
        id: i,
        position: [x, y, z],
        speed: speed,
        rotation: [rx, ry, rz],
        animationStartTime,
        animationSpeed,
      });
    }

    return instances;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Update each wing instance
    wingInstances.forEach((wing, index) => {
      const child = groupRef.current?.children[index];
      if (!child) return;

      // Calculate forward direction based on rotation
      euler.set(wing.rotation[0], wing.rotation[1], wing.rotation[2]);
      forward.set(0, 0, 1);
      forward.applyEuler(euler);

      // Move along forward axis based on speed
      wing.position[0] += forward.x * wing.speed;
      wing.position[1] += forward.y * wing.speed;
      wing.position[2] += forward.z * wing.speed;

      // Check boundaries and wrap to opposite edge
      const boundary = CYCLE_SIZE / 2;

      // cycling movement
      if (wing.position[0] > boundary) {
        wing.position[0] = -boundary;
        wing.position[1] = randomBetween(-CYCLE_HEIGHT / 2, CYCLE_HEIGHT / 2);
      } else if (wing.position[0] < -boundary) {
        wing.position[0] = boundary;
        wing.position[1] = randomBetween(-CYCLE_HEIGHT / 2, CYCLE_HEIGHT / 2);
      }

      if (wing.position[2] > boundary) {
        wing.position[2] = -boundary;
        wing.position[1] = randomBetween(-CYCLE_HEIGHT / 2, CYCLE_HEIGHT / 2);
      } else if (wing.position[2] < -boundary) {
        wing.position[2] = boundary;
        wing.position[1] = randomBetween(-CYCLE_HEIGHT / 2, CYCLE_HEIGHT / 2);
      }

      // Update rotation with sine wave movement on x-axis
      const time = state.clock.elapsedTime; // Use useFrame's clock

      wing.rotation[0] += Math.sin(time * FREQUENCY_X + wing.id) * AMPLITUDE_X;
      wing.rotation[2] += Math.sin(time * FREQUENCY_Z + wing.id) * AMPLITUDE_Z;

      // Apply transformations
      child.position.set(wing.position[0], wing.position[1], wing.position[2]);
      child.rotation.set(wing.rotation[0], wing.rotation[1], wing.rotation[2]);
    });
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        {wingInstances.map((wing) => (
          <Wings
            key={wing.id}
            position={wing.position}
            rotation={wing.rotation}
            scale={[0.5, 0.5, 0.5]} // Scale down the wings for better visibility
            animationStartTime={wing.animationStartTime}
            animationSpeed={wing.animationSpeed}
          />
        ))}
      </Suspense>
    </group>
  );
}
