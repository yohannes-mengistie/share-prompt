import Feed from "../components/Feed";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  {
    title: "Discover Prompts",
    description:
      "Explore high-quality AI prompts created by the community to boost your productivity and creativity.",
    icon: "🔍",
  },
  {
    title: "Create & Share",
    description:
      "Craft your own prompts and share them publicly so others can learn and build on your ideas.",
    icon: "✨",
  },
  {
    title: "AI Powered",
    description:
      "Optimized for modern AI tools like ChatGPT to deliver better and more accurate results.",
    icon: "🤖",
  },
];

const Home = () => {
  return (
    <section className="mt-10 w-full flex flex-col items-center">
      {/* Hero */}
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          AI-Powered Prompts
        </span>
      </h1>

      <p className="mt-5 text-lg sm:text-xl max-w-2xl text-center text-muted">
        PromptVerse is an open-source AI prompting platform to discover, create,
        and share creative prompts.
      </p>

      {/* Feature Cards */}
      <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              rounded-2xl border border-border bg-card p-6
              shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
            "
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-10 text-2xl">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-fg">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 w-full bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 py-16 text-center text-white">
        <h2 className="text-4xl font-extrabold">
          Ready to build better prompts?
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Join PromptVerse and start creating today.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white hover:text-gray-900 transition">
            Explore Prompts
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
