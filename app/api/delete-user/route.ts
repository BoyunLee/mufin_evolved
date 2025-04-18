export const dynamic = "force-dynamic";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { DeleteUserUseCase } from "@/application/usecases/user/DeleteUserUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function DELETE() {
  try {
    // 1. 쿠키에서 JWT 토큰 가져오기
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.json(
        { message: "Invalid accessToken" },
        { status: 401 }
      );
    }

    const loginId = (decoded as { loginId: string }).loginId;

    // 3. 계정 삭제 Use Case 실행
    const userRepository = new UserRepository();
    const deleteAccountUseCase = new DeleteUserUseCase(userRepository);
    await deleteAccountUseCase.execute(loginId);

    // 4. 쿠키 삭제 (로그아웃 처리)
    const removeAccessToken = serialize("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });

    const removeRefreshToken = serialize("refreshToken", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    const headers = new Headers();
    headers.append("Set-Cookie", removeAccessToken);
    headers.append("Set-Cookie", removeRefreshToken);
    headers.set("Content-Type", "application/json");

    return new NextResponse(
      JSON.stringify({ message: "Account Deleted successfully" }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
