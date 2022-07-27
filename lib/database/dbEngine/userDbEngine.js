const { getValueByKey } = require('../../cache');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// key should be email no user key
const key = 'user';

const getUsersDB = async () => {
  try {
    return await User.find();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllUsers = async () =>
  await getValueByKey(key, getUsersDB);

const getUsersByPermission = async (permissionName) => {
  const allUsers = await getAllUsers();
  return allUsers.filter(user => user.permission === permissionName);
};

const getUserByEmail = async (email) => {
  const allUsers = await getAllUsers();
  return allUsers.find(user => user.email === email);
};

const getUserById = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.find(user => user._id === id);
};

const getUserByEmailPw = async (email, password) => {
  const user = await getUserByEmail(email);
  if(await bcrypt.compare(password, user.password)) {
    return { status: 'success', user};
  }
  return { status: 'error', message: 'wrong password' }
};

// cache key permissions
const getAllPermissionsDB = async () => {
  const allUsers = await getAllUsers();
  const allPermissions = allUsers.map(({ permission }) => [ ...permission ]);
  return [... new Set([].concat.apply([], allPermissions))];
};

const getPermissions = async () =>
  await getValueByKey('permissions', getAllPermissionsDB);

const addUser = async ({ 
  firstName,
  lastName,
  email,
  password,
  permission 
}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      permission 
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editUser = () => {
  try {
    //TODO edit
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser = () => {
  try {
    //TODO delete
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUsersByPermission,
  getUserByEmail,
  getUserById,
  getUserByEmailPw,
  addUser,
  editUser,
  deleteUser,
  getPermissions
}
