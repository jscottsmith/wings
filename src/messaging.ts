/**
 * Utility functions for post messaging communication with parent window
 */

export interface PostMessageData {
  type: string;
  payload?: any;
  timestamp: number;
}

export const MESSAGE_TYPES = {
  SCENE_LOADED: "scene_loaded",
  USER_CLICK: "user_click",
} as const;

/**
 * Sends a post message to the parent window
 * @param type - The message type
 * @param payload - Optional payload data
 */
export function postMessageToParent(type: string, payload?: any): void {
  if (window.parent && window.parent !== window) {
    const message: PostMessageData = {
      type,
      payload,
      timestamp: Date.now(),
    };

    window.parent.postMessage(message, "*");
  }
}

/**
 * Sends a message when the scene is loaded
 */
export function notifySceneLoaded(): void {
  postMessageToParent(MESSAGE_TYPES.SCENE_LOADED, {
    message: "React Three Fiber scene has been loaded",
  });
}

/**
 * Sends a message when user clicks anywhere in the window
 * @param event - The click event
 */
export function notifyUserClick(event: MouseEvent): void {
  postMessageToParent(MESSAGE_TYPES.USER_CLICK, {
    x: event.clientX,
    y: event.clientY,
    target: event.target?.constructor?.name || "unknown",
  });
}
