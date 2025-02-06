import { definePlugin, PanelSection, PanelSectionRow, SliderField } from "decky-frontend-lib";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const OVERLAY_ID = "brightness-overlay";
const CONTAINER_ID = "decky-brightness-container";

const Overlay = ({ opacity }: { opacity: number }) => {
  useEffect(() => {
    let overlay = document.getElementById(OVERLAY_ID) as HTMLDivElement;

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = OVERLAY_ID;
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      overlay.style.zIndex = "9999";
      overlay.style.pointerEvents = "none"; // Doesn't block clicks

      document.body.appendChild(overlay);
    }

    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    return () => {
      overlay.remove();
    };
  }, [opacity]);

  return null;
};

const BrightnessSettings = () => {
  const [opacity, setOpacity] = useState(() => {
    return parseFloat(localStorage.getItem("brightness") || "0.5");
  });

  const updateBrightness = (newOpacity: number) => {
    setOpacity(newOpacity);
    localStorage.setItem("brightness", newOpacity.toString());
    document.getElementById(OVERLAY_ID)!.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
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

export default definePlugin((serverAPI) => {
  console.log("Brightness Overlay Plugin Loaded");

  const storedOpacity = parseFloat(localStorage.getItem("brightness") || "0.5");

  const container = document.createElement("div");
  container.id = CONTAINER_ID;
  document.body.appendChild(container);
  createRoot(container).render(<Overlay opacity={storedOpacity} />);

  return {
    title: <div className={staticClasses.Title}>PWNless Brightness</div>,
    content: (
      <BrightnessSettings />
    ),
    //icon: <FaEyeDropper />,
    onDismount() {
      console.log("Brightness Overlay Plugin Unloaded");
      document.getElementById(CONTAINER_ID)?.remove();
      document.getElementById(OVERLAY_ID)?.remove();
    },
  };
});