import { useState, useEffect } from "react"
import Hero from "./component/Hero"
import Sidebar from "./component/Sidebar"
import Preview from "./component/Preview"
import ExportModal from "./component/ExportModal"
import ChatHistorySidebar from "./component/ChatHistorySidebar"
import "./App.css"

const CHAT_HISTORY_STORAGE_KEY = "docgen_chat_history"
const THEME_STORAGE_KEY = "theme"

function readStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback

  try {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) return fallback

    const parsedValue = JSON.parse(storedValue)
    return parsedValue && typeof parsedValue === "object"
      ? { ...fallback, ...parsedValue }
      : fallback
  } catch {
    return fallback
  }
}

function writeStoredValue(key, value) {
  if (typeof window === "undefined") return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export default function App() {
  const defaultDocument = {
    title: "Untitled Document",
    content: "",
    
    author: "",
    documentType: "README",
    date: new Date().toISOString().split("T")[0]
  }
  const [sidebarData, setSidebarData] = useState(defaultDocument)
  const [previewData, setPreviewData] = useState(defaultDocument)

  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark"
    return localStorage.getItem(THEME_STORAGE_KEY) || "dark"
  })
  const [isGeneratorView, setIsGeneratorView] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window === "undefined") return []
    try {
      const storedHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_STORAGE_KEY) || "[]")
      return Array.isArray(storedHistory) ? storedHistory : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === "undefined") return

    const currentState = window.history.state || {}
    if (currentState.view !== "hero" && currentState.view !== "generator") {
      window.history.replaceState({ ...currentState, view: "hero" }, "")
    }

    const handlePopState = (event) => {
      setIsGeneratorView(event.state?.view === "generator")
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    writeStoredValue(CHAT_HISTORY_STORAGE_KEY, chatHistory)
  }, [chatHistory])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleDocumentChange = (field, value) => {
    setSidebarData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const openGeneratorView = () => {
    if (typeof window !== "undefined" && window.history.state?.view !== "generator") {
      window.history.pushState({ ...(window.history.state || {}), view: "generator" }, "")
    }
    setIsGeneratorView(true)
  }

  const returnToHero = () => {
    if (typeof window !== "undefined" && window.history.state?.view === "generator") {
      window.history.back()
      return
    }

    setIsGeneratorView(false)
  }

  const generateFromDraft = async () => {
    if (!sidebarData.content.trim()) return

    setIsGenerating(true)
    const apiUrl = import.meta.env.VITE_API_URL || "https://doc-gen-1.onrender.com"
    try {
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: sidebarData.content,
          documentType: sidebarData.documentType
        })
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      const generatedContent = data.generatedContent || 'Failed to generate content.'

      const nextPreviewData = {
        ...sidebarData,
        content: generatedContent
      }

      setPreviewData(nextPreviewData)
      setChatHistory((prev) => [
        {
          id: Date.now(),
          createdAt: Date.now(),
          title: (sidebarData.title || "Untitled Document").trim() || "Untitled Document",
          documentType: sidebarData.documentType || "README",
          input: { ...sidebarData },
          output: { ...nextPreviewData }
        },
        ...prev
      ].slice(0, 40))
    } catch (err) {
      console.error('Generation failed:', err)
      alert('Generation failed. Please check your API key and connection.')
    } finally {
      setIsGenerating(false)
    }
  }

  const clearDraft = () => {
    setSidebarData(defaultDocument)
    setPreviewData(defaultDocument)
  }

  const restoreFromHistory = (historyItem) => {
    if (!historyItem || typeof historyItem !== "object") return
    setSidebarData(historyItem.input || defaultDocument)
    setPreviewData(historyItem.output || defaultDocument)
    openGeneratorView()
    setIsHistoryOpen(false)
  }

  const clearHistory = () => {
    setChatHistory([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY)
    }
  }

  const deleteHistoryItem = (id) => {
    setChatHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const createNewChat = () => {
    setSidebarData(defaultDocument)
    setPreviewData(defaultDocument)
    openGeneratorView()
    setIsHistoryOpen(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Background Gradients for depth (No animations for performance) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ background: 'var(--page-bg)' }}></div>

      <ChatHistorySidebar
        isOpen={isHistoryOpen}
        onToggle={() => setIsHistoryOpen((prev) => !prev)}
        onClose={() => setIsHistoryOpen(false)}
        onNewChat={createNewChat}
        items={chatHistory}
        onRestore={restoreFromHistory}
        onDelete={deleteHistoryItem}
        onClear={clearHistory}
      />
      
      {isGeneratorView ? (
        <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-4 rounded-[20px] p-4 relative z-10 lg:h-[85vh]">
          <Sidebar 
            documentData={sidebarData}
            onDocumentChange={handleDocumentChange}
            onGenerate={generateFromDraft}
            onClear={clearDraft}
            theme={theme}
            toggleTheme={toggleTheme}
            isGenerating={isGenerating}
          />

          <main className="flex-1 min-h-0 overflow-hidden relative">
            <Preview
              documentData={previewData}
              onBack={returnToHero}
              onExportClick={() => setIsExportModalOpen(true)}
            />
          </main>
        </div>
      ) : (
        <Hero
          onStartGenerating={openGeneratorView}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {isExportModalOpen && (
        <ExportModal
          documentData={previewData}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  )
}
