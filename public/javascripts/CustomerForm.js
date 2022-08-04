import { addEditCustomer } from './pages/customer-func.js';

export default class CustomerForm {
  constructor(div, addOrEdit, data = {}) {
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
                <label class="labels" for="firstName">first name</label><br/>
                <input class="inputs"
                       type="text"
                       id="customerFirstName"
                       name="firstName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.firstName}"><br>
              </div>
              <div class="inputDiv">
                <label class="labels" for="lastName">last name</label><br/>
                <input class="inputs"
                       type="text"
                       id="customerLastName"
                       name="lastName"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.lastName}"><br>
              </div>
              <div class="inputDiv">
                <label class="labels" for="email">email</label><br/>
                <input class="inputs"
                       type="email"
                       id="customerEmail"
                       name="email"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.email}"><br>
              </div>
              <div class="inputDiv">
                <label class="labels" for="tel">Phone</label><br/>
                <input class="inputs"
                       type="tel"
                       id="customerPhone"
                       name="tel"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.phone}"><br>
              </div>
              <div class="inputDiv">
                <label class="labels" for="address">Address</label><br/>
                <input class="inputs"
                       type="text"
                       id="customerAddress"
                       name="address"
                       value="${(this.addOrEdit === 'add') ? '' :  this.data.address}"><br>
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
    confirmBtn.addEventListener('click', () => {
      this.submit();
    });
  }

  submit() {
    addEditCustomer(this.addOrEdit);
    this.div.innerHTML = '';
  }

  cancel() {
    this.div.innerHTML = '';
  }
}