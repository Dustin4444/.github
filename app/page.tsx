import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <h1>Welcome to GitBook Documentation</h1>
        <p>Welcome to the GitBook Starter Template! Here you&apos;ll get an overview of all the amazing features GitBook offers to help you build beautiful, interactive documentation.</p>
      </div>

      <div className="cards">
        <div className="card">
          <h2>Getting Started</h2>
          <p>Create your first site</p>
          <Link href="/getting-started/quickstart">Quickstart →</Link>
        </div>

        <div className="card">
          <h2>Basics</h2>
          <p>Learn the basics of GitBook</p>
          <Link href="/basics/editor">Editor →</Link>
        </div>

        <div className="card">
          <h2>Publish your docs</h2>
          <p>Share your docs online</p>
          <Link href="/getting-started/publish-your-docs">Publish →</Link>
        </div>
      </div>

      <footer>
        <p>Powered by Next.js with Vercel Analytics</p>
      </footer>
    </main>
  );
}
