import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-[var(--primary)]">
          Brand
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hidden rounded-[var(--radius)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] transition-opacity hover:opacity-90 md:inline-flex"
          >
            Get Started
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-[var(--radius)] p-2 text-[var(--foreground)] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
