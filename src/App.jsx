import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Wings } from "./wings";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Wings position={[0, 1, 1]} />
        {/* <fog attach="fog" color="#eee" near={1} far={10} /> */}
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
