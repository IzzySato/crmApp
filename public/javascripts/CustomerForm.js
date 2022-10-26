import ConfirmationBox from './ConfirmationBox.js';
import { addEditCustomer } from './pages/customer/customerAddEdit.js';

export default class CustomerForm extends ConfirmationBox {
  constructor(avaiableTags, div, addOrEdit, data, confirmMsg) {
    super();
    this.avaiableTags = avaiableTags;
    this.div = div;
    this.addOrEdit = addOrEdit;
    this.data = data;
    this.confirmMsg = confirmMsg;
    console.log(this.data);
  }

  getAddEditForm () {
    const tagsOption = this.avaiableTags.map((tag) =>
    `<input
      name="tags"
      class="tags"
      type="Checkbox"
      ${(this.addOrEdit === 'edit' && this.data.tags.includes(tag)) ? 'checked': ''}
      value=${tag}>
        ${tag}
      </input>`).join('');

    return `
    <div id="formDiv" data-id="${this.data?._id}" class="cForm">
        <div class="formDiv ${this.addOrEdit}Form cForm">
          <div class="cForm">
            <h1 class="cusAddEditTitle">Customer ${this.addOrEdit}</h1>
              <div class="form cForm">
              <div class="inputDiv cusInputDiv cForm">
                <div class="inputMsgDiv firstNameMsgDiv"></div>
                <label class="labels" for="firstName">First Name</label>
                <input class="inputs"
                       type="text"
                       placeholder="John"
                       id="customerFirstName"
                       name="firstName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.firstName}" />
              </div>
              <div class="inputDiv cusInputDiv cForm">
                <div class="inputMsgDiv lastNameMsgDiv"></div>
                <label class="labels" for="lastName">Last Name</label>
                <input class="inputs"
                       type="text"
                       placeholder="Smith"
                       id="customerLastName"
                       name="lastName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.lastName}" />
              </div>
              <div class="inputDiv cusInputDiv cForm">
                <div class="inputMsgDiv emailMsgDiv"></div>
                <label class="labels" for="email">email</label>
                <input class="inputs"
                       type="email"
                       placeholder="example@com"
                       id="customerEmail"
                       name="email"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.email}" />
              </div>
              <div class="inputDiv cusInputDiv cForm">
                <div class="inputMsgDiv phoneMsgDiv"></div>
                <label class="labels" for="tel">Phone</label>
                <input class="inputs"
                       type="tel"
                       placeholder="6041231235"
                       id="customerPhone"
                       name="tel"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.phone}" />
              </div>
              <div class="inputDiv addressDiv cForm">
                <div class="addressTitleDiv">
                  <h2 class="addressTitle">Address 1</h2>
                  <hr />
                </div>
                <div class="addressInputDiv streetDiv cForm">
                  <div class="inputMsgDiv streetMsgDiv"></div>
                  <label class="labels" for="street">Street</label>
                  <input class="inputs"
                        type="text"
                        id="address1street"
                        name="street"
                        placeholder="123 main street"
                        value="${(this.addOrEdit === 'add') ? '' :  this.data.street1}" />
                </div>
                <div class="addressInputDiv cityDiv cForm">
                  <div class="inputMsgDiv cityMsgDiv"></div>
                  <label class="labels" for="city">City</label>
                  <input class="inputs"
                        type="text"
                        id="address1city"
                        name="city"
                        placeholder="Vancouver"
                        value="${(this.addOrEdit === 'add') ? '' :  this.data.city1}" />
                </div>
                <div class="addressInputDiv provinceDiv cForm">
                  <label class="labels" for="provinces">Provinces</label>
                  <select name="provinces" id="provinces1">
                    <option value="select">Select</option>
                    <option value="BC">BC</option>
                    <option value="NL">NL</option>
                    <option value="PE">PE</option>
                    <option value="NS">NS</option>
                    <option value="NB">NB</option>
                    <option value="QC">QC</option>
                    <option value="ON">ON</option>
                    <option value="MB">MB</option>
                    <option value="SK">SK</option>
                    <option value="AB">AB</option>
                    <option value="YT">YT</option>
                    <option value="NT">NT</option>
                    <option value="NU">NU</option>
                  </select>
                </div>
              </div>
              <div class="inputDiv addressDiv cForm">
                <div class="addressTitleDiv cForm">
                  <h2 class="addressTitle">Address 2</h2>
                  <hr />
                </div>
                <div class="addressInputDiv streetDiv cForm">
                  <label class="labels" for="street">Street</label>
                  <input class="inputs"
                        type="text"
                        id="address2street"
                        name="street"
                        placeholder="123 main street"
                        value="${(this.addOrEdit === 'add') ? '' :  this.data.street2}" />
                </div>
                <div class="addressInputDiv cityDiv cForm">
                  <label class="labels" for="city">City</label>
                  <input class="inputs"
                        type="text"
                        id="address2city"
                        name="city"
                        placeholder="Vancouver"
                        value="${(this.addOrEdit === 'add') ? '' :  this.data.city2}" />
                </div>
                <div class="addressInputDiv provinceDiv cForm">
                  <label class="labels" for="provinces">Provinces</label>
                  <select name="provinces" id="provinces2" class="cForm">
                    <option value="select">Select</option>
                    <option value="BC">BC</option>
                    <option value="NL">NL</option>
                    <option value="PE">PE</option>
                    <option value="NS">NS</option>
                    <option value="NB">NB</option>
                    <option value="QC">QC</option>
                    <option value="ON">ON</option>
                    <option value="MB">MB</option>
                    <option value="SK">SK</option>
                    <option value="AB">AB</option>
                    <option value="YT">YT</option>
                    <option value="NT">NT</option>
                    <option value="NU">NU</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="cForm">
            <label class="labels" for="tags">Tags</label><br/>
            <p class="notes">* To add or remove tags, go to configuration/tags</p>
              ${tagsOption}
          </div>
          <div class="cForm">
            <div class="editAddBtnsDiv cForm">
              <button id="${this.addOrEdit}Customer" class="openConfirmBtns submit editAddBtns">${(this.addOrEdit === 'add') ? 'Add' :  'Edit'} Customer</button>
              <button id="cancelBtn" class="cancel editAddBtns">Cancel</button>
            </div>
          </div>
        </div>
    </div>
    `;
  }

  show() {
    this.div.innerHTML = this.getAddEditForm();
    const confirmBtn = this.div.querySelector('.submit');
    const cancelBtn = this.div.querySelector('.cancel');
    cancelBtn.addEventListener('click', () => {
      this.cancel();
    });
    confirmBtn.addEventListener('click', async () => {
      super.show();
    });
    document.addEventListener('click', (e) => {
      if(!e.target.parentElement.classList.contains('cForm')) {
        this.cancel();
      }
    })
  }

  async submit() {
      const res = await addEditCustomer(this.addOrEdit);
      if (res.status === 'success' ) {
        this.div.innerHTML = '';
      } else {
        return;
      }
  }

  cancel() {
    this.div.innerHTML = '';
  }
}