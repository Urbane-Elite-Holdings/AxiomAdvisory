const proofPartners = [
  {
    name: "Walmart",
    descriptor: "Strategic partnership development",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5813.png",
  },
  {
    name: "Cornbread Soul",
    descriptor: "Brand and operational strategy",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5816.jpeg",
  },
  {
    name: "NPHC of Hudson County",
    descriptor: "Operations and communications advisory",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5815.jpeg",
  },
  {
    name: "R.O.R.I. Project",
    descriptor: "Governance and organizational infrastructure",
    logoImg: "https://pub-d271817665684c82ae385a9c153ff8fa.r2.dev/IMG_5814.jpeg",
  },
  {
    name: "K2K College Prep Services",
    descriptor: "Portal, brand, and digital infrastructure",
    logoImg: "",
  },
];

export function ProofStrip() {
  return (
    <section className="bg-[#0A0A0A] border-t border-white/6 border-b border-white/6 py-10 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-sm">
            <p
              className="text-[#D4AF37] uppercase tracking-[0.18em] mb-2"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.64rem" }}
            >
              Selected Engagements
            </p>
            <p className="text-white/62" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.92rem", lineHeight: 1.8 }}>
              Visible partner names and logos give the homepage a more concrete proof layer alongside confidential testimonial work.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 flex-1">
            {proofPartners.map((partner) => (
              <div key={partner.name} className="border border-white/10 bg-white/[0.03] px-4 py-4 min-h-[110px] flex flex-col justify-between">
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden bg-white/5">
                  {partner.logoImg ? (
                    <img src={partner.logoImg} alt={partner.name} className="w-full h-full object-contain" />
                  ) : (
                    <span
                      className="text-[#D4AF37] text-xs font-bold tracking-[0.18em]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      K2K
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", lineHeight: 1.2 }}>
                    {partner.name}
                  </p>
                  <p className="text-white/40 mt-1" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.73rem", lineHeight: 1.6 }}>
                    {partner.descriptor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
