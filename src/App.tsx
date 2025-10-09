import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { notifyUserClick } from "./messaging";
import { Scene } from "./Scene";

// Handle click events
const handleClick = (event: MouseEvent) => {
  notifyUserClick(event);
};
window.addEventListener("click", handleClick);

const params = new URLSearchParams(window.location.search);
const initialWaitForInteraction = params.get("waitForInteraction") === "true";

export default function App() {
  const [wait, setWait] = useState(initialWaitForInteraction);

  return (
    <div
      id="app"
      onClick={() => {
        if (wait) {
          setWait(false);
          window.history.replaceState({}, "", window.location.pathname);
        }
      }}
    >
      {wait ? null : <Scene />}
    </div>
  );
}

useGLTF.preload("/wings-rigged-animated-2.glb");
