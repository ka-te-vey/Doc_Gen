import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function Sidebar({ documentData, onDocumentChange, onGenerate, onClear, theme, toggleTheme, isGenerating }) {
  return (
    <aside className="w-full lg:w-[450px] h-full flex flex-col rounded-none overflow-visible rgb-animate-border relative" style={{ backgroundColor: 'var(--sidebar-bg)', color: 'var(--text)' }}>
      {/* Sidebar Corner Glows */}
      <div className="corner-glow corner-tl !scale-75"></div>
      <div className="corner-glow corner-tr !scale-75"></div>
      <div className="corner-glow corner-bl !scale-75"></div>
      <div className="corner-glow corner-br !scale-75"></div>

      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <div className="group cursor-default">
          <div className="text-[14px] tracking-[0.4em] uppercase font-black rgb-text-shift" style={{ '--text-offset': '0s' }}>DocGen</div>
          <div className="text-[10px] uppercase tracking-[0.35em] rgb-text-shift" style={{ '--text-offset': '-1s' }}>v1.0</div>
        </div>
        <button 
          onClick={toggleTheme} 
          className="rounded-none p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 shadow-lg group rgb-animate-border" 
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            {theme === 'dark' ? <HiOutlineMoon className="text-slate-400" /> : <HiOutlineSun className="text-amber-400" />}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-[0.35em] font-bold rgb-text-shift" style={{ '--text-offset': '-0.5s' }}>Documentation Type</div>
          <div className="relative">
            <select
              className="w-full rounded-none px-3 py-3 pr-10 text-xs outline-none transition appearance-none"
              style={{
                backgroundColor: '#1f0d2f',
                color: '#f3e8ff',
                border: '1px solid #6d28d9',
                boxShadow: 'inset 0 0 0 1px rgba(167, 139, 250, 0.15)'
              }}
              value={documentData.documentType}
              onChange={(e) => onDocumentChange('documentType', e.target.value)}
              disabled={isGenerating}
            >
              <option>README</option>
              <option>API DOCUMENT</option>
              <option>CODE EXPLAINATION</option>
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: '#c4b5fd' }}
            >
              ▾
            </span>
          </div>
        </div>

        <div className="rounded-none p-4 rgb-animate-border relative" style={{ backgroundColor: 'var(--code-bg)' }}>
          <div className="text-[10px] uppercase tracking-[0.35em] mb-3 font-bold rgb-text-shift" style={{ '--text-offset': '-1.5s' }}>Code Snippet</div>
          <textarea
            rows={10}
            value={documentData.content}
            onChange={(e) => onDocumentChange('content', e.target.value)}
            placeholder="// Paste your code here..."
            className="w-full rounded-none border-none py-4 px-4 text-xs focus:ring-2 focus:ring-violet-500/50 outline-none transition rgb-animate-border"
            style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
            disabled={isGenerating}
          />
          <div className="text-[10px] text-right mt-2 font-mono opacity-70 rgb-text-shift" style={{ '--text-offset': '-2s' }}>{documentData.content.length} chars</div>
        </div>
      </div>

      <div className="p-4 border-t space-y-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)', borderRadius: '0' }}>
        <button
          onClick={onGenerate}
          disabled={isGenerating || !documentData.content.trim()}
          className="w-full rounded-none px-4 py-3 text-[13px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
          style={{ backgroundColor: '#4b1d7a', color: '#fff', border: '1px solid #6d28d9' }}
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
              Generating...
            </>
          ) : (
            'Generate Documentation'
          )}
        </button>
        <button
          onClick={onClear}
          disabled={isGenerating}
          className="w-full rounded-none px-4 py-3 text-[13px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 active:scale-[0.98]"
          style={{ backgroundColor: '#34114f', color: '#f5ecff', border: '1px solid #5b21b6' }}
        >
          Clear
        </button>
      </div>
    </aside>
  )
}

