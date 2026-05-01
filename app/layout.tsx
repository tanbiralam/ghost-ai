import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "A collaborative AI system design workspace.",
};

const clerkAppearance = {
  theme: dark,
  elements: {
    cardBox:
      "border border-surface-border bg-surface shadow-2xl shadow-background/70 font-sans",
    footer: "bg-elevated border-t border-surface-border font-sans",
    formButtonPrimary:
      "bg-brand text-primary-foreground hover:bg-brand/90 font-semibold",
    formFieldInput:
      "bg-subtle border-surface-border-subtle text-copy-primary font-sans",
    formFieldLabel: "text-copy-primary font-medium font-sans",
    headerSubtitle: "text-copy-muted font-sans",
    headerTitle: "text-copy-primary font-semibold font-sans",
    identityPreviewText: "text-copy-primary font-sans",
    socialButtonsBlockButton:
      "border-surface-border bg-surface text-copy-secondary hover:bg-subtle font-sans",
  },
  variables: {
    borderRadius: "var(--radius)",
    colorBackground: "var(--bg-surface)",
    colorBorder: "var(--border-default)",
    colorDanger: "var(--state-error)",
    colorForeground: "var(--text-primary)",
    colorInput: "var(--bg-subtle)",
    colorInputForeground: "var(--text-primary)",
    colorMuted: "var(--bg-subtle)",
    colorMutedForeground: "var(--text-secondary)",
    colorPrimary: "var(--accent-primary)",
    colorPrimaryForeground: "var(--text-primary)",
    colorRing: "var(--accent-primary)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    fontFamily: "var(--font-geist-sans)",
    fontFamilyButtons: "var(--font-geist-sans)",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
