"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--canvas-dark) 0%, var(--canvas-darker) 50%, #0f1a24 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="fixed -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(52,152,219,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(39,174,96,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div 
          className="rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)"
          }}
        >
          {/* Decorative bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, var(--interest) 0%, var(--money) 100%)"
            }}
          />

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-transform hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                }}
              >
                T
              </div>
            </div>
            <h1 
              className="text-3xl font-black tracking-tight mb-2"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              TOÁN TỒN TẠI
            </h1>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              Đăng nhập để tiếp tục hành trình sinh tồn
            </p>
          </div>

          <form onSubmit={loginUser} className="space-y-5">
            {error && (
              <div 
                className="p-4 rounded-xl text-sm font-bold flex items-center gap-2"
                style={{ 
                  background: "rgba(231,76,60,0.1)", 
                  color: "var(--debt)",
                  border: "1px solid rgba(231,76,60,0.2)"
                }}
              >
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 transition-colors group-focus-within:text-[var(--interest)]" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 rounded-xl transition-all outline-none"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "var(--interest)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 transition-colors group-focus-within:text-[var(--interest)]" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 rounded-xl transition-all outline-none"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "var(--interest)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-extrabold rounded-xl transition-all disabled:opacity-50 mt-6 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "var(--interest)",
                color: "var(--canvas-dark)",
                boxShadow: "0 4px 20px rgba(243,156,18,0.25)",
              }}
            >
              {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              {!loading && <ChevronRight className="w-5 h-5" />}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              Chưa có tài khoản?{" "}
              <Link href="/register" className="font-bold hover:underline transition-colors" style={{ color: "var(--interest)" }}>
                Tạo nhân vật ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
