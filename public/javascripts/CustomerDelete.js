import ConfirmationBox from './ConfirmationBox.js';

export default class CustomerDelete extends ConfirmationBox {
  constructor(confirmMsg) {
    super();
    this.confirmMsg = confirmMsg;
  }

  show() {
    super.show();
  }
}