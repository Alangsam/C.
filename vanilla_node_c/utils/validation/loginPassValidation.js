function loginPassValidation(string) {
  if (string.length === 0) {
    return "Please enter Password";
  } else return "";
}

module.exports = { loginPassValidation };
