import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import Deals from "./components/Deals";
import Activities from "./components/Activities";
import {
  sampleContacts,
  sampleDeals,
  sampleActivities,
} from "./data/sampleData";

function App() {
  const [page, setPage] = useState("dashboard");
  const [contacts, setContacts] = useState(sampleContacts);
  const [deals] = useState(sampleDeals);
  const [activities, setActivities] = useState(sampleActivities);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            contacts={contacts}
            deals={deals}
            activities={activities}
          />
        );
      case "contacts":
        return <Contacts contacts={contacts} onAddContact={addContact} />;
      case "deals":
        return <Deals deals={deals} contacts={contacts} />;
      case "activities":
        return (
          <Activities
            activities={activities}
            contacts={contacts}
            onAddActivity={addActivity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default App;
