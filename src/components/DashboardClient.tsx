"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ChevronRight, MapPin, Pickaxe, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import UserAvatarBox from "@/components/UserAvatarBox";

interface PartData {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  unlocked: boolean;
  completedCount?: number;
}

interface UserStats {
  money: number;
  debt: number;
  health: number;
  mood: number;
  energy: number;
  exp: number;
}

interface DashboardClientProps {
  userName: string;
  stats: UserStats;
  parts: PartData[];
}

/* ── Animation presets ── */
const fadeUp: any = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function DashboardClient({ userName, stats, parts }: DashboardClientProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--canvas)" }}
    >
      {/* Grid paper overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: 0.35,
        }}
      />

      {/* ── TOP NAV BAR ── */}
      <header className="relative z-50 px-4 sm:px-8 pt-5">
        <div
          className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3 rounded-xl"
          style={{
            background: "var(--canvas-card)",
            border: "var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black"
              style={{ background: "var(--canvas-dark)", color: "white" }}
            >
              T
            </div>
            <span
              className="text-base font-extrabold tracking-tight hidden sm:block"
              style={{ color: "var(--ink-primary)" }}
            >
              TOÁN TỒN TẠI
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <UserAvatarBox stats={stats} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                color: "var(--ink-faint)",
                border: "1px solid var(--grid-line)",
              }}
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 px-4 sm:px-8 pb-12 pt-8 max-w-5xl mx-auto">

        {/* ── HERO CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="diagram-card p-7 sm:p-8 mb-10"
        >
          <div className="pl-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--time-light)", color: "var(--time-var)" }}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <h1
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "var(--ink-primary)" }}
              >
                Bản Đồ Cốt Truyện
              </h1>
            </div>
            <p
              className="text-base font-medium mb-5"
              style={{ color: "var(--ink-secondary)" }}
            >
              Xin chào, <strong style={{ color: "var(--ink-primary)" }}>{userName}</strong>!
              Hành trình toán-tài chính của bạn đang chờ phía trước.
            </p>
            {/* Overall progress */}
            <div className="flex items-center gap-3">
              <span
                className="hand-label text-sm"
              >
                Tiến độ tổng:
              </span>
              <div className="flex-1 timeline-bar">
                <motion.div
                  className="timeline-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((parts.reduce((a, p) => a + (p.completedCount || 0), 0) / parts.reduce((a, p) => a + p.lessonsCount, 0)) * 100)}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}
              >
                {parts.reduce((a, p) => a + (p.completedCount || 0), 0)}/{parts.reduce((a, p) => a + p.lessonsCount, 0)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── PARTS GRID ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {parts.map((p, i) => (
            <motion.div
              key={p.id}
              custom={i}
              variants={fadeUp}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                p.unlocked ? "" : "opacity-50"
              }`}
              style={{
                background: "var(--canvas-card)",
                border: p.unlocked
                  ? "var(--border)"
                  : "1px solid var(--grid-line)",
                boxShadow: p.unlocked ? "var(--shadow-card)" : "none",
              }}
            >
              {/* Accent bar left */}
              {p.unlocked && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                  style={{
                    background: "linear-gradient(to bottom, var(--time-var), var(--money))",
                  }}
                />
              )}

              <div className="p-6 pl-7">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h2
                    className="text-lg font-bold leading-snug"
                    style={{ color: p.unlocked ? "var(--ink-primary)" : "var(--ink-faint)" }}
                  >
                    {p.title}
                  </h2>
                  {!p.unlocked && (
                    <Lock className="w-4 h-4 shrink-0 mt-1" style={{ color: "var(--ink-faint)" }} />
                  )}
                </div>

                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  {p.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="hand-label text-xs">Tiến độ</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}
                    >
                      {p.completedCount || 0}/{p.lessonsCount}
                    </span>
                  </div>
                  <div className="timeline-bar">
                    <div className="timeline-bar-fill" style={{ width: `${Math.round(((p.completedCount || 0) / p.lessonsCount) * 100)}%` }} />
                  </div>
                </div>

                {/* Action button */}
                {p.unlocked ? (
                  <Link href={`/part/${p.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white cursor-pointer"
                      style={{
                        background: "var(--canvas-dark)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      Vào Học
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                ) : (
                  <div
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm cursor-not-allowed"
                    style={{
                      background: "var(--grid-line)",
                      color: "var(--ink-faint)",
                    }}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Đã Khóa
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── KHU CHỢ VIỆC LÀM (theorem-plate style) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="theorem-plate p-8 sm:p-10"
        >
          <div className="grid-overlay" />

          {/* Glowing orbs */}
          <div
            className="absolute -top-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(243,156,18,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(39,174,96,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(243,156,18,0.2)", color: "var(--interest)" }}
                >
                  <Pickaxe className="w-5 h-5" />
                </div>
                <h2
                  className="text-2xl font-extrabold"
                  style={{ color: "var(--interest)" }}
                >
                  Khu Chợ Việc Làm
                </h2>
                <span className="text-xl">💰</span>
              </div>
              <p
                className="text-base font-medium max-w-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Nhân vật cạn kiệt tài chính? Giải toán nhanh để kiếm lương trang trải
                cuộc sống và trả nợ!
              </p>
            </div>

            <Link href="/work">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-lg cursor-pointer whitespace-nowrap"
                style={{
                  background: "var(--interest)",
                  color: "var(--canvas-dark)",
                  boxShadow: "0 4px 16px rgba(243,156,18,0.25)",
                }}
              >
                Đi Cày Tiền Ngay
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
