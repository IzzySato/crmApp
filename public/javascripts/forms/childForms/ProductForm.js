import Form from '../Form.js';

export default class ProductForm extends Form {
  constructor({
    data,
    crud,
    submitFunc,
    onBeforeSubmitFunc,
    successMsg
  }) {
    super({
      data,
      crud,
      submitFunc,
      onBeforeSubmitFunc,
      successMsg
    });
    this.itemName ='product';
    this.router = 'config';
  }

  getData() {
    return {
      formData: {
        formClass: 'productForm'
      },
      fields: [
        {
          name: 'Name',
          inputId: 'name',
          inputType: 'input',
          type: 'text',
          placeholder: 'Insulation',
          current: this.data?.current?.name,
          validator: (val) => val.length > 0,
          validatorMsg: 'product name must not be empty'
        },
        {
          name: 'Unit Price',
          inputId: 'unitPrice',
          inputType: 'input',
          type: 'number',
          placeholder: '20.34',
          current: this.data?.current?.unitPrice,
          validator: (val) => val > 0,
          validatorMsg: 'product unit price must greater than 0'
        },
        {
          name: 'Tax',
          inputId: 'tax',
          inputType: 'input',
          type: 'number',
          placeholder: '5.32',
          current: this.data?.current?.tax,
          validator: (val) => val > 0,
          validatorMsg: 'tax price must greater than 0'
        },
      ]
    }
  }
}