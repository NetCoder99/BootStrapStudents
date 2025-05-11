document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded`)
});

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

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', () => {
  console.log('Save button was clicked')
  const firstName = document.getElementById('firstName')
  window.electronAPI.setTitle(firstName.value)
})

const menuClickedMessage = document.getElementById('menuClickedMessage')
window.electronAPI.asyncMessage((value) => {
  console.log(`asyncMessage was activated: ${JSON.stringify(value)}`)
  menuClickedMessage.innerHTML = JSON.stringify(value)
})
