const { app, BrowserWindow, ipcMain } = require("electron");
const shell = require("electron").shell;

const devMode = process.env.NODE_ENV === "development";

const reactPort = process.env.PORT || 3000;

const path = require("path");

let mainWindow = null;

ipcMain.on("open-external", (event, url) => {
  shell.openExternal(url);
});

ipcMain.handle("app-info", (event) => {
  return {
    name: app.getName(),
    versions: {
      project: app.getVersion(),
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
      chromium: process.versions.chromium,
    },
    devMode: devMode,
    port: reactPort,
    url: `https://github.com/WolfpackMC`,
  };
});

ipcMain.on("request-minimize", (event) => {
  mainWindow.minimize();
});

ipcMain.on("close", (event) => {
  console.log("Closing app as requested...");
  app.quit();
});

ipcMain.on("ping", (event) => {
  event.returnValue = "Pong!";
});

const createWindow = async () => {
  if (mainWindow) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: "hidden",
    transparent: true,
    icon: path.join(__dirname, "assets/wolfpack2.png"),
    webPreferences: {
      preload: path.join(__dirname, "src/js/preload.js"),
    },
  });

  mainWindow.loadURL(
    devMode
      ? `http://localhost:${reactPort}`
      : `file://${path.join(__dirname, "build", "index.html")}`
  );
};

app.whenReady().then(() => {
  console.log(`App is ready! Took ${performance.now() / 1000} seconds`);
});

const launchApp = () => {
  app.whenReady().then(() => {
    createWindow();
  });
};

if (devMode) {
  console.log("Running in development mode");
  const waitOn = require("wait-on");
  waitOn({ resources: [`tcp:${reactPort}`] }).then(() => {
    console.log(
      `Server is ready, React took ${performance.now() / 1000} seconds to load`
    );
    launchApp();
  });
} else {
  launchApp();
}

app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
