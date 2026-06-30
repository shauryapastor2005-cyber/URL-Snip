import { useState } from "react";

function UrlForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { url };
    if (customAlias.trim()) data.customAlias = customAlias.trim();
    if (expiresInDays.trim()) data.expiresInDays = Number(expiresInDays);
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex flex-col mb-5"
    >
      <h2 className="text-base font-semibold text-[#c9d1d9] mb-1">
        Shorten a link
      </h2>
      <p className="text-[13px] text-[#8b949e] mb-4">
        Paste a long URL to generate a short one
      </p>

      <label className="text-[13px] font-medium text-[#c9d1d9] mb-1.5">
        Original URL
      </label>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="px-3 py-2.5 border border-[#30363d] rounded-lg text-sm bg-[#0d1117] text-[#c9d1d9] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-4 focus:ring-[#58a6ff]/15 transition"
      />

      <label className="text-[13px] text-[#c9d1d9] mt-3.5 mb-1.5">
        Custom alias{" "}
        <span className="text-[#8b949e] font-normal">(optional)</span>
      </label>
      <input
        type="text"
        placeholder="e.g. google"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
        className="px-3 py-2.5 border border-[#30363d] rounded-lg text-sm bg-[#0d1117] text-[#c9d1d9] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-4 focus:ring-[#58a6ff]/15 transition"
      />

      <label className="text-[13px] text-[#c9d1d9] mt-3.5 mb-1.5">
        Expiry in days{" "}
        <span className="text-[#8b949e] font-normal">(optional)</span>
      </label>
      <input
        type="number"
        placeholder="e.g. 7"
        value={expiresInDays}
        onChange={(e) => setExpiresInDays(e.target.value)}
        min="1"
        className="px-3 py-2.5 border border-[#30363d] rounded-lg text-sm bg-[#0d1117] text-[#c9d1d9] placeholder-[#6e7681] focus:outline-none focus:border-[#58a6ff] focus:ring-4 focus:ring-[#58a6ff]/15 transition"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#238636] hover:bg-[#2ea043] active:scale-[0.98] disabled:bg-[#238636]/40 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Creating..." : "Create short URL"}
      </button>
    </form>
  );
}

export default UrlForm;
