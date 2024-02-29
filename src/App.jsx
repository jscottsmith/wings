import {
  Instance,
  Instances,
  OrbitControls,
  PerspectiveCamera,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FlyingOk } from "./flying-ok";
import { Vector3 } from "three";

const oks = new Array(20).fill(0).map((_, i) => {
  return new Vector3(
    Math.random() * 10 - 10,
    Math.random() * 10 - 10,
    Math.random() * 10 - 10
  );
});

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        {oks.map((ok, i) => (
          <FlyingOk position={ok} key={i} />
        ))}
        <fog attach="fog" color="#eee" near={1} far={100} />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <OrbitControls />
        <ambientLight />
        <directionalLight color="white" />
        <PerspectiveCamera makeDefault position={[0, -0.5, 10]} />
      </Canvas>
    </div>
  );
}
