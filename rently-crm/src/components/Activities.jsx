import { useState } from "react";

export default function Activities({ activities, contacts, onAddActivity }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    contactId: "",
    type: "Call",
    description: "",
  });

  const getContact = (id) => contacts.find((c) => c.id === id);

  const sorted = [...activities].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddActivity({
      ...form,
      id: Date.now(),
      contactId: Number(form.contactId),
      date: new Date().toISOString().split("T")[0],
    });
    setForm({ contactId: "", type: "Call", description: "" });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Activities</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Log Activity
        </button>
      </div>

      <div className="table-card">
        <div className="activity-list">
          {sorted.map((activity) => {
            const contact = getContact(activity.contactId);
            return (
              <div className="activity-item" key={activity.id}>
                <div
                  className={`activity-icon ${activity.type.toLowerCase()}`}
                >
                  {activity.type === "Call"
                    ? "\u260E"
                    : activity.type === "Email"
                    ? "\u2709"
                    : "\u2615"}
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    {activity.type} with {contact?.name || "Unknown"}
                  </div>
                  <div className="activity-desc">
                    {activity.description}
                  </div>
                  <div className="activity-date">{activity.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log Activity</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contact</label>
                <select
                  required
                  value={form.contactId}
                  onChange={(e) =>
                    setForm({ ...form, contactId: e.target.value })
                  }
                >
                  <option value="">Select a contact...</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.company})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                >
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
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
                  Log Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
