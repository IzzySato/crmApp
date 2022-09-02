const warningMessageHTML = (msg) => `
<div class="warningMsgDiv">
  <h2 class="warningMsg">${ msg }</h2>
</div>
`;

const reguiredInputCheck = (input, fieldName, className) => {
  const div = document.querySelector(`.${className}`);
  if(input === '') {
    div.innerHTML = warningMessageHTML(`${ fieldName } is required`);
  }
};

const phoneInputCheck = (input, className) => {
  const div = document.querySelector(`.${className}`);
  if(/[a-zA-Z]/.test(input)) {
    div.innerHTML = warningMessageHTML('no characters here');
  }
  if(input.includes(' ')) {
    div.innerHTML = warningMessageHTML('no space here');
  }
};

const emailInputCheck = (input, className) => {
  const div = document.querySelector(`.${className}`);
  // if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$/.test(input)) {
  //   div.innerHTML = warningMessageHTML('email must be contains @, . , a-z, and 0-9');
  // }
  if(input.includes(' ')) {
    div.innerHTML = warningMessageHTML('no space here');
  }
};

export {
  reguiredInputCheck,
  phoneInputCheck,
  emailInputCheck
}