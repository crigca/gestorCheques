const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendMessage: (message) => console.log("Mensaje desde Renderer:", message),
});
