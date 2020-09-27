function regForForm(string) {
  const noNonChars = /(?<=\\.{1})/gi;
  const newStringNonChars = string.replace(noNonChars, "");
  const email = newStringNonChars.match(
    /(?<=email\\\"\\r\\n\\r\\n).*?(?=\\r\\n)/gi
  );
  const password = newStringNonChars.match(
    /(?<=password\\\"\\r\\n\\r\\n).*?(?=\\r\\n)/gi
  );
  return { email, password };
}

module.exports = { regForForm };
