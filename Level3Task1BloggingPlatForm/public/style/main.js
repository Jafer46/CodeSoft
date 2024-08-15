const menuBar = document.querySelector('.menu-bar')
const closeButton = document.querySelector('.close-button')
const sidebar = document.querySelector('.sidebar')

menuBar.addEventListener('click', () => {
  sidebar.style.display = 'flex'
})

closeButton.addEventListener('click', () => {
  sidebar.style.display = 'none'
})

function showSideBar () {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}

function closeSideBar () {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}
