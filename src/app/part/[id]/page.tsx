import { mockLessons } from '@/data/mockLessons';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, CheckCircle2 } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function PartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessons = Object.values(mockLessons);

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { completedLessons: true }
  });

  const completedLessonIds = new Set(user?.completedLessons.map(c => c.lessonId) || []);
  const progressPercent = Math.round((completedLessonIds.size / lessons.length) * 100);

  return (
    <div
      className="min-h-screen flex flex-col"
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

      {/* Header bar */}
      <header
        className="relative z-10 flex items-center gap-4 px-4 sm:px-8 py-4"
        style={{
          background: "var(--canvas-dark)",
          boxShadow: "0 2px 12px rgba(44,52,65,0.12)",
        }}
      >
        <Link
          href="/dashboard"
          className="p-2 rounded-xl transition-colors"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div
          className="font-bold text-lg"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          Lộ trình bài học {id === 'part-1' ? '— Hàm số & Đồ thị' : ''}
        </div>
      </header>

      <main className="relative z-10 p-4 sm:p-8 max-w-4xl mx-auto w-full flex-grow">
        {/* Chapter hero card */}
        <div className="diagram-card p-7 sm:p-8 mb-8">
          <div className="pl-4">
            <h1
              className="text-2xl sm:text-3xl font-extrabold mb-2"
              style={{ color: "var(--ink-primary)" }}
            >
              Chương 1: Khởi động sinh tồn
            </h1>
            <p
              className="text-base font-medium mb-5"
              style={{ color: "var(--ink-secondary)" }}
            >
              Học cách phân tích và kiểm soát dòng tiền cơ bản từ Toán học lớp 10.
            </p>
            {/* Chapter timeline */}
            <div className="flex items-center gap-3">
              <span className="hand-label text-xs">Tiến độ chương:</span>
              <div className="flex-1 timeline-bar">
                <div className="timeline-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}
              >
                {completedLessonIds.size}/{lessons.length}
              </span>
            </div>
          </div>
        </div>

        {/* Lesson list */}
        <div className="space-y-3">
          {lessons.map((lesson: any) => {
            const lessonId = lesson.id;
            const isCompleted = completedLessonIds.has(lessonId);

            return (
              <Link
                href={`/lesson/${lessonId}`}
                key={lesson.id}
                className="block group"
              >
                <div
                  className={`relative rounded-2xl overflow-hidden p-5 sm:p-6 flex items-center gap-5 transition-all bg-[var(--canvas-card)] shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-float)] border ${
                    isCompleted ? "border-[var(--money)]" : "border-[var(--grid-line)] group-hover:border-[var(--time-var)]"
                  } group-hover:translate-x-1`}
                >
                  {/* Accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background: isCompleted ? "var(--money)" : "linear-gradient(to bottom, var(--time-var), var(--money))",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all"
                    style={{
                      background: isCompleted ? "var(--money-light)" : "var(--time-light)",
                      color: isCompleted ? "var(--money)" : "var(--time-var)",
                    }}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                        style={{
                          background: "var(--canvas)",
                          color: "var(--ink-label)",
                          border: "1px solid var(--grid-line)",
                        }}
                      >
                        {lessonId}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--money-light)",
                          color: "var(--money)",
                        }}
                      >
                        +100 XP
                      </span>
                    </div>
                    <h3
                      className="text-base sm:text-lg font-bold truncate transition-colors"
                      style={{ color: "var(--ink-primary)" }}
                    >
                      {lesson.title}
                    </h3>
                    <p
                      className="text-sm mt-1 truncate"
                      style={{ color: "var(--ink-secondary)" }}
                    >
                      {lesson.description}
                    </p>
                  </div>

                  {/* Arrow hint */}
                  <div
                    className="text-sm font-bold hidden sm:block shrink-0 transition-colors"
                    style={{ color: isCompleted ? "var(--money)" : "var(--time-var)" }}
                  >
                    {isCompleted ? "Xem lại →" : "Bắt đầu →"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}