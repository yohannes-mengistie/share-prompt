import Feed from "../../components/Feed";

const Dashboard = () => {
  return (
    <section className="
      min-h-screen w-full px-6 py-14
      bg-background text-foreground
    ">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Welcome to
          <br className="hidden sm:block" />
          <span className="
            bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500
            bg-clip-text text-transparent
          ">
            PromptVerse
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover, manage, and share AI-powered prompts — all in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Your Prompts", value: 24 },
          { label: "Shared", value: 12 },
          { label: "Saved", value: 8 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-2xl border border-border
              bg-card text-card-foreground
              p-6 text-center
              shadow-sm hover:shadow-md transition
            "
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="mb-6 text-2xl font-semibold">
          Recent Prompts
        </h2>
        <Feed />
      </div>
    </section>
  );
};

export default Dashboard;
