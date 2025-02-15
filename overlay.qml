import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    id: overlay
    width: Screen.width
    height: Screen.height
    color: "black"
    opacity: 0.5  // Default opacity, can be controlled dynamically

    MouseArea {
        anchors.fill: parent
        onClicked: {
            overlay.opacity = (overlay.opacity === 0.5) ? 0 : 0.5; // Toggle
        }
    }
}