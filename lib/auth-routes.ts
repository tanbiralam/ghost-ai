export const signInPath = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in";
export const signUpPath = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up";
export const signedInFallbackPath =
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ?? "/editor";

export function localPathFromUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl).pathname;
  } catch {
    return pathOrUrl;
  }
}
