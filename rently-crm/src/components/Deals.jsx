import { DEAL_STAGES } from "../data/sampleData";

export default function Deals({ deals, contacts }) {
  const fmt = (n) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const getContact = (id) => contacts.find((c) => c.id === id);

  return (
    <div>
      <div className="page-header">
        <h2>Deals Pipeline</h2>
      </div>

      <div className="pipeline">
        {DEAL_STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
          const badgeClass = stage.toLowerCase().replace(/\s+/g, "-");

          return (
            <div className="pipeline-column" key={stage}>
              <div className="pipeline-column-header">
                <div>
                  <h4>{stage}</h4>
                  <div className="total">{fmt(stageTotal)}</div>
                </div>
                <span className="count">{stageDeals.length}</span>
              </div>
              {stageDeals.map((deal) => {
                const contact = getContact(deal.contactId);
                return (
                  <div className="deal-card" key={deal.id}>
                    <div className="deal-name">{deal.name}</div>
                    <div className="deal-company">
                      {contact?.company || "Unknown"}
                    </div>
                    <div className="deal-value">{fmt(deal.value)}</div>
                    <div className="deal-product">{deal.product}</div>
                    <div className="deal-close">
                      Close: {deal.expectedClose} &middot;{" "}
                      {deal.probability}% likely
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
