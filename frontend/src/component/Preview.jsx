import { memo, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function formatSavedTime(lastSavedAt) {
  if (!lastSavedAt) return "Not saved yet"

  return new Date(lastSavedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function Preview({ documentData, onBack, onExportClick, onSaveDraft, onRestoreDraft, hasSavedDraft, lastSavedAt, isGenerating }) {
  const markdownComponents = useMemo(() => ({
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div className="relative group my-8 border border-white/5 rounded-[20px] overflow-hidden">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="!m-0 !bg-[#0b0d14] !py-6"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={`${className}`} {...props}>
          {children}
        </code>
      )
    },
    table({ children }) {
      return <div className="overflow-x-auto my-8 rounded-[20px] border border-white/5"><table className="min-w-full divide-y divide-white/10 bg-black/10">{children}</table></div>
    }
  }), [])

  return (
    <div className="h-full min-h-0 rounded-[20px] relative overflow-visible rgb-animate-border" style={{ '--panel-inner-bg': 'var(--preview-bg)', color: 'var(--text)' }}>
      <div className="panel-inner h-full min-h-0 flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-[20px] px-6 py-5 text-[11px] uppercase tracking-[0.4em] font-black border-b border-white/5 relative z-10 md:flex-row md:items-center md:justify-between" style={{ backgroundColor: 'var(--preview-bg)' }}>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></span>
            </div>
            <span className="ml-4 opacity-50 font-bold" style={{ color: 'var(--text-h)' }}>PREVIEW</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <button
              onClick={onBack}
              className="rounded-[20px] border px-4 py-2.5 text-[10px] font-black tracking-[0.15em] transition-all hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              BACK
            </button>
            <div
              className="rounded-full px-3 py-2 text-[9px] font-black tracking-[0.18em]"
              style={{
                backgroundColor: hasSavedDraft ? 'var(--accent-bg)' : 'transparent',
                color: hasSavedDraft ? 'var(--accent)' : 'var(--text)',
                border: `1px solid ${hasSavedDraft ? 'var(--accent-border)' : 'var(--border)'}`
              }}
            >
              {hasSavedDraft ? `DRAFT SAVED ${formatSavedTime(lastSavedAt)}` : 'LOCAL AUTO SAVE'}
            </div>
            <button
              onClick={onSaveDraft}
              disabled={isGenerating}
              className="rounded-[20px] border px-4 py-2.5 text-[10px] font-black tracking-[0.15em] transition-all disabled:opacity-50 hover:brightness-110"
              style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}
            >
              SAVE DRAFT
            </button>
            <button
              onClick={onRestoreDraft}
              disabled={isGenerating || !hasSavedDraft}
              className="rounded-[20px] border px-4 py-2.5 text-[10px] font-black tracking-[0.15em] transition-all disabled:opacity-50 hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              RESTORE
            </button>
            <button onClick={onExportClick} className="rounded-[20px] px-6 py-2.5 text-[10px] font-black tracking-[0.15em] transition-all rainbow-button">EXPORT PDF</button>
          </div>
        </div>

        <div className="flex-1 min-h-0 rounded-[20px] p-6 md:p-8 relative z-10" style={{ backgroundColor: 'var(--code-bg)' }}>
            {documentData.content ? (
              <div className="space-y-8 text-sm leading-relaxed h-full min-h-0 flex flex-col relative">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/5 pb-4 mb-2 opacity-30">
                  <span>{documentData.title || 'Untitled Document'}</span>
                  <span>{documentData.documentType || 'README'}</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="prose prose-sm max-w-none dark:prose-invert 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                    prose-p:text-slate-700 dark:prose-p:text-slate-400 prose-p:leading-relaxed
                    prose-code:text-blue-700 dark:prose-code:text-blue-300 prose-code:bg-blue-100/60 dark:prose-code:bg-blue-900/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
                    prose-strong:text-slate-900 dark:prose-strong:text-white 
                    prose-a:text-blue-700 dark:prose-a:text-blue-400 hover:prose-a:text-blue-600 dark:hover:prose-a:text-blue-300 transition-colors">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {documentData.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 relative">
                <div className="text-center">
                  <div className="text-3xl font-black mb-6 tracking-tighter" style={{ color: 'var(--text-h)', opacity: 0.15 }}>NO DOCUMENTATION YET</div>
                  <div className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-10">PASTE YOUR CODE AND HIT GENERATE</div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default memo(Preview)
