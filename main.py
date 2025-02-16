import os
import decky_plugin
from multiprocessing import Process

def run_overlay():
    # Import PyQt5 inside the new process
    import sys
    from PyQt5.QtWidgets import QApplication, QWidget
    from PyQt5.QtCore import Qt
    from PyQt5.QtGui import QPainter, QColor

    # Optionally force X11 (if needed on Steam Deck)
    os.environ["QT_QPA_PLATFORM"] = "xcb"

    class OverlayWindow(QWidget):
        def __init__(self):
            super().__init__()
            self.initUI()

        def initUI(self):
            self.setWindowFlags(
                Qt.FramelessWindowHint |
                Qt.WindowStaysOnTopHint |
                Qt.Tool
            )
            self.setAttribute(Qt.WA_TranslucentBackground)
            self.setAttribute(Qt.WA_TransparentForMouseEvents)
            screen = QApplication.primaryScreen().size()
            self.setGeometry(0, 0, screen.width(), screen.height())

        def paintEvent(self, event):
            painter = QPainter(self)
            painter.fillRect(self.rect(), QColor(0, 0, 0, 127))
    decky_plugin.logger.info("HEEEREEEE")
    app = QApplication(sys.argv)
    overlay = OverlayWindow()
    overlay.show()
    sys.exit(app.exec_())

# Global variable for the overlay process
overlay_process = None

def start_overlay():
    global overlay_process
    if overlay_process is None:
        decky_plugin.logger.info("Starting overlay process using multiprocessing")
        overlay_process = Process(target=run_overlay)
        overlay_process.start()

def stop_overlay():
    global overlay_process
    if overlay_process:
        decky_plugin.logger.info("Stopping overlay process")
        overlay_process.terminate()
        overlay_process.join()
        overlay_process = None

class Plugin:
    async def _main(self):
        decky_plugin.logger.info("Overlay plugin started")
        start_overlay()

    async def _unload(self):
        decky_plugin.logger.info("Overlay plugin stopped")
        stop_overlay()