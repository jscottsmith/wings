import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { notifySceneLoaded, notifyUserClick } from "./messaging";

/**
 * Component that handles scene events and communication with parent window
 * - Detects when the R3F scene is ready and loaded
 * - Handles click events and notifies parent window
 */
export function SceneEvents() {
  const { scene, camera, gl } = useThree();

  // Handle click events
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      notifyUserClick(event);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Detect when scene is ready
  useEffect(() => {
    // Check if all essential R3F components are ready
    if (scene && camera && gl) {
      // Additional check to ensure the scene has been rendered at least once
      const checkSceneReady = () => {
        if (scene.children.length > 0 || scene.userData.ready) {
          notifySceneLoaded();
        } else {
          // If scene isn't ready yet, check again on next frame
          requestAnimationFrame(checkSceneReady);
        }
      };

      checkSceneReady();
    }
  }, [scene, camera, gl]);

  return null; // This component doesn't render anything
}
