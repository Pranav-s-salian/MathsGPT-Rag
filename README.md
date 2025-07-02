# AI Assistant - Math & Logic Solver

<!-- Tech Stack Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/LangChain-FFD700?style=for-the-badge&logo=langchain&logoColor=black" alt="LangChain" />
  <img src="https://img.shields.io/badge/Groq-FF6F00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkY2RjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=" alt="Groq" />
  <img src="https://img.shields.io/badge/Spline-1E1E1E?style=for-the-badge&logo=spline&logoColor=white" alt="Spline" />
</p>

---

> **AI Assistant** is a modern, interactive web application that helps users solve math problems and logic questions using advanced AI models. It features a beautiful animated Spline background, a responsive chat interface, and a robust backend powered by [LangChain](https://python.langchain.com/) and [Groq](https://groq.com/).

---

## ✨ Features

- **Conversational AI** for math and logic queries
- **Step-by-step explanations** using reasoning agents
- **Math calculation** and **Wikipedia search** tools
- **Animated Spline background** for a stunning visual experience
- **Modern React frontend** with Tailwind CSS and Framer Motion
- **Toast notifications** and copy-to-clipboard
- **Clear chat, keyboard shortcuts, and more**

---

## 🖼️ Demo

![Chat Demo](https://user-images.githubusercontent.com/yourusername/demo-chat.gif)

---

## 🏗️ Project Structure

```
MathsGpt/
├── backend/
│   └── app.py
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   ├── hooks/
    │   ├── types/
    │   └── ...
    └── ...
```

---

## 🚀 How It Works

### 1. **Frontend (React + Spline + Tailwind)**

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).
- The chat UI is modern, responsive, and animated using [Framer Motion](https://www.framer.com/motion/).
- The background uses a [Spline](https://spline.design/) animation embedded via an `<iframe>`, creating a visually appealing, interactive experience.

**Spline Integration Example:**

```tsx
// SplineBackground.tsx
<iframe 
  src='https://my.spline.design/particles-GHWJyRm9agtDIGczNa7aP1b1/' 
  ... 
/>
```

- Users can type questions, see AI responses, copy answers, and receive toast notifications.
- Example chat UI:

![Chat UI Screenshot](https://user-images.githubusercontent.com/yourusername/chat-ui.png)

### 2. **Backend (Flask + LangChain + Groq)**

- The backend is a [Flask](https://flask.palletsprojects.com/) server with CORS enabled for frontend communication.
- Uses [LangChain](https://python.langchain.com/) to orchestrate multiple tools:
  - **Calculator**: For mathematical computations using `LLMMathChain`.
  - **Wikipedia**: For factual lookups.
  - **Reasoning Agent**: For step-by-step logical explanations.
- Powered by [Groq](https://groq.com/) LLMs (e.g., `gemma2-9b-it`).

**Agent Integration:**

```python
# app.py
assistant_agent = initialize_agent(
    tools=[calculator, wikipedia_tool, reasoning_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    ...
)
```

- The `/chat` endpoint receives a question, selects the right tool (math, Wikipedia, or reasoning), and returns a detailed answer.

---

## 🔗 Backend & Frontend Integration

- The frontend sends a POST request to `http://localhost:5000/chat` with the user's question.
- The backend processes the question using the agent, selects the appropriate tool, and returns a JSON response.
- The frontend displays the response in the chat, with markdown rendering and copy support.

**Request Example:**

```ts
// useChat.ts
const response = await fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: content }),
});
```

---

## 🧠 How the Agent Works

- **Zero-Shot ReAct Agent**: The agent uses the [ReAct](https://arxiv.org/abs/2210.03629) paradigm to decide which tool to use for each question.
- **Tools**:
  - **Calculator**: Handles math expressions.
  - **Wikipedia**: Handles factual lookups.
  - **Reasoning**: Handles explanations and general logic.
- **Prompt Engineering**: The reasoning tool uses a custom prompt to encourage step-by-step explanations.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.9+
- [Groq API Key](https://console.groq.com/)

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/MathsGpt.git
cd MathsGpt
```

### 2. **Backend Setup**

```sh
cd backend
pip install flask flask-cors langchain langchain_groq langchain_community
# Set your Groq API key in app.py
python app.py
```

### 3. **Frontend Setup**

```sh
cd frontend
npm install
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Screenshots

| Chat Interface | Spline Background | Toast Notification |
|:--------------:|:----------------:|:------------------:|
| ![Chat](https://user-images.githubusercontent.com/yourusername/chat-ui.png) | ![Spline](https://user-images.githubusercontent.com/yourusername/spline-bg.png) | ![Toast](https://user-images.githubusercontent.com/yourusername/toast.png) |

---

## ⚙️ Customization

- **Change Spline Animation**: Edit the `src` URL in [`SplineBackground.tsx`](frontend/src/components/Background/SplineBackground.tsx).
- **Add More Tools**: Extend the agent in [`app.py`](backend/app.py) with new tools.
- **Styling**: Modify Tailwind classes in [`index.css`](frontend/src/index.css).

---

## 📚 Resources

- [LangChain Documentation](https://python.langchain.com/docs/)
- [Groq API](https://console.groq.com/)
- [Spline](https://spline.design/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [LangChain](https://python.langchain.com/)
- [Groq](https://groq.com/)
- [Spline](https://spline.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**Made with ❤️ by Pranav s salian