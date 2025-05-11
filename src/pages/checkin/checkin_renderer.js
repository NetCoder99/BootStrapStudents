//const badgeNumber = document.getElementById('badgeNumberInp')
document.getElementById('badgeNumberInp').addEventListener('keypress', (event) => {
  console.log('keypress was detected')
  if (event.key === 'Enter') {
    const badgeNumberInp  = document.getElementById('badgeNumberInp')
    const checkinLbl      = document.getElementById('checkinLbl')
    event.preventDefault();
    checkinLbl.innerHTML  = `Badge number: ${badgeNumberInp.value} was scanned.`
    badgeNumberInp.value  = ''
  }  
})

