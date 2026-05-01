import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { localPathFromUrl, signInPath, signUpPath } from "@/lib/auth-routes";

const signInRoute = localPathFromUrl(signInPath);
const signUpRoute = localPathFromUrl(signUpPath);

const isPublicRoute = createRouteMatcher([
  `${signInRoute}(.*)`,
  `${signUpRoute}(.*)`,
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\..*).*)", "/(api|trpc)(.*)"],
};
