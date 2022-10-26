export default class ConfirmationBox {
  constructor() {
    this.confirmDiv = document.querySelector('.confirmDiv');
    this.confirmDiv.innerHTML = '';
    this.confirm = false;
  }

  getHTML() {
    return `
    <div class="confirmBox">
      <h2 class="confirmTitle">${this.confirmMsg}</h2>
      <button class="confirmBtn submit confirmedSubmit">YES</button>
      <button class="cancel confirmBtn">NO</button>
    </div>`;
  }

  show() {
    this.confirmDiv.innerHTML = this.getHTML();
    const confirmBtn = this.confirmDiv.querySelector('.submit');
    const cancelBtn = this.confirmDiv.querySelector('.cancel');
    cancelBtn.addEventListener('click', () => {
      this.confirmDiv.innerHTML = '';
    });
    confirmBtn.addEventListener('click', async () => {
      this.confirmDiv.innerHTML = '';
      await this.submit();
    });
  }
}