import { detailEditDelete, editDelete } from "./common/detailEditDetail.js";

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
    <span class="productSpan">${product.name}</span>
    ${ detailEditDelete(product, 'product') }
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