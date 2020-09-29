function loginEmailValidation(string) {
  if (string.length === 0) {
    return "Please enter Email";
  } else return "";
}

module.exports = { loginEmailValidation };
