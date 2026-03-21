import { useState } from "react"
import { GiDinosaurRex } from "react-icons/gi"
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
  return (
    <div className="w-full max-w-[1400px] mx-auto relative z-10">
      <div className="rounded-[20px] rgb-animate-border relative overflow-visible" style={{ '--panel-inner-bg': 'var(--preview-bg)', color: 'var(--text)' }}>
        <div className="panel-inner rounded-[20px] min-h-[78vh] flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-4">
              <GiDinosaurRex className="text-[24px] text-red-500" />
              <div>
                <div className="docgen-brand text-[16px] tracking-[0.5em] uppercase font-black">DocGen</div>
                <div className="text-[10px] uppercase tracking-[0.35em] opacity-30">AI documentation workspace</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              {navItems.map((item) => (
                item.label === "Home" || item.label === "Pricing" || item.label === "Docs" || item.label === "Contact" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActivePage(item.label.toLowerCase())}
                    className="rounded-[14px] border border-transparent px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:border-white/10 hover:bg-white/5"
                    style={{ color: 'var(--text-h)' }}
                  >
                    {item.label}
                  </button>
                ) : null
              ))}

              <button
                type="button"
                className="rounded-[14px] border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-h)' }}
              >
                Login
              </button>
              <button
                type="button"
                className="rounded-[14px] border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-h)' }}
              >
                Get Start 
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
                {activePage === "home" && (
                  <>
                    <div className="inline-flex rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.25em]" style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
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
                        className="rounded-[20px] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all rainbow-button"
                      >
                        Generate Now
                      </button>
                    </div>

                    <div className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-blue-400/70">Input</div>
                        <div className="mt-3 text-base font-semibold" style={{ color: 'var(--text-h)' }}>Paste source code</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Keep your implementation local in the browser while drafting.</div>
                      </div>
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-blue-400/70">Generate</div>
                        <div className="mt-3 text-base font-semibold" style={{ color: 'var(--text-h)' }}>Choose output type</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Switch between README, API docs, or code explanation flows.</div>
                      </div>
                      <div
                        className="rounded-[20px] border p-5 transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--code-bg)' }}
                      >
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-blue-400/70">Preview</div>
                        <div className="mt-3 text-base font-semibold" style={{ color: 'var(--text-h)' }}>Review and export</div>
                        <div className="mt-2 text-sm leading-6 opacity-75">Save locally, restore drafts, and export the final document as PDF.</div>
                      </div>
                    </div>
                  </>
                )}

                {activePage === "pricing" && (
                  <div id="pricing" className="w-full max-w-5xl">
                    <div className="rounded-[20px] border border-white/10 p-5 text-left md:p-7" style={{ backgroundColor: "var(--code-bg)" }}>
                      <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-400/70">Pricing</div>
                      <h2 className="mt-2 text-2xl font-black md:text-3xl" style={{ color: "var(--text-h)" }}>
                        Pick a plan and subscribe
                      </h2>
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Starter</div>
                          <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$9<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-75">
                            <li>1 project workspace</li>
                            <li>README + API generation</li>
                            <li>Email support</li>
                          </ul>
                          <button type="button" className="mt-4 w-full rounded-[14px] border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5">
                            Subscribe
                          </button>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--accent-border)", backgroundColor: "var(--accent-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Pro</div>
                          <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$29<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-80">
                            <li>Unlimited projects</li>
                            <li>Priority generation queue</li>
                            <li>PDF export + version history</li>
                          </ul>
                          <button type="button" className="mt-4 w-full rounded-[14px] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-all rainbow-button">
                            Subscribe
                          </button>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Team</div>
                          <div className="mt-2 text-2xl font-black" style={{ color: "var(--text-h)" }}>$79<span className="text-sm font-semibold opacity-70">/mo</span></div>
                          <ul className="mt-3 space-y-1 text-sm leading-6 opacity-75">
                            <li>Up to 10 members</li>
                            <li>Shared templates + roles</li>
                            <li>Dedicated support</li>
                          </ul>
                          <button type="button" className="mt-4 w-full rounded-[14px] border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white/5">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePage === "docs" && (
                  <div id="docs" className="w-full max-w-5xl">
                    <div className="rounded-[20px] border border-white/10 p-5 md:p-7" style={{ backgroundColor: "var(--code-bg)" }}>
                      <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-400/70">Docs</div>
                      <h2 className="mt-2 text-2xl font-black md:text-3xl text-left" style={{ color: "var(--text-h)" }}>
                        Features and how to use DocGen
                      </h2>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Smart Generation</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Multiple document outputs</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">
                            Generate README, API docs, and code explanations from the same code input in seconds.
                          </p>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Preview Workspace</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Review before export</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">
                            Validate headings, examples, and formatting in one place before sharing docs with your team.
                          </p>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Export Tools</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Save and reuse</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">
                            Export to PDF, keep draft history, and continue iteration without losing previous versions.
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 rounded-[20px] border border-white/10 p-5 text-left md:p-6" style={{ backgroundColor: "var(--preview-bg)" }}>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">How To Use</div>
                        <ol className="mt-3 space-y-3 text-sm leading-7 opacity-90 md:text-base">
                          <li><span className="font-semibold" style={{ color: "var(--text-h)" }}>Step 1:</span> Paste your source code into the editor input area.</li>
                          <li><span className="font-semibold" style={{ color: "var(--text-h)" }}>Step 2:</span> Select output type (README, API docs, or explanation).</li>
                          <li><span className="font-semibold" style={{ color: "var(--text-h)" }}>Step 3:</span> Click Generate and review the result in preview.</li>
                          <li><span className="font-semibold" style={{ color: "var(--text-h)" }}>Step 4:</span> Export to PDF or keep iterating from saved drafts.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {activePage === "contact" && (
                  <div id="contact" className="w-full max-w-5xl">
                    <div className="rounded-[20px] border border-white/10 p-5 md:p-7" style={{ backgroundColor: "var(--code-bg)" }}>
                      <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-400/70">Contact</div>
                      <h2 className="mt-2 text-2xl font-black md:text-3xl text-left" style={{ color: "var(--text-h)" }}>
                        Get in touch with DocGen
                      </h2>
                      <p className="mt-3 text-left text-sm leading-6 opacity-80 md:text-base">
                        Questions, feedback, or support requests. Reach out and our team will get back to you quickly.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Email</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>support@docgen.ai</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">Best for bug reports, billing questions, and account issues.</p>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Sales</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>sales@docgen.ai</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">Best for team plans, enterprise onboarding, and custom quotes.</p>
                        </div>

                        <div
                          className="rounded-[20px] border p-5 text-left transition-transform transition-shadow duration-75 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--preview-bg)" }}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Live Chat</div>
                          <div className="mt-2 text-base font-semibold" style={{ color: "var(--text-h)" }}>Mon-Fri, 9AM-6PM</div>
                          <p className="mt-2 text-sm leading-6 opacity-75">Fast support for setup help and product usage guidance.</p>
                        </div>
                      </div>

                      <div className="mt-7 rounded-[20px] border border-white/10 p-5 text-left md:p-6" style={{ backgroundColor: "var(--preview-bg)" }}>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/70">Send a Message</div>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          <input
                            type="text"
                            placeholder="Your name"
                            className="rounded-[14px] border border-white/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400/50"
                          />
                          <input
                            type="email"
                            placeholder="Your email"
                            className="rounded-[14px] border border-white/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400/50"
                          />
                          <textarea
                            rows={4}
                            placeholder="Your message"
                            className="md:col-span-2 rounded-[14px] border border-white/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400/50"
                          />
                        </div>
                        <button type="button" className="mt-4 rounded-[14px] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all rainbow-button">
                          Send Message
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
