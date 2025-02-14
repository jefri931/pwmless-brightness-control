import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  SliderField,
  staticClasses,
} from "decky-frontend-lib";
import { useState, useEffect } from "react";
import { FaEyeDropper } from "react-icons/fa";

const OVERLAY_ID = "brightness-overlay";

const createOverlay = (opacity: number) => {
  let overlay = document.getElementById(OVERLAY_ID) as HTMLDivElement;

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    overlay.style.zIndex = "999999";
    overlay.style.pointerEvents = "none"; // Allows clicking through
    document.body.appendChild(overlay);
  }

  overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
};

const BrightnessSettings = () => {
  const [opacity, setOpacity] = useState(() => {
    return parseFloat(localStorage.getItem("brightness") || "0.5");
  });

  useEffect(() => {
    createOverlay(opacity);
  }, [opacity]);

  const updateBrightness = (newOpacity: number) => {
    setOpacity(newOpacity);
    localStorage.setItem("brightness", newOpacity.toString());
    createOverlay(newOpacity);
  };

  return (
    <PanelSection title="Brightness Overlay">
      <PanelSectionRow>
        <SliderField
          label="Screen Brightness"
          value={opacity}
          min={0}
          max={1}
          step={0.01}
          showValue={true}
          onChange={updateBrightness}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin(() => {
  const storedOpacity = parseFloat(localStorage.getItem("brightness") || "0.5");
  createOverlay(storedOpacity); // Ensure overlay is added on plugin load

  return {
    title: <div className={staticClasses.Title}>PWNless Brightness</div>,
    content: <BrightnessSettings />,
    icon: <FaEyeDropper />,
    onDismount() {
      console.log("Brightness Overlay Plugin Unloaded");
      document.getElementById(OVERLAY_ID)?.remove();
    },
  };
});