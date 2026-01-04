"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type PromptCardProps = {
  post: {
    _id: string;
    [key: string]: any;
  };
  handleTagClick: (tag: string) => void;
  handleEdit?: () => void;
  handleDelate?: () => void;
};

const PromptCard: React.FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelate,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Character limit for truncation
  const MAX_LENGTH = 150;
  const shouldTruncate = post.prompt.length > MAX_LENGTH;
  const displayText = isExpanded || !shouldTruncate 
    ? post.prompt 
    : post.prompt.substring(0, MAX_LENGTH) + "...";

  // Check if prompt is bookmarked on mount
  useEffect(() => {
    const checkBookmark = async () => {
      if (!session?.user?.id) {
        setIsBookmarked(false);
        return;
      }

      try {
        const res = await fetch(`/api/prompt/${post._id}/bookmark`);
        if (res.ok) {
          const data = await res.json();
          setIsBookmarked(data.bookmarked || false);
        }
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    };

    checkBookmark();
  }, [post._id, session?.user?.id]);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleBookmark = async () => {
    if (!session?.user?.id) {
      window.location.href = "/login";
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/prompt/${post._id}/bookmark`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.bookmarked);
      } else {
        console.error("Failed to bookmark prompt");
      }
    } catch (error) {
      console.error("Error bookmarking prompt:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 break-inside-avoid rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 p-6 pb-4 md:w-[360px] w-full">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 flex justify-start items-center gap-3 min-w-0">
          <Image
            src={post.creator.image || "/assets/images/avater.avif"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-fg text-sm truncate">
              {post.creator.username}
            </h3>
            <p className="font-inter text-xs text-muted truncate">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Save/Bookmark Button */}
          {session?.user?.id && (
            <button
              onClick={handleBookmark}
              disabled={isSaving}
              className={`w-7 h-7 rounded-full bg-card-20 shadow-sm backdrop-blur flex justify-center items-center cursor-pointer transition-all hover:scale-110 ${
                isBookmarked ? "bg-amber-500/20" : ""
              }`}
              title={isBookmarked ? "Remove from saved" : "Save prompt"}
            >
              <svg
                className={`w-4 h-4 transition-colors ${
                  isBookmarked
                    ? "fill-amber-500 text-amber-500"
                    : "fill-none text-muted"
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          )}
          {/* Copy Button */}
          <div
            className="w-7 h-7 rounded-full bg-card-20 shadow-sm backdrop-blur flex justify-center items-center cursor-pointer transition-all hover:scale-110"
            onClick={handleCopy}
            title="Copy prompt"
          >
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
              alt="copy_icon"
            />
          </div>
        </div>
      </div>

      {/* Prompt Text with Better Formatting */}
      <div className="mb-4">
        <p className="font-sans text-sm text-fg leading-relaxed whitespace-pre-wrap break-words">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-medium text-primary hover:underline transition-colors"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </div>

      {/* Tag */}
      <div className="mb-2">
        <span
          className="inline-block font-inter text-xs cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          onClick={() => handleTagClick(post.tag)}
        >
          #{post.tag}
        </span>
      </div>

      {/* Edit/Delete Actions */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-4 pt-4 flex items-center gap-4 border-t border-border">
          <button
            className="font-inter text-sm cursor-pointer bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-inter text-sm cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            onClick={handleDelate}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;