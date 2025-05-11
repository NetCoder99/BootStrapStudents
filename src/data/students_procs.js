var fs = require('fs');

//---------------------------------------------------------------
function updateStudentsData(studentData) { 
  try {
    fs.writeFileSync('./src/data/students.json', JSON.stringify(studentData), 'utf8');
  }
  catch(error) {
    console.error(error);
  }
}

module.exports = updateStudentsData;