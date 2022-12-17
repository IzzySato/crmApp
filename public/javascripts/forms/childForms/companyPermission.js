import { addPermission } from '../../api/companyAPI.js';
import { deleteHtml } from '../../htmlTemplate/common/detailEditDetail.js';
import Form from '../Form.js';

export default class CompanyPermission extends Form {
  constructor({ 
    data,
    submitFunc,
    onBeforeSubmitFunc,
    successMsg,
    router
  }) {
    super({
      data,
      submitFunc,
      onBeforeSubmitFunc,
      successMsg,
      router
    });
    this.itemName ='permission';
  }

  getData() {
    return {
      formData: {
        formClass: 'permissionForm'
      },
      fields: [
        {
          name: 'Permission Name',
          placeholder: this.data.placeholder,
          inputId: 'tags',
          inputType: 'checkbox',
          current: '',
          inputs: this.data?.avaiableTags,
        },
      ]}
  }

  permissionForm() {
    return `
    <div class="addEditForm">
      <div class="permissionAddDiv">
        ${super.basicInputHTML(this.getData().fields[0])}
        <button id="addPermissionBtn">
          Add new permission
        </button>
      </div>
      ${(this.data.permissions.length !== 0)? `<div>
      <h2 class="subTitle">Current Permissions</h2>
      <ul class="permissionUl">
        ${this.data.permissions.map((permission) => `<li>${permission} ${deleteHtml({_id, name: ''}, this.itemName)}}</li>`).join('')}
      </ul>
    </div>`: ''}
      <button id="cancelBtn" class="cancel closeBtn">
        Close
      </button>
    </div>
    `
  }

  displayPermissionForm() {
    this.addEditDiv.innerHTML = this.permissionForm();
    this.isOpen = true;
    const addBtn = this.addEditDiv.querySelector('#addPermissionBtn');
    addBtn.addEventListener('click', () => {
      // open confirmation box
      this.submit = addPermission;
      super.show();
    });
    super.cancelEvent();
  }
}