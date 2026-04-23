import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="text-xl font-bold text-[var(--primary)]">
          Brand
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="#"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Contact
          </Link>
        </nav>

        <p className="text-sm text-[var(--muted-foreground)]">
          {new Date().getFullYear()} Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
