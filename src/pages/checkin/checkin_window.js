const {app, BrowserWindow, Menu, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

function createCheckinWindow() { 

  console.log(`createCheckinWindow cwd: ${process.cwd()}`);
  root_dir = process.cwd();

  
  let dbPathStudents = path.join(root_dir, 'src', 'data', 'students_procs');
  const {searchStudentsData}  = require(dbPathStudents)
  let dbPathCheckin  = path.join(root_dir, 'src', 'data', 'checkin_procs');
  const {insertCheckinRecord}  = require(dbPathCheckin)

  checkinWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'checkin_preload.js')
    }    
  }) 

  // let fileMenuPath  = path.join(root_dir, 'src', 'scripts', 'fileMenu')
  // let fileMenuObj   = require(fileMenuPath)
  // let fileMenu      = Menu.buildFromTemplate([fileMenuObj(app, checkinWindow)])
  let htmlPath      = path.join(root_dir, 'src', 'pages', 'checkin', 'checkin_main.html');
  checkinWindow.loadFile(htmlPath)

  checkinWindow.webContents.openDevTools()

  let sleep_time = 1000;
  ipcMain.on('saveCheckin', (event, badgeNumber) => {
    console.log(`saveCheckin was invoked: ${JSON.stringify(badgeNumber)}`);
    insertCheckinRecord(badgeNumber);
    searchStudentsData({'badgeNumber': badgeNumber}, checkinCallBack)
  });
  function checkinCallBack(results) {
    setTimeout(() => {
      console.log(`studentData was found for checkin: ${JSON.stringify(results)}`);
      checkinWindow.webContents.send('saveCheckinResult', results);
    }, sleep_time);    
    
  }
}  

module.exports = createCheckinWindow;