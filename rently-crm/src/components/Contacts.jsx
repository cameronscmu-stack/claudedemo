import { useState } from "react";

export default function Contacts({ contacts, onAddContact }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    phone: "",
    status: "Lead",
    notes: "",
    dealValue: 0,
  });

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const badgeClass = (status) => {
    const map = {
      Active: "badge-active",
      Lead: "badge-lead",
      Negotiation: "badge-negotiation",
      "Closed Won": "badge-closed-won",
    };
    return map[status] || "badge-lead";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact({
      ...form,
      id: Date.now(),
      dealValue: Number(form.dealValue),
      lastContact: new Date().toISOString().split("T")[0],
    });
    setForm({
      name: "",
      company: "",
      title: "",
      email: "",
      phone: "",
      status: "Lead",
      notes: "",
      dealValue: 0,
    });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Contacts</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            className="search-bar"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Contact
          </button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Title</th>
              <th>Status</th>
              <th>Deal Value</th>
              <th>Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <strong>{contact.name}</strong>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {contact.email}
                  </div>
                </td>
                <td>{contact.company}</td>
                <td>{contact.title}</td>
                <td>
                  <span className={`badge ${badgeClass(contact.status)}`}>
                    {contact.status}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>
                  {fmt(contact.dealValue)}
                </td>
                <td>{contact.lastContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Contact</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  required
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Lead</option>
                  <option>Active</option>
                  <option>Negotiation</option>
                  <option>Closed Won</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estimated Deal Value ($)</label>
                <input
                  type="number"
                  value={form.dealValue}
                  onChange={(e) =>
                    setForm({ ...form, dealValue: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
