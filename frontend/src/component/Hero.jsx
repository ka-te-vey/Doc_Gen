import { useState } from "react"
import { GiDinosaurRex, GiCancel } from "react-icons/gi"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"
import { Footer2 } from "../UI/shadcnblocks-com-footer2"

export default function Hero({ onStartGenerating, theme, toggleTheme }) {
  const [activePage, setActivePage] = useState("home")
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
    { label: "Contact", href: "#contact" }
  ]
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  return (
    <div className="w-full max-w-[1400px] mx-auto relative z-10">
      <div className="rounded-[20px] rgb-animate-border relative overflow-visible" style={{ '--panel-inner-bg': 'var(--preview-bg)', color: 'var(--text)' }}>
        <div className="panel-inner rounded-[20px] min-h-[78vh] flex flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/5 px-6 py-5 relative">
            <div className="flex items-center gap-4">
              <GiDinosaurRex className="text-[24px] w-9 h-9 text-red-500" />
              <div>
                <div className="docgen-brand text-[20px] tracking-[0.5em] uppercase font-black">DocGen</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.35em]">AI documentation workspace</div>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 items-center justify-center gap-5 sm:gap-7 relative">
              <div className="flex items-center justify-center gap-5 sm:gap-7">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setActivePage(item.label.toLowerCase())
                      setIsMobileNavOpen(false)
                    }}
                    className="rounded-[14px] px-4 py-3 text-[13px] font-black uppercase tracking-[0.18em] transition-colors hover:border-white/10 hover:bg-white/20 sm:px-3 sm:py-2 sm:text-[10px]"
                    style={{ color: 'var(--text-h)' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-end lg:items-center gap-2 lg:gap-3 mt-1 lg:mt-0">
              <div className="hidden lg:flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-[14px] border border-white/40 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5 sm:px-3 sm:py-2 sm:text-[10px]"
                  style={{ color: 'var(--text-h)' }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="rounded-[14px] border border-blue-500 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5 sm:px-3 sm:py-2 sm:text-[10px]"
                  style={{ color: 'var(--text-h)' }}
                >
                  Get Started
                </button>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
                <button
                  onClick={() => setIsMobileNavOpen((prev) => !prev)}
                  className="lg:hidden rounded-[14px] border border-white/20 px-4 py-3 text-[18px] font-black transition-all hover:border-white/40 hover:bg-white/5 flex items-center justify-center relative z-[70]"
                  style={{ color: 'var(--text-h)' }}
                  aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
                >
                  {isMobileNavOpen ? <GiCancel className="text-[24px] text-red-400" /> : "☰"}
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

            {/* Mobile Nav Menu Overlay */}
            <div
              className={`lg:hidden absolute left-0 right-0 top-0 z-50 w-full rounded-[20px] border border-white/10 bg-white/10 px-6 py-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[transform,opacity] ${
                isMobileNavOpen
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-4 mt-12">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setActivePage(item.label.toLowerCase())
                      setIsMobileNavOpen(false)
                    }}
                    className="w-full rounded-[14px] border border-white/20 px-4 py-5 text-left text-[16px] font-black uppercase tracking-[0.18em] transition-colors hover:border-white/40 hover:bg-white/20"
                    style={{ color: 'var(--text-h)' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8">
                <button
                  type="button"
                  className="w-full rounded-[14px] border border-white/20 px-4 py-5 text-left text-[16px] font-black uppercase tracking-[0.18em] transition-colors hover:border-white/40 hover:bg-white/20"
                  style={{ color: 'var(--text-h)' }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="w-full rounded-[14px] border border-blue-500 px-4 py-5 text-left text-[16px] font-black uppercase tracking-[0.18em] transition-colors hover:border-blue-400 hover:bg-white/10"
                  style={{ color: 'var(--text-h)' }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden={!isMobileNavOpen}
          />
          <div className="flex-1 p-4">
            <section className="rounded-[20px] border border-white/5 bg-transparent p-8 md:p-12 relative overflow-hidden min-h-full flex items-center justify-center">
              <div className="absolute inset-0 opacity-70 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 35%), radial-gradient(circle at 80% 20%, rgba(94,92,230,0.14), transparent 30%)" }}></div>
              <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                {activePage === "home" && (
                  <>
                    <div className="inline-flex rounded-full border px-3 py-2 text-[16px] font-black uppercase tracking-[0.25em]" style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
                      Code to docs in one pass
                    </div>
                    <h1 className="hero-headline mt-6 text-4xl md:text-6xl font-black tracking-[0.02em] leading-[0.98]">
                      <span className="hero-word">Generate</span>{" "}
                      <span className="hero-word">polished</span>{" "}
                      <span className="hero-word">developer</span>{" "}
                      <span className="hero-word">docs</span>{" "}
                      <span className="hero-word">from</span>{" "}
                      <span className="hero-word">raw</span>{" "}
                      <span className="hero-word">code</span>{" "}
                      <span className="hero-word">in</span>{" "}
                      <span className="hero-word">seconds.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 opacity-75">
                      Paste a snippet, choose a document type, and turn rough implementation details into a clean README, API document, or code explanation with the same sharp preview workflow below.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={onStartGenerating}
                        className="rounded-[20px] px-6 py-3 text-[16px] font-black uppercase tracking-[0.18em] transition-all rainbow-button"
                      >
                        Generate Now
                      </button>
                    </div>

                    <div className="mt-10 grid w-full max-w-5xl gap-16 md:grid-cols-3">
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.25em] text-blue-400/70">Input</div>
                        <div className="mt-3 text-md font-semibold" style={{ color: 'var(--text-h)' }}>Paste source code</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Keep your implementation local in the browser while drafting.</div>
                        <p className="text-sm leading-6 opacity-70">
                          Inputs are stored client-side and auto-save as you type, so you can reopen the workspace and pick back up exactly where you left off.
                        </p>
                      </div>
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.25em] text-blue-400/70">Generate</div>
                        <div className="mt-3 text-md font-semibold" style={{ color: 'var(--text-h)' }}>Choose output type</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Switch between README, API docs, or code explanation flows.</div>
                        <p className="text-sm leading-6 opacity-70">
                          Each flow injects tailored prompts, headings, and emphasis blocks so the output matches the conventions of the selected document type.
                        </p>
                      </div>
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.25em] text-blue-400/70">Preview</div>
                        <div className="mt-3 text-md   font-semibold" style={{ color: 'var(--text-h)' }}>Review and export</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Save locally, restore drafts, and export the final document as PDF.</div>
                        <p className="text-sm leading-6 opacity-70">
                          The preview is the single source of truth for exports and version history: any formatting or correction you make here feeds directly into the PDF you download.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activePage === "pricing" && (
                  <div id="pricing" className="w-full max-w-5xl">
                    <div className="grid gap-16 md:grid-cols-3">
                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] opacity-70">Starter</div>
                        <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$59<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-75">
                            <li>Up to 2 members</li>
                            <li>100 tokens/month</li>
                            <li>README + API generation</li>
                          </ul>
                        <button type="button" className="mt-4 w-full rounded-[14px] border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5">
                          Subscribe
                        </button>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--accent-border)", backgroundColor: "var(--accent-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400">Pro</div>
                        <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$89<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-80">
                            <li>1 project workspace</li>
                            <li>Up to 5 members</li>
                            <li>300 tokens/month</li>
                            <li>PDF export + version history</li>
                          </ul>
                        <button type="button" className="mt-4 w-full rounded-[14px] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-all rainbow-button">
                          Your current plan
                        </button>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] opacity-70">Team</div>
                        <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$279<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-75">
                            <li>3 project workspaces</li>
                            <li>Up to 30 members</li>
                            <li>1,000 tokens/month</li>
                            <li>Shared templates + roles</li>
                          </ul>
                        <button type="button" className="mt-4 w-full rounded-[14px] border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activePage === "docs" && (
                  <div id="docs" className="w-full max-w-5xl">
                    <div className="grid gap-16 md:grid-cols-3">
                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Smart Generation</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Multiple document outputs</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">
                          Generate README, API docs, and code explanations from the same code input in seconds.
                        </p>
                        <p className="text-sm leading-6 opacity-70">
                          The workspace stays fully client-side: drafts save locally, drafts and exports share a single preview flow, and you can drop into version history without re-running your prompt. Every output is backed by a live markdown preview plus syntax-highlighted snippets that stay readable when you export to PDF.
                        </p>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Preview Workspace</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Review before export</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">
                          Validate headings, examples, and formatting in one place before sharing docs with your team.
                        </p>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Export Tools</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Save and reuse</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">
                          Export to PDF, keep draft history, and continue iteration without losing previous versions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activePage === "contact" && (
                  <div id="contact" className="w-full max-w-5xl">
                    <div className="grid gap-16 md:grid-cols-3">
                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Email</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>support@docgen.ai</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">Best for bug reports, billing questions, and account issues.</p>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Sales</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>sales@docgen.ai</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">Best for team plans, enterprise onboarding, and custom quotes.</p>
                      </div>

                      <div
                        className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                      >
                        <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Live Chat</div>
                        <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Mon-Fri, 9AM-6PM</div>
                        <p className="mt-2 text-sm leading-6 opacity-75">Fast support for setup help and product usage guidance.</p>
                      </div>
                    </div>
                    <div className="mt-10 rounded-[20px] border p-8 md:p-10" style={{ borderColor: "var(--border)", backgroundColor: "var(--code-bg)" }}>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-blue-400/70">Send a message</div>
                      <p className="mt-2 text-sm leading-6 opacity-70">
                        Tell us what you need—feedback, a bug report, or just a hello—and we’ll reply within one business day.
                      </p>
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Your email or name"
                          className="w-full rounded-[14px] border px-3 py-2 text-sm uppercase tracking-[0.15em]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)", color: "var(--text)" }}
                        />
                        <textarea
                          rows={4}
                          placeholder="Write your message..."
                          className="w-full rounded-[14px] border px-3 py-2 text-sm uppercase tracking-[0.15em] resize-none"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)", color: "var(--text)" }}
                        ></textarea>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="rounded-[14px] border border-blue-500 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-blue-500 hover:text-white"
                        >
                          Submit message
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
          <Footer2 />

        </div>
      </div>
    </div>
  )
}
