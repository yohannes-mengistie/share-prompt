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
      // Redirect to login if not authenticated
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
    <div className="flex-1 break-inside-avoid rounded-lg border border-border bg-card-20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image || "/assets/images/avater.avif"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div>
            <h3 className="font-satoshi font-semibold text-fg">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-muted">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Save/Bookmark Button */}
          {session?.user?.id && (
            <button
              onClick={handleBookmark}
              disabled={isSaving}
              className={`w-7 h-7 rounded-full bg-card-20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer transition-all hover:scale-110 ${
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
            className="w-7 h-7 rounded-full bg-card-20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer transition-all hover:scale-110"
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

      <p className="my-4 font-satoshi text-sm text-fg">{post.prompt}</p>
      <p
        className="font-inter text-sm cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
        onClick={() => handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent"
            onClick={handleDelate}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;