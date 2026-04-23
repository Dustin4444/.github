import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full bg-[var(--secondary)] px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
          Now in Public Beta
        </span>

        <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Build faster with modern tools
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-[var(--muted-foreground)] md:text-xl">
          Ship your next project in days, not weeks. Our platform provides
          everything you need to build, deploy, and scale your applications.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-6 py-3 font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-90"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-6 py-3 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)]"
          >
            View Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
