import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // headers() is async in modern Next.js
  const h = await headers();
  const host = h.get("host");

  if (!host) notFound();

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();
  const paste = await res.json();

  return (
    <main className="min-h-svh flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 sm:p-8 border border-gray-200">
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Your Paste
        </h1>

        {/* Paste Content */}
        <div className="relative bg-gray-100 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-300 rounded-t-xl" />
          <pre className="font-mono text-sm sm:text-base text-green-900 whitespace-pre-wrap leading-relaxed">
            {paste.content}
          </pre>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600 mb-6">
          {paste.expires_at && (
            <span>
              <span className="font-semibold text-gray-800">Expires:</span>{" "}
              {new Date(paste.expires_at).toLocaleString()}
            </span>
          )}

          {paste.remaining_views !== null && (
            <span>
              <span className="font-semibold text-gray-800">Views left:</span>{" "}
              {paste.remaining_views}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Back */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block px-6 py-2 rounded-full text-indigo-600 font-medium hover:bg-indigo-50 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
