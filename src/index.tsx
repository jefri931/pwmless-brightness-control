import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  SliderField,
  ToggleField,
  staticClasses,
} from "decky-frontend-lib";
import { VFC, useState, useEffect } from "react";

const Overlay = () => {
  const [enabled, setEnabled] = useState(false);
  const [opacity, setOpacity] = useState(50); // Default opacity (50%)

  useEffect(() => {
    let overlay = document.getElementById("opacity-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "opacity-overlay";
      document.body.appendChild(overlay);
    }

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "black"; // Can be changed to other colors
    overlay.style.opacity = enabled ? opacity / 100 : "0";
    overlay.style.pointerEvents = "none"; // Allows clicks to pass through
    overlay.style.zIndex = "9999"; // Ensure it's above everything

    return () => {
      if (overlay) overlay.remove();
    };
  }, [enabled, opacity]);

  return (
    <div>
      <PanelSection title="Brightness Control">
        <PanelSectionRow>
          <ToggleField
            label="Enable Brightness Control"
            checked={enabled}
            onChange={(value) => setEnabled(value)}
          />
        </PanelSectionRow>
        {enabled && (
          <PanelSectionRow>
            <SliderField
              label="Brightness"
              value={opacity}
              step={1}
              max={100}
              min={0}
              showValue={true}
              onChange={(value) => setOpacity(value)}
            />
          </PanelSectionRow>
        )}
      </PanelSection>
    </div>
  );
};

export default definePlugin(() => {
  return {
    title: <div className={staticClasses.Title}>PWNLess Brightness</div>,
    content: <Overlay />,
    onDismount() {
      const overlay = document.getElementById("opacity-overlay");
      if (overlay) overlay.remove(); // Remove overlay on exit
    },
  };
});