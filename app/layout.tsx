import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Provider from "../components/Provider";

export const metadata: Metadata = {
  title: "Modern Prompt Sharing App",
  description: "A modern app to create and explore prompts",
  icons: {
    icon: [
      { url: "/assets/icons/logo.jpg", type: "image/jpeg" },
      { url: "/assets/icons/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/assets/icons/logo.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: "/assets/icons/logo.jpg",
    shortcut: "/assets/icons/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = stored ? stored === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen">
        <Provider>
          <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <header className="fixed top-0 left-0 w-full z-50 bg-card shadow-md h-15 border-b border-border">
              <Nav />
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t mt-10 py-12 text-sm bg-card text-muted border-border">
              <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Company */}
                <div>
                  <h3 className="font-semibold text-fg mb-3">Company</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-primary">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-semibold text-fg mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Docs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        API Status
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Community
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-semibold text-fg mb-3">Legal</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600">
                        Licenses
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h3 className="font-semibold text-fg mb-3">Subscribe</h3>
                  <p className="mb-4 text-muted">
                    Get the latest updates right in your inbox.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-95"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="mt-12 text-center text-muted text-xs">
                © {new Date().getFullYear()} PromptApp. All rights reserved.
              </div>
            </footer>
          </div>
        </Provider>
      </body>
    </html>
  );
}