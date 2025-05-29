const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");

const botReplies = [
  "Hello! How can I assist you today?",
  "Interesting point!",
  "Could you explain that a bit more?",
  "Absolutely, I get what you mean.",
  "Let me check that real quick...",
  "Thanks for sharing that!",
  "Hmm, that's something to think about.",
  "Okay, noted.",
  "You're doing great, by the way.",
  "I'm here if you need anything else.",
  "That's a good question!",
  "Haha, that made me smile.",
  "Sounds like you're having a day!",
  "Cool, tell me more.",
  "Give me a second to think...",
  "Honestly, same here sometimes.",
  "That’s one way to look at it.",
  "Wow, I didn’t expect that!"
];

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  messageInput.value = "";
  messageInput.style.height = "40px";

  showTyping();

  setTimeout(() => {
    hideTyping();
    const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
    appendMessage("bot", reply);
  }, 1500);
}

function showTyping() {
  let typing = document.getElementById("typingIndicator");
  if (!typing) {
    typing = document.createElement("div");
    typing.classList.add("message", "bot", "typing");
    typing.id = "typingIndicator";
    typing.innerText = "Bot is typing...";
    chatArea.appendChild(typing);
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

function hideTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

messageInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function toggleSidebar() {
  const sidebar = document.getElementById("leftMenu");
  sidebar.classList.toggle("collapsed");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function selectChat(name, element) {
  document.getElementById("chatWith").innerText = name;
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  document.getElementById("chatAvatar").innerText = initials;
  chatArea.innerHTML = "";
  appendMessage("bot", `You are now chatting with ${name}.`);
  document.querySelectorAll(".chat-user").forEach(user => user.classList.remove("active"));
  element.classList.add("active");
}
