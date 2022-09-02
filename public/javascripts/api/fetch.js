const addFetch = async (newData, route) => {
  try {
    const res = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const fetchJSON = async (route) => {
  try {
    const res = await fetch(route);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editFetch = async (updateData, route) => {
  try {
    const res = await fetch(route, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteFetch = async (route) => {
  try {
    await fetch(route, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  addFetch,
  fetchJSON,
  editFetch,
  deleteFetch
}