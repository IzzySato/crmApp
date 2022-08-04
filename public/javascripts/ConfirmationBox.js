export default class ConfirmationBox {
  constructor(div, onYes, onNo = () => {}) {
    this.div = div;
    this.onYes = onYes;
    this.onNo = onNo;
    this.div.innerHTML = '';
  }

  getHTML() {
    return `
    <div class="confirmBox">
      <h2 class="confirmTitle">Are you sure?</h2>
      <button class="confirmBtn submit confirmedSubmit">YES</button>
      <button class="cancel confirmBtn">NO</button>
    </div>`;
  }

  show() {
    this.div.innerHTML = this.getHTML();
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
    this.onYes();
    this.div.innerHTML = '';
  }

  cancel() {
    this.div.innerHTML = '';
    this?.onNo();
  }
}