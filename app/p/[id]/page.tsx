import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();
  const paste = await res.json();

  return (
    <main className="min-h-svh flex items-center justify-center bg-white">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Your Paste
        </h1>

        <div className="relative bg-gray-100 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-300 rounded-t-xl" />
          <pre className="font-mono text-sm sm:text-base text-green-900 whitespace-pre-wrap">
            {paste.content}
          </pre>
        </div>

        <div className="my-6 h-px bg-gray-200" />

        <div className="text-center">
          <a
            href="/"
            className="inline-block px-6 py-2 rounded-full text-indigo-600 font-medium hover:bg-indigo-50"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
