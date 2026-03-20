import { GiDinosaurRex } from "react-icons/gi"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"

export default function Hero({ hasSavedDraft, onStartGenerating, onOpenSavedDraft, theme, toggleTheme }) {
  return (
    <div className="w-full max-w-[1400px] mx-auto relative z-10">
      <div className="rounded-[20px] rgb-animate-border relative overflow-visible" style={{ '--panel-inner-bg': 'var(--preview-bg)', color: 'var(--text)' }}>
        <div className="panel-inner rounded-[20px] min-h-[78vh] flex flex-col">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-4">
              <GiDinosaurRex className="text-[24px] text-red-500" />
              <div>
                <div className="text-[16px] tracking-[0.5em] uppercase font-black" style={{ color: 'var(--text-h)' }}>DocGen</div>
                <div className="text-[10px] uppercase tracking-[0.35em] opacity-30">AI documentation workspace</div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-[20px] transition-transform active:scale-95 rgb-animate-border relative overflow-hidden"
              style={{ '--panel-inner-bg': 'var(--code-bg)' }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="panel-inner m-[2px] flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-[18px] border border-white/5 bg-white/5 text-lg shadow-lg transition-colors hover:bg-white/10">
                {theme === 'dark' ? <HiOutlineMoon className="text-blue-400" /> : <HiOutlineSun className="text-amber-400" />}
              </span>
            </button>
          </div>

          <div className="flex-1 p-4">
            <section className="rounded-[20px] border border-white/5 bg-transparent p-8 md:p-12 relative overflow-hidden min-h-full flex items-center justify-center">
              <div className="absolute inset-0 opacity-70 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 35%), radial-gradient(circle at 80% 20%, rgba(94,92,230,0.14), transparent 30%)" }}></div>
              <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                <div className="inline-flex rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em]" style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
                  Code to docs in one pass
                </div>
                <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-[-0.06em] leading-[0.92]" style={{ color: 'var(--text-h)' }}>
                  Generate polished developer docs from raw code in seconds.
                </h1>
                <p className="mt-6 max-w-2xl text-sm md:text-base leading-7 opacity-75">
                  Paste a snippet, choose a document type, and turn rough implementation details into a clean README, API document, or code explanation with the same sharp preview workflow below.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={onStartGenerating}
                    className="rounded-[20px] px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all rainbow-button"
                  >
                    Generate Now
                  </button>
                  {hasSavedDraft && (
                    <button
                      onClick={onOpenSavedDraft}
                      className="rounded-[20px] border px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all hover:bg-white/5"
                      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                    >
                      Open Saved Draft
                    </button>
                  )}
                </div>

                <div className="mt-10 grid w-full max-w-5xl gap-3 md:grid-cols-3">
                  <div className="rounded-[20px] border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Input</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Paste source code</div>
                    <div className="mt-2 text-xs opacity-60">Keep your implementation local in the browser while drafting.</div>
                  </div>
                  <div className="rounded-[20px] border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Generate</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Choose output type</div>
                    <div className="mt-2 text-xs opacity-60">Switch between README, API docs, or code explanation flows.</div>
                  </div>
                  <div className="rounded-[20px] border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Preview</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Review and export</div>
                    <div className="mt-2 text-xs opacity-60">Save locally, restore drafts, and export the final document as PDF.</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
