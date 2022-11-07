export default class Message {
  constructor(msg, prevLocation) {
    this.msg = msg;
    this.prevLocation = prevLocation;
  }

  getHTML() {
    return `
    <div class="msgContainer">
      <div class="msgDiv">
        <h2>Successfully ${this.msg}</h2>
      </div>
    </div>
`;
  }

  show() {
    const div = document.querySelector('#msgDiv');
    div.innerHTML = this.getHTML();
    setTimeout(() => location.href = `/${this.prevLocation}`, 2000);
  }
}