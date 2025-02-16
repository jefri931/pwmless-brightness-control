import sys
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPainter, QColor

class OverlayWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        # Make window frameless, always on top, and transparent
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.Tool)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setAttribute(Qt.WA_TransparentForMouseEvents)  # Pass mouse events through

        # Set the window to full screen (adjust if needed)
        screen = QApplication.primaryScreen().size()
        self.setGeometry(0, 0, screen.width(), screen.height())

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.fillRect(self.rect(), QColor(0, 0, 0, 127))  # 50% opacity black overlay

print("before")
print(__name__)
if __name__ == "__main__":
    print("Starting overlay application...")
    app = QApplication(sys.argv)
    overlay = OverlayWindow()
    overlay.show()
    print("Overlay window should be visible now.")
    sys.exit(app.exec_())