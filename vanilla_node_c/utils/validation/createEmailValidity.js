function createEmailValidity(string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (string.length === 0) {
    return "Please enter Email";
  } else if (re.test(string.toLowerCase()) === false) {
    return "Please enter a valid email";
  } else if (string.length > 100) {
    return "Please Use a shorter email";
  } else return "";
}

module.exports = { createEmailValidity };
