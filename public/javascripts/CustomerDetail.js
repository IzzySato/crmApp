

export default class CustomerDetail {
  constructor(div, data) {
    this.div = div;
    this.data = data;
  }

  getDetailHTML({
    firstName,
    lastName,
    email,
    phone,
    street1,
    city1,
    province1,
    street2,
    city2,
    province2,
    tags
   }) {
    return `
    <div id="customerDetailDiv" class="box">
      <div class="container">
        <div class="customerTitleDiv">
          <h1>Customer Detail</h1>
          <hr/>
        </div>
        <div id="nameDiv" class="detailInfoDiv">
          <h2 class="label">
            Name:
          </h2>
          <h2 class="info">
            <span>${firstName}</span>
            <span>${lastName}</span>
          </h2>
        </div>
        <div id="emailDiv" class="detailInfoDiv">
          <h2 class="label">
            email:
          </h2>
          <h2 class="info">
            <a href="mailto:${email}">${email}</a>
          </h2>
        </div>
        <div id="phoneDiv" class="detailInfoDiv">
          <h2 class="label">
            Phone:
          </h2>
          <h2 class="info">
            <a href="tel:${phone}">${phone}</a>
          </h2>
        </div>
        <div id="address1Div" class="detailInfoDiv">
          <h2 class="label">
            Address 1:
          </h2>
          <h2 class="info">
            <span class="addressSpan">${street1}</span>
            <span class="addressSpan">${city1}</span>
            <span class="addressSpan">${province1}</span>
          </h2>
        </div>
        <div id="address2Div" class="detailInfoDiv">
          <h2 class="label">
            Address 2:
          </h2>
          <div class="info">
            <span class="addressSpan">${street2}</span>
            <span class="addressSpan">${city2}</span>
            <span class="addressSpan">${province2}</span>
          </div>
        </div>
        <div class="tagDiv">
          <h2 class="label">Tags:</h2>
          <div>
            ${tags.map((tag) => `<span class="tags">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="detailBtnCloseDiv">
          <button id="detailCloseBtn">close</button>
        </div>
      </div>
      
    </div>
    `
  }

  show() {
    this.div.innerHTML = this.getDetailHTML(this.data);
    const detailCloseBtn = document.querySelector('#detailCloseBtn');
    detailCloseBtn.addEventListener('click', () => {
      this.cancel();
    });
    document.addEventListener('click', () => {
      this.cancel();
    })
  }

  cancel() {
    this.div.innerHTML = '';
  }

}