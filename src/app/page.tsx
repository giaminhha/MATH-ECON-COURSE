import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChevronRight, BookOpen, TrendingUp, Shield } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

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
      <div
        className="fixed top-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,156,18,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--money)" }}
          />
          Mùa 1: Sinh Tồn Dòng Tiền
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
          >
            T
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-5xl sm:text-7xl font-black tracking-tight mb-6"
          style={{
            background: "linear-gradient(135deg, var(--interest) 0%, var(--money) 50%, var(--time-var) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          TOÁN TỒN TẠI
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Sử dụng Toán học THPT để vượt qua các cám dỗ tài chính,
          xây dựng sự giàu có và <em style={{ color: "var(--interest)" }}>sinh tồn</em> trong cuộc đời.
        </p>

        {/* CTA Button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-lg font-extrabold transition-all hover:scale-105"
          style={{
            background: "var(--interest)",
            color: "var(--canvas-dark)",
            boxShadow: "0 8px 32px rgba(243,156,18,0.25)",
          }}
        >
          BẮT ĐẦU CHƠI
          <ChevronRight className="w-5 h-5" />
        </Link>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {[
            { icon: BookOpen, label: "Dãy Số & CSC" },
            { icon: TrendingUp, label: "Lãi Kép & Hàm Mũ" },
            { icon: Shield, label: "Quản Lý Tài Chính" },
          ].map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <feat.icon className="w-3.5 h-3.5" />
              {feat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div
        className="absolute bottom-6 text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Dành cho học sinh THPT — Toán 10, 11, 12
      </div>
    </div>
  );
}
