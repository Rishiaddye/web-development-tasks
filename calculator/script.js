function append(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteChar() {
  let current = document.getElementById("display").value;
  document.getElementById("display").value = current.slice(0, -1);
}

function calculate() {
  try {
    document.getElementById("display").value = eval(
      document.getElementById("display").value
    );
  } catch (e) {
    document.getElementById("display").value = "Error";
  }
}
