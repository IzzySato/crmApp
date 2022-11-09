import { detailEditDelete } from "./common/detailEditDetail.js";

const tagClassList = (index) =>
  (index < 3) ? 'lessThree tagSpan' : 'moreThree tagSpan';
  
const customerHTML = ({
  _id,
  firstName,
  lastName,
  email,
  phone,
  street1,
  city1,
  tags,
  province1
}) => `
<li class="customerLi">
  <span class="name">
    ${firstName} ${lastName}
  </span>
  <span class="email">
    <a href="mailto:${email}">${email}</a>
  </span>
  <span class="phone">
    <a href="tel:${phone}">${phone}</a>
  </span>
  <span class="address1">
    ${street1} ${city1} ${province1}
  </span>
  <div class="tagContainer">
    <span class="tag" id="tag${_id}">
      ${tags.map((tag, index) => `<span class="${tagClassList(index)}">${tag}</span>`).join('')}
    </span>
    ${(tags.length > 3) ? `<span data-id="${_id}" class="moreDots" id="moreDots${_id}"><i data-id="${_id}" class="fa-sharp fa-solid fa-ellipsis moreDotsIcon"></i></span>` : ''}
  </div>
  ${detailEditDelete({_id, name: `${firstName} ${lastName}`})}
</li>`;

// insert the customer in pagination
export {
  customerHTML
}