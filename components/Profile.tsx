import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileImageUpload from "./ProfileImageUpload";

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
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState(session?.user?.image);
  const [isDark, setIsDark] = useState(false);

  // Sync with theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Check initial theme
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-xl shadow-sm p-8 mb-16 transition-colors duration-300">
        {/* Gradient Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500" />

        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
            <ProfileImageUpload
              currentImage={userImage || session?.user?.image}
              onImageUpdate={(url) => {
                setUserImage(url);
              }}
              size="lg"
            />
            <button
              onClick={() => {
                const modal = document.querySelector('[data-image-modal]');
                if (modal) {
                  (modal as HTMLElement).click();
                }
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold shadow hover:opacity-90 transition flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Change Photo
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg transition-colors duration-300">
                {session?.user?.name || name}
              </h1>
            </div>
            {session?.user?.username && (
              <p className="text-lg text-muted mb-2 transition-colors duration-300">
                @{session.user.username}
              </p>
            )}
            {session?.user?.email && (
              <p className="text-sm text-muted mb-3 transition-colors duration-300">
                {session.user.email}
              </p>
            )}
            <p className="mt-3 max-w-2xl text-muted text-lg transition-colors duration-300">
              {desc}
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <button
                onClick={() => router.push("/create-prompt")}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 font-semibold text-white shadow hover:opacity-90 transition"
              >
                + New Prompt
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Stat label="Prompts" value={data.length} />
        </div>
      </div>

      {/* Search */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-fg transition-colors duration-300">
          My Prompts
        </h2>

        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search prompts or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-10 text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
          />
          <svg
            className="absolute right-3 top-3.5 h-5 w-5 text-muted transition-colors duration-300"
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
          <div className="mb-6 rounded-full bg-muted p-5 transition-colors duration-300">
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-xl font-semibold text-fg transition-colors duration-300">
            No prompts yet
          </h3>
          <p className="mt-2 text-muted max-w-sm transition-colors duration-300">
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
  <div className="rounded-2xl border border-border bg-card p-4 text-center hover:shadow-md transition-all duration-300">
    <p className="text-2xl font-bold text-fg transition-colors duration-300">
      {value}
    </p>
    <p className="mt-1 text-sm text-muted transition-colors duration-300">
      {label}
    </p>
  </div>
);