function AnalyticsResult({ data }) {
  if (!data) return null;

  const stats = [
    { label: "Total clicks", value: data.totalClicks },
    { label: "Clicks today", value: data.clicksToday },
    {
      label: "First visit",
      value: data.firstVisit ? new Date(data.firstVisit).toLocaleString() : "—",
    },
    {
      label: "Last visit",
      value: data.lastVisit ? new Date(data.lastVisit).toLocaleString() : "—",
    },
  ];

  return (
    <div className="bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#58a6ff] rounded-xl p-6 mb-5">
      <h3 className="text-[15px] font-semibold text-[#c9d1d9] mb-3.5">
        Analytics
      </h3>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3"
          >
            <div className="text-[11.5px] uppercase tracking-wide text-[#8b949e] mb-1">
              {stat.label}
            </div>
            <div className="font-mono text-[13.5px] font-medium text-[#c9d1d9]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[13px] font-semibold text-[#c9d1d9] mb-2">
        Visit history
      </div>
      {data.analytics.length === 0 ? (
        <p className="text-[13px] text-[#8b949e] italic">No visits yet.</p>
      ) : (
        <ul className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
          {data.analytics.map((visit, index) => (
            <li
              key={index}
              className="font-mono text-xs text-[#8b949e] bg-[#0d1117] border border-[#30363d] px-2.5 py-1.5 rounded-md"
            >
              {new Date(visit.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnalyticsResult;
