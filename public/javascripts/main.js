const mobileIcon = document.querySelector('#mobileIcon');
const navUl = document.querySelector('#navUl');

const navToggle = () => {
  (navUl.style.display === 'none') ? 
    navUl.style.display = 'block' 
      : navUl.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  if(mobileIcon) {
    mobileIcon.addEventListener('click', () => {
      navToggle();
    });
  }
});