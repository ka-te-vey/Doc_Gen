import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Preview({ documentData, onExportClick }) {
  return (
    <div className="h-full flex flex-col gap-2 md:gap-6" style={{ color: 'var(--text)' }}>
      <div className="flex items-center justify-between rounded-xl border px-3 py-4 text-[11px] uppercase tracking-[0.2em]" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--preview-bg)' }}>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <span className="ml-2 opacity-90">PREVIEW</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onExportClick} className="rounded-full border border-violet-400/40 px-2 py-1 text-[10px] text-violet-500 dark:text-violet-300 hover:bg-violet-500/10 transition">EXPORT PDF</button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--preview-bg)' }}>
        <div className="flex h-full flex-col rounded-xl border p-3 md:p-4" style={{ borderColor: 'var(--border)', background: 'var(--preview-bg)' }}>
          {documentData.content ? (
            <div className="space-y-4 text-sm leading-6 h-full flex flex-col" style={{ color: 'var(--text)' }}>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] opacity-75 border-b border-black/10 dark:border-white/10 pb-2 mb-2">
                <span>{documentData.title || 'Untitled Document'}</span>
                <span>{documentData.documentType || 'README'}</span>
                <span>{new Date(documentData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-violet-500 prose-code:text-violet-500 dark:prose-code:text-violet-400">
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
                            className="rounded-lg !my-4 shadow-inner"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={`${className} bg-black/5 dark:bg-white/5 rounded px-1.5 py-0.5 font-mono`} {...props}>
                            {children}
                          </code>
                        )
                      },
                      table({children}) {
                        return <div className="overflow-x-auto my-6 rounded-lg border border-black/10 dark:border-white/10"><table className="min-w-full divide-y divide-black/10 dark:divide-white/10">{children}</table></div>
                      },
                      th({children}) {
                        return <th className="px-4 py-3 bg-black/5 dark:bg-white/5 text-left text-xs font-semibold uppercase tracking-wider">{children}</th>
                      },
                      td({children}) {
                        return <td className="px-4 py-3 text-sm border-t border-black/10 dark:border-white/10">{children}</td>
                      }
                    }}
                  >
                    {documentData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 opacity-80">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2" style={{ color: 'var(--text-h)' }}>No documentation yet</div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-60">Paste your code and hit Generate</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
