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

export default definePlugin((serverAPI: ServerAPI) => ({
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={(opacity: number) => {
    serverAPI.callPluginMethod("set_brightness", { opacity });
  }} />,
  icon: <FaEyeDropper />,
}));