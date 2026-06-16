import { mockLessons } from '@/data/mockLessons';
import { LessonEngine } from '@/components/LessonEngine';
import { CyberLessonEngine } from '@/components/CyberLessonEngine';
import Link from 'next/link';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonData = mockLessons[id];

  if (!lessonData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">404</h1>
        <p className="text-slate-500 mb-8">Bài học này chưa được mở khóa hoặc không tồn tại.</p>
        <Link 
          href="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-indigo-700"
        >
          Trở về Trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {lessonData.theme === 'CYBER' ? (
        <CyberLessonEngine lessonData={lessonData} />
      ) : (
        <LessonEngine lessonData={lessonData} />
      )}
    </div>
  );
}