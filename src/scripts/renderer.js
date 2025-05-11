const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', () => {
  console.log('Save button was clicked')
  const firstName = document.getElementById('firstName')
  window.electronAPI.setTitle(firstName.value)
})

const counter = document.getElementById('counter')
window.electronAPI.onUpdateCounter((value) => {
  //const oldValue = Number(counter.innerText)
  //const newValue = oldValue + value
  counter.innerText = 'test1'
  window.electronAPI.counterValue('test2')
})

window.electronAPI.onDecrementCounter((value) => {
  console.log(`onDecrementCounter was activated.`)
  counter.innerText = 'test3'
  window.electronAPI.decrementCounterValue('test4')
})

window.electronAPI.asyncMessage((value) => {
  console.log(`asyncMessage was activated: ${JSON.stringify(value)}`)
})

