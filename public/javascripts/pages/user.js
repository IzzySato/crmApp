const permissionInput = document.querySelector('#permissionInput');
const selectedPermissions = document.querySelector('#selectedPermissions');
const confirmDiv = document.querySelector('#confirmDiv');
const myPermission = [];

const html = (permission) => `
    <li>${permission}</li>
  `;

const displaySelectedPermission = () => {
  myPermission.push(permissionInput.value);
  selectedPermissions.innerHTML = myPermission.map(permission => html(permission)).join('');
}

const displayConfirmDiv = () => {
  (confirmDiv.style.display === 'none') ? 
    confirmDiv.style.display = 'block' 
      : confirmDiv.style.display = 'none';
}

export {
  displaySelectedPermission,
  displayConfirmDiv
}