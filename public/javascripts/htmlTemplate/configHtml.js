import { editDelete } from "./editDelete.js";

const serviceList = (service) =>
  `<li>
    <span>${service.name}</span>
    ${ editDelete(service, 'service') }
  </li>`;

const tagList = (tag) =>
  `<li>
    <span>${tag}</span>
    ${ editDelete({_id: '', name: tag}, 'tag') }
  </li>`;

const productList = (product) =>
  `<li>
    <span>
      <h2>${product.name}</h2>
      <p>${product.unitPrice}</p>
      <p>${product.tax}</p>
    </span>
    ${ editDelete(product, 'product') }
  </li>`;

const businessInfo = (businessName, address, phone) =>
  `<ul>
    <li>${businessName}</li>
    <li>${address}</li>
    <li>${phone}</li>
  </ul>`;

  export {
    businessInfo,
    serviceList,
    tagList,
    productList
  }