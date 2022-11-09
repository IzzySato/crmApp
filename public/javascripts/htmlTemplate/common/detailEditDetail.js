const editDelete = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer twoBtns">
    <button data-id="${_id}" data-name="${name}" class="edit btn detailEditBtn ${itemName}Edit">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-pen-to-square editIcon ${itemName}EditIcon"></i>
    </button>
    <button data-id="${_id}" data-name="${name}" class="delete btn detailEditBtn ${itemName}Delete">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-trash deleteIcon ${itemName}DeleteIcon"></i>
    </button>
  </span>`;

const detailEditDelete = ({ _id, name }, itemName) =>
  `<span class="detailEditDeleteBtnContainer threeBtns">
    <button data-id="${_id}" data-name="${name}" class="detail btn detailDetailBtn ${itemName}Detail">
      <i data-id="${_id}" data-name="${name}" class="fa-sharp fa-solid fa-circle-info detailIcon ${itemName}DetailIcon"></i>
    </button>
    <button data-id="${_id}" data-name="${name}" class="edit btn detailEditBtn ${itemName}Edit">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-pen-to-square editIcon ${itemName}EditIcon"></i>
    </button>
    <button data-id="${_id}" data-name="${name}" class="delete btn detailEditBtn ${itemName}Delete">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-trash deleteIcon ${itemName}DeleteIcon"></i>
    </button>
  </span>`;

export {
  detailEditDelete,
  editDelete
}