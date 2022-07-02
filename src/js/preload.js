const { contextBridge, ipcRenderer } = require("electron");

const channels = ["app-info", "open-external", "request-minimize", "close"];

console.log("Loading preload script...");

contextBridge.exposeInMainWorld("wolfpack", {
  ipc: {
    send: (channel, ...args) => {
      if (channels.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    invoke: async (channel, ...args) => {
      if (channels.includes(channel)) {
        return await ipcRenderer.invoke(channel, ...args);
      }
    },
    on: (channel, listener) => {
      if (channels.includes(channel)) {
        ipcRenderer.on(channel, listener);
      }
    },
    ping: () => ipcRenderer.sendSync("ping"),
  },
});
