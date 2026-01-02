import { useState } from "react";
import PromptCard from "./PromptCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProfileComponentProps {
  name: string;
  desc: string;
  data: any[];
  handleEdit: (post: any) => void;
  handleDelate: (post: any) => Promise<void>;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredPosts = data.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
    >
      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl shadow-sm p-8 mb-16">
        
        {/* Gradient Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* User Info */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg">
              {name}
            </h1>
            <p className="mt-3 max-w-2xl text-muted text-lg">
              {desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/create-prompt")}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 font-semibold text-white shadow hover:opacity-90 transition"
            >
              + New Prompt
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Stat label="Prompts" value={data.length} />
          {/* <Stat label="Views" value="12.4K" />
          <Stat label="Likes" value="1.2K" />
          <Stat label="Saved" value="340" /> */}
        </div>
      </div>

      {/* Search */}
      <div className="mb-10 flex justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-fg">
          My Prompts
        </h2>

        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search prompts or tags..."
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

      {/* Prompt Grid */}
      {filteredPosts.length > 0 ? (
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
                post={post}
                handleEdit={() => handleEdit(post)}
                handleDelate={() => handleDelate(post)}
                handleTagClick={(tag) => setSearchQuery(tag)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 rounded-full bg-muted p-5">
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-xl font-semibold text-fg">
            No prompts yet
          </h3>
          <p className="mt-2 text-muted max-w-sm">
            Start creating prompts to build your personal prompt library.
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default ProfileComponent;

/* Small Stat Component */
const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-border bg-card p-4 text-center">
    <p className="text-2xl font-bold text-fg">{value}</p>
    <p className="mt-1 text-sm text-muted">{label}</p>
  </div>
);
