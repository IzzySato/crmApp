import Form from '../Form.js';

export default class CustomerForm extends Form {
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
    this.itemName ='customer';
    this.router = 'customer';
  }

  getData() {
    return {
      formData: {
        customerId: this.data?._id || '',
        formClass: 'customerForm'
      },
      fields: [
        {
          name: 'First Name',
          inputId: 'firstName',
          inputType: 'input',
          type: 'text',
          placeholder: 'John',
          current: this.data?.current?.firstName,
          validator: (val) => val.length > 0,
          validatorMsg: 'first name must not be empty'
        },
        {
          name: 'Last Name',
          inputId: 'lastName',
          inputType: 'input',
          type: 'text',
          placeholder: 'Doe',
          current: this.data?.current?.lastName,
          validator: (val) => val.length > 0,
          validatorMsg: 'last name must not be empty'
        },
        {
          name: 'email',
          inputId: 'email',
          inputType: 'input',
          type: 'text',
          placeholder: 'example@com',
          current: this.data?.current?.email,
          validator: (val) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val),
          validatorMsg: 'invalid email'
        },
        {
          name: 'phone',
          inputId: 'phone',
          inputType: 'input',
          type: 'text',
          placeholder: '6041231235',
          current: this.data?.current?.phone,
        },
        {
          name: 'street 1',
          inputId: 'street1',
          inputType: 'input',
          type: 'text',
          placeholder: '1256 main street',
          current: this.data?.current?.street1,
          validator: (val) => val.length > 0,
          validatorMsg: 'street must not be empty'
        },
        {
          name: 'city 1',
          inputId: 'city1',
          inputType: 'input',
          type: 'text',
          placeholder: 'Vancouver',
          current: this.data?.current?.city1,
          validator: (val) => val.length > 0,
          validatorMsg: 'city must not be empty'
        },
        {
          name: 'Provinces',
          inputId: 'province1',
          inputType: 'select',
          current: this.data?.current?.province1,
          options: ['BC', 'NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'YT', 'NT', 'NU'],
          validator: (val) => val.length > 0,
        },
        {
          name: 'street 2',
          inputId: 'street2',
          inputType: 'input',
          type: 'text',
          placeholder: '1256 main street',
          current: this.data?.current?.street2,
        },
        {
          name: 'city 2',
          inputId: 'city2',
          inputType: 'input',
          type: 'text',
          placeholder: 'Vancouver',
          current: this.data?.current?.province2,
        },
        {
          name: 'Province 2',
          inputId: 'province2',
          inputType: 'select',
          options: ['BC', 'NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'YT', 'NT', 'NU'],
        },
        {
          name: 'Tag',
          inputId: 'tags',
          inputType: 'checkbox',
          current: this.data?.current?.tags,
          inputs: this.data?.avaiableTags,
          notes: '* To add or remove tags, go to configuration/tags'
        },
      ]
    }
  }

  showDetailForm() {
  }
}
