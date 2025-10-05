export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>

      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0">
        <div className="liquid-blob liquid-blob-1"></div>
        <div className="liquid-blob liquid-blob-2"></div>
        <div className="liquid-blob liquid-blob-3"></div>
        <div className="liquid-blob liquid-blob-4"></div>
        <div className="liquid-blob liquid-blob-5"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60"></div>
    </div>
  );
}
