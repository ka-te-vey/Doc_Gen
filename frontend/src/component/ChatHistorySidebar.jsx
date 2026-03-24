import { useState, useEffect } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { GiCancel } from "react-icons/gi"

function formatHistoryTime(timestamp) {
  if (!timestamp) return "Unknown time"
  return new Date(timestamp).toLocaleString([], {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function trimText(text, maxLength = 110) {
  if (!text) return ""
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export default function ChatHistorySidebar({ isOpen, onToggle, onClose, onNewChat, items, onRestore, onDelete, onClear, showToggle = true }) {
  const [activeDeleteId, setActiveDeleteId] = useState(null)
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll-to-hide logic on mobile (< 1024px)
      if (window.innerWidth < 1024) {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setIsButtonVisible(false);
        } else {
          setIsButtonVisible(true);
        }
      } else {
        setIsButtonVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!showToggle) return null

    return (
  <aside className="fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 overflow-hidden pointer-events-none"
    style={{ backgroundColor: "transparent" }}
    aria-label="Chat history sidebar"
  >
    <button
        onClick={onToggle}
        className={`fixed left-6 top-6 sm:top-4 z-[70] h-11 w-11 rounded-[16px] border text-xl font-black leading-none transition-all duration-300 hover:brightness-110 flex items-center justify-center pointer-events-auto ${isOpen ? "opacity-0 pointer-events-none" : isButtonVisible ? "opacity-100" : "opacity-0"}`}
        style={{ 
          borderColor: "var(--border)", 
          backgroundColor: "var(--code-bg)",
          color: "var(--text-h)"
        }}
        title="Open history"
      >
        {"\u2630"}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div className={`fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} overflow-hidden pointer-events-auto`} style={{ borderColor: "var(--border)", backgroundColor: "var(--sidebar-bg)" }}>
        <div className="flex h-full flex-col">
          <div className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[14px] font-black uppercase tracking-[0.25em]" style={{ color: "var(--text-h)" }}>
                  Chat History
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-[14px] border border-white/20 p-2 text-red-400 transition-all hover:border-red-400/40 hover:bg-white/5"
                title="Close history"
              >
                <GiCancel className="text-[20px]" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {items.length === 0 ? (
              <div className="rounded-[16px] border p-4 text-[14px] opacity-70" style={{ borderColor: "var(--border)" }}>
                No history yet. Generate documentation to create entries.
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="rounded-[16px] border p-3" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onRestore(item)}
                        className="min-w-0 flex-1 text-left transition-all hover:-translate-y-[1px]"
                      >
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">
                          {item.documentType || "README"}
                        </div>
                        <div className="mt-2 text-sm font-semibold" style={{ color: "var(--text-h)" }}>
                          {item.title || "Untitled Document"}
                        </div>
                        <div className="mt-1 text-xs opacity-70">
                          {trimText(item.input?.content)}
                        </div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.18em] opacity-45">
                          {formatHistoryTime(item.createdAt)}
                        </div>
                      </button>
                      <div className="group relative">
                        <button
                          onClick={() => setActiveDeleteId((prev) => (prev === item.id ? null : item.id))}
                          className="rounded-[10px] border p-2 text-sm transition-all hover:scale-105 hover:bg-red-500/10"
                          style={{ borderColor: "var(--border)", color: "var(--text)" }}
                          title="Delete options"
                        >
                          <RiDeleteBin6Line className="transition-colors group-hover:text-red-400" />
                        </button>
                        <span className="pointer-events-none absolute -top-8 right-0 rounded-md border px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] opacity-0 transition-opacity group-hover:opacity-100"
                          style={{ borderColor: "var(--border)", backgroundColor: "var(--code-bg)", color: "var(--text)" }}>
                          Delete
                        </span>
                      </div>
                    </div>
                    {activeDeleteId === item.id && (
                      <div className="mt-3 rounded-[12px] border p-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--code-bg)" }}>
                        <div className="text-[10px] font-black uppercase tracking-[0.14em] text-red-400/90">
                          Delete this chat history?
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => {
                              onDelete(item.id)
                              setActiveDeleteId(null)
                            }}
                            className="rounded-[10px] border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] transition-all hover:bg-red-500/10"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setActiveDeleteId(null)}
                            className="rounded-[10px] border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] transition-all hover:bg-white/5"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={onNewChat}
              className="mb-2 w-full rounded-[14px] border px-4 py-2 text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:bg-blue-500/10"
              style={{ borderColor: "var(--accent-border)", color: "var(--accent)" }}
            >
              New Chat
            </button>
            <button
              onClick={onClear}
              disabled={items.length === 0}
              className="w-full rounded-[14px] border px-4 py-2 text-[13px] font-black uppercase tracking-[0.2em] transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
