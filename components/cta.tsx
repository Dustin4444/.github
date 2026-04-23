import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[var(--primary)] px-8 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[var(--primary-foreground)] md:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-[var(--primary-foreground)]/80">
          Join thousands of developers who are already building amazing
          products with our platform.
        </p>
        <Link
          href="#"
          className="inline-flex rounded-[var(--radius)] bg-[var(--background)] px-6 py-3 font-medium text-[var(--foreground)] transition-opacity hover:opacity-90"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  );
}
