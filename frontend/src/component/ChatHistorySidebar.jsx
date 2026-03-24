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
  <aside className="fixed inset-y-0 left-0 z-50 w-64 lg:w-80 transition-transform duration-300 overflow-hidden pointer-events-none"
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
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-80 border-r transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} overflow-hidden pointer-events-auto shadow-2xl`} style={{ borderColor: "var(--border)", backgroundColor: "var(--sidebar-bg)" }}>
        <div className="flex h-full flex-col">
          <div className="border-b px-5 py-5 lg:py-6" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[12px] lg:text-[13px] font-black uppercase tracking-[0.25em]" style={{ color: "var(--text-h)" }}>
                  Chat History
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-[12px] border border-white/10 p-1.5 text-red-400 transition-all hover:border-red-400/40 hover:bg-red-400/5 active:scale-95"
                title="Close history"
              >
                <GiCancel className="text-[18px]" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 lg:p-5 custom-scrollbar">
            {items.length === 0 ? (
              <div className="rounded-[20px] border border-dashed p-6 text-center text-[13px] opacity-60" style={{ borderColor: "var(--border)" }}>
                No history yet. Generate documentation to create entries.
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} 
                    className={`group relative rounded-[20px] border p-4 lg:p-5 transition-all duration-200 hover:shadow-lg active:scale-[0.98] ${activeDeleteId === item.id ? 'ring-1 ring-red-500/20' : 'hover:bg-white/[0.02]'}`} 
                    style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-start justify-between gap-3">
                      <button
                        onClick={() => onRestore(item)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <div className="text-[9px] font-black uppercase tracking-[0.22em] text-blue-400/90 mb-2">
                          {item.documentType || "README"}
                        </div>
                        <h4 className="text-sm font-bold leading-tight truncate mb-1.5" style={{ color: "var(--text-h)" }}>
                          {item.title || "Untitled Document"}
                        </h4>
                        <p className="text-[12px] leading-relaxed opacity-60 line-clamp-2 font-medium">
                          {item.input?.content}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-[0.18em] opacity-40">
                            {formatHistoryTime(item.createdAt)}
                          </span>
                        </div>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDeleteId((prev) => (prev === item.id ? null : item.id));
                        }}
                        className={`shrink-0 rounded-[12px] border p-2.5 text-sm transition-all hover:scale-105 active:scale-90 ${activeDeleteId === item.id ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'hover:bg-red-500/10 hover:text-red-400'}`}
                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                        title="Delete entry"
                      >
                        <RiDeleteBin6Line className="text-[16px]" />
                      </button>
                    </div>

                    {activeDeleteId === item.id && (
                      <div className="mt-4 rounded-[16px] border bg-black/20 p-3 backdrop-blur-sm animate-in fade-in zoom-in duration-200" style={{ borderColor: "var(--border)" }}>
                        <div className="text-[10px] font-black uppercase tracking-[0.14em] text-red-400/90 text-center mb-3">
                          Permanently delete this?
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onDelete(item.id)
                              setActiveDeleteId(null)
                            }}
                            className="flex-1 rounded-[12px] bg-red-500/10 border border-red-500/20 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-red-400 transition-all hover:bg-red-500/20 active:scale-95"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setActiveDeleteId(null)}
                            className="flex-1 rounded-[12px] border py-2 text-[10px] font-black uppercase tracking-[0.12em] transition-all hover:bg-white/5 active:scale-95"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                          >
                            Keep
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4 space-y-2.5" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={onNewChat}
              className="w-full rounded-[16px] bg-blue-500/5 border border-blue-500/20 py-3 text-[12px] font-black uppercase tracking-[0.2em] text-blue-400 transition-all hover:bg-blue-500/10 hover:shadow-md active:scale-[0.98]"
            >
              New Chat
            </button>
            <button
              onClick={onClear}
              disabled={items.length === 0}
              className="w-full rounded-[16px] border py-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white/5 active:scale-[0.98]"
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

