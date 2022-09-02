import { confirmOpen } from '../util/page-func-util.js';
import ConfirmationBox from './ConfirmationBox.js';
import { addEditCustomer } from './pages/customer-func.js';

export default class CustomerForm extends ConfirmationBox {
  constructor(div, addOrEdit, data) {
    super();
    this.div = div;
    this.addOrEdit = addOrEdit;
    this.data = data;
  }

  getAddEditForm () {
    return `
    <div id="formDiv" data-id="${this.data?._id}">
        <div class="formDiv ${this.addOrEdit}Form">
          <div>
            <h1 class="title">Customer ${this.addOrEdit}</h1>
              <div class="form">
              <div class="inputDiv">
                <div class="inputMsgDiv firstNameMsgDiv"></div>
                <label class="labels" for="firstName">First Name</label>
                <input class="inputs"
                       type="text"
                       placeholder="John"
                       id="customerFirstName"
                       name="firstName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.firstName}" />
              </div>
              <div class="inputDiv">
                <div class="inputMsgDiv lastNameMsgDiv"></div>
                <label class="labels" for="lastName">Last Name</label>
                <input class="inputs"
                       type="text"
                       placeholder="Smith"
                       id="customerLastName"
                       name="lastName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.lastName}" />
              </div>
              <div class="inputDiv">
                <div class="inputMsgDiv emailMsgDiv"></div>
                <label class="labels" for="email">email</label>
                <input class="inputs"
                       type="email"
                       placeholder="example@com"
                       id="customerEmail"
                       name="email"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.email}" />
              </div>
              <div class="inputDiv">
                <div class="inputMsgDiv phoneMsgDiv"></div>
                <label class="labels" for="tel">Phone</label>
                <input class="inputs"
                       type="tel"
                       placeholder="6041231235"
                       id="customerPhone"
                       name="tel"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.phone}" />
              </div>
              <div class="inputDiv addressDiv">
                <h2>Address 1</h2>
                <hr />
                <div class="inputMsgDiv streetMsgDiv"></div>
                <label class="labels" for="street">Street</label>
                <input class="inputs"
                       type="text"
                       id="address1street"
                       name="street"
                       placeholder="123 main street"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.street1}" /><br />
                <div class="inputMsgDiv cityMsgDiv"></div>
                <label class="labels" for="city">City</label>
                <input class="inputs"
                       type="text"
                       id="address1city"
                       name="city"
                       placeholder="Vancouver"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.city1}" /><br />
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
              <div class="inputDiv addressDiv">
                <h2>Address 2</h2>
                <hr />
                <label class="labels" for="street">Street</label>
                <input class="inputs"
                       type="text"
                       id="address2street"
                       name="street"
                       placeholder="123 main street"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.street2}" /><br />
                <label class="labels" for="city">City</label>
                <input class="inputs"
                       type="text"
                       id="address2city"
                       name="city"
                       placeholder="Vancouver"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.city2}" /><br />
                <label class="labels" for="provinces">Provinces</label>
                <select name="provinces" id="provinces2">
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
              <fieldset>
                <legend>Select lock (active customer should be unlock, no delete customer function but you can lock the customer)</legend>
                <input class="isLock unlock" type="radio" name="lock" value="unlock" ${(this.addOrEdit === 'add') ? 'checked' :  this.data.isLocked ? '' : 'checked' }> unlock
                <input class="isLock lock" type="radio" name="lock" value="lock" ${(this.addOrEdit === 'add') ? '' :  this.data.isLocked ? 'checked' : '' }> lock
              </fieldset>
            </div>
          </div>
          <div>
            <div class="editAddBtnsDiv">
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