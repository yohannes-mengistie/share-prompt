"use client";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const dark = stored ? stored === "dark" : prefersDark;
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        relative flex h-9 w-16 items-center rounded-full
        border border-border bg-card
        transition-colors duration-300
        hover:opacity-90
      "
    >
      {/* Sliding knob */}
      <span
        className={`
          absolute left-1 top-1 h-7 w-7 rounded-full
          bg-bg shadow-md
          transition-transform duration-300
          ${isDark ? "translate-x-7" : "translate-x-0"}
        `}
      />

      {/* Icons */}
      <span className="relative z-10 flex w-full justify-between px-1.5">
        {/* Sun */}
        <svg
          className={`h-4 w-4 transition-opacity ${
            isDark ? "opacity-40" : "opacity-100 text-yellow-500"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon */}
        <svg
          className={`h-4 w-4 transition-opacity ${
            isDark ? "opacity-100 text-indigo-400" : "opacity-40"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
