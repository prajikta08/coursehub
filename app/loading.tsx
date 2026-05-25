export default function Loading() {
  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #4f9cf9, #a78bfa)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Loading dashboard...
        </p>
      </div>
    </div>
  );
}
