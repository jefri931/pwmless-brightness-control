import os
import asyncio
import threading
import decky_plugin
import gi

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk

class OverlayWindow(Gtk.Window):
    def __init__(self, opacity=0.5):
        Gtk.Window.__init__(self, type=Gtk.WindowType.POPUP)
        self.set_decorated(False)
        self.set_app_paintable(True)
        self.set_visual(self.get_screen().get_rgba_visual())
        self.override_background_color(Gtk.StateFlags.NORMAL, Gdk.RGBA(0, 0, 0, opacity))
        self.set_keep_above(True)
        self.fullscreen()

    def update_opacity(self, opacity):
        self.override_background_color(Gtk.StateFlags.NORMAL, Gdk.RGBA(0, 0, 0, opacity))

overlay = None
gtk_thread = None

def run_gtk(opacity):
    global overlay
    decky_plugin.logger.info("Starting GTK Overlay Thread")

    overlay = OverlayWindow(opacity)
    overlay.connect("destroy", Gtk.main_quit)
    overlay.show_all()

    Gtk.main()
    decky_plugin.logger.info("GTK Main Loop Exited")

async def start_overlay(opacity=0.5):
    global gtk_thread
    if gtk_thread is None:
        gtk_thread = threading.Thread(target=run_gtk, args=(opacity,), daemon=True)
        gtk_thread.start()

async def set_brightness(opacity: float):
    global overlay
    if overlay:
        decky_plugin.logger.info(f"Updating Overlay Opacity: {opacity}")
        overlay.update_opacity(opacity)

async def stop_overlay():
    global overlay, gtk_thread
    if overlay:
        decky_plugin.logger.info("Stopping Overlay Window")
        overlay.destroy()
        overlay = None
    if gtk_thread:
        gtk_thread.join(timeout=1)
        gtk_thread = None

class Plugin:
    async def on_load(self):
        decky_plugin.logger.info("Starting Brightness Overlay Plugin")
        await start_overlay(0.5)

    async def on_unload(self):
        decky_plugin.logger.info("Stopping Brightness Overlay Plugin")
        await stop_overlay()

    async def set_brightness(self, opacity: float):
        await set_brightness(opacity)