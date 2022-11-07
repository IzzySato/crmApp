import ConfirmationBox from "./ConfirmationBox.js";
import Message from "./Message.js";

export default class Form extends ConfirmationBox {
  constructor({
    router,
    crud,
    data='',
    itemName,
    placeholder='',
    submitFunc,
    onBeforeSubmitFunc = () => {},
    validator,
    successMsg}) {
    super();
    this.addEditDiv = document.querySelector('#addEditForm');
    this.isOpen = false;
    this.router = router;
    this.crud = crud;
    this.data = data;
    this.itemName = itemName;
    this.placeholder = placeholder;
    this.submitFunc = submitFunc;
    this.onBeforeSubmitFunc = onBeforeSubmitFunc;
    this.validator = validator;
    this.successMsg = successMsg;
    this.formData = this.getData().formData;
    this.fields = this.getData().fields;
    this.inputWarning = false;
  }

  getData() {
    return {
      formData: {
        id: this.data?._id,
        formClass: 'singleForm'
      },
      fields: [{
        name: this.itemName,
        inputId: 'name',
        inputType: 'input',
        type: 'text',
        placeholder: this.placeholder,
        current: this?.data?.name || '',
        validator: this?.validator,
        validatorMsg: `${this.itemName} must not be empty`
      }]
    }
  }

  fieldValidator(newVal, field) {
    if(field.validator) {
      const result = field.validator(newVal);
      if(!result) {
        const msgDiv = document.querySelector(`.${field.inputId}msgDiv`);
        msgDiv.innerHTML = field.validatorMsg;
        this.inputWarning = true;
      }
    }
  }

  getNewInputValues() {
    const result = {}
    this.fields.forEach((field) => {
      if(field.inputType === 'checkbox') {
        const newValueArray = [];
        const inputs = document.querySelectorAll('.checkbox');
        inputs.forEach((input) => (input.checked) ? newValueArray.push(input.value) : '');
        result[field.inputId] = newValueArray;
      } else {
        const newVal = document.querySelector(`#${field.inputId}`)?.value;
        this.fieldValidator(newVal, field);
        result[field.inputId] = newVal;
      }
    });
    return result;
  }

  getInputForm(inputType, data) {
    if (inputType === 'input') {
      return `<div class="inputDiv">
                  <label
                    class="labels"
                    for="${data.inputId}">
                    ${data.name}
                  </label>
                  ${(data.notes) ? `<p>${data.notes}</p>` : ''}
                  <input class="inputs"
                        placeholder="${this.placeholder}"
                        type="${data.type}"
                        id="${data.inputId}"
                        name="${data.inputId}"
                        ${(data.current) ? `value = ${data.current}` : ''} />
                  <div class="warningMsgDiv ${data.inputId}msgDiv"></div>
                </div>`;
    }
    if (inputType === 'select') {
      return `<div class="${data.class}">
                <label class="labels" for="${data.inputId}">${data.name}</label>
                <select name="${data.inputId}" id="${data.inputId}">
                  ${data.options.map((value) => `<option value="${value}" ${(value === data.current)? 'selected' : ''}>${value}</option>`)}
                </select>
              </div>`;
    }
    if (inputType === 'checkbox') {
      return `<div class="inputDiv">
                <h3 class="inputTitle">${data.name}</h3>
                ${(data.notes) ? `<p class="notes">${data.notes}</p>` : ''}
                  <div class="checkBoxDiv">
                    ${data.inputs.map((input) => `<input class="checkbox"
                    type="Checkbox"
                    ${(data.current) ? (data.current.includes(input)) ? 'checked' : '' : ''}
                    name="${data.inputId}"
                    value=${input} /><span class="checkboxInput">${input}</span>`).join('')}
                  </div>
                </div>`;
    }
    return '';
  }

  buildForm() {
    return `<div data-id=${this.data?._id}
                class="form ${this.formData.formClass}">
              <div class="addEditForm">
                <h1 class="formTitle">${this.itemName} ${this.crud} Form</h1>
                ${this.fields.map((field) => this.getInputForm(field.inputType, field)).join('')}
                    <div class="editAddBtnsDiv">
                      <button id="${this.crud}${this.itemName}Btn" class="openConfirmBtns submit editAddBtns">
                        ${this.crud} ${this.itemName}
                      </button>
                      <button id="cancelBtn" class="cancel editAddBtns">Cancel</button>
                    </div>
                  </div>
                </div>`;
  }

  cancel() {
    this.isOpen = false;
    this.addEditDiv.innerHTML = '';
  }

  showForm() {
    this.addEditDiv.innerHTML = this.buildForm();
    this.isOpen = true;
    this.msg = `${this.crud} ${this.itemName}`;
    const confirmBtn = this.addEditDiv.querySelector('.submit');
    const pageContainer = document.querySelector('.pageContainer');
    const cancelBtn = this.addEditDiv.querySelector('.cancel');
    confirmBtn.addEventListener('click', () => {
      // open confirmation box
      super.show();
    });
    cancelBtn.addEventListener('click', () => {
      this.cancel();
    });
    pageContainer.addEventListener('click', () => {
      if (this.isOpen) {
        this.cancel();
      }
    });
  }

  openMsg() {
    const FormMessage = new Message(this.msg, this.router);
    FormMessage.show();
  }

  async delete() {
    this.msg = `${this.crud} ${this.itemName}`;
    super.show();
  }

  async submit() {
    const newData = this.getNewInputValues();
    this?.onBeforeSubmitFunc(newData);
    this.msg = this.successMsg(newData);
    await this.submitFunc(newData);
    this.openMsg();
  }
}