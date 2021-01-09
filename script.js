const notes = document.getElementById("notes");
const save = document.getElementById("savebtn");
const title = document.getElementById("title");
const format = document.getElementById("format");
let prompted = null;
let name = null;
// notes.addEventListener("keyup", () => {
//    notes.length
// })
title.addEventListener("click", function () {
  name = prompt("Save as");
});
function generateTxtFile(text) {
  const fileTypes = {
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".epub": "application/epub+zip",
     ".html": "text/html",
     ".doc": "application/msword"
  };
  var textFile = null;
  var data = new Blob([text], {
    type: `${fileTypes[prompted] || fileTypes[prompted]}`,
  });

  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);
  return textFile;
}
format.addEventListener("click", function () {
  const type = prompt("Text type i.e .pdf, .txt, .doc, .epub, .html");
  if (
    type == ".pdf" ||
    type == ".txt" ||
    type == ".doc" ||
    type == ".html" ||
    type == ".epub"
  ) {
    prompted = type;
    console.log(prompted);
  }
});
save.addEventListener("click", function () {
  if (notes.value === "") {
    alert("Editor is empty can not save");
  } else {
    if (name == null) {
      name = `${Date.now()}`;
        confirm(`Do you want to save as ${name}${prompted || ".txt"}?`);
        
    }
      var link = document.createElement("a");
      link.download = `${name}${prompted || ".txt"}`;
      link.href = generateTxtFile(notes.value);
      link.click();
  }
});
