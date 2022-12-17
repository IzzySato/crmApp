import { companyDev } from "./common/detailEditDetail.js";

const companyList = ({_id, businessName}) =>
`<li class="companyGrid">
  <div class="companyInfo">
    <div class="name">
      ${businessName}
    </div>
  </div>
  ${companyDev({_id, name: businessName}, 'dev')}
</li>`;

export {
  companyList
}