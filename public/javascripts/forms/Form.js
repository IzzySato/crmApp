import ConfirmationBox from "../ConfirmationBox.js";
import Message from "../Message.js";

export default class Form extends ConfirmationBox {
  constructor({
    router,
    crud,
    data = '',
    itemName,
    submitFunc,
    onBeforeSubmitFunc = () => {},
    successMsg }) {
    super();
    this.addEditDiv = document.querySelector('#addEditForm');
    this.isOpen = false;
    this.router = router;
    this.crud = crud;
    this.data = data;
    this.itemName = itemName;
    this.submitFunc = submitFunc;
    this.onBeforeSubmitFunc = onBeforeSubmitFunc;
    this.successMsg = successMsg;
    this.inputWarning = false;
  }

  // For single form
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
        placeholder: this?.data?.placeholder,
        current: this?.data?.name || '',
        validator: this?.data?.validator,
        validatorMsg: `${this.itemName} must not be empty`
      }]
    }
  }

  #fieldValidator(newVal, field) {
    if (field.validator) {
      const result = field.validator(newVal);
      if (!result) {
        const msgDiv = document.querySelector(`.${field.inputId}msgDiv`);
        msgDiv.innerHTML = field.validatorMsg;
        this.inputWarning = true;
      }
    }
  }

  #getNewInputValues() {
    const result = {}
    this.getData().fields.forEach((field) => {
      if (field.inputType === 'checkbox') {
        const newValueArray = [];
        const inputs = document.querySelectorAll('.checkbox');
        inputs.forEach((input) => (input.checked) ? newValueArray.push(input.value) : '');
        result[field.inputId] = newValueArray;
      } else {
        const newVal = document.querySelector(`#${field.inputId}`)?.value;
        this.#fieldValidator(newVal, field);
        result[field.inputId] = newVal;
      }
    });
    return result;
  }

  #getInputForm(inputType, data) {
    if (inputType === 'input') {
      return `<div class="inputDiv labelInput">
                  <label
                    class="labels"
                    for="${data.inputId}">
                    ${data.name}
                  </label>
                  ${(data.notes) ? `<p>${data.notes}</p>` : ''}
                  <input class="inputs"
                        placeholder="${data.placeholder}"
                        type="${data.type}"
                        id="${data.inputId}"
                        name="${data.inputId}"
                        ${(data.current) ? `value = ${data.current}` : ''}
                        ${(this.crud === 'detail')? 'readonly': ''}
                        />
                  <div class="warningMsgDiv ${data.inputId}msgDiv"></div>
                </div>`;
    }
    if (inputType === 'select') {
      return `<div class="${data.class}">
                <label class="labels" for="${data.inputId}">${data.name}</label>
                <select name="${data.inputId}" id="${data.inputId}">
                  ${data.options.map((value) => `<option value="${value}"
                  ${(value === data.current) ? 'selected' : ''}>${value}</option>`)}
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

  #buildForm() {
    return `<div data-id=${this.data?._id}
                class="form ${this.getData().formData.formClass}">
              <div class="addEditForm">
                <h1 class="formTitle">${this.itemName} ${this.crud}</h1>
                ${this.getData().fields.map((field) => this.#getInputForm(field.inputType, field)).join('')}
                    <div class="editAddBtnsDiv">
                    ${(this.crud !== 'detail') ?
                      `<button id="${this.crud}${this.itemName}Btn" class="openConfirmBtns submit editAddBtns">
                          ${this.crud} ${this.itemName}
                       </button>`: ''}
                      <button id="cancelBtn" class="cancel editAddBtns">
                        ${(this.crud === 'detail')? 'Close' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                </div>`;
  }

  #cancel() {
    this.isOpen = false;
    this.addEditDiv.innerHTML = '';
  }

  #cancelEvent() {
    const pageContainer = document.querySelector('.pageContainer');
    const cancelBtn = this.addEditDiv.querySelector('.cancel');
    cancelBtn.addEventListener('click', () => {
      this.#cancel();
    });
    pageContainer.addEventListener('click', () => {
      if (this.isOpen) {
        this.#cancel();
      }
    });
  }

  #openMsg() {
    const FormMessage = new Message(this.msg, this.router);
    FormMessage.show();
  }

  async #deleteFunc() {
    const obj = {};
    this?.onBeforeSubmitFunc(obj);
    await this.submitFunc(obj);
    this.#openMsg();
  }

  async submit() {
    const newData = this.#getNewInputValues();
    this?.onBeforeSubmitFunc(newData);
    console.log(newData);
    this.msg = this.successMsg(newData);
    await this.submitFunc(newData);
    this.#openMsg();
  }

  showForm() {
    this.addEditDiv.innerHTML = this.#buildForm();
    this.isOpen = true;
    this.msg = `${this.crud} ${this.itemName}`;
    const confirmBtn = this.addEditDiv.querySelector('.submit');
    confirmBtn.addEventListener('click', () => {
      // open confirmation box
      super.show();
    });
    this.#cancelEvent();
  }

  delete() {
    this.msg = this.successMsg();
    this.submit = this.#deleteFunc;
    super.show();
  }

  showDetail() {
    this.addEditDiv.innerHTML = this.#buildForm();
    this.isOpen = true;
    this.#cancelEvent();
  }
}