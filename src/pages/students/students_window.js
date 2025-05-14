const {app, BrowserWindow, Menu, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

function createStudentsWindow() { 
  studentWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, './src/pages/students/students_preload.js')
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
  app.on('set-title', (event, title) => {
    console.log(`set-title was clicked: ${JSON.stringify(title)}`)
  });

  const validateStudentObj  = require('./src/pages/students/student_validate')
  const updateStudentsData  = require('./src/data/students_procs')

  ipcMain.on('saveStudentData', (event, studentData) => {
    console.log(`saveStudentData was clicked: ${JSON.stringify(studentData)}`);

    updateStudentsData(studentData);

    setTimeout(() => {
      result = validateStudentObj.validateStudentData(studentData);
      console.log(`saveStudentData was validated: ${JSON.stringify(result)}`);
      studentWindow.webContents.send('saveStudentDataResult', result);
    }, 500);    


  });

  ipcMain.on('searchByBadge', (event, badgeData) => {
    console.log(`searchByBadge was clicked: ${JSON.stringify(badgeData.badgeNumber)}`);
    result = validateStudentObj.isBadgeNumberValid(badgeData.badgeNumber);
    console.log(`searchByBadge result: ${JSON.stringify(result)}`);
    studentWindow.webContents.send('searchByBadgeResult', result);
  });


}  


module.exports = createStudentsWindow;