"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PastePage() {
  const { id } = useParams();
  const router = useRouter();

  const [paste, setPaste] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/pastes/${id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setPaste(data))
      .catch(() => router.replace("/404"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading paste…
        </div>
      </main>
    );
  }

  if (!paste) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b bg-gray-50">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center tracking-tight">
            Your Paste
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Securely shared content
          </p>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6">
          <div className="relative bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
            <pre className="font-mono text-sm sm:text-base text-green-400 whitespace-pre-wrap leading-relaxed">
              {paste.content}
            </pre>
          </div>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-600 mb-6">
            {paste.expires_at && (
              <span>
                ⏳ Expires:{" "}
                <strong>
                  {new Date(paste.expires_at).toLocaleString()}
                </strong>
              </span>
            )}
            {paste.remaining_views !== null && (
              <span>
                👁 Views left:{" "}
                <strong>{paste.remaining_views}</strong>
              </span>
            )}
          </div>

          {/* Back */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
