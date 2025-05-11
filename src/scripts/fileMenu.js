function fileMenu(app, mainWindow) {
  return {
    label: 'Picture',
    role: 'help',
    submenu: [
      {
        label: 'Increment',
        click: () => mainWindow.webContents.send('update-counter', 1),
      },
      {
        label: 'Decrement',
        click: () => mainWindow.webContents.send('decrement-counter', 1),
      },
      {
        label: 'Previous',
        accelerator: 'Left',
        click: () => app.emit('prevPicture'),
      },
      {
        label: 'Next',
        accelerator: 'Right',
        click: () => app.emit('nextPicture'),
      }
    ],
  }
}
module.exports = fileMenu;