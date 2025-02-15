import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Window 2.15

Window {
    id: overlayWindow
    visible: true
    width: Screen.width
    height: Screen.height
    color: "transparent" // or any default color

    flags: Qt.WindowStaysOnTopHint | Qt.FramelessWindowHint | Qt.WindowDoesNotAcceptFocus

    Rectangle {
        id: overlay
        anchors.fill: parent
        color: "black"

        // Use command-line argument for opacity if provided; default to 0.5 otherwise
        property real initialOpacity: 0.5
        opacity: Qt.application.arguments.length > 1 ? parseFloat(Qt.application.arguments[1]) : initialOpacity

        MouseArea {
            anchors.fill: parent
            onClicked: {
                // Optional: toggle opacity on click
                overlay.opacity = (overlay.opacity === initialOpacity) ? 0 : initialOpacity;
            }
        }
    }
}