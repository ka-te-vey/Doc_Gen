# AI Document Generator

A powerful full-stack application that leverages AI to generate high-quality documents such as READMEs, reports, and more. Built with a modern tech stack, it provides a seamless experience from drafting to exporting.

## 🚀 Features

- **AI-Powered Generation**: Leverages the Groq Cloud API for lightning-fast and intelligent document content generation.
- **Real-time Preview**: Instantly view generated documents with full Markdown support and syntax highlighting.
- **Persistent History**: Automatically saves your generation history in local storage, allowing you to revisit and restore previous drafts.
- **Export to PDF**: High-quality PDF export functionality using `jspdf` and `html2canvas`.
- **Modern UI/UX**:
  - Responsive design built with **Tailwind CSS 4**.
  - Dark and Light mode support.
  - Interactive sidebars for chat history and document configuration.
- **Document Customization**: Specify document types, titles, and authors to tailor the AI output.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Markdown Rendering**: `react-markdown` with `remark-gfm`
- **PDF Generation**: `jspdf` & `html2canvas`

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI Integration**: [Groq SDK](https://wow.groq.com/)
- **Environment Management**: `dotenv`

## 📁 Project Structure

```text
Document-Generator/
├── backend/            # Express server & API routes
│   ├── controller/     # Logic for AI generation
│   ├── router/         # API endpoint definitions
│   └── server.js       # Entry point for the backend
├── frontend/           # React application
│   ├── src/
│   │   ├── component/  # UI Components (Preview, Sidebar, etc.)
│   │   ├── UI/         # Reusable UI blocks
│   │   └── App.jsx     # Main application logic
│   └── public/         # Static assets
└── package.json        # Root scripts to run both apps
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20 or higher)
- A Groq API Key (Get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ka-te-vey/Document-Generator.git
   cd Document-Generator
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

From the **root directory**, run the following command to start both the frontend and backend concurrently:

```bash
npm start
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.
