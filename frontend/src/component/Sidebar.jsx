import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function Sidebar({
  documentData,
  onDocumentChange,
  onGenerate,
  onClear,
  theme,
  toggleTheme,
  isGenerating
}) {
  return (
    <aside className="w-full lg:w-[450px] h-full flex flex-col rounded-[20px] overflow-visible rgb-animate-border relative" style={{ '--panel-inner-bg': 'var(--sidebar-bg)', color: 'var(--text)' }}>
      <div className="panel-inner h-full flex flex-col">
        <div className="px-5 py-6 border-b border-white/5 flex items-center justify-between relative z-10">
          <div className="group cursor-default">
            <div className="docgen-brand text-[16px] tracking-[0.5em] uppercase font-black">DocGen</div>
            <div className="text-[10px] uppercase tracking-[0.35em] opacity-30">v1.0</div>
          </div>
          <button 
            onClick={toggleTheme} 
            className="h-11 w-11 rounded-[20px] transition-transform active:scale-95 rgb-animate-border relative overflow-hidden group"
            style={{ '--panel-inner-bg': 'var(--code-bg)' }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="panel-inner m-[2px] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-[18px] border border-white/5 bg-white/5 text-lg shadow-lg transition-colors hover:bg-white/10">
              {theme === 'dark' ? <HiOutlineMoon className="text-blue-400" /> : <HiOutlineSun className="text-amber-400" />}
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative z-10">
          <div className="space-y-4">
            <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-blue-400/60">Documentation Type</div>
            <div className="relative">
              <select
                className="w-full rounded-[20px] px-4 py-3.5 pr-10 text-xs outline-none transition appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--code-bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                value={documentData.documentType}
                onChange={(e) => onDocumentChange('documentType', e.target.value)}
                disabled={isGenerating}
              >
                <option>README</option>
                <option>API DOCUMENT</option>
                <option>CODE EXPLANATION</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs opacity-30">▾</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-blue-400/60">Code Snippet</div>
              <div className="text-[10px] font-mono opacity-20">{documentData.content.length} chars</div>
            </div>
            <textarea
              rows={6}
              value={documentData.content}
              onChange={(e) => onDocumentChange('content', e.target.value)}
              placeholder="// Paste your code here..."
              className="h-40 max-h-40 w-full resize-none overflow-y-auto rounded-[20px] border py-4 px-4 text-xs focus:border-blue-500/30 outline-none transition placeholder:opacity-20 custom-scrollbar"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)', color: 'var(--text)' }}
              disabled={isGenerating}
            />
          </div>

        </div>

        <div className="p-6 border-t border-white/5 space-y-4 relative z-10">
          <button
            onClick={onGenerate}
            disabled={isGenerating || !documentData.content.trim()}
            className="w-full rounded-[20px] px-4 py-4 text-[12px] font-black uppercase tracking-[0.25em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98] bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.2)]"
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
          className="w-full rounded-[20px] px-4 py-4 text-[12px] font-black uppercase tracking-[0.25em] transition-all disabled:opacity-50 active:scale-[0.98] border hover:brightness-110"
          style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}
        >
          Clear
        </button>
        </div>
      </div>
    </aside>
  )
}
