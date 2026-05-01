import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { signInPath } from "@/lib/auth-routes";

export default async function Home() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/editor");
  }

  redirect(signInPath);
}
