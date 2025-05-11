const {app, BrowserWindow, Menu, AppMenu, MenuItem, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 


// let winMain 
// let mainMenuObj = require('./src/scripts/mainMenu')
// let mainMenu = Menu.buildFromTemplate(mainMenuObj)


//---------------------------------------------------------------
let mainWindow
function createMainWindow() { 
  mainWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }    
  }) 
  let fileMenuObj = require('./src/scripts/fileMenu')
  let fileMenu = Menu.buildFromTemplate([fileMenuObj(app, mainWindow)])
  Menu.setApplicationMenu(fileMenu)
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
  app.on('prevPicture', () => {
    console.log('prevPicture was clicked')
    mainWindow.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  });
  app.on('nextPicture', () => {
    console.log('nextPicture was clicked')
    mainWindow.webContents.send('asynchronous-message', {'menu-clicked': 'nextPicture'});
  });
}  

//---------------------------------------------------------------
let studentWindow
function createStudentsWindow() { 
  studentWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }    
  }) 
  let fileMenuObj = require('./src/scripts/fileMenu')
  let fileMenu = Menu.buildFromTemplate([fileMenuObj(app, studentWindow)])
  //Menu.setApplicationMenu(fileMenu)
  studentWindow.loadFile('./src/pages/students/student_details.html')
  studentWindow.webContents.openDevTools()
  app.on('prevPicture', () => {
    console.log('prevPicture was clicked')
    studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  });
  app.on('prevPicture', () => {
    console.log('prevPicture was clicked')
    studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  });
  app.on('nextPicture', () => {
    console.log('nextPicture was clicked')
    studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'nextPicture'});
  });
}  

// function createCheckinWindow() { 
//   winMain = new BrowserWindow({
//     width: 1280, height: 960,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }    
//   }) 
//   Menu.setApplicationMenu(mainMenu)
//   winMain.webContents.openDevTools()
// }  

app.whenReady().then(() => {
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })  
  //createMainWindow()
  createStudentsWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

