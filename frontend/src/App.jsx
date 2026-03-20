import { useState, useEffect } from "react"
import Sidebar from "./component/Sidebar"
import Preview from "./component/Preview"
import ExportModal from "./component/ExportModal"
import "./App.css"

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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleDocumentChange = (field, value) => {
    setSidebarData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateFromDraft = async () => {
    if (!sidebarData.content.trim()) return

    setIsGenerating(true)
    // const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const apiUrl = "https://doc-gen-1.onrender.com"
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 rgb-animate-border rounded-none p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 transition-all duration-500 lg:h-[82vh]" style={{ backgroundColor: 'var(--code-bg)' }}>
        {/* Corner Glows for Main Panel */}
        <div className="corner-glow corner-tl"></div>
        <div className="corner-glow corner-tr"></div>
        <div className="corner-glow corner-bl"></div>
        <div className="corner-glow corner-br"></div>

        <Sidebar 
          documentData={sidebarData}
          onDocumentChange={handleDocumentChange}
          onGenerate={generateFromDraft}
          onClear={clearDraft}
          theme={theme}
          toggleTheme={toggleTheme}
          isGenerating={isGenerating}
        />

        <main className="flex-1 min-h-0 overflow-hidden rounded-none p-1 relative" style={{ backgroundColor: 'transparent' }}>
          <div className="h-full min-h-0 rounded-none rgb-animate-border p-1 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            {/* Inner Corner Glows */}
            <div className="corner-glow corner-tl !scale-50"></div>
            <div className="corner-glow corner-tr !scale-50"></div>
            <div className="corner-glow corner-bl !scale-50"></div>
            <div className="corner-glow corner-br !scale-50"></div>
            
            <Preview documentData={previewData} onExportClick={() => setIsExportModalOpen(true)} />
          </div>
        </main>
      </div>

      {isExportModalOpen && (
        <ExportModal
          documentData={previewData}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  )
}
