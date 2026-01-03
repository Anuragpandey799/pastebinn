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
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!paste) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
          Your Paste
        </h1>

        <div className="bg-gray-100 rounded-xl p-5 mb-6 overflow-x-auto">
          <pre className="font-mono text-green-900 whitespace-pre-wrap">
            {paste.content}
          </pre>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          {paste.expires_at && (
            <span>
              Expires: {new Date(paste.expires_at).toLocaleString()}
            </span>
          )}
          {paste.remaining_views !== null && (
            <span>Views left: {paste.remaining_views}</span>
          )}
        </div>

        <div className="text-center">
          <a href="/" className="text-indigo-600 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
