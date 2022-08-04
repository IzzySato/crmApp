export default class Message {
  constructor(div, status, msg, prevLocation) {
    this.div = div;
    this.status = status;
    this.msg = msg;
    this.prevLocation = prevLocation;
  }

  getHTML() {
    return `
    <div class="msgDiv ${this.status}">
      <h2>${this.msg}</h2>
    </div>`;
  }

  show() {
    this.div.innerHTML = this.getHTML();
    setTimeout(() => location.href = `/${this.prevLocation}`, 2000);
  }
}