import { useEffect } from 'react';
import {
  Router,
  WindowRouter
} from "@decky/ui";


const Overlay = ({ opacity = 0.5, backgroundColor = 'black' }) => {
  if(!window['pwnless']) {
    const root: WindowRouter & any = Router.WindowStore?.GamepadUIMainWindowInstance;
    const view = root.CreateBrowserView("pwnless");
    const browser = view.GetBrowser();

    window['pwnless' as any] = view;
    window['pwnless-browser' as any] = browser
  }

  useEffect(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title></title>
      </head>
      <body>
        <div style="position: fixed; top: 0; left: 0; width:100vw; height: 100vh; background-color: ${backgroundColor}; opacity: ${opacity}; z-index: 999999; pointer-events: none;"></div>
      </body>
      </html>
    `;

    window['pwnless-browser'].LoadHTML(htmlContent);
  }, [opacity, backgroundColor])

  return <></>;
};

export default Overlay;