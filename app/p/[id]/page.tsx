import { redis } from "@/lib/redis";
import { notFound } from "next/navigation";

export default async function PastePage({ params }: { params: any }) {
  // unwrap params (unchanged)
  const { id } = await params;

  const paste = await redis.get<any>(`paste:${id}`);
  if (!paste) notFound();

  return (
    <main className="min-h-svh rounded-2xl flex items-center justify-center  bg-white">
      <div className="w-full max-w-3xl bg-whi
       shadow-xl rounded-3xl p-6 sm:p-8 border border-gray-200">
        
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
          Your Decrypted Text : 
        </h1>

        {/* Paste Content */}
        <div className="relative bg-gray-100 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-300 rounded-t-xl" />

          <pre className="font-mono text-sm sm:text-base text-green-900 whitespace-pre-wrap leading-relaxed">
            {paste.content}
          </pre>
        </div>

        {/* Metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          {paste.expires_at && (
            <span>
              <span className="font-semibold text-gray-800">Expires:</span>{" "}
              <time dateTime={paste.expires_at}>
                {new Date(paste.expires_at).toLocaleString()}
              </time>
            </span>
          )}

          {paste.remaining_views != null && (
            <span>
              <span className="font-semibold text-gray-800">Views left:</span>{" "}
              {paste.remaining_views}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Back link */}
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
