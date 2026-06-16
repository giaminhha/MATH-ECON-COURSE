import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { moneyDelta = 0, debtDelta = 0, healthDelta = 0, moodDelta = 0, energyDelta = 0 } = body;

    // Lấy user hiện tại
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Tính toán chỉ số mới, đảm bảo các chỉ số sinh tồn (health, mood, energy) nằm trong khoảng 0-100
    const newMoney = Math.max(0, user.money + moneyDelta);
    const newDebt = Math.max(0, user.debt + debtDelta);
    const newHealth = Math.max(0, Math.min(100, user.health + healthDelta));
    const newMood = Math.max(0, Math.min(100, user.mood + moodDelta));
    const newEnergy = Math.max(0, Math.min(100, user.energy + energyDelta));

    // Cập nhật Database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        money: newMoney,
        debt: newDebt,
        health: newHealth,
        mood: newMood,
        energy: newEnergy
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Lỗi cập nhật Base Model:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}