import { useTheme } from "../Context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`border-t px-6 py-10 transition-all duration-300 ${
        darkMode
          ? "border-white/10 bg-black text-white"
          : "border-black/10 bg-white text-black"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-black">
            Neural
            <span
              className={
                darkMode
                  ? "text-cyan-400"
                  : "text-blue-600"
              }
            >
              Stack
            </span>
          </h1>

          <p
            className={`mt-2 text-sm ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            © 2026 NeuralStack. All rights reserved.
          </p>
        </div>

        {/* GitHub Links */}
        <div className="flex flex-col items-center gap-3 md:items-end">
          <a
            href="https://github.com/moinul5/ai-model-inventory-client"
            target="_blank"
            rel="noreferrer"
            className={`transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "hover:text-cyan-400"
                : "hover:text-blue-600"
            }`}
          >
            Client Repository
          </a>

          <a
            href="https://github.com/moinul5/ai-model-inventory-server"
            target="_blank"
            rel="noreferrer"
            className={`transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "hover:text-cyan-400"
                : "hover:text-blue-600"
            }`}
          >
            Server Repository
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;