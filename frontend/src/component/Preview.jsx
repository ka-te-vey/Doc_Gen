import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Preview({ documentData, onExportClick }) {
  return (
      <div className="h-full min-h-0 flex flex-col gap-4 md:gap-8 relative overflow-hidden" style={{ color: 'var(--text)' }}>
      <div className="flex items-center justify-between rounded-none px-6 py-5 text-[12px] uppercase tracking-[0.3em] font-black rgb-animate-border relative" style={{ backgroundColor: 'var(--preview-bg)' }}>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
          <span className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"></span>
          <span className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
          <span className="ml-3 opacity-90 rgb-text-shift" style={{ '--text-offset': '0s' }}>PREVIEW</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onExportClick} className="rounded-none px-5 py-2 text-[11px] font-black tracking-[0.1em] transition-all rainbow-button hover:scale-105 active:scale-95 shadow-xl">EXPORT PDF</button>
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-none p-1 rgb-animate-border" style={{ backgroundColor: 'var(--preview-bg)' }}>
        <div className="flex h-full min-h-0 flex-col rounded-none p-4 md:p-6 relative overflow-hidden" style={{ background: 'var(--preview-bg)' }}>
          {/* Internal Preview Corner Glows */}
          <div className="corner-glow corner-tl !scale-50"></div>
          <div className="corner-glow corner-tr !scale-50"></div>
          <div className="corner-glow corner-bl !scale-50"></div>
          <div className="corner-glow corner-br !scale-50"></div>

          {documentData.content ? (
            <div className="space-y-6 text-sm leading-7 h-full min-h-0 flex flex-col relative z-10" style={{ color: 'var(--text)' }}>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-4 mb-2">
                <span className="rgb-text-shift" style={{ '--text-offset': '-1s' }}>{documentData.title || 'Untitled Document'}</span>
                <span className="rgb-text-shift" style={{ '--text-offset': '-2s' }}>{documentData.documentType || 'README'}</span>
                <span className="rgb-text-shift" style={{ '--text-offset': '-3s' }}>{new Date(documentData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
                <div className="prose prose-md max-w-none dark:prose-invert prose-headings:font-black prose-a:text-cyan-400 prose-code:text-cyan-400">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <div className="relative group p-0.5 rounded-none rgb-animate-border my-8">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              showLineNumbers={true}
                              wrapLines={true}
                              lineProps={(lineNumber) => ({
                                className: 'code-pulse-line',
                                style: { animationDelay: `${lineNumber * 0.1}s` }
                              })}
                              className="rounded-none !m-0 !bg-slate-900/90 shadow-2xl"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={`${className} bg-white/10 rounded-none px-2 py-1 font-mono rgb-text-shift`} {...props}>
                            {children}
                          </code>
                        )
                      },
                      table({children}) {
                        return <div className="overflow-x-auto my-8 rounded-none rgb-animate-border p-0.5"><table className="min-w-full divide-y divide-white/10 bg-black/20 rounded-none overflow-hidden">{children}</table></div>
                      },
                      th({children}) {
                        return <th className="px-5 py-4 bg-white/5 text-left text-[11px] font-black uppercase tracking-widest rgb-text-shift">{children}</th>
                      },
                      td({children}) {
                        return <td className="px-5 py-4 text-sm border-t border-white/5">{children}</td>
                      }
                    }}
                  >
                    {documentData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 opacity-80 relative z-10">
              <div className="text-center group">
                <div className="text-2xl font-black mb-4 tracking-tighter rgb-text-shift" style={{ '--text-offset': '0s' }}>NO DOCUMENTATION YET</div>
                <div className="text-[11px] uppercase tracking-[0.4em] font-bold rgb-text-shift" style={{ '--text-offset': '-1s' }}>PASTE YOUR CODE AND HIT GENERATE</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
