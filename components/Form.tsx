import Link from "next/link";
import { useState, useEffect } from "react";

type Post = {
  prompt: string;
  tag: string;
};

type FormProps = {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-2xl mx-4">
        <h1 className="text-5xl font-extrabold leading-[1.15] text-fg sm:text-6xl text-center mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {type} Post
          </span>
        </h1>

        <p className="text-lg text-muted sm:text-xl text-center mb-10">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-7 rounded-xl border border-border bg-card-20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-8 transition-all duration-300 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="group">
            <span className="font-satoshi font-semibold text-base text-fg">
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder="Write your prompt here..."
              required
              className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-fg outline-0 border border-border focus:border-primary focus:ring-0 transition-all duration-200 group-hover:border-primary"
            />
          </label>

          <label className="group">
            <span className="font-satoshi font-semibold text-base text-fg">
              Tag {"  "}
              <span className="font-normal">
                (#ai, #chatgpt , #technoloy )
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required
              className="w-full flex rounded-lg mt-2 p-3 text-sm text-fg outline-0 border border-border focus:border-primary focus:ring-0 transition-all duration-200 group-hover:border-primary"
            />
          </label>

          <div className="flex justify-end gap-4 mt-6">
            <Link
              href="/"
              className="px-5 py-2 text-sm text-muted hover:text-fg transition-colors duration-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm bg-primary rounded-full text-white hover:opacity-95 transition-all duration-300 transform hover:scale-105 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
