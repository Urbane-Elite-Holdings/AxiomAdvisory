import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface Props {
  name: string;
  code: string;
  redirect?: string;
}

export default function LockedClientPage({ name, code, redirect }: Props) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleUnlock = () => {
    if (input.toLowerCase() === code.toLowerCase()) {
      setError(false);
      if (redirect) {
        sessionStorage.setItem(`portal_auth_${redirect}`, "1");
        navigate(redirect);
      } else {
        alert("Access granted. Client portal coming soon.");
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full space-y-10">
        <button
          onClick={() => navigate("/partners")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
        >
          <ArrowLeft size={14} /> Back to Partners
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
            <Lock className="text-[#D4AF37]" size={22} />
          </div>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {name}
          </h1>
          <p className="text-gray-500 text-sm tracking-wide">
            Confidential engagement portal
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="Enter access code"
              className={`w-full bg-white/5 border ${
                error ? "border-red-500/60" : "border-white/10"
              } text-white px-5 py-4 text-sm tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-red-400/80 text-xs tracking-wide">
              Access code not recognized.
            </p>
          )}
          <button
            onClick={handleUnlock}
            className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm tracking-widest hover:bg-[#c9a22f] transition-colors"
          >
            ACCESS PORTAL
          </button>
        </div>

        <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest">
          Axiom Advisory Partners LLC — Confidential © 2026 · Founded by Christopher DeMarkus
        </p>
      </div>
    </div>
  );
}
