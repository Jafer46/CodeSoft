function showSideBar () {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}

function closeSideBar () {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}

var message = document.querySelector('.message')
var messageClose = document.querySelector('.message-close')

messageClose.addEventListener('click', () => {
  if (message.classList.contains('show')) {
    message.classList.remove('show')
  } else {
    message.classList.add('show')
  }
})
