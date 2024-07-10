import { Box } from "@mui/material";
import React, { useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

export default function CommonConfetti() {
  const refAnimationInstance = useRef<any>();

  const makeShot = (angle: any, originX: any) => {
    refAnimationInstance!.current({
      particleCount: 100,
      angle,
      spread: 55,
      origin: { x: originX },
    });
  };

  const fire = () => {
    makeShot(60, 0);
    makeShot(120, 1);
  };
  return (
    <Box>
      <ReactCanvasConfetti
        style={{ position: "fixed", width: "100%", height: "100%" }}
      />
      <button onClick={fire}>Fire Confetti</button>
    </Box>
  );
}
