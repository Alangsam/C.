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

function regForNoteForm(string) {
  const noNonChars = /(?<=\\.{1})/gi;
  const newStringNonChars = string.replace(noNonChars, "");
  const title = newStringNonChars.match(
    /(?<=title\\\"\\r\\n\\r\\n).*?(?=\\r\\n)/gi
  );
  const body = newStringNonChars.match(
    /(?<=body\\\"\\r\\n\\r\\n).*?(?=\\r\\n)/gi
  );
  return { title, body };
}

module.exports = { regForForm, regForNoteForm };
