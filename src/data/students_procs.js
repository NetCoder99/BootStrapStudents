var fs = require('fs');
const sqlite3 = require('sqlite3');
const db_location = './src/data/students.db'
// const db_conn     = new sqlite3.Database(db_location);

//---------------------------------------------------------------
function createSqliteDB() {
  const db = new sqlite3.Database('./src/data/students.db');
}

//---------------------------------------------------------------
function createStudentsTable() {
  const db = new sqlite3.Database(db_location);
  db.exec(`
    create table if not exists students (
        badgeNumber  int primary key not null,
        firstName    text,
        lastName     text,
        email        text,
        phoneNumber  text,
        address      text,
        address2     text,
        country      text,
        state        text,
        zip          text
    )
  `);
}

//---------------------------------------------------------------
function updateStudentsData(studentData) {
  console.log(`updateStudentsData was called: ${JSON.stringify(studentData)}`);
  const db = new sqlite3.Database(db_location);
  db.run(`insert into students 
    (badgeNumber,firstName,lastName) 
    values (?, ?, ?) 
    ON CONFLICT(badgeNumber) DO UPDATE SET firstName = excluded.firstName, lastName = excluded.lastName`, 
    [studentData.badgeNumber, studentData.firstName, studentData.lastName], 
    function(err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Row(s) inserted or updated: ${this.changes}`);
      }
    }
  ); 
}

// //---------------------------------------------------------------
// function saveStudentDataToDb(studentWindow, studentData) {
//   console.log(`saveStudentData was clicked: ${JSON.stringify(studentData)}`);
//   result = this.validateStudentData(studentData);
//   if (validateStudentObj.isOkToUpdate(result)) {
//     this.updateStudentsData(studentData);
//     result['saveMessage'] = 'Student data was updated';
//     setTimeout(() => {
//       console.log(`saveStudentData was saved to database: ${JSON.stringify(result)}`);
//       studentWindow.webContents.send('saveStudentDataResult', result);
//     }, 500);    
//   }
//   else {
//     setTimeout(() => {
//       console.log(`saveStudentData failed validation: ${JSON.stringify(result)}`);
//       studentWindow.webContents.send('saveStudentDataResult', result);
//       result['saveMessage'] = 'Student data was not updated';
//     }, 500);    
//   }
// }

//---------------------------------------------------------------
module.exports = {
  createStudentsTable,
  updateStudentsData,
  //saveStudentDataToDb
};