const readFileAsync = (selectedFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(selectedFile);
  });
}

const uploadFile = async (selectedFile) => {
  try {
    return await readFileAsync(selectedFile);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export {
  uploadFile
}