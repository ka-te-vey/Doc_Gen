import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function Sidebar({ documentData, onDocumentChange, onGenerate, onClear, theme, toggleTheme, isGenerating }) {
  return (
    <aside className="w-full lg:w-[450px] h-full flex flex-col rounded-2xl overflow-hidden border-r" style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <div>
          <div className="text-[13px] tracking-[0.35em] uppercase" style={{ color: 'var(--text)' }}>DocGen</div>
          <div className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--text)' }}>v1.0</div>
        </div>
        <button 
          onClick={toggleTheme} 
          className="rounded-xl p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 shadow-lg group" 
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {theme === 'dark' ? <HiOutlineMoon className="text-slate-400" /> : <HiOutlineSun className="text-amber-400" />}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="space-y-2" style={{ color: 'var(--text)' }}>
          <div className="text-[10px] uppercase tracking-[0.35em] font-bold">Documentation Type</div>
          <select
            className="w-full rounded-lg border px-2 py-2 text-xs focus:ring-1 focus:ring-violet-500/50 outline-none transition"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)', color: 'var(--text)' }}
            value={documentData.documentType}
            onChange={(e) => onDocumentChange('documentType', e.target.value)}
            disabled={isGenerating}
          >
            <option>README</option>
            <option>API DOCUMENT</option>
            <option>CODE EXPLAINATION</option>
          </select>
        </div>

        <div className="rounded-xl border p-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
          <div className="text-[10px] uppercase tracking-[0.35em] mb-2" style={{ color: 'var(--text)' }}>Code Snippet</div>
          <textarea
            rows={9}
            value={documentData.content}
            onChange={(e) => onDocumentChange('content', e.target.value)}
            placeholder="// Paste your code here..."
            className="w-full rounded-xl border py-3 px-3 text-xs focus:ring-1 focus:ring-violet-500/50 outline-none transition"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
            disabled={isGenerating}
          />
          <div className="text-[10px] text-right mt-1" style={{ color: 'var(--text)' }}>{documentData.content.length} chars</div>
        </div>
      </div>

      <div className="p-3 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
        <button
          onClick={onGenerate}
          disabled={isGenerating || !documentData.content.trim()}
          className="w-full rounded-xl px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white hover:brightness-110 transition mb-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}
        >
          {isGenerating ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
              Generating...
            </>
          ) : (
            'Generate Documentation'
          )}
        </button>
        <button
          onClick={onClear}
          disabled={isGenerating}
          className="w-full rounded-xl px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white hover:brightness-110 transition disabled:opacity-50"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #4f46e5)' }}
        >
          Clear
        </button>
      </div>
    </aside>
  )
}

