import { SignUp } from "@clerk/nextjs";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import {
  localPathFromUrl,
  signedInFallbackPath,
  signInPath,
  signUpPath,
} from "@/lib/auth-routes";

export default function SignUpPage() {
  return (
    <AuthPageShell>
      <SignUp
        fallbackRedirectUrl={signedInFallbackPath}
        path={localPathFromUrl(signUpPath)}
        routing="path"
        signInUrl={signInPath}
      />
    </AuthPageShell>
  );
}
