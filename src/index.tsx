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

const BrightnessSettings = ({ logs, onBrightnessChange }) => {
  const [opacity, setOpacity] = useState(0.5);

  const updateBrightness = async (newOpacity: number) => {
    setOpacity(newOpacity);
    onBrightnessChange(newOpacity)
  };

  return (
    <PanelSection title="Brightness Overlay">
      <PanelSectionRow>
        <Overlay />
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
      <div>{logs}</div>
    </PanelSection>
  );
};

export default definePlugin((serverAPI: ServerAPI) => {
  //serverAPI.routerHook.addGlobalComponent("BlackOverlay", () => (<Overlay />));
  serverAPI.routerHook.addPatch("/", (routeProps) => {
    // Get the original element from the route properties.
    const OriginalElement = routeProps.element;
    
    // Modify the element property to wrap the original element
    // with additional logic.
    routeProps.element = (props) => {
      // Execute your extra logic.
      console.log("Extra logic executed before '/' route renders");
      
      // Render the original element with its props.
      return (<>
      <Overlay />
      <OriginalElement {...props} />
      </>
    );
    };
    
    // Return the modified routeProps.
    return routeProps;
  });

  return {
  title: <div className={staticClasses.Title}>PWNless Brightness</div>,
  content: <BrightnessSettings logs={JSON.stringify(serverAPI.routerHook)} onBrightnessChange={(opacity: number) => {
    
  }} />,
  icon: <FaEyeDropper />,
}});