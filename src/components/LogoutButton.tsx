"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 cursor-pointer rounded-lg transition-colors"
      style={{
        color: "var(--ink-faint)",
        border: "1px solid var(--grid-line)",
        background: "transparent",
      }}
    >
      <LogOut className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Đăng xuất</span>
    </button>
  );
}