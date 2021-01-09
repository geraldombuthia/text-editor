const notes = document.getElementById("notes");
const save = document.getElementById("savebtn");
const title = document.getElementById("title");
const format = document.getElementById("format");
const namespan = document.getElementById("namespan");
let prompted = null;
let name = null;
// notes.addEventListener("keyup", () => {
//    notes.length
// })
title.addEventListener("click", function () {
    name = prompt("Save as", name);
    titleName();
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
            let z = confirm(`Do you want to save as ${name}${prompted || ".txt"}?`);
            if (!z) {
                title.click();
                format.click();
                linkCreator();
                return;
                
            } else {
                linkCreator();
                return;
            }
            
        }
        return;
        
    }
});
function linkCreator(){
    const link = document.createElement("a");
    link.download = `${name || Date.now()  }${prompted || ".txt"}`;
    link.href = generateTxtFile(notes.value);
    link.click();
    
}
function titleName() {
    namespan.textContent = name || "Untitled";
}
function readAsText() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain";
    input.click();
    input.addEventListener("change", function selectedFileChanged() {
        if (this.files.Length === 0) {
            console.log("No file selected");
        }
        name = this.files[0].name;
        namespan.textContent = name;
        console.log(this.files);
        const reader = new FileReader();
        reader.onload = function fileReadCompleted() {
            notes.textContent = reader.result;
            console.log(reader.result);
        }
        reader.readAsText(this.files[0]);
    })
}