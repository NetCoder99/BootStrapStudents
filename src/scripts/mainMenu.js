module.exports = 
[
  {
     label: 'File',
     submenu: [
        {
          id : 'menuFileQuit',
          label: "Quit",
           //role: 'quit'
           click: () => {
            console.log('Quitting application.');
            app.quit(); 
          }
        }
     ]
  },
  {
    label: 'View',
    submenu: [
       {
          id : 'menuViewCheckin',
          label: "Checkin Main",
          click: (event) => { console.log('Display main check in page.') }
       },
       {
        id : 'menuViewStudents',
        label: "Student Details",
        click: () => console.log('Display students manager.') 
       },
       {
        id : 'menuViewBelts',
        label: "Belt Management",
        click() { console.log('Display belt manager.') }
       },
       {
        id : 'menuViewSettings',
        label: "Settings options",
        click: () => {mainConsoleLog()}
        //app.emit('menuViewSettings'),
       }

  ]
 }

]