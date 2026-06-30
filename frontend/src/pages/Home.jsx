import { useState } from "react";
import UrlForm from "../components/UrlForm";
import ResultCard from "../components/ResultCard";
import AnalyticsForm from "../components/AnalyticsForm";
import AnalyticsResult from "../components/AnalyticsResult";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { createShortUrl, fetchAnalytics } from "../services/urlService";

function Home() {
  const [result, setResult] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  const getFriendlyError = (error) => {
    if (!error.response) {
      return "Cannot reach the server. Is your backend running?";
    }
    const status = error.response.status;
    const backendMessage =
      error.response.data?.error || error.response.data?.message;

    if (status === 400) return backendMessage || "Invalid URL provided.";
    if (status === 409) return backendMessage || "This alias is already taken.";
    if (status === 410) return "This short URL has expired.";
    if (status === 404) return "Short URL not found.";
    return "Something went wrong. Please try again.";
  };

  const handleCreate = async (data) => {
    setCreateLoading(true);
    setCreateError("");
    setResult(null);
    try {
      const response = await createShortUrl(data);
      setResult(response);
    } catch (error) {
      setCreateError(getFriendlyError(error));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleAnalytics = async (shortId) => {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    setAnalyticsData(null);
    try {
      const response = await fetchAnalytics(shortId);
      setAnalyticsData(response);
    } catch (error) {
      setAnalyticsError(getFriendlyError(error));
    } finally {
      setAnalyticsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-[480px] mx-auto px-4 py-12 pb-16">
        <div className="flex items-center gap-3 mb-9">
          <div className="relative w-[34px] h-[34px] shrink-0">
            <span className="absolute top-0 left-0 w-5 h-5 rounded-md border-[3px] border-[#238636]"></span>
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-md border-[3px] border-[#58a6ff]"></span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#c9d1d9]">
              Url Snip
            </h1>
            <p className="text-[13px] text-[#8b949e] mt-0.5">
              Shorten links and track every click
            </p>
          </div>
        </div>

        <UrlForm onSubmit={handleCreate} isLoading={createLoading} />
        {createLoading && <Loader />}
        <ErrorMessage message={createError} />
        <ResultCard result={result} />

        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-[#30363d]"></div>
          <span className="text-xs text-[#8b949e] whitespace-nowrap">
            Already have a short link?
          </span>
          <div className="flex-1 h-px bg-[#30363d]"></div>
        </div>

        <AnalyticsForm
          onSubmit={handleAnalytics}
          isLoading={analyticsLoading}
        />
        {analyticsLoading && <Loader />}
        <ErrorMessage message={analyticsError} />
        <AnalyticsResult data={analyticsData} />
      </div>
    </div>
  );
}

export default Home;
