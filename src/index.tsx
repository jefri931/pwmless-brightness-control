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

const BrightnessSettings = ({ onBrightnessChange, originalOpacity = 0.0 }) => {
  const [opacity, setOpacity] = useState(originalOpacity);

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

let pwmOpacity = parseFloat(localStorage.getItem("pwmlessbrightness") ?? "0.5")
let brightnessUpdateTimeout: NodeJS.Timeout | null = null; 

export default definePlugin((serverAPI: ServerAPI) => {
  // Function to update brightness & trigger re-render of overlay
  const updateBrightness = (newOpacity: number) => {
    pwmOpacity = newOpacity
    localStorage.setItem("pwmlessbrightness", newOpacity.toString())
    if (brightnessUpdateTimeout) {
      clearTimeout(brightnessUpdateTimeout);
    }
  
    // Set a new timeout for 2 seconds
    brightnessUpdateTimeout = setTimeout(() => {
      serverAPI.routerHook.removeGlobalComponent("BlackOverlay");
  
      setTimeout(() => {
        serverAPI.routerHook.addGlobalComponent(
          "BlackOverlay",
          (props) => <Overlay {...props} opacity={pwmOpacity} />
        );
      }, 10); // Small delay to ensure proper re-render
    }, 2000); // Wait 2 seconds after the last update
  };

  serverAPI.routerHook.addGlobalComponent("BlackOverlay", (props) => <Overlay {...props} opacity={pwmOpacity} />);

  return {
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={updateBrightness} originalOpacity={pwmOpacity} />,
  icon: <FaEyeDropper />,
}});