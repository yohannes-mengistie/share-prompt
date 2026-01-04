"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PromptCard from "../../components/PromptCard";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/ThemeToggle";

type Post = {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image?: string;
  };
  [key: string]: any;
};

const SavedPrompts = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchSavedPrompts = async () => {
      try {
        const response = await fetch("/api/prompt/saved");
        if (response.ok) {
          const data = await response.json();
          setSavedPosts(data);
        }
      } catch (error) {
        console.error("Error fetching saved prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchSavedPrompts();
    }
  }, [session, router]);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const filteredPosts = savedPosts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg mb-4">
            Saved Prompts
          </h1>
          <p className="text-lg text-muted">
            Your collection of saved prompts for quick access
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search saved prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition"
            />
            <svg
              className="absolute right-3 top-3.5 h-5 w-5 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Prompts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 animate-pulse h-48"
              />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                layout
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <PromptCard
                  key={post._id}
                  post={post}
                  handleTagClick={handleTagClick}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 rounded-full bg-muted p-5">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-fg">No saved prompts yet</h3>
            <p className="mt-2 text-muted max-w-sm">
              Start saving prompts you like to build your personal collection.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition"
            >
              Explore Prompts
            </button>
          </div>
        )}

      </motion.section>
    </>
  );
};

export default SavedPrompts;