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
  const [opacity, setOpacity] = useState(localStorage.getItem("pwmlessbrightness") ?? 0); // Store brightness level

  // Function to update brightness & trigger re-render of overlay
  const updateBrightness = (newOpacity: number) => {
    setOpacity(newOpacity);
    localStorage.setItem("pwmlessbrightness", newOpacity.toString())
  };

  serverAPI.routerHook.addGlobalComponent("BlackOverlay", (props) => <Overlay {...props} opacity={opacity} />);

  return {
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={updateBrightness} />,
  icon: <FaEyeDropper />,
}});