import React from 'react';
import {
  Router,
  WindowRouter,
  getGamepadNavigationTrees,
} from "@decky/ui";


const Overlay = ({ opacity = 0.5, backgroundColor = 'black' }) => {
  const root: WindowRouter & any = Router.WindowStore?.GamepadUIMainWindowInstance;
  console.log(root)
  console.log(Router)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: backgroundColor,
    opacity: opacity,
    zIndex: 999999,
    pointerEvents: 'none' // Allows interaction with underlying elements if needed
  };

  return <div style={overlayStyle} />;
};

export default Overlay;