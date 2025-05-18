const {app, BrowserWindow, Menu, ipcMain} = require('electron/main') 
const url   = require('url') 
const path  = require('node:path')  
const $     = require('jquery') 

function createStudentsWindow() { 

  console.log(`createStudentsWindow cwd: ${process.cwd()}`);
  root_dir = process.cwd();

  studentWindow = new BrowserWindow({
    width: 1280, height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'students_preload.js')
    }    
  }) 

  const relativePath = './';
  const absolutePath = path.resolve(relativePath);
  console.log(absolutePath);

  let fileMenuPath  = path.join(root_dir, 'src', 'scripts', 'fileMenu')
  let fileMenuObj   = require(fileMenuPath)
  let fileMenu = Menu.buildFromTemplate([fileMenuObj(app, studentWindow)])

  let htmlPath  = path.join(root_dir, 'src', 'pages', 'students', 'student_details.html');
  studentWindow.loadFile(htmlPath)
  studentWindow.webContents.openDevTools()

  // app.on('prevPicture', () => {
  //   console.log('prevPicture was clicked')
  //   studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  // });
  // app.on('prevPicture', () => {
  //   console.log('prevPicture was clicked')
  //   studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'prevPicture'});
  // });
  // app.on('nextPicture', () => {
  //   console.log('nextPicture was clicked')
  //   studentWindow.webContents.send('asynchronous-message', {'menu-clicked': 'nextPicture'});
  // });
  // app.on('set-title', (event, title) => {
  //   console.log(`set-title was clicked: ${JSON.stringify(title)}`)
  // });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let validatePath  = path.join(root_dir, 'src', 'pages', 'students', 'student_validate');
  const validateStudentObj    = require(validatePath);

  let dbPath  = path.join(root_dir, 'src', 'data', 'students_procs');
  const {updateStudentsData, searchStudentsData}  = require(dbPath)

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  let sleep_time = 1000;
  ipcMain.on('saveStudentData', (event, studentData) => {
    console.log(`saveStudentData was clicked: ${JSON.stringify(studentData)}`);
    result = validateStudentObj.validateStudentData(studentData);
    if (validateStudentObj.isOkToUpdate(result)) {
      updateStudentsData(studentData);
      result['saveStatus']  = 'ok';
      result['saveMessage'] = 'Student data was updated';
      setTimeout(() => {
        console.log(`saveStudentData was saved to database: ${JSON.stringify(result)}`);
        studentWindow.webContents.send('saveStudentDataResult', result);
      }, sleep_time);    
    }
    else {
      setTimeout(() => {
        result['saveStatus']  = 'err';
        result['saveMessage'] = 'Student data was not updated';
        console.log(`saveStudentData failed validation: ${JSON.stringify(result)}`);
        studentWindow.webContents.send('saveStudentDataResult', result);
        result['saveMessage'] = 'Student data was not updated';
      }, sleep_time);    
    }
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ipcMain.on('searchByBadge', (event, badgeData) => {
    console.log(`searchByBadge was clicked: ${JSON.stringify(badgeData.badgeNumber)}`);
    results = validateStudentObj.isBadgeNumberValid(badgeData.badgeNumber);
    if (results.status === 'ok') {
      searchStudentsData(badgeData, searchCallBack);
    }
    else {
      setTimeout(() => {
        studentWindow.webContents.send('searchByBadgeResult', results);
      }, sleep_time);    
    }
  });
  function searchCallBack(results) {
    setTimeout(() => {
      console.log(`studentData was found: ${JSON.stringify(results)}`);
      studentWindow.webContents.send('searchByBadgeResult', results);
    }, sleep_time);    
    
  }

}  

module.exports = createStudentsWindow;