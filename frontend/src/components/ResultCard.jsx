import { useState } from "react";

function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const shortUrl = `${import.meta.env.VITE_API_URL}/${result.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] border-l-[3px] border-l-[#58a6ff] rounded-xl p-6 mb-5">
      <h3 className="text-[15px] font-semibold text-[#c9d1d9] mb-3.5">
        Short URL created
      </h3>

      <div className="flex items-center justify-between gap-2.5 flex-wrap bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-lg px-3 py-2.5">
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[13.5px] text-[#58a6ff] hover:underline break-all"
        >
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className={`shrink-0 px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
            copied
              ? "bg-[#238636] text-white"
              : "bg-[#21262d] text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d]"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {result.expiresAt && (
        <p className="font-mono text-xs text-[#8b949e] mt-3">
          Expires: {new Date(result.expiresAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default ResultCard;
