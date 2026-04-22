export function BlueprintGrid({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid)" />
        <line x1="8%" y1="18%" x2="38%" y2="18%" stroke="white" strokeWidth="1" />
        <line x1="8%" y1="18%" x2="8%" y2="42%" stroke="white" strokeWidth="1" />
        <line x1="62%" y1="78%" x2="92%" y2="78%" stroke="white" strokeWidth="1" />
        <line x1="92%" y1="58%" x2="92%" y2="78%" stroke="white" strokeWidth="1" />
        <circle cx="8%" cy="18%" r="3" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="38%" cy="18%" r="3" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="92%" cy="78%" r="3" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="62%" cy="78%" r="3" fill="none" stroke="white" strokeWidth="1" />
        <line x1="14%" y1="68%" x2="34%" y2="68%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="66%" y1="28%" x2="86%" y2="28%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        <rect x="18%" y="38%" width="16%" height="12%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 3" />
        <rect x="66%" y="52%" width="13%" height="9%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 3" />
      </svg>
    </div>
  );
}
