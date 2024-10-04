import { useRef } from "react";

export const useRemotes = () => {
    const keyboardRef = useRef<HTMLDivElement | null>(null);
    const channelsRef = useRef<HTMLDivElement | null>(null);
    const remoteButtonRef = useRef<HTMLButtonElement | null>(null);
    const channelsButtonRef = useRef<HTMLButtonElement | null>(null);
  
    const toggleRemote = () => {
      const keyboard = keyboardRef.current;
      const button = remoteButtonRef.current;
      if (keyboard && button) {
        if (keyboard.classList.contains("hidden")) {
          keyboard.classList.remove("hidden");
          keyboard.classList.add("visible");
          button.classList.remove("shrink");
          button.classList.add("expand");
        } else {
          keyboard.classList.remove("visible");
          keyboard.classList.add("hidden");
          button.classList.remove("expand");
          button.classList.add("shrink");
        }
      }
    };
  
    const toggleChannels = () => {
      const channels = channelsRef.current;
      const button = channelsButtonRef.current;
      if (channels && button) {
        if (channels.classList.contains("hidden")) {
          channels.classList.remove("hidden");
          channels.classList.add("visible");
          button.classList.remove("shrink-channels");
          button.classList.add("expand-channels");
        } else {
          channels.classList.remove("visible");
          channels.classList.add("hidden");
          button.classList.remove("expand-channels");
          button.classList.add("shrink-channels");
        }
      }
    };

    return { keyboardRef, channelsRef, remoteButtonRef, channelsButtonRef, toggleRemote, toggleChannels };
};