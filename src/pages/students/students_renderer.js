document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded`)
});

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const menuClickedMessage = document.getElementById('menuClickedMessage')
window.electronAPI.asyncMessage((value) => {
  console.log(`asyncMessage was activated: ${JSON.stringify(value)}`)
  menuClickedMessage.innerHTML = JSON.stringify(value)
})

badgeNumber = document.getElementById('badgeNumber')
badgeNumber.addEventListener('keypress', (event) => {
  console.log(`keypress was detected: `)
  if (event.key === 'Enter') {
    console.log(`enter key detected: ${badgeNumber.value}`)
    setTimeout(resetBadgeNumber, 2000, 1234)
    event.preventDefault();
  }  
})
function resetBadgeNumber(inpValue) {
  console.log(`resetBadgeNumber: ${inpValue}`)
  badgeNumber.value = inpValue
//  console.log(`Hello, ${name}!`);
}


//-------------------------------------------------------------------
// invoked by the save button click event
//-------------------------------------------------------------------
const saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', () => {
  console.log('Save button was clicked')
  studentData = {
    'badgeNumber' : badgeNumber.value,
    'firstName'   : document.getElementById('firstName').value,
    'lastName'    : document.getElementById('lastName').value,
  }
  console.log(`studentData: ${JSON.stringify(studentData)}`);
  setFormEnabled(document.getElementById('formStudentData'), true);
  window.electronAPI.saveStudentData(studentData);
})

//-------------------------------------------------------------------
// invoked by the main ipc emit event 
//-------------------------------------------------------------------
window.electronAPI.saveStudentDataResult((result) => {
  console.log(`saveStudentDataResult was activated: ${JSON.stringify(result)}`)
  try {
    if (result.badgeNumber.status === 'err') {
      document.getElementById('badgeNumber_error').innerHTML = result.badgeNumber.msg;
      document.getElementById('badgeNumber').classList.add("is-invalid"); 
      document.getElementById('badgeNumber').focus(); 
    }
    else {
      document.getElementById('badgeNumber_error').innerHTML = "";
      document.getElementById('badgeNumber').classList.remove("is-invalid"); 
      document.getElementById('badgeNumber').classList.add("is-valid"); 
    }
    setInputFormStatus(
      document.getElementById('firstName'), 
      document.getElementById('firstName_error'),
      result.firstName);
    setInputFormStatus(
        document.getElementById('lastName'), 
        document.getElementById('lastName_error'),
        result.lastName);
  
    } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setFormEnabled(document.getElementById('formStudentData'), false);
  }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function setInputFormStatus(form_element, err_element, field_status) {
  if (field_status.status === 'err') {
    err_element.innerHTML = field_status.msg;
    form_element.classList.add("is-invalid"); 
    form_element.focus(); 
  }
  else {
    err_element.innerHTML = "";
    form_element.classList.remove("is-invalid"); 
    form_element.classList.add("is-valid"); 
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function setFormEnabled(form, isDisabled) {
  console.log(`setFormEnabled: ${isDisabled}`)
  document.getElementById('saveButton').disabled = isDisabled;
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
  }
}
