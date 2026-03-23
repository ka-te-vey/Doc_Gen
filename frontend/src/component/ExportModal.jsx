import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ExportModal({ documentData, onClose }) {
  const [paperSize, setPaperSize] = useState('A4')
  const [orientation, setOrientation] = useState('Portrait')
  const [page] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [exportTitle, setExportTitle] = useState(documentData.title || 'Untitled Document')
  const previewRef = useRef(null)

  const handleDownload = async () => {
    if (!previewRef.current) return
    setIsExporting(true)

    try {
      const content = previewRef.current.innerHTML
      const title = exportTitle.trim() || 'Document'
      
      // Create a hidden iframe
      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = '0'
      document.body.appendChild(iframe)

      const doc = iframe.contentWindow.document
      
      // Get all styles from the current document
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('')
          } catch (e) {
            return ''
          }
        })
        .join('')

      doc.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              ${styles}
              @page { size: ${paperSize} ${orientation}; margin: 20mm; }
              body { background: white !important; color: black !important; padding: 0; margin: 0; }
              .rounded-xl { border: none !important; padding: 0 !important; }
              .prose { max-width: none !important; color: black !important; }
              .dark .prose { color: black !important; }
              /* Force syntax highlighter to be visible in print */
              pre { white-space: pre-wrap !important; word-break: break-all !important; }
            </style>
          </head>
          <body class="light">
            <div class="prose">
              ${content}
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print()
              setTimeout(() => {
                window.frameElement.remove()
              }, 100)
            }
          </script>
        </body>
        </html>
      `)
      doc.close()
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please use the Print to PDF option in your browser.')
    } finally {
      setIsExporting(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 bg-blur">
      <div id="export-modal" className="w-full max-w-3xl rounded-[20px] border shadow-2xl overflow-hidden relative" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="border-b p-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Export as PDF</div>
              <div className="text-xs" style={{ color: 'var(--text)', opacity: 0.7 }}>Preview your generated documentation</div>
            </div>
            <button onClick={onClose} className="rounded-[20px] border px-2 py-1 text-xs transition" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>✕</button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="rounded-[20px] border p-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.12em] opacity-80" style={{ color: 'var(--text)' }}>
                Export title
              </div>
              <button
                onClick={() => setIsEditingTitle((prev) => !prev)}
                className="rounded-[20px] border px-3 py-1 text-xs transition"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              >
                {isEditingTitle ? 'Done' : 'Edit Title'}
              </button>
            </div>
            {isEditingTitle ? (
              <input
                type="text"
                value={exportTitle}
                onChange={(e) => setExportTitle(e.target.value)}
                className="mt-2 w-full rounded-[20px] border p-2 text-sm"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
                placeholder="Enter PDF title"
              />
            ) : (
              <div className="mt-2 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                {exportTitle || 'Untitled Document'}
              </div>
            )}
          </div>

          <div ref={previewRef} className="rounded-[20px] border p-4 max-h-[60vh] overflow-y-auto custom-scrollbar" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)', color: 'var(--text)' }}>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] border-b border-black/10 dark:border-white/10 pb-3 mb-4" style={{ color: 'var(--text)' }}>
              <div>
                <div className="font-bold text-xs" style={{ color: 'var(--text-h)' }}>{exportTitle || 'Untitled Document'}</div>
                <div className="opacity-70">{documentData.documentType || 'README'}</div>
              </div>
              <div className="text-right">
                <div className="opacity-70">{documentData.date}</div>
                <div className="opacity-70">Page {page} of 1</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold" style={{ color: 'var(--text)' }}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-[20px] !my-4 !text-[11px]"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={`${className} bg-black/5 dark:bg-white/5 rounded-[20px] px-1.5 py-0.5 font-mono text-[11px]`} {...props}>
                          {children}
                        </code>
                      )
                    },
                    table({children}) {
                      return <div className="overflow-x-auto my-4 rounded-[20px] border border-black/10 dark:border-white/10"><table className="min-w-full divide-y divide-black/10 dark:divide-white/10">{children}</table></div>
                    },
                    th({children}) {
                      return <th className="px-3 py-2 bg-black/5 dark:bg-white/5 text-left text-[10px] font-semibold uppercase tracking-wider">{children}</th>
                    },
                    td({children}) {
                      return <td className="px-3 py-2 text-[10px] border-t border-black/10 dark:border-white/10">{children}</td>
                    }
                  }}
                >
                  {documentData.content || 'No content generated yet.'}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1 text-xs uppercase" style={{ color: 'var(--text)' }}>
              Paper size
              <select
                className="w-full rounded-[20px] border p-2 text-sm"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
              >
                <option>A4</option>
                <option>Letter</option>
              </select>
            </label>
            <label className="space-y-1 text-xs uppercase" style={{ color: 'var(--text)' }}>
              Orientation
              <select
                className="w-full rounded-[20px] border p-2 text-sm"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
              >
                <option>Portrait</option>
                <option>Landscape</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-2 border-t border-white/10 pt-3">
            <button
              onClick={onClose}
              className="rounded-[20px] border px-4 py-2 text-sm"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="rounded-[20px] bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
            >
              {isExporting ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
