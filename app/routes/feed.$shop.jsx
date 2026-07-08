import prisma from "../db.server";

export async function loader({ params }) {
  const session = await prisma.session.findFirst({
    where: {
      shop: params.shop,
      isOnline: false,
    },
  });

  if (!session) {
    return new Response("Shop not found", {
      status: 404,
    });
  }

  return Response.json({
    shop: session.shop,
    isOnline: session.isOnline,
  });
}