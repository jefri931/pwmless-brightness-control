import React, { useState, useEffect, useRef } from 'react';
import { createOverlay, usePlugin } from '@decky-frontend-lib';

const BrightnessOverlayPlugin = () => {
  const [opacity, setOpacity] = useState(1.0); // Initial opacity (1.0 = full brightness)
  const overlayRef = useRef(null);
  const { addMenuItem } = usePlugin();

  // Create the overlay when the component mounts
  useEffect(() => {
    overlayRef.current = createOverlay({
      opacity: opacity,
      zIndex: 9999,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',  // Avoid interfering with user clicks
      backgroundColor: 'rgba(0, 0, 0, 0)',  // Transparent overlay
    });

    // Add menu items (if needed)
    addMenuItem('Toggle Overlay', toggleOverlay);

    // Cleanup the overlay when the plugin is unloaded
    return () => {
      overlayRef.current?.destroy();
    };
  }, [opacity, addMenuItem]);

  // Method to toggle overlay visibility
  const toggleOverlay = () => {
    const overlay = overlayRef.current;
    if (overlay) {
      const isVisible = overlay.isVisible();
      overlay.setVisible(!isVisible);
    }
  };

  // Method to update the brightness via opacity
  const handleSliderChange = (event) => {
    const newOpacity = parseFloat(event.target.value);
    setOpacity(newOpacity);
    if (overlayRef.current) {
      overlayRef.current.setStyle({ opacity: newOpacity });
    }
  };

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <h3>Brightness Overlay Plugin</h3>
      <p>Use the slider to adjust brightness and the menu to toggle the overlay.</p>

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="brightness-slider" style={{ fontSize: '16px' }}>
          Brightness:
        </label>
        <input
          type="range"
          id="brightness-slider"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={handleSliderChange}
          style={{
            width: '80%',
            marginTop: '10px',
            appearance: 'none',
            height: '8px',
            background: '#ddd',
            borderRadius: '5px',
            outline: 'none',
            transition: 'background 0.3s ease',
          }}
        />
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <span>{(opacity * 100).toFixed(0)}% Brightness</span>
        </div>
      </div>
    </div>
  );
};

export default BrightnessOverlayPlugin;