import os
import subprocess
import decky_plugin

class Plugin:
    async def _main(self):
        decky_plugin.logger.info("Overlay plugin started")

    async def _unload(self):
        decky_plugin.logger.info("Overlay plugin stopped")

async def set_brightness(self, opacity: float):
        """Set overlay opacity (0.0 - 1.0)."""
        current_dir = os.path.dirname(__file__)
        qml_path = os.path.join(current_dir, "overlay.qml")
        # Pass the level as a command-line argument
        subprocess.run(["qmlscene", qml_path, str(opacity)])
        decky_plugin.logger.info(f"Set opacity to {opacity}")