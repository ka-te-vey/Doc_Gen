import { GiDinosaurRex } from "react-icons/gi"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"

export default function Hero({ onStartGenerating, theme, toggleTheme }) {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Price", href: "#price" },
    { label: "Doc", href: "#docs" },
    { label: "Contact", href: "#contact" }
  ]

  return (
    <div className="w-full max-w-[1400px] mx-auto relative z-10">
      <div className="rounded-[20px] rgb-animate-border relative overflow-visible" style={{ '--panel-inner-bg': 'var(--preview-bg)', color: 'var(--text)' }}>
        <div className="panel-inner rounded-[20px] min-h-[78vh] flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-4">
              <GiDinosaurRex className="text-[24px] text-red-500" />
              <div>
                <div className="text-[16px] tracking-[0.5em] uppercase font-black" style={{ color: 'var(--text-h)' }}>DocGen</div>
                <div className="text-[10px] uppercase tracking-[0.35em] opacity-30">AI documentation workspace</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-[14px] border border-transparent px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:border-white/10 hover:bg-white/5"
                  style={{ color: 'var(--text-h)' }}
                >
                  {item.label}
                </a>
              ))}

              <button
                type="button"
                className="rounded-[14px] border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-h)' }}
              >
                Sign in
              </button>
              <button
                type="button"
                className="rounded-[14px] border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-h)' }}
              >
                Sign out
              </button>

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
                </div>

                <div className="mt-10 grid w-full max-w-5xl gap-3 md:grid-cols-3">
                  <div
                    className="rounded-[20px] border p-4 transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Input</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Paste source code</div>
                    <div className="mt-2 text-xs opacity-60">Keep your implementation local in the browser while drafting.</div>
                  </div>
                  <div
                    className="rounded-[20px] border p-4 transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Generate</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Choose output type</div>
                    <div className="mt-2 text-xs opacity-60">Switch between README, API docs, or code explanation flows.</div>
                  </div>
                  <div
                    className="rounded-[20px] border p-4 transition-transform transition-shadow duration-150 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400/70">Preview</div>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Review and export</div>
                    <div className="mt-2 text-xs opacity-60">Save locally, restore drafts, and export the final document as PDF.</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <footer className="border-t border-white/5 px-6 py-7">
            <div className="grid items-start gap-7 text-left sm:grid-cols-2 lg:grid-cols-4">
              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--text-h)" }}>Product</div>
                <div className="mt-3 flex flex-col gap-2.5 text-sm leading-5 opacity-75">
                  <a href="#features" className="transition-opacity hover:opacity-100">Features</a>
                  <a href="#price" className="transition-opacity hover:opacity-100">Pricing</a>
                  <a href="#docs" className="transition-opacity hover:opacity-100">Documentation</a>
                  <a href="#api" className="transition-opacity hover:opacity-100">API</a>
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--text-h)" }}>Company</div>
                <div className="mt-3 flex flex-col gap-2.5 text-sm leading-5 opacity-75">
                  <a href="#about" className="transition-opacity hover:opacity-100">About</a>
                  <a href="#blog" className="transition-opacity hover:opacity-100">Blog</a>
                  <a href="#careers" className="transition-opacity hover:opacity-100">Careers</a>
                  <a href="#contact" className="transition-opacity hover:opacity-100">Contact</a>
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--text-h)" }}>Legal</div>
                <div className="mt-3 flex flex-col gap-2.5 text-sm leading-5 opacity-75">
                  <a href="#privacy" className="transition-opacity hover:opacity-100">Privacy Policy</a>
                  <a href="#terms" className="transition-opacity hover:opacity-100">Terms of Service</a>
                  <a href="#cookies" className="transition-opacity hover:opacity-100">Cookie Policy</a>
                  <a href="#security" className="transition-opacity hover:opacity-100">Security</a>
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--text-h)" }}>Connect</div>
                <div className="mt-3 text-sm leading-5 opacity-75">Build better docs with us.</div>
                <div className="mt-3 flex items-center gap-2">
                  <a href="#" aria-label="GitHub" className="rounded-[12px] border border-white/10 p-2 transition-colors hover:bg-white/5">
                    <FiGithub className="text-sm" />
                  </a>
                  <a href="#" aria-label="Twitter" className="rounded-[12px] border border-white/10 p-2 transition-colors hover:bg-white/5">
                    <FiTwitter className="text-sm" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="rounded-[12px] border border-white/10 p-2 transition-colors hover:bg-white/5">
                    <FiLinkedin className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
