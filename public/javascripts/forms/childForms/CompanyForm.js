import Form from '../Form.js';

export default class CompanyForm extends Form {
  constructor({ 
    data,
    crud,
    submitFunc,
    onBeforeSubmitFunc,
    successMsg,
    router
  }) {
    super({
      data,
      crud,
      submitFunc,
      onBeforeSubmitFunc,
      successMsg,
      router
    });
    this.itemName ='company';
  }

  getData() {
    return {
      formData: {
        formClass: 'companyForm'
      },
      fields: [
        {
          name: 'Business Name',
          inputId: 'businessName',
          inputType: 'input',
          type: 'text',
          placeholder: 'name of your business',
          current: this.data?.current?.businessName,
          validator: (val) => val.length > 0,
          validatorMsg: 'Business name must not be empty'
        },
        {
          name: 'Business logo',
          inputId: 'logoImg',
          inputType: 'input',
          type: 'file',
          current: this.data?.current?.logoImg
        },
        {
          name: 'Business Address',
          inputId: 'address',
          inputType: 'input',
          type: 'text',
          placeholder: '1344 main street',
          current: this.data?.current?.address,
          validator: (val) => val.length > 0,
          validatorMsg: 'Address must not be empty'
        },
        {
          name: 'Business Phone',
          inputId: 'phone',
          inputType: 'input',
          type: 'text',
          placeholder: '145-267-7282',
          current: this.data?.current?.phone,
          validator: (val) => val.length > 0,
          validatorMsg: 'Phone must not be empty'
        }
      ]}
  }
}