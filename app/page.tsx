"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Feed from "../components/Feed";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  {
    title: "Discover Prompts",
    description:
      "Explore high-quality AI prompts created by the community to boost productivity and creativity.",
    icon: "🔍",
  },
  {
    title: "Create & Share",
    description:
      "Craft your own prompts and share them publicly so others can learn and build on your ideas.",
    icon: "✨",
  },
  {
    title: "AI Powered",
    description:
      "Optimized for modern AI tools like ChatGPT for better, faster results.",
    icon: "🤖",
  },
];

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if user is logged in
    if (status === "authenticated" && session?.user) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render home page if user is authenticated (will redirect)
  if (status === "authenticated") {
    return null;
  }

  return (
    <section className="relative overflow-hidden w-full flex flex-col items-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-yellow-400/30 blur-3xl" />

      {/* Hero */}
      <div className="relative mt-24 text-center px-6 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Discover & Share
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            AI-Powered Prompts
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-muted">
          PromptVerse is an open-source platform to discover, create, and share
          powerful AI prompts.
        </p>

        {/* Hero CTA */}
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/login" className="rounded-xl bg-primary px-7 py-3 text-white font-semibold shadow-md hover:scale-105 transition">
            Get Started
          </Link>
          <Link href="/" className="rounded-xl border border-border px-7 py-3 font-semibold hover:bg-muted transition">
            Explore Prompts
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative mt-24 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="
              group rounded-2xl border border-white/20
              bg-white/70 dark:bg-black/40
              backdrop-blur-xl
              p-6
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-2 hover:shadow-xl
              transition-all duration-300
            "
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-2xl text-white shadow">
              {feature.icon}
            </div>

            <h3 className="text-lg font-semibold text-fg">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm text-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative mt-32 w-full">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 px-6 py-20 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-extrabold">
            Ready to build better prompts?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join PromptVerse and start creating today.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/login" className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link href="/" className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white hover:text-gray-900 transition">
              Explore Prompts
            </Link>
          </div>
        </div>
      </div>

      {/* Show Feed for non-authenticated users */}
      <div className="w-full max-w-6xl mt-20 px-6">
        <Feed />
      </div>
    </section>
  );
};

export default Home;