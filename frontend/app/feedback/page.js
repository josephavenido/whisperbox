"use client";

import { useEffect, useState } from "react";

// ✅ Use env var if available, otherwise fallback to localhost
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MAX_LENGTH = 250;

// Note colors (used for dots + note backgrounds)
const COLOR_OPTIONS = [
  {
    id: "mint",
    label: "Mint",
    dotClass: "bg-emerald-300",
    noteClass: "bg-emerald-50",
  },
  {
    id: "rose",
    label: "Rose",
    dotClass: "bg-rose-400",
    noteClass: "bg-rose-50",
  },
  {
    id: "sun",
    label: "Sun",
    dotClass: "bg-amber-300",
    noteClass: "bg-amber-50",
  },
  {
    id: "sky",
    label: "Sky",
    dotClass: "bg-sky-300",
    noteClass: "bg-sky-50",
  },
  {
    id: "lavender",
    label: "Lavender",
    dotClass: "bg-violet-300",
    noteClass: "bg-violet-50",
  },
];

// Simple emoji set for picker
const EMOJIS = ["😀", "😄", "😊", "🤔", "😢", "🔥", "👍", "👎", "💡", "❤️"];

function getColorConfig(colorId) {
  return (
    COLOR_OPTIONS.find((c) => c.id === colorId) || COLOR_OPTIONS[0] // default to first
  );
}

export default function FeedbackPage() {
  // All feedback from backend
  const [feedback, setFeedback] = useState([]);

  // Dashboard state
  const [searchQuery, setSearchQuery] = useState("");

  // Create / send-message state
  const [createMessage, setCreateMessage] = useState("");
  const [createColor, setCreateColor] = useState(COLOR_OPTIONS[0].id);

  // Edit state (uses a modal)
  const [editMessage, setEditMessage] = useState("");
  const [editColor, setEditColor] = useState(COLOR_OPTIONS[0].id);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState(null);

  // Which tab is active: "dashboard" or "send"
  const [activeTab, setActiveTab] = useState("dashboard");

  // Load feedback from backend
  const fetchFeedback = async () => {
    try {
      const res = await fetch(`${API_URL}/feedback`);
      if (!res.ok) return;
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Hide "New" badge after a few seconds
  useEffect(() => {
    if (!lastCreatedId) return;
    const timer = setTimeout(() => setLastCreatedId(null), 4000);
    return () => clearTimeout(timer);
  }, [lastCreatedId]);

  const filteredFeedback = feedback.filter((item) =>
    (item.message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ----- CREATE (Send Anonymous Message tab) -----
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createMessage.trim()) return;

    setLoading(true);

    const payload = {
      message: createMessage,
      color: createColor,
    };

    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        setLastCreatedId(created.id);
        setCreateMessage("");
        setCreateColor(COLOR_OPTIONS[0].id);
        fetchFeedback();
        setActiveTab("dashboard"); // jump to dashboard after send
      }
    } catch (err) {
      console.error("Error creating feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----- EDIT -----
  const openEditModal = (item) => {
    setEditingId(item.id);
    setEditMessage(item.message || "");
    setEditColor(item.color || COLOR_OPTIONS[0].id);
    setIsModalOpen(true);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editMessage.trim() || !editingId) return;

    setLoading(true);

    const payload = {
      message: editMessage,
      color: editColor,
    };

    try {
      await fetch(`${API_URL}/feedback/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsModalOpen(false);
      setEditingId(null);
      fetchFeedback();
    } catch (err) {
      console.error("Error updating feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----- DELETE -----
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await fetch(`${API_URL}/feedback/${id}`, {
        method: "DELETE",
      });
      fetchFeedback();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Emoji clicks (for create form)
  const handleEmojiClick = (emoji) => {
    setCreateMessage((prev) => (prev + emoji).slice(0, MAX_LENGTH));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex flex-col">
      {/* Top nav – matches homepage style */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 text-white">
        <div className="flex items-center gap-3">
          {/* LOGO – put logo.png inside frontend/public */}
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src="/logo.png"
              alt="WhisperBox logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-lg md:text-xl font-extrabold drop-shadow-sm">
            WhisperBox
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium drop-shadow-sm">
          <span className="opacity-90">Dashboard</span>
          <span className="opacity-90">Anonymous messages</span>
        </nav>
      </header>

      {/* Main content card */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-10 pb-10">
        <div className="max-w-5xl w-full">
          <div className="bg-white/95 rounded-3xl shadow-2xl border border-white/70 p-6 md:p-8">
            {/* Title + tabs */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
                Your WhisperMessage
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                View all your whisper messages or send a new one.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="bg-slate-100 rounded-full p-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-5 py-2 text-xs md:text-sm rounded-full font-semibold transition-all ${
                    activeTab === "dashboard"
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  My messages
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("send")}
                  className={`px-5 py-2 text-xs md:text-sm rounded-full font-semibold transition-all ${
                    activeTab === "send"
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Send anonymous message
                </button>
              </div>
            </div>

            {/* ----- TAB CONTENT ----- */}
            {activeTab === "dashboard" ? (
              <>
                {/* Search + counter */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                  <div>
                    <p className="text-xs text-slate-500">
                      Showing {filteredFeedback.length} of {feedback.length}{" "}
                      notes
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full md:w-64 px-3 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Messages grid */}
                <div className="bg-slate-50 rounded-3xl p-4 md:p-5 shadow-inner border border-slate-200/70">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredFeedback.length === 0 && (
                      <div className="col-span-full text-center text-slate-400 text-sm">
                        No messages yet. Switch to &quot;Send anonymous
                        message&quot; to write the first one!
                      </div>
                    )}

                    {filteredFeedback.map((item) => {
                      const cfg = getColorConfig(item.color);
                      const isNew = item.id === lastCreatedId;

                      return (
                        <div
                          key={item.id}
                          className={`relative rounded-xl p-4 shadow-md ${cfg.noteClass} transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
                        >
                          {/* Small color dot */}
                          <span
                            className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${cfg.dotClass}`}
                          />

                          {/* New badge */}
                          {isNew && (
                            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-md animate-pulse">
                              New
                            </span>
                          )}

                          <p className="text-sm mb-4 whitespace-pre-wrap mt-1">
                            {item.message}
                          </p>

                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-600">
                              {item.created_at
                                ? new Date(
                                    item.created_at
                                  ).toLocaleString()
                                : ""}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal(item)}
                                className="px-2 py-1 rounded-full border border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="px-2 py-1 rounded-full border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* SEND ANONYMOUS MESSAGE TAB */
              <form onSubmit={handleCreate} className="max-w-xl mx-auto">
                <p className="text-xs md:text-sm text-slate-500 mb-3 text-center">
                  Write anything you want to share. Your name won&apos;t be
                  stored — just the message and the color you choose.
                </p>

                <textarea
                  className="w-full h-32 border rounded-2xl p-3 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Write your honest feedback here..."
                  value={createMessage}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setCreateMessage(e.target.value)}
                />

                {/* Emoji picker */}
                <div className="flex flex-wrap gap-1 mb-2 justify-center">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="text-lg hover:scale-110 transition-transform"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] text-slate-400">
                    This message will be posted anonymously.
                  </span>
                  <span
                    className={`text-[11px] ${
                      createMessage.length > MAX_LENGTH - 30
                        ? "text-indigo-500"
                        : "text-slate-400"
                    }`}
                  >
                    {createMessage.length} / {MAX_LENGTH}
                  </span>
                </div>

                {/* Color chooser */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-600">
                    Note color:&nbsp;
                    <strong>{getColorConfig(createColor).label}</strong>
                  </span>
                  <div className="flex gap-1">
                    {COLOR_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setCreateColor(option.id)}
                        className={`w-5 h-5 rounded-full ${option.dotClass} border border-slate-200 ${
                          createColor === option.id
                            ? "ring-2 ring-indigo-500 ring-offset-1"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold shadow-md hover:shadow-xl disabled:opacity-60 transition-all"
                  >
                    {loading ? "Sending..." : "Share anonymously"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full text-center text-[11px] text-white/80 pb-3">
        WhisperBox • Feedback dashboard
      </footer>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold text-sm">
                Edit anonymous message
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSave} className="p-4">
              <textarea
                className="w-full h-32 border rounded-2xl p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={editMessage}
                maxLength={MAX_LENGTH}
                onChange={(e) => setEditMessage(e.target.value)}
              />

              {/* Edit color chooser */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-slate-600">
                  Note color:&nbsp;
                  <strong>{getColorConfig(editColor).label}</strong>
                </span>
                <div className="flex gap-1">
                  {COLOR_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEditColor(option.id)}
                      className={`w-5 h-5 rounded-full ${option.dotClass} border border-slate-200 ${
                        editColor === option.id
                          ? "ring-2 ring-indigo-500 ring-offset-1"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
