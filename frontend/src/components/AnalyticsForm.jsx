import { useState } from "react";

function AnalyticsForm({ onSubmit, isLoading }) {
  const [shortId, setShortId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shortId.trim()) {
      onSubmit(shortId.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex flex-col mb-5"
    >
      <h2 className="text-base font-semibold text-[#c9d1d9] mb-1">
        Get analytics
      </h2>
      <p className="text-[13px] text-[#8b949e] mb-4">
        Enter a short ID to see click history
      </p>

      <label className="text-[13px] font-medium text-[#c9d1d9] mb-1.5">
        Short ID
      </label>
      <input
        type="text"
        placeholder="e.g. A0"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
        required
        className="px-3 py-2.5 border border-[#30363d] rounded-lg text-sm bg-[#0d1117] text-[#c9d1d9] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-4 focus:ring-[#58a6ff]/15 transition"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#238636] hover:bg-[#2ea043] active:scale-[0.98] disabled:bg-[#238636]/40 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Fetching..." : "Get analytics"}
      </button>
    </form>
  );
}

export default AnalyticsForm;
