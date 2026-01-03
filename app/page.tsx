"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!content.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setUrl(data.url);
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyUrl() {
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Share Text Securely</h1>
        
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4 text-gray-700"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading || !content.trim()}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>

        {url && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-700 mb-2">Your Paste Link:</p>
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="w-full text-center p-2 border border-gray-300 rounded-lg bg-white text-blue-900"
              />
              <button
                onClick={copyUrl}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-500">
       <i>Thankyou for using Pastebin encryption app</i>
      </footer>
    </section>
  );
}
