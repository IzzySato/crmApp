const reguiredInput = (input, fieldName) => {
  if(input.value === '') {
    return { status: 'error', message: `${fieldName} must not be empty`}
  }
};