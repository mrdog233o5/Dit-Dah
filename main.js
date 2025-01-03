const { app, BrowserWindow } = require('electron');
const { menubar } = require('menubar');
const path = require('node:path');
const { GlobalKeyboardListener } = require("node-global-key-listener");

const listener = new GlobalKeyboardListener();

listener.addListener(function (event, down) {
    if (event.name === "SPACE") {
        if (event.state === "DOWN") {
            console.log("press");
        } else if (event.state === "UP") {
            console.log("release");
        }
    }
});

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    window.loadFile("index.html");
}

const mb = menubar({
    browserWindow: {
        width: 400,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    },
    icon: path.resolve(__dirname, "menubarIconTemplate.png")
});

mb.on('ready', () => {
    console.log('app is ready');
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.whenReady().then(createWindow);
