"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

type Post = {
  _id: string;
  creator: {
    username: string;
  };
  tag: string;
  prompt: string;
  [key: string]: any;
};

type PromptCardListProps = {
  data: Post[];
  handleTagClick: (tag: string) => void;
  handleEdit: (post: Post) => void;
  handleDelate: (post: Post) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(value) ||
        post.tag.toLowerCase().includes(value) ||
        post.creator?.username?.toLowerCase().includes(value)
    );

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };

    fetchData();
  }, []);

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const filtered = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2 text-center">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-border bg-card py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-primary focus:outline-none focus:ring-0 text-fg placeholder:text-muted peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        handleEdit={() => {}}
        handleDelate={() => {}}
      />
    </section>
  );
};

export default Feed;
