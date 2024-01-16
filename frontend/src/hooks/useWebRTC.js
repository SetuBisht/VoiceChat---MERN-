import { useState, useEffect } from "react";

import { useStateWithCallback } from "./useStateWithCallback";
export function useWebRTC(roomId, users) {
  const [clients, setClient] = useStateWithCallback([]);
  const provideRef = () => {};
  const handleMute = () => {};
  return { clients, provideRef, handleMute };
}
