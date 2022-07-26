const login = async () => {
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;
  const user = {
    email,
    password
  };

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const { status, message } = await res.json();
    if(status === 'success') {
      location.href = '/';
    } else {
      // TODO message page
      // location.href = `/error/${message}`;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  login
}