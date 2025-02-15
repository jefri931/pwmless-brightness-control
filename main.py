import os
import subprocess
import decky_plugin

# Declare a global variable
overlay_process = None

# Define the functions outside the class
def start_overlay():
    global overlay_process  # Referencing the global variable
    if overlay_process is None:
        script_path = os.path.join(os.path.dirname(__file__), "overlay.py")
        decky_plugin.logger.info(f"Starting overlay process: {script_path}")
        overlay_process = subprocess.Popen(["python3", script_path])

def stop_overlay():
    global overlay_process  # Referencing the global variable
    if overlay_process:
        decky_plugin.logger.info("Stopping overlay process")
        overlay_process.terminate()
        overlay_process = None

class Plugin:
    async def _main(self):
        decky_plugin.logger.info("Overlay plugin started")
        start_overlay()  # No need for self

    async def _unload(self):
        decky_plugin.logger.info("Overlay plugin stopped")
        stop_overlay()  # No need for self