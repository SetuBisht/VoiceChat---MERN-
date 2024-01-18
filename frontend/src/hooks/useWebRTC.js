import { useState, useEffect, useRef } from "react";
import socketInit from "../socket";
import { ACTIONS } from "../actions";
import { useStateWithCallback } from "./useStateWithCallback";
export function useWebRTC(roomId, user) {
  const [clients, setClient] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const socket = useRef(null);
  const localMediaStream = useRef(null);
  const provideRef = (instance, userId) => {
    //mapp usrid with audio
    audioElements.current[userId] = instance;
  };

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );
  useEffect(() => {
    const initChat = async () => {
      socket.current = socketInit();
      await captureMedia();
      addNewClient({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          //so that i cannot listeten my self
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
      });
      socket.current.emit(ACTIONS.JOIN, {
        roomId,
        user,
      });
      async function captureMedia() {
        // Start capturing local audio stream.
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }
    };
    initChat();
  }, []);

  const handleMute = () => {};
  return { clients, provideRef, handleMute };
}
