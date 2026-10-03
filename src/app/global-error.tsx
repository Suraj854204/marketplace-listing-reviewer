"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1.5rem" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#dc2626" }}>Error</h1>
          <h2 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 600, color: "#0f172a" }}>
            Something went wrong
          </h2>
          <p style={{ marginTop: "0.5rem", fontSize: "1rem", color: "#64748b" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{ marginTop: "2rem", padding: "0.75rem 1.5rem", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
