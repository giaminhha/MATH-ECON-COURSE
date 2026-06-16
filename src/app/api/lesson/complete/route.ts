import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, expReward } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ message: 'Missing lessonId' }, { status: 400 });
    }

    const reward = expReward || 100;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Kiểm tra xem lesson này đã được hoàn thành chưa
    const existing = await prisma.completedLesson.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
    });

    // Q1 Decision: Chỉ cộng EXP đúng 1 lần cho mỗi bài học
    if (existing) {
      return NextResponse.json({ 
        message: 'Lesson already completed. No EXP awarded.',
        alreadyCompleted: true,
      });
    }

    // Nếu chưa, tạo CompletedLesson và cộng EXP
    await prisma.$transaction([
      prisma.completedLesson.create({
        data: {
          userId: user.id,
          lessonId: lessonId,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          exp: { increment: reward },
        },
      }),
    ]);

    return NextResponse.json({ 
      message: 'Lesson completed successfully', 
      expGained: reward 
    });

  } catch (error) {
    console.error('Error completing lesson:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
