import { getCustomers } from '../../api/customerAPI.js';

const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemver',
  'December'
];

const serviceLabels = ['Home Reno', 'New build', 'Pool'];

const thisMonthColor = 'rgb(122, 223, 185)';
const workBarColor = 'rgb(89, 147, 212)';
const saleBarColor = 'rgb(221, 112, 61)';

const getBGDColorArr = (thisMonth, bgdColor, thisMonthColor) => {
  const bgdColorArr = [];
  for(let i = 1; i <=12; i++) {
    if(i === thisMonth) {
      bgdColorArr.push(thisMonthColor);
    } else {
      bgdColorArr.push(bgdColor);
    }
  }
  return bgdColorArr;
};

const thisMonth = new Date().getMonth()+1;

const workData = {
  labels: monthLabels,
  datasets: [{
    label: 'Number of jobs',
    backgroundColor: getBGDColorArr(thisMonth, workBarColor, thisMonthColor),
    data: [1, 10, 5, 2, 20, 30, 45, 2, 4, 7, 27, 19],
  }]
};

const workConfig = {
  type: 'bar',
  data: workData,
  options: {}
};

const workDougnutData = {
  labels: serviceLabels,
  datasets: [{
    backgroundColor: ['rgb(72, 180, 139)', 'rgb(209, 135, 42)', 'rgb(77, 209, 42)'],
    data: [60, 56, 27],
  }]
};

const workDoughnutConfig = {
  type: 'doughnut',
  data: workDougnutData,
  options: {}
};

const saleData = {
  labels: monthLabels,
  datasets: [{
    label: 'Number of sales',
    backgroundColor: getBGDColorArr(thisMonth, saleBarColor, thisMonthColor),
    data: [1, 10, 5, 2, 6, 20, 30, 45, 2, 4, 27, 19],
  }]
};

const saleConfig = {
  type: 'bar',
  data: saleData,
  options: {
  }
};

const saleDoughnutData = {
  labels: serviceLabels,
  datasets: [{
    backgroundColor: ['rgb(72, 180, 139)', 'rgb(209, 135, 42)', 'rgb(42, 115, 209)'],
    data: [3, 58, 20],
  }]
};

const saleDoughnutConfig = {
  type: 'doughnut',
  data: saleDoughnutData,
  options: {
  }
};

const insertTotalCustomers = async (companyId) => {
  const { data } = await getCustomers(companyId);
  const totalCustomerDiv = document.querySelector('#totalCustomerDiv');
  totalCustomerDiv.innerHTML = data.length;
};

const indexInit = async (companyId) => {
  await insertTotalCustomers(companyId);
};

document.addEventListener('DOMContentLoaded', async () => {
  const companyId = document.querySelector('#container').dataset.id;
  await indexInit(companyId);
  const workChart = new Chart(
    document.getElementById('workChart'),
    workConfig
  );
  const workDoughnutChart = new Chart(
    document.getElementById('workDoughnutChart'),
    workDoughnutConfig
  );
  const saleChart = new Chart(
    document.getElementById('saleChart'),
    saleConfig
  );
  const saleDoughnutChart = new Chart(
    document.getElementById('saleDoughnutChart'),
    saleDoughnutConfig
  );
});