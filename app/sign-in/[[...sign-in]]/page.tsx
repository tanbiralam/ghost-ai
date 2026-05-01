import { SignIn } from "@clerk/nextjs";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import {
  localPathFromUrl,
  signedInFallbackPath,
  signInPath,
  signUpPath,
} from "@/lib/auth-routes";

export default function SignInPage() {
  return (
    <AuthPageShell>
      <SignIn
        fallbackRedirectUrl={signedInFallbackPath}
        path={localPathFromUrl(signInPath)}
        routing="path"
        signUpUrl={signUpPath}
      />
    </AuthPageShell>
  );
}
