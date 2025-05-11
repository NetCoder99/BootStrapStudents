const {app, BrowserWindow, Menu, AppMenu, MenuItem, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

//---------------------------------------------------------------
function createStudentsWindow() { 
  winMain = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }    
  }) 
  let fileMenuObj = require('./src/scripts/fileMenu')
  let fileMenu    = Menu.buildFromTemplate([fileMenuObj(app, winMain)])
  Menu.setApplicationMenu(fileMenu)
  winMain.loadFile('student_details.html')
  winMain.webContents.openDevTools()
  app.on('prevPicture', () => {
    console.log('prevPicture was clicked')
    winMain.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  });
  app.on('nextPicture', () => {
    console.log('nextPicture was clicked')
    winMain.webContents.send('asynchronous-message', {'menu-clicked': 'nextPicture'});
  });
}  

module.exports = createStudentsWindow;