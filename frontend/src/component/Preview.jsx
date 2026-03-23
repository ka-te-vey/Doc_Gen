import { memo, useMemo } from 'react'
import { GiDinosaurRex } from 'react-icons/gi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function Preview({ documentData, onBack, onExportClick }) {
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
            <GiDinosaurRex className="text-[24px] text-red-500" />
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
            <button onClick={onExportClick} className="rounded-[20px] px-6 py-2.5 text-[10px] font-black tracking-[0.15em] transition-all rainbow-button">EXPORT PDF</button>
          </div>
        </div>

        <div className="flex-1 min-h-0 rounded-[20px] p-6 md:p-8 relative z-10" style={{ backgroundColor: 'var(--code-bg)' }}>
            {documentData.content ? (
              <div className="space-y-8 text-sm leading-relaxed h-full min-h-0 flex flex-col relative">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/5 pb-4 mb-2 opacity-40" style={{ color: 'var(--text-h)' }}>
                  <span>{documentData.title || 'Untitled Document'}</span>
                  <span>{documentData.documentType || 'README'}</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="prose prose-sm max-w-none dark:prose-invert 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black dark:prose-headings:text-white
                    prose-p:text-black dark:prose-p:text-white prose-p:leading-relaxed
                    prose-code:text-blue-900 dark:prose-code:text-blue-300 prose-code:bg-blue-100/60 dark:prose-code:bg-blue-900/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
                    prose-strong:text-black dark:prose-strong:text-white 
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
