import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Menu,
  Home,
  LogOut,
  X,
  Search,
  Trash2,
  Star,
  Reply,
  Save,
  FileDown,
} from "lucide-react";
import "./PageDev.css";

export default function PageDev() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [functionsOpen, setFunctionsOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // --- ESTADOS DINÂMICOS VINDOS DO BACKEND ---
  const [installsData, setInstallsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const [editing, setEditing] = useState(null);

  // 🔹 Carregar dados do backend
  useEffect(() => {
    (async () => {
      try {
        const resInstalls = await fetch("http://localhost:5000/avaliacao/instalacoes");
        setInstallsData(await resInstalls.json());

        const resReviews = await fetch("http://localhost:5000/avaliacao/avaliacoes");
        setReviewsData(await resReviews.json());

        const resFeedbacks = await fetch("http://localhost:5000/avaliacao/feedbacks");
        setFeedbacks(await resFeedbacks.json());
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    })();
  }, []);

  // 🔹 Filtro de feedbacks
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return feedbacks;
    return feedbacks.filter(
      (f) =>
        f.user?.toLowerCase().includes(q) ||
        f.text?.toLowerCase().includes(q) ||
        String(f.id).includes(q)
    );
  }, [feedbacks, query]);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function startEdit(item) {
    setEditing({ ...item });
  }

  async function saveEdit() {
    if (!editing) return;
    try {
      await fetch(`http://localhost:5000/avaliacao/feedbacks/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      setFeedbacks((arr) => arr.map((f) => (f.id === editing.id ? editing : f)));
      setEditing(null);
    } catch (err) {
      console.error("Erro ao salvar feedback:", err);
    }
  }

  async function deleteSelected() {
    const ids = [...selected];
    try {
      await fetch("http://localhost:5000/avaliacao/feedbacks/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      setFeedbacks((arr) => arr.filter((f) => !selected.has(f.id)));
      setSelected(new Set());
    } catch (err) {
      console.error("Erro ao deletar feedbacks:", err);
    }
  }

  function highlightSelected() {
    const ids = new Set(selected);
    setFeedbacks((arr) =>
      arr.map((f) =>
        ids.has(f.id) && !String(f.text).startsWith("⭐ ")
          ? { ...f, text: `⭐ ${f.text}` }
          : f
      )
    );
  }

  function exportCSV() {
    const rows = [["id", "user", "text"], ...feedbacks.map((f) => [f.id, f.user, f.text])];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedbacks.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="dev-container">
      {/* NAVBAR */}
      <header className="navbar">
        <button className="icon-btn framed" onClick={() => setSidebarOpen(true)} aria-label="abrir menu">
          <Menu size={28} />
        </button>
        <div className="nav-center">
          <Home size={26} />
        </div>
        <button className="icon-btn framed" aria-label="logout">
          <LogOut size={26} />
        </button>
      </header>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <>
          <div className="sidebar">
            <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="fechar menu">
              <X size={28} />
            </button>
            <ul className="side-items">
              <li className="side-item" onClick={() => setUpdateModal(true)}>Adicionar Atualização</li>
              <li className="side-item" onClick={() => setFunctionsOpen(true)}>Funções</li>
              <li className="side-item">Configurações</li>
            </ul>
          </div>
          <div className="side-overlay" onClick={() => setSidebarOpen(false)} />
        </>
      )}

      {/* BANNER */}
      <section className="banner">
        <div className="banner-inner">
          <h1 className="title">
            Animosi<span className="ty">Ty</span>
            <span className="dev-badge">DEV</span>
          </h1>
        </div>
      </section>

      {/* CONTEÚDO */}
      <main className="content">
        <div className="content-inner">
          {/* Instalações */}
          <div className="card">
            <div className="card-title">Instalações</div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={installsData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Feedbacks */}
          <div className="card">
            <div className="card-title">Feedbacks</div>
            <div className="feedback-list">
              {feedbacks.map((f) => (
                <div key={f.id} className="feedback-item">
                  <div className="feedback-bubble">
                    <span className="user">
                      {f.user} {Array(f.stars || 3).fill("⭐").join("")}:
                    </span>{" "}
                    {f.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avaliações */}
          <div className="card">
            <div className="card-title">Avaliações</div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reviewsData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ruins" fill="#ef4444" name="Ruins" />
                  <Bar dataKey="boas" fill="#3b82f6" name="Boas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL FUNÇÕES */}
      {functionsOpen && (
        <div className="modal-backdrop" onClick={() => setFunctionsOpen(false)}>
          <div className="modal functions-modal" onClick={(e) => e.stopPropagation()}>
            <div className="functions-header">
              <h2>Funções de Feedback</h2>
              <button className="icon-btn" onClick={() => setFunctionsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="functions-toolbar">
              <div className="search">
                <Search size={18} />
                <input
                  placeholder="Buscar por usuário, texto ou ID…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="tools">
                <button className="tool-btn" onClick={highlightSelected} title="Destacar selecionados">
                  <Star size={16} /> Destacar
                </button>
                <button className="tool-btn danger" onClick={deleteSelected} title="Apagar selecionados">
                  <Trash2 size={16} /> Apagar
                </button>
                <button className="tool-btn" onClick={exportCSV} title="Exportar CSV">
                  <FileDown size={16} /> Exportar
                </button>
              </div>
            </div>

            <div className="functions-body">
              <div className="list-pane">
                {filtered.length === 0 && (
                  <div className="empty">Nenhum feedback encontrado.</div>
                )}

                {filtered.map((f) => (
                  <label key={f.id} className="row">
                    <input
                      type="checkbox"
                      checked={selected.has(f.id)}
                      onChange={() => toggleSelect(f.id)}
                    />
                    <div className="row-content" onClick={() => startEdit(f)}>
                      <div className="row-user">{f.user}</div>
                      <div className="row-text">{f.text}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="editor-pane">
                <div className="editor-title">Editor</div>
                {editing ? (
                  <>
                    <div className="field">
                      <label>Usuário</label>
                      <input
                        value={editing.user}
                        onChange={(e) => setEditing((x) => ({ ...x, user: e.target.value }))}
                      />
                    </div>
                    <div className="field">
                      <label>Texto</label>
                      <textarea
                        rows={6}
                        value={editing.text}
                        onChange={(e) => setEditing((x) => ({ ...x, text: e.target.value }))}
                      />
                    </div>
                    <div className="editor-actions">
                      <button className="tool-btn" onClick={() => alert("Responder (implementar no backend)")}>
                        <Reply size={16} /> Responder
                      </button>
                      <button className="tool-btn primary" onClick={saveEdit}>
                        <Save size={16} /> Salvar
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">Selecione um feedback para editar.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR ATUALIZAÇÃO */}
      {updateModal && (
        <div className="modal-backdrop" onClick={() => setUpdateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="functions-header">
              <h2>Adicionar Atualização</h2>
              <button className="icon-btn" onClick={() => setUpdateModal(false)}>
                <X />
              </button>
            </div>
            <div className="functions-body">
              <div className="editor-pane">
                <div className="field">
                  <label>Título</label>
                  <input placeholder="Digite o título da atualização..." />
                </div>
                <div className="field">
                  <label>Descrição</label>
                  <textarea rows={6} placeholder="Descrição da atualização..." />
                </div>
                <div className="editor-actions">
                  <button className="tool-btn primary" onClick={() => alert("Salvar atualização (implementar backend)")}>
                    <Save size={16} /> Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
