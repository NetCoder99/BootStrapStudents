const {app, BrowserWindow, Menu, AppMenu, MenuItem, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

console.log(`main cwd: ${process.cwd()}`)

const {createStudentsTable} = require('./src/data/students_procs') ;
createStudentsTable();

const createCheckinWindow  = require('./src/pages/checkin/checkin_window') ;
const createStudentsWindow = require('./src/pages/students/students_window') ;

app.whenReady().then(() => {
  console.log(`whenReady activated`)
  createCheckinWindow();
  createStudentsWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createStudentsWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

