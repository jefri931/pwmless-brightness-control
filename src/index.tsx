/*
 * PWMLess Brightness Control
 * Copyright (C) 2024 Daniel Stoynev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * This project is derived from vibrantDeck (https://github.com/libvibrant/vibrantDeck)
 * which is copyright (c) libvibrant and licensed under GNU General Public License v3.0.
 */

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

const getOpacityValue = () => {
  return parseFloat(localStorage.getItem("pwmlessbrightness") ?? "0.5")
}

const getPwmBrightnessPercent = () => {
  return 100 - (getOpacityValue() * 100)
}

const BrightnessSettings = ({ onBrightnessChange }) => {
  const [opacity, setOpacity] = useState(getPwmBrightnessPercent());

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
          max={100}
          step={1}
          showValue={true}
          onChange={updateBrightness}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};

let pwmOpacity = getOpacityValue()
let brightnessUpdateTimeout: NodeJS.Timeout | null = null; 

export default definePlugin((serverAPI: ServerAPI) => {
  // Function to update brightness & trigger re-render of overlay
  const updateBrightness = (percent: number) => {
    pwmOpacity = (100 - percent) / 100
    localStorage.setItem("pwmlessbrightness", pwmOpacity.toString())
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
  title: <div className={staticClasses.Title}>PWMless Brightness</div>,
  content: <BrightnessSettings onBrightnessChange={updateBrightness} />,
  icon: <FaEyeDropper />,
}});