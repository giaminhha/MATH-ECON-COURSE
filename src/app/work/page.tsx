import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { PracticeEngine } from "@/components/PracticeEngine";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Đây là Data Giả (Mock data) cho các công việc Part-time
const jobList = {
  "gia-su": {
    id: "gia-su",
    title: "Gia Sư Toán (Lương Cao/Khó)",
    rewardPerCorrect: 100000, // Giải 1 bài được 100k
    energyCostPerCorrect: 15, // Cực mất sức (-15 energy)
    moodCostPerCorrect: 5,    // Tổn thương tinh thần xíu
    questions: [
      {
        question: "Biểu phí bảo hiểm Y tế cá nhân tự nguyện tháng này là 2,5% tổng thu nhập. Lương của bạn là 12.000.000đ. Phí bảo hiểm là bao nhiêu?",
        answers: ["300.000đ", "250.000đ", "350.000đ", "400.000đ"],
        correctIndex: 0
      },
      {
        question: "Vay ngân hàng 50.000.000đ, lãi suất 12%/năm (tính lãi đơn). Sau 6 tháng bạn phải trả tổng gốc + lãi là bao nhiêu?",
        answers: ["56.000.000đ", "53.000.000đ", "58.000.000đ", "51.500.000đ"],
        correctIndex: 1 // 50tr + (50tr * 12% / 12 * 6) = 53tr
      }
    ]
  },
  "phuc-vu": {
    id: "phuc-vu",
    title: "Phục vụ tính tiền (Lương Thấp/Dễ)",
    rewardPerCorrect: 20000, // 20k
    energyCostPerCorrect: 5, // Đỡ nghĩ nhiều
    moodCostPerCorrect: 2,   
    questions: [
      {
        question: "Khách gọi 3 ly cà phê giá 25.000đ/ly và 2 bánh mì giá 15.000đ/cái. Khách đưa tờ 200.000đ. Cần thối lại bao nhiêu?",
        answers: ["95.000đ", "105.000đ", "115.000đ", "85.000đ"],
        correctIndex: 0 // 200 - (75 + 30) = 95
      },
      {
        question: "Hóa đơn bàn 5 là 450.000đ. Khách tip 10%. Tổng số tiền khách trả là bao nhiêu?",
        answers: ["500.000đ", "495.000đ", "460.000đ", "510.000đ"],
        correctIndex: 1
      }
    ]
  }
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: { job?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: { energy: true, health: true }
  });

  const energy = user?.energy ?? 100;

  // Nếu User đã chọn JOB, render PracticeEngine (Giao diện Cày tiền)
  const selectedJobId = searchParams.job;
  if (selectedJobId && jobList[selectedJobId as keyof typeof jobList]) {
    const jobConfig = jobList[selectedJobId as keyof typeof jobList];
    return <PracticeEngine job={jobConfig} userEnergy={energy} />;
  }

  // Render Sảnh Chọn Việc Làm — Living Diagram Dark Theme (theorem-plate style)
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative"
      style={{
        background: "linear-gradient(135deg, var(--canvas-dark), var(--canvas-darker))",
      }}
    >
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,156,18,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(39,174,96,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="w-full max-w-4xl relative z-10">
        {/* Header section */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(243,156,18,0.2)", color: "var(--interest)" }}
            >
              <span className="text-2xl">💰</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black"
              style={{ color: "var(--interest)" }}
            >
              SÀN GIAO DỊCH VIỆC LÀM
            </h1>
          </div>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Hết tiền đi học/nộp tiền nhà? Bạn có thể tham gia giải toán thực tế
            để kiếm thêm thu nhập phụ cấp sinh hoạt. Chú ý giữ gìn sức khoẻ!
          </p>

          {/* Energy badge */}
          <div
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Trạng thái cơ thể:</span>
            <span
              className="font-extrabold"
              style={{
                color: energy < 30 ? "var(--debt)" : "var(--time-var)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {energy}/100 Năng lượng
            </span>
          </div>
        </div>

        {/* Job cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(jobList).map((job) => (
            <div
              key={job.id}
              className="relative overflow-hidden rounded-2xl p-7 sm:p-8 transition-all group bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--interest)]"
            >
              {/* Glow */}
              <div
                className="absolute -right-8 -top-8 w-28 h-28 rounded-full transition-all opacity-50 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle, rgba(243,156,18,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <h2
                className="text-xl font-bold mb-5 relative z-10"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {job.title}
              </h2>

              <div className="flex flex-col gap-3 mb-8 relative z-10">
                <div className="flex justify-between items-center">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Mức lương/Câu:</span>
                  <span
                    className="font-extrabold"
                    style={{ color: "var(--money)", fontFamily: "var(--font-mono)" }}
                  >
                    +{job.rewardPerCorrect.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Tiêu hao sức lực:</span>
                  <span
                    className="font-extrabold"
                    style={{ color: "var(--debt)", fontFamily: "var(--font-mono)" }}
                  >
                    -{job.energyCostPerCorrect} Năng lượng
                  </span>
                </div>
              </div>

              <a
                href={`/work?job=${job.id}`}
                className={`block w-full py-4 rounded-xl font-bold text-center relative z-10 transition-all text-base ${
                  energy < job.energyCostPerCorrect
                    ? "cursor-not-allowed pointer-events-none"
                    : ""
                }`}
                style={
                  energy < job.energyCostPerCorrect
                    ? {
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.3)",
                      }
                    : {
                        background: "var(--interest)",
                        color: "var(--canvas-dark)",
                        boxShadow: "0 4px 16px rgba(243,156,18,0.25)",
                      }
                }
              >
                {energy < job.energyCostPerCorrect ? "Quá kiệt sức!" : "Nhận Việc Ngay"}
              </a>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-semibold"
            style={{
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Trở về Bản Đồ Sinh Tồn
          </Link>
        </div>
      </div>
    </div>
  );
}