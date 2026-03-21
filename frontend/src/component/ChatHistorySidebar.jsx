import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

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

export default function ChatHistorySidebar({ isOpen, onToggle, onClose, onNewChat, items, onRestore, onDelete, onClear }) {
  const [activeDeleteId, setActiveDeleteId] = useState(null)

  return (
    <>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-4 z-[70] h-11 w-11 rounded-[16px] border text-xl font-black leading-none transition-all hover:brightness-110"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--code-bg)", color: "var(--text-h)" }}
          title="Open history"
        >
          {"\u2630"}
        </button>
      )}

      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close history overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[60] h-full w-[320px] max-w-[85vw] border-r transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--sidebar-bg)", color: "var(--text)" }}
      >
        <div className="flex h-full flex-col">
          <div className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[12px] font-black uppercase tracking-[0.25em]" style={{ color: "var(--text-h)" }}>
                  Chat History
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-50">
                  Stored locally
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-[12px] border px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-all hover:bg-white/5"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                title="Close history"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {items.length === 0 ? (
              <div className="rounded-[16px] border p-4 text-xs opacity-70" style={{ borderColor: "var(--border)" }}>
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
              className="mb-2 w-full rounded-[14px] border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-blue-500/10"
              style={{ borderColor: "var(--accent-border)", color: "var(--accent)" }}
            >
              New Chat
            </button>
            <button
              onClick={onClear}
              disabled={items.length === 0}
              className="w-full rounded-[14px] border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Clear History
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
