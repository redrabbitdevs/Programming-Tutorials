const comments = document.querySelector("#comments");

function addComment(text) {
  const li = document.createElement("li");
  li.textContent = text;
  comments.append(li);
}

addComment("Nice page!");
addComment("<img src='x' onerror='alert(1)'>");
