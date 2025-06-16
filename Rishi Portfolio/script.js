const text =
  "RISHI ADDYE - BCA Student|web developer Aspiring Software Developer";

let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typedName").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

window.onload = typeWriter;
