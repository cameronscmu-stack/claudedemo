export default function Sidebar({ activePage, onNavigate }) {
  const navItems = [
    { id: "dashboard", icon: "\u25A0", label: "Dashboard" },
    { id: "contacts", icon: "\u263A", label: "Contacts" },
    { id: "deals", icon: "\u2605", label: "Deals Pipeline" },
    { id: "activities", icon: "\u2691", label: "Activities" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h1>Rently CRM</h1>
        <p>Sales Dashboard</p>
      </div>
      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={activePage === item.id ? "active" : ""}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="sidebar-user">
        <strong>Cam Margeson</strong>
        Sales Representative
      </div>
    </div>
  );
}
