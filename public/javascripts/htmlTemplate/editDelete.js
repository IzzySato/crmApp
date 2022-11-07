const editDelete = ({ _id, name }, itemName) =>
  `<span class="btns">
    <button data-id="${_id}" data-name="${name}" class="edit btn detailEditBtn ${itemName}Edit">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-pen-to-square editIcon ${itemName}EditIcon"></i>
    </button>
    <button data-id="${_id}" data-name="${name}" class="delete btn detailEditBtn ${itemName}Delete">
      <i data-id="${_id}" data-name="${name}" class="fa-solid fa-trash deleteIcon ${itemName}DeleteIcon"></i>
    </button>
  </span>`;

export {
  editDelete
}