import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/src/lib/prisma";

export async function syncClerkUserToDb() {
  const user = await currentUser();
  if (!user) return null;

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null;

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.username || null;

  return prisma.user.upsert({
    where: { clerkId: user.id },
    update: {
      email: primaryEmail,
      name,
      imageUrl: user.imageUrl ?? null,
    },
    create: {
      clerkId: user.id,
      email: primaryEmail,
      name,
      imageUrl: user.imageUrl ?? null,
    },
  });
}

