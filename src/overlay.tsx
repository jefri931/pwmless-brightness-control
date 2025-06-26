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

import { findModuleChild } from "decky-frontend-lib";
import { useEffect, useState, VFC } from "react";

enum UIComposition {
  Hidden = 0,
  Notification = 1,
  Overlay = 2,
  Opaque = 3,
  OverlayKeyboard = 4,
}

type UseUIComposition = (composition: UIComposition) => {
  releaseComposition: () => void;
};

const useUIComposition: UseUIComposition = findModuleChild((m) => {
  if (typeof m !== "object") return undefined;
  for (let prop in m) {
    if (
      typeof m[prop] === "function" &&
      m[prop].toString().includes("AddMinimumCompositionStateRequest") &&
      m[prop].toString().includes("ChangeMinimumCompositionStateRequest") &&
      m[prop].toString().includes("RemoveMinimumCompositionStateRequest") &&
      !m[prop].toString().includes("m_mapCompositionStateRequests")
    ) {
      return m[prop];
    }
  }
});

const UICompositionProxy: VFC = () => {
  useUIComposition(UIComposition.Notification);
  return null;
};

const Overlay = ({ opacity = 0.5, backgroundColor = 'black' }) => {
  return (<div
    id="brightness_bar_container"
    style={{
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      background: backgroundColor,
      zIndex: 7001, // volume bar is 7000
      position: "fixed",
      opacity,
      pointerEvents: "none"
    }}
  >
    <UICompositionProxy />
  </div>)
};

export default Overlay;