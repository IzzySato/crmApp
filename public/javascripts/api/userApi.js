const addUser = (newUser) => {
  const res = fetch('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  console.log(res);
  return res;
}

export {
  addUser
}