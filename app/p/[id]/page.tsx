import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) notFound();

  // Get current domain safely (works on Vercel + prod)
  const h = headers();
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
