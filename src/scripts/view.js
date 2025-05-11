//let $ = require('jquery')  // jQuery now loaded and assigned to $
const $ = require('jquery') 

let count = 0
$('#click-counter').text(count.toString())
$('#btn_success').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
}) 