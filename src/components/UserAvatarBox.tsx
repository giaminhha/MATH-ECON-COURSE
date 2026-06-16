"use client";

import { useState } from "react";
import { Wallet, Heart, Smile, BatteryCharging, CreditCard, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserStats {
  money: number;
  debt: number;
  health: number;
  mood: number;
  energy: number;
  exp: number;
}

export default function UserAvatarBox({ stats }: { stats: UserStats }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer"
        style={{
          background: "var(--canvas-card)",
          border: "var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg border-2"
          style={{
            background: "var(--formula-light)",
            borderColor: "var(--ink-faint)",
          }}
        >
          {stats.mood > 50 ? (stats.health < 40 ? "🤒" : "😎") : "😫"}
        </div>
        <div className="text-left leading-tight hidden sm:block">
          <div
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--ink-faint)" }}
          >
            Tài sản
          </div>
          <div
            className="text-sm font-extrabold whitespace-nowrap"
            style={{ color: "var(--money)", fontFamily: "var(--font-mono)" }}
          >
            {stats.money.toLocaleString("vi-VN")}đ
          </div>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(44,52,65,0.5)", backdropFilter: "blur(8px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-sm relative overflow-hidden rounded-2xl"
              style={{
                background: "var(--canvas-card)",
                border: "var(--border)",
                boxShadow: "var(--shadow-float)",
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg z-10 cursor-pointer transition-colors"
                style={{
                  color: "var(--ink-faint)",
                  border: "1px solid var(--grid-line)",
                  background: "var(--canvas-card)",
                }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Avatar section */}
              <div
                className="relative pt-10 pb-6 flex flex-col items-center"
                style={{
                  background: "var(--canvas)",
                  backgroundImage: `
                    linear-gradient(var(--grid-line) 1px, transparent 1px),
                    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              >
                <div
                  className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl mb-4"
                  style={{
                    background: "var(--canvas-card)",
                    border: "2px solid var(--grid-line)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {stats.mood > 50 ? (stats.health < 40 ? "🤒" : "😎") : "😫"}
                </div>
                <h2
                  className="text-xl font-extrabold"
                  style={{ color: "var(--ink-primary)" }}
                >
                  Trạng Thái Nhân Vật
                </h2>
                <p
                  className="hand-label text-sm mt-1"
                >
                  Sống sót là một nghệ thuật quản trị
                </p>
                <div
                  className="mt-3 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{ background: "var(--interest)", color: "var(--canvas-dark)" }}
                >
                  <span>⭐ EXP:</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{stats.exp}</span>
                </div>
              </div>

              {/* Stats section */}
              <div className="p-6 pt-4 space-y-4">
                {/* Money & Debt boxes */}
                <div className="grid grid-cols-2 gap-3 mb-1">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--money-light)",
                      border: "1px solid var(--money)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1" style={{ color: "var(--money)" }}>
                      <Wallet className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Tiền mặt</span>
                    </div>
                    <div
                      className="text-base font-extrabold"
                      style={{ color: "var(--money)", fontFamily: "var(--font-mono)" }}
                    >
                      {stats.money.toLocaleString("vi-VN")}
                    </div>
                  </div>

                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: stats.debt > 0 ? "var(--debt-light)" : "transparent",
                      border: `1px solid ${stats.debt > 0 ? "var(--debt)" : "var(--grid-line)"}`,
                    }}
                  >
                    <div
                      className="flex items-center gap-1.5 mb-1"
                      style={{ color: stats.debt > 0 ? "var(--debt)" : "var(--ink-faint)" }}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Tiền Nợ</span>
                    </div>
                    <div
                      className="text-base font-extrabold"
                      style={{
                        color: stats.debt > 0 ? "var(--debt)" : "var(--ink-faint)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {stats.debt.toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>

                {/* Survival stat bars */}
                <div
                  className="space-y-4 p-4 rounded-xl"
                  style={{ background: "var(--canvas)", border: "var(--border)" }}
                >
                  <StatBar
                    icon={<Heart className="w-3.5 h-3.5" />}
                    label="Sức khỏe"
                    value={stats.health}
                    color="var(--debt)"
                    lightColor="var(--debt-light)"
                  />
                  <StatBar
                    icon={<Smile className="w-3.5 h-3.5" />}
                    label="Tinh thần"
                    value={stats.mood}
                    color="var(--interest)"
                    lightColor="var(--interest-light)"
                  />
                  <StatBar
                    icon={<BatteryCharging className="w-3.5 h-3.5" />}
                    label="Năng lượng"
                    value={stats.energy}
                    color="var(--time-var)"
                    lightColor="var(--time-light)"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Stat bar sub-component ── */
function StatBar({
  icon,
  label,
  value,
  color,
  lightColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  lightColor: string;
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color }}>
          {icon}
          {label}
        </div>
        <div
          className="text-xs font-extrabold"
          style={{ color: "var(--ink-primary)", fontFamily: "var(--font-mono)" }}
        >
          {safeValue}/100
        </div>
      </div>
      <div
        className="w-full h-[5px] rounded-full overflow-hidden"
        style={{ background: "var(--grid-line)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}