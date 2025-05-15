const {app, BrowserWindow, Menu, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

function createCheckinWindow() { 

  console.log(`createCheckinWindow cwd: ${process.cwd()}`);
  root_dir = process.cwd();

  checkinWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'checkin_preload.js')
    }    
  }) 

  let fileMenuPath  = path.join(root_dir, 'src', 'scripts', 'fileMenu')
  let fileMenuObj   = require(fileMenuPath)
  let fileMenu = Menu.buildFromTemplate([fileMenuObj(app, checkinWindow)])
  let htmlPath  = path.join(root_dir, 'src', 'pages', 'checkin', 'checkin_main.html');
  checkinWindow.loadFile(htmlPath)

  checkinWindow.webContents.openDevTools()

}  

module.exports = createCheckinWindow;