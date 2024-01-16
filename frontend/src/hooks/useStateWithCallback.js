import { useState, useRef, useCallback, useEffect } from "react";

export function useStateWithCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();
  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;
    setState((prev) => {
      return typeof prev === "function" ? newState(prev) : newState;
    });
  }, []);
  useEffect(() => {
    if (!cbRef.current) return;
    cbRef.current(state);
    cbRef.current == null;
  }, [state]);

  return [state, updateState];
}
