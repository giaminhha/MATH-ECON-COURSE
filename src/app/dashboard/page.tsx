import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { parts } from "@/lib/data";
import { prisma } from "@/lib/db";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  
  // Lấy dữ liệu model nhân vật từ database
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: {
      money: true,
      debt: true,
      health: true,
      mood: true,
      energy: true,
      exp: true,
      completedLessons: true,
    }
  });

  // Default fallback (phòng hờ database chưa kip cập nhật)
  const stats = user ? { ...user, exp: user.exp || 0 } : { money: 500000, debt: 0, health: 100, mood: 100, energy: 100, exp: 0 };

  const completedLessonIds = new Set(user?.completedLessons?.map(c => c.lessonId) || []);

  const partsWithProgress = parts.map(p => ({
    ...p,
    // Hiện tại do mockLessons chưa chia rõ partId, ta tạm map số lượng bài học hoàn thành vào part-1
    completedCount: p.id === "part-1" ? completedLessonIds.size : 0
  }));

  return (
    <DashboardClient
      userName={session.user?.name || "Học sinh"}
      stats={stats}
      parts={partsWithProgress}
    />
  );
}
