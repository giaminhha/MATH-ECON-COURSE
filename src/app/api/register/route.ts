import { NextResponse } from "next-auth/next"
// Need standard NextResponse
import { NextResponse as Response } from "next/server"
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json({ message: "Thiếu thông tin đăng ký" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: { email }
    });

    if (exist) {
      return Response.json({ message: "Email này đã được sử dụng" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return Response.json({ message: "Đăng ký thành công" }, { status: 201 });
  } catch (error) {
    console.error("LOI_DANG_KY:", error);
    return Response.json({ message: "Đã có lỗi xảy ra. Hãy thử lại." }, { status: 500 });
  }
}
