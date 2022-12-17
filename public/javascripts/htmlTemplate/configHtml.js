import { detailEditDelete, editDelete, detailEdit } from "./common/detailEditDetail.js";

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

const businessInfo = (company) =>
  `<ul class="businessInfoUl">
    <span class="businessInfoSpan">
      <li>${company.businessName}</li>
      <li>${company.address}</li>
      <li>${company.phone}</li>
    </span>
    ${ detailEdit(company, 'company') }
  </ul>`;

  export {
    businessInfo,
    serviceList,
    tagList,
    productList
  }