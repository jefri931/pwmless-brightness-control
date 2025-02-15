import React from 'react';

const Overlay = ({ opacity = 0.5, backgroundColor = 'black' }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: backgroundColor,
    opacity: opacity,
    zIndex: 9999,
    pointerEvents: 'none' // Allows interaction with underlying elements if needed
  };

  return <div style={overlayStyle} />;
};

export default Overlay;