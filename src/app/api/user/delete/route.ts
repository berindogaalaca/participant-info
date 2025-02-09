import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") ?? undefined;

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (deletedUser) {
      return ApiResponse.success("Kullanıcı başarıyla silindi");
    }

    return ApiResponse.error("Kullanıcı bulunamadı");
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error);
    return ApiResponse.error(
      "Kullanıcı silinirken bir hata oluştu",
      error instanceof Error ? error.message : String(error)
    );
  }
}
