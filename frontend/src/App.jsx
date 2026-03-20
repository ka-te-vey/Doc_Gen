import { useState, useEffect } from "react"
import Hero from "./component/Hero"
import Sidebar from "./component/Sidebar"
import Preview from "./component/Preview"
import ExportModal from "./component/ExportModal"
import "./App.css"

const DRAFT_STORAGE_KEY = "docgen_sidebar_data"
const PREVIEW_STORAGE_KEY = "docgen_preview_data"
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

function hasStoredValue(key) {
  if (typeof window === "undefined") return false

  try {
    return Boolean(localStorage.getItem(key))
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
  const [sidebarData, setSidebarData] = useState(() => readStoredValue(DRAFT_STORAGE_KEY, defaultDocument))
  const [previewData, setPreviewData] = useState(() => readStoredValue(PREVIEW_STORAGE_KEY, defaultDocument))

  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark"
    return localStorage.getItem(THEME_STORAGE_KEY) || "dark"
  })
  const [isGeneratorView, setIsGeneratorView] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasSavedDraft, setHasSavedDraft] = useState(() => hasStoredValue(DRAFT_STORAGE_KEY))
  const [lastSavedAt, setLastSavedAt] = useState(() => hasStoredValue(DRAFT_STORAGE_KEY) ? Date.now() : null)

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
    if (writeStoredValue(DRAFT_STORAGE_KEY, sidebarData)) {
      setHasSavedDraft(true)
      setLastSavedAt(Date.now())
    }
  }, [sidebarData])

  useEffect(() => {
    if (typeof window === "undefined") return
    writeStoredValue(PREVIEW_STORAGE_KEY, previewData)
  }, [previewData])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleDocumentChange = (field, value) => {
    setSidebarData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveDraftToStorage = () => {
    const isDraftSaved = writeStoredValue(DRAFT_STORAGE_KEY, sidebarData)
    const isPreviewSaved = writeStoredValue(PREVIEW_STORAGE_KEY, previewData)

    if (isDraftSaved) {
      setHasSavedDraft(true)
      setLastSavedAt(Date.now())
    }

    return isDraftSaved && isPreviewSaved
  }

  const restoreDraftFromStorage = () => {
    const restoredSidebarData = readStoredValue(DRAFT_STORAGE_KEY, defaultDocument)
    const restoredPreviewData = readStoredValue(PREVIEW_STORAGE_KEY, defaultDocument)

    setSidebarData(restoredSidebarData)
    setPreviewData(restoredPreviewData)
    setHasSavedDraft(hasStoredValue(DRAFT_STORAGE_KEY))
  }

  const openGeneratorView = () => {
    if (typeof window !== "undefined" && window.history.state?.view !== "generator") {
      window.history.pushState({ ...(window.history.state || {}), view: "generator" }, "")
    }
    setIsGeneratorView(true)
  }

  const openSavedDraft = () => {
    restoreDraftFromStorage()
    openGeneratorView()
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
      
      setPreviewData({
        ...sidebarData,
        content: generatedContent
      })
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
    if (typeof window !== "undefined") {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      localStorage.removeItem(PREVIEW_STORAGE_KEY)
    }
    setHasSavedDraft(false)
    setLastSavedAt(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Background Gradients for depth (No animations for performance) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ background: 'var(--page-bg)' }}></div>
      
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
              onSaveDraft={saveDraftToStorage}
              onRestoreDraft={restoreDraftFromStorage}
              hasSavedDraft={hasSavedDraft}
              lastSavedAt={lastSavedAt}
              isGenerating={isGenerating}
            />
          </main>
        </div>
      ) : (
        <Hero
          hasSavedDraft={hasSavedDraft}
          onStartGenerating={openGeneratorView}
          onOpenSavedDraft={openSavedDraft}
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
