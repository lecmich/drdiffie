/** Pfotenabdruck, der Praxisstempel von Dr. Diffie. */
export function Pfote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor">
      <ellipse cx="14" cy="29" rx="6" ry="8" />
      <ellipse cx="25" cy="16" rx="6" ry="8.5" />
      <ellipse cx="39" cy="16" rx="6" ry="8.5" />
      <ellipse cx="50" cy="29" rx="6" ry="8" />
      <path d="M32 27c-8 0-16 9-16 17 0 5 4 8 8 7 3-.6 5-2 8-2s5 1.4 8 2c4 1 8-2 8-7 0-8-8-17-16-17Z" />
    </svg>
  );
}
