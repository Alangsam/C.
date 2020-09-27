function createPasswordValidation(string) {
  if (string.length === 0) {
    return "Please enter a password";
  } else if (string.length < 9) {
    return "Password must be at least 9 characters";
  } else if (string.length > 99) {
    return "Password must be ess than 100 characters";
  } else return "";
}

module.exports = { createPasswordValidation };
