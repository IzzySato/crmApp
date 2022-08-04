import { clickFunc } from '../../util/page-func-util.js';
const { getUsersByPermission } = require("../../../lib/database/dbEngine/userDbEngine");
const { sendEmail } = require("../../../lib/email");

const sendEmailToAdminClient = async () => {
  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');
  const email = document.querySelector('#email');
  const permission = document.querySelector('#permission');

  const newUser = {
    firstName,
    lastName,
    email,
    permission
  };

  const admin = await getUsersByPermission('owner');
  sendEmail(admin[0].email, newUser);
};

document.addEventListener('DOMContentLoaded', () => {

});