let socket = io("http://localhost:3000");

let form = document.getElementById("form");
let input = document.getElementById("input");
let messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("sendMessage", { msg: input.value });
    input.value = "";
  } else {
    alert("Xabarni kiriting!");
  }
});

socket.on("receiveMessage", (data) => {
  console.log(data);
  var item = document.createElement("li");
  item.innerHTML = `<b>${data.userId}</b> <p>${data.msg}</p>`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
