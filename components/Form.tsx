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
        <h1 className="text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {type} Post
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 sm:text-xl text-center mb-10">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
        
        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-8 transition-all duration-300 ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="group">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({...post, prompt: e.target.value})}
              placeholder="Write your prompt here..."
              required
              className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-700 outline-0 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-blue-400"
            />
          </label>

          <label className="group">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag {"  "}
              <span className="font-normal">
                (#product, #webdevelopment , #idea )
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({...post, tag: e.target.value})}
              placeholder="#tag"
              required
              className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-700 outline-0 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-blue-400"
            />
          </label>

          <div className="flex justify-end gap-4 mt-6">
            <Link 
              href="/" 
              className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
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