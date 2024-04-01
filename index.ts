/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

/**
 * @author ToluAde
 *
 * A custom react hook for fullscreen mode. Returns an object.
 * @param {containerId} - The id of the element to be set to fullscreen
 * @returns {toggleFullscreen} - A function that toggles fullscreen mode. @param {event}
 * @returns {exitFullscreen} - A function that exits fullscreen mode
 * @returns {isFullscreen} - A boolean value. Returns true when in fullscreen mode or false if otherwise.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

function useFullScreen(containerId: string) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function enterFullScreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  const fullScreenMode = () => {
    const container = document.getElementById(containerId);
    if (container !== null) {
      enterFullScreen(container);
    }
  };

  const toggleFullScreen = <T>(e: T | any = null) => {
    if (e !== null) {
      e.stopPropagation();
    }
    if (isFullScreen) {
      exitFullscreen();
    } else {
      fullScreenMode();
    }
  };

  function isScreenLockSupported() {
    return "wakeLock" in navigator;
  }

  async function getScreenLock() {
    if (isScreenLockSupported()) {
      let screenLock;
      try {
        screenLock = await navigator.wakeLock.request("screen");
      } catch (err: any) {
        // console.log(err.name, err.message);
      }
      return screenLock;
    }
  }

  async function release() {
    let screenLock = await getScreenLock();
    if (typeof screenLock !== "undefined" && screenLock != null) {
      screenLock.release().then(() => {
        // console.log("Lock released 🎈");
        screenLock = undefined;
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", (_evt) => {
      if (window.innerHeight == screen.height) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    });

    return () => {
      window.removeEventListener("resize", (_evt) => {
        if (window.innerHeight == screen.height) {
          setIsFullScreen(true);
        } else {
          setIsFullScreen(false);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isFullScreen) {
      getScreenLock();
    } else {
      release();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  return {
    toggleFullScreen,
    isFullScreen,
    exitFullscreen,
  };
}

export default useFullScreen;
