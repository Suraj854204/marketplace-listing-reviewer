"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { getDemoListing } from "@/lib/demo";
import type { Marketplace, GeneratedListing } from "@/types";

interface BulkResult {
  index: number;
  input: { name: string; category: string; features: string; marketplace: string };
  listing?: GeneratedListing;
  error?: string;
}

const VALID_MARKETPLACES = ["amazon", "etsy", "shopify", "ebay", "generic"];

function parseCSV(csv: string): string[][] {
  const lines = csv.trim().split("\n");
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim()); current = "";
      } else { current += char; }
    }
    result.push(current.trim());
    return result;
  });
}

export default function BulkPage() {
  const [csvText, setCsvText] = useState("");
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BulkResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsePreview = useCallback((text: string) => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) { setHeaders([]); setPreviewRows([]); return; }
    setHeaders(lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "")));
    const rows = lines.slice(1, 11).map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")));
    setPreviewRows(rows);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text); parsePreview(text); setResults(null); setError(null);
    };
    reader.readAsText(file);
  }, [parsePreview]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) { handleFileUpload(file); }
    else { setError("Please upload a CSV file."); }
  }, [handleFileUpload]);

  const handleProcess = async () => {
    if (!csvText) return;
    setProcessing(true); setError(null); setResults(null); setProgress(0);

    try {
      const rows = parseCSV(csvText);
      if (rows.length < 2) throw new Error("CSV must have a header row and at least one data row");

      const header = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "_"));
      const nameIdx = header.indexOf("product_name");
      const catIdx = header.indexOf("category");
      const featIdx = header.indexOf("features");
      const mktIdx = header.indexOf("marketplace");

      if (nameIdx === -1 || catIdx === -1 || featIdx === -1 || mktIdx === -1) {
        throw new Error("CSV must have columns: product_name, category, features, marketplace");
      }

      const dataRows = rows.slice(1).filter((row) => row.some((cell) => cell));
      const bulkResults: BulkResult[] = [];

      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        const marketplace = (row[mktIdx] || "generic").toLowerCase();

        setProgress(Math.round(((i + 1) / dataRows.length) * 100));

        if (!VALID_MARKETPLACES.includes(marketplace)) {
          bulkResults.push({ index: i, input: { name: row[nameIdx] || "", category: row[catIdx] || "", features: row[featIdx] || "", marketplace: "generic" }, error: `Invalid marketplace "${row[mktIdx]}". Skipped.` });
          continue;
        }

        const input = { name: (row[nameIdx] || "").trim(), category: (row[catIdx] || "").trim(), features: (row[featIdx] || "").trim(), marketplace: marketplace as Marketplace };

        if (!input.name || !input.category || !input.features) {
          bulkResults.push({ index: i, input: { ...input, marketplace }, error: "Missing required fields. Skipped." });
          continue;
        }

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        const listing = getDemoListing(input);
        bulkResults.push({ index: i, input: { ...input, marketplace }, listing });
      }

      setResults(bulkResults); setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong"); setProgress(0);
    } finally { setProcessing(false); }
  };

  const downloadCSV = () => {
    if (!results) return;
    const csvHeaders = ["product_name","marketplace","title","description","bullet_points","meta_title","meta_description","seo_keywords","image_alt_text","status","error"];
    const csvRows = results.map((r) => {
      const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
      if (r.listing) {
        return [escape(r.input.name),escape(r.input.marketplace),escape(r.listing.title),escape(r.listing.description),escape(r.listing.bulletPoints.join(" | ")),escape(r.listing.metaTitle),escape(r.listing.metaDescription),escape(r.listing.seoKeywords.join(", ")),escape(r.listing.imageAltText),"success",""].join(",");
      }
      return [escape(r.input.name),escape(r.input.marketplace),"","","","","","","","error",escape(r.error || "Unknown error")].join(",");
    });
    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "quicklist-ai-results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-6 py-10 pt-26">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Bulk Processing</h1>
          <p className="mt-2 text-slate-500">Upload a CSV file to generate optimized listings for multiple products at once.</p>
        </div>

        <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
          className={`mb-6 cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-white hover:border-indigo-300 hover:bg-slate-50"}`}>
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
          <p className="mt-4 text-sm font-medium text-slate-700">Drag & drop your CSV file here, or click to browse</p>
          <p className="mt-2 text-xs text-slate-400">Required columns: product_name, category, features, marketplace</p>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); }} />
        </div>

        {headers.length > 0 && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-sm font-semibold text-slate-900">Preview ({previewRows.length} of {csvText.trim().split("\n").length - 1} rows)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50">{headers.map((h, i) => (<th key={i} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>))}</tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {previewRows.map((row, i) => (<tr key={i} className="hover:bg-slate-50">{row.map((cell, j) => (<td key={j} className="max-w-[200px] truncate whitespace-nowrap px-4 py-3 text-slate-700">{cell}</td>))}</tr>))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {csvText && !processing && (
          <button onClick={handleProcess} className="mb-6 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all duration-200">Process All Products</button>
        )}

        {processing && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">Processing...</span>
              <span className="text-slate-500">{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {results && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Results ({results.filter((r) => r.listing).length}/{results.length} successful)</h2>
              <button onClick={downloadCSV} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Download CSV
              </button>
            </div>
            {results.map((result, i) => (
              <div key={i} className={`rounded-xl border p-4 ${result.listing ? "border-slate-200 bg-white" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-900">{result.input.name}</span>
                    <span className="ml-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{result.input.marketplace}</span>
                  </div>
                  {result.listing ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">Success</span>
                  ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Failed</span>
                  )}
                </div>
                {result.listing && <p className="mt-2 text-sm text-slate-600 line-clamp-2">{result.listing.title}</p>}
                {result.error && <p className="mt-2 text-sm text-red-600">{result.error}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
