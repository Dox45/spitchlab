"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

interface QueryResponse {
  system_prompt: string;
  context: string;
  query: string;
}

export default function QueryTest() {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { session } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      if (!session) throw new Error("No active session");
      const token = await session.getToken();
      const res = await fetch("http://102.37.136.211:8000/query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: QueryResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch query response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-indigo-600">Test RAG Query</h2>
        <p className="text-sm text-gray-500">Submit a query and inspect the matched system prompt and context.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-xl shadow-sm p-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="query" className="text-md font-semibold text-gray-700">Your query</label>
          <textarea
            id="query"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., How do I get your app?"
            className="border rounded-md p-3 text-sm resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Query"
          )}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      {response && (
        <div className="bg-gray-50 border rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Query Response</h3>
          <div>
            <h4 className="font-semibold text-sm text-gray-600">Query</h4>
            <p className="whitespace-pre-wrap text-gray-800">{response.query}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600">System Prompt</h4>
            <p className="whitespace-pre-wrap text-gray-800">{response.system_prompt}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600">Context</h4>
            <p className="whitespace-pre-wrap text-gray-800">{response.context}</p>
          </div>
        </div>
      )}
    </div>
  );
}
