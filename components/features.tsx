import { Zap, Shield, Globe, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed with edge computing and smart caching strategies.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with automatic SSL and DDoS protection.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy to 100+ edge locations worldwide for minimal latency.",
  },
  {
    icon: Layers,
    title: "Easy Integration",
    description:
      "Connect with your favorite tools and services in minutes.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[var(--secondary)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything you need
          </h2>
          <p className="mx-auto max-w-2xl text-[var(--muted-foreground)]">
            Powerful features to help you build and ship faster than ever.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <div className="mb-4 inline-flex rounded-[var(--radius)] bg-[var(--primary)]/10 p-3">
                <feature.icon className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
