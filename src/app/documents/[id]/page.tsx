import { Suspense } from "react";
import DocumentDetailClient from "./detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [
    { id: "doc-1" },
    { id: "doc-2" },
    { id: "doc-3" },
    { id: "doc-4" },
    { id: "doc-5" },
    { id: "doc-6" },
    { id: "doc-7" },
    { id: "doc-8" },
  ];
}

export default async function DocumentDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-xs font-semibold text-slate-400">
          Loading document inspector...
        </div>
      }
    >
      <DocumentDetailClient id={id} />
    </Suspense>
  );
}
