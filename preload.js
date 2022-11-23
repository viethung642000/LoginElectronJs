const { contextBridge, ipcRenderer } = require("electron");
const userMgr = require("./Models/usermanager.js");

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("api", {
  addUser: user => ipcRenderer.invoke('addUser',user)
});
