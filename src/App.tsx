import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { MESSAGE_TYPES, notifyUserClick } from "./messaging";
import { Scene } from "./Scene";

// Handle click events
const handleClick = (event: MouseEvent) => {
  notifyUserClick(event);
};
window.addEventListener("click", handleClick);

const params = new URLSearchParams(window.location.search);
const initialWaitForInteraction = params.get("waitForInteraction") === "true";

function useHandleParentMessage(setWait: (wait) => void) {
  const handleMessage = (event: MessageEvent) => {
    const data = event.data;
    if (data.type === MESSAGE_TYPES.WAIT_FOR_INTERACTION) {
      setWait(true);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}

export default function App() {
  const [wait, setWait] = useState(initialWaitForInteraction);

  useHandleParentMessage(setWait);

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
