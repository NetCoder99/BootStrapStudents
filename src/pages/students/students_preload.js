const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  asyncMessage     : (callback) => ipcRenderer.on('asynchronous-message', (_event, value) => callback(value)),
})