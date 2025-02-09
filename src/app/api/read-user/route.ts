import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findFirst();

    if (user) {
      return Response.json({
        success: true,
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          mobile: user.mobile,
          gender: user.gender,
          city: user.city,
          address: user.address,
          country: user.country,
          postalCode: user.postalCode,
          newsletter_name: user.newsletter_name,
          newsletter_email: user.newsletter_email,
          newsletter_gender: user.newsletter_gender,
          isCheck: user.isCheck,
          message: "Kullanici başarıyla bulundu.",
        },
      });
    }

    return Response.json({
      success: false,
      data: {
        message: "Kullanici bulunamadı.",
      },
    });
  } catch (error) {
    console.error("Kullanici Bulunamadı:", error);
    return Response.json({
      success: false,
      data: {
        message: error instanceof Error ? error.message : "Bir hata oluştu",
      },
    });
  }
}
