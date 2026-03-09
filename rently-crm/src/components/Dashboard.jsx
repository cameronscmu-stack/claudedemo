export default function Dashboard({ contacts, deals, activities }) {
  const totalPipeline = deals
    .filter((d) => d.stage !== "Closed Won")
    .reduce((sum, d) => sum + d.value, 0);

  const closedWon = deals
    .filter((d) => d.stage === "Closed Won")
    .reduce((sum, d) => sum + d.value, 0);

  const activeDeals = deals.filter((d) => d.stage !== "Closed Won").length;

  const weightedPipeline = deals
    .filter((d) => d.stage !== "Closed Won")
    .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

  const fmt = (n) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const recentActivities = [...activities]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const upcomingDeals = [...deals]
    .filter((d) => d.stage !== "Closed Won")
    .sort((a, b) => a.expectedClose.localeCompare(b.expectedClose))
    .slice(0, 4);

  const getContact = (id) => contacts.find((c) => c.id === id);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <span style={{ color: "#888", fontSize: 14 }}>
          Welcome back, Cam
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">Total Pipeline</div>
          <div className="value blue">{fmt(totalPipeline)}</div>
          <div className="subtext">{activeDeals} active deals</div>
        </div>
        <div className="stat-card">
          <div className="label">Weighted Pipeline</div>
          <div className="value orange">{fmt(weightedPipeline)}</div>
          <div className="subtext">Based on probability</div>
        </div>
        <div className="stat-card">
          <div className="label">Closed Won</div>
          <div className="value green">{fmt(closedWon)}</div>
          <div className="subtext">This quarter</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Contacts</div>
          <div className="value purple">{contacts.length}</div>
          <div className="subtext">
            {contacts.filter((c) => c.status === "Lead").length} new leads
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="table-card">
          <div className="table-card-header">
            <h3>Upcoming Closes</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Deal</th>
                <th>Value</th>
                <th>Close Date</th>
              </tr>
            </thead>
            <tbody>
              {upcomingDeals.map((deal) => (
                <tr key={deal.id}>
                  <td>
                    <strong>{deal.name}</strong>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {deal.product}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: "#2e7d32" }}>
                    {fmt(deal.value)}
                  </td>
                  <td>{deal.expectedClose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <div className="table-card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => {
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
                      {activity.type} with {contact?.name}
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
      </div>
    </div>
  );
}
