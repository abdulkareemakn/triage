/**
 * The Triage mark: three bars sorted by length. The sort is the product's
 * namesake, so the wordmark carries it. Drawn as a brand asset in currentColor
 * so it follows the primary token.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <rect
        x="3"
        y="13"
        width="6"
        height="8"
        rx="1.5"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        x="9"
        y="8"
        width="6"
        height="13"
        rx="1.5"
        fill="currentColor"
        opacity="0.7"
      />
      <rect x="15" y="3" width="6" height="18" rx="1.5" fill="currentColor" />
    </svg>
  );
}
