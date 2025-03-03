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

export default definePlugin((serverAPI: ServerAPI) => {
  // Function to update brightness & trigger re-render of overlay
  let rerenderOverlay: (() => void) | null = null
  const initOverlay = (rerender: (() => void) | null) => {
    rerenderOverlay = rerender
  }
  const updateBrightness = (newOpacity: number) => {
    pwmOpacity = newOpacity
    localStorage.setItem("pwmlessbrightness", newOpacity.toString())
    if(rerenderOverlay) {
      rerenderOverlay()
    }
  };

  serverAPI.routerHook.addGlobalComponent("BlackOverlay", (props) => <Overlay {...props} initOverlay={initOverlay} opacity={pwmOpacity} />);

  return {
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={updateBrightness} originalOpacity={pwmOpacity} />,
  icon: <FaEyeDropper />,
}});