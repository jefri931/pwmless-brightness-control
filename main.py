import os
import subprocess
import decky_plugin

# Global variable for the overlay process
overlay_process = None

def start_overlay():
    global overlay_process
    if overlay_process is None:
        script_path = os.path.join(os.path.dirname(__file__), "overlay.py")
        decky_plugin.logger.info(f"Starting overlay process: {script_path}")

        # Start process and capture output
        overlay_process = subprocess.Popen(
            ["python3", script_path],
            stdout=subprocess.PIPE,  # Capture standard output
            stderr=subprocess.PIPE,  # Capture errors
            text=True  # Ensure output is captured as text (not bytes)
        )

def check_overlay_logs():
    """Read and log any output/errors from the overlay process."""
    if overlay_process:
        stdout, stderr = overlay_process.communicate(timeout=1)
        if stdout:
            decky_plugin.logger.info(f"Overlay Output: {stdout}")
        if stderr:
            decky_plugin.logger.error(f"Overlay Error: {stderr}")

def stop_overlay():
    global overlay_process
    if overlay_process:
        decky_plugin.logger.info("Stopping overlay process")
        overlay_process.terminate()
        overlay_process.wait()  # Ensure process has exited
        overlay_process = None

class Plugin:
    async def _main(self):
        decky_plugin.logger.info("Overlay plugin started")
        start_overlay()

    async def _unload(self):
        decky_plugin.logger.info("Overlay plugin stopped")
        stop_overlay()