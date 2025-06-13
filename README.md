# 💬 ChatGPT Lite (Frontend)

A lightweight ChatGPT-style UI built with HTML, CSS, and JavaScript that connects to a local Ollama API (e.g., FastAPI backend running qwen2.5:latest).

---

## 🔧 Features

- Markdown rendering (via `marked.js`)
- Streaming API support (Ollama-style responses)
- Chat history display
- Clear Chat button
- Clean UI, responsive layout

---

## 🖥️ How to Run Locally

### 📦 1. Prerequisites

- [VS Code](https://code.visualstudio.com/)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- A running backend (e.g., Python FastAPI with Ollama at `http://localhost:11434`)

---

### 🚀 2. Steps to Run

1. **Clone or Download** this project folder:

_Or just open the folder in VS Code._

2. **Open `index.html` in VS Code**

3. **Right-click → "Open with Live Server"**

This opens:  
`http://127.0.0.1:5500/index.html`

4. **Type a message and hit Send**  
It will connect to your API at `http://localhost:11434/api/chat`.

---

## 🔗 Backend API Format (Ollama Style)

### POST `/api/chat` Payload:

```json
{
"model": "qwen2.5:latest",
"messages": [{ "role": "user", "content": "Hello" }],
"stream": true
}


