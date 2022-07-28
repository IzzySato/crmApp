const permissionInput = document.querySelector('#permissionInput');
const selectedPermissions = document.querySelector('#selectedPermissions');
const myPermission = [];

const html = (permission) => `
    <span class="permissionTag">${permission}</span>
  `;

const displaySelectedPermission = () => {
  myPermission.push(permissionInput.value);
  selectedPermissions.innerHTML = myPermission.map(permission => html(permission)).join('');
}


export {
  displaySelectedPermission,
}