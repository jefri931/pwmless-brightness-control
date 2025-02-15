import os
import subprocess
import decky_plugin

class Plugin:
    overlay_process = None

    async def _main(self):
        decky_plugin.logger.info("Overlay plugin started")
        self.start_overlay()

    async def _unload(self):
        decky_plugin.logger.info("Overlay plugin stopped")
        self.stop_overlay()

    def start_overlay(self):
        if self.overlay_process is None:
            script_path = os.path.join(os.path.dirname(__file__), "overlay.py")
            decky_plugin.logger.info(f"Starting overlay process: {script_path}")
            self.overlay_process = subprocess.Popen(["python3", script_path])

    def stop_overlay(self):
        if self.overlay_process:
            decky_plugin.logger.info("Stopping overlay process")
            self.overlay_process.terminate()
            self.overlay_process = None