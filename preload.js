const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node:     () => process.versions.node,
  chrome:   () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle        : (title)    => ipcRenderer.send('set-title', title),
  onUpdateCounter : (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),

  onDecrementCounter    : (callback) => ipcRenderer.on('decrement-counter', (_event, value) => callback(value)),
  decrementCounterValue : (value)    => ipcRenderer.send('counter-value', value),  
  counterValue          : (value)    => ipcRenderer.send('counter-value', value) ,

  asyncMessage     : (callback) => ipcRenderer.on('asynchronous-message', (_event, value) => callback(value)),


})