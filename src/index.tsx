import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  SliderField,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { useState } from "react";
import { FaEyeDropper } from "react-icons/fa";
import Overlay from "./overlay";

const BrightnessSettings = ({ onBrightnessChange }) => {
  const [opacity, setOpacity] = useState(0.5);

  const updateBrightness = async (newOpacity: number) => {
    setOpacity(newOpacity);
    onBrightnessChange(newOpacity)
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

export default definePlugin((serverAPI: ServerAPI) => {
  //serverAPI.routerHook.addGlobalComponent("BlackOverlay", () => (<Overlay />));
  let overlay = document.getElementById("brightness-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "brightness-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.pointerEvents = "none"; // Prevent interaction blocking
    overlay.style.zIndex = "9999"; // Ensure it's on top
    document.body.appendChild(overlay);
  }
  
  return {
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={(opacity: number) => {
    
  }} />,
  icon: <FaEyeDropper />,
}});