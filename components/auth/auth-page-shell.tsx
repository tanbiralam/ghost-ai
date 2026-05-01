import type { ReactNode } from "react";
import { FileText, Network, Sparkles } from "lucide-react";

interface AuthPageShellProps {
  children: ReactNode;
}

const features = [
  {
    description:
      "Describe your system, and AI maps it to nodes and edges on a live canvas.",
    icon: Sparkles,
    title: "AI Architecture Generation",
  },
  {
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
    icon: Network,
    title: "Real-time Collaboration",
  },
  {
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
    icon: FileText,
    title: "Instant Spec Generation",
  },
];

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="grid min-h-dvh bg-base font-sans text-copy-primary lg:grid-cols-2">
      <section className="hidden border-r border-surface-border bg-accent-dim px-10 py-9 lg:flex lg:flex-col lg:justify-between xl:px-14">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-brand text-sm font-semibold text-primary-foreground shadow-lg shadow-brand/10">
            G
          </div>
          <p className="text-base font-semibold text-copy-primary">Ghost AI</p>
        </div>

        <div className="max-w-[44rem] space-y-16">
          <div className="space-y-7">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-copy-primary xl:text-5xl">
              Design systems at the speed of thought.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-copy-secondary">
              Describe your architecture in plain English. Ghost AI maps it to a
              shared canvas your whole team can refine in real time.
            </p>
          </div>

          <div className="space-y-7">
            {features.map(({ description, icon: Icon, title }) => (
              <div className="flex gap-5" key={title}>
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-copy-primary">
                    {title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-6 text-copy-secondary">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-copy-muted">
          (c) 2026 Ghost AI. All rights reserved.
        </p>
      </section>

      <section className="flex min-h-dvh items-center justify-center bg-base px-5 py-8 sm:px-8">
        {children}
      </section>
    </main>
  );
}
