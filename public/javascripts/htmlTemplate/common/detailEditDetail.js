const editHtml = (_id, name, itemName) =>
  `<button data-id="${_id}" data-name="${name}" class="editBtn ${itemName}Edit">
    <i data-id="${_id}" data-name="${name}" class="fa-solid fa-pen-to-square editIcon ${itemName}EditIcon"></i>
  </button>`;

const deleteHtml = (_id, name, itemName) =>
`<button data-id="${_id}" data-name="${name}" class="deleteBtn ${itemName}Delete">
    <i data-id="${_id}" data-name="${name}" class="fa-solid fa-trash deleteIcon ${itemName}DeleteIcon"></i>
  </button>`;

const detailHtml = (_id, name, itemName) =>
`<button data-id="${_id}" data-name="${name}" class="detailBtn ${itemName}Detail">
  <i data-id="${_id}" data-name="${name}" class="fa-sharp fa-solid fa-circle-info detailIcon ${itemName}DetailIcon"></i>
</button>`;

const permissionHtml = (_id, name, itemName) =>
`<button data-id="${_id}" data-name="${name}" class="permissionBtn ${itemName}Permission">
  <i data-id="${_id}" data-name="${name}" class="fa-solid fa-user-tag permissionIcon ${itemName}PermissionIcon"></i>
</button>`;

const editDelete = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer twoBtns">
    ${editHtml(_id, name, itemName)}
    ${deleteHtml(_id, name, itemName)}
  </span>`;

const detailEdit = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer twoBtns">
    ${detailHtml(_id, name, itemName)}
    ${editHtml(_id, name, itemName)}
  </span>`;

const detailEditDelete = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer threeBtns">
    ${detailHtml(_id, name, itemName)}
    ${editHtml(_id, name, itemName)}
    ${deleteHtml(_id, name, itemName)}
  </span>`;

const companyDev = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer fourBtns">
    ${permissionHtml(_id, name, itemName)}
    ${detailHtml(_id, name, itemName)}
    ${editHtml(_id, name, itemName)}
    ${deleteHtml(_id, name, itemName)}
  </span>`;

export {
  detailEditDelete,
  detailEdit,
  editDelete,
  companyDev,
  deleteHtml
}