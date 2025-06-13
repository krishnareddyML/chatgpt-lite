const API_URL = "http://192.168.20.95:11434/api/chat"; // replace with your Ollama endpoint

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function appendMarkdown(role, rawText) {
  const wrapper = document.createElement("div");
  wrapper.className = role === "user" ? "message user" : "message bot";
  wrapper.innerHTML = marked.parse(rawText);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearChat() {
  document.getElementById("chat-box").innerHTML = "";
}

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMarkdown("user", userMessage);
  userInput.value = "";

  const botWrapper = document.createElement("div");
  botWrapper.className = "message bot";
  chatBox.appendChild(botWrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  const payload = {
    model: "qwen2.5:latest",
    messages: [{ role: "user", content: userMessage }],
    stream: true
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    for (const line of chunk.trim().split("\n")) {
      if (!line) continue;
      const json = JSON.parse(line);
      const part = json?.message?.content || "";
      fullText += part;
      botWrapper.innerHTML = marked.parse(fullText);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
}

