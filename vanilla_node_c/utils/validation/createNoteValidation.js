function createNoteValidation(title, note) {
  let titleVar;
  let noteVar;
  if (title.length === 0) {
    titleVar = 0;
  } else if (title.length > 1000) {
    titleVar = 0;
  } else titleVar = 1;
  if (note.length === 0) {
    noteVar = 0;
  } else if (note.length > 1000) {
    noteVar = 0;
  } else noteVar = 1;
  return { titleVar, noteVar };
}

module.exports = { createNoteValidation };
