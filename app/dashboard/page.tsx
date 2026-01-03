"use client";

import Feed from "../../components/Feed";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stat = { label: string; value: number; hint: string };

const Dashboard = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/dashboard/stats");
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();

        setStats([
          {
            label: "Your Prompts",
            value: data.totalPrompts || 0,
            hint: "Created by you",
          },
          {
            label: "Shared",
            value: data.sharedPrompts || 0,
            hint: "Public prompts",
          },
          { 
            label: "Saved", 
            value: data.savedPrompts || 0, 
            hint: "Bookmarked" 
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats([
          { label: "Your Prompts", value: 0, hint: "Created by you" },
          { label: "Shared", value: 0, hint: "Public prompts" },
          { label: "Saved", value: 0, hint: "Bookmarked" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchStats();
    }
  }, [session?.user?.id]);

  return (
    <section className="min-h-screen w-full px-6 py-14 bg-bg">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg">
            Welcome back
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
              {session?.user?.name || "Creator"} 👋
            </span>
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto">
            Manage your prompts, discover ideas, and build better AI outputs.
          </p>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link
              href="/create-prompt"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Create Prompt
            </Link>

            <Link
              href="/profile"
              className="px-6 py-3 rounded-xl border border-border text-fg hover:bg-card transition"
            >
              My Profile
            </Link>

            <Link
              href="/"
              className="px-6 py-3 rounded-xl border border-border text-fg hover:bg-card transition"
            >
              Explore
            </Link>
          </div>
        </motion.header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {loading || !stats
            ? // Loading skeleton
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-6 animate-pulse h-28"
                />
              ))
            : stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-fg">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{stat.hint}</p>
                </motion.div>
              ))}
        </section>

        {/* Feed */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-fg">Recent Prompts</h2>
            <Link href="/" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          <Feed />
        </section>
      </div>
    </section>
  );
};

export default Dashboard;