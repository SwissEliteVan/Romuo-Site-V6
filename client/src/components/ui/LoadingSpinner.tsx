export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#2d3748] opacity-25"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#d4af37] border-t-transparent"></div>
      </div>
      <span className="sr-only">Chargement...</span>
    </div>
  );
}
