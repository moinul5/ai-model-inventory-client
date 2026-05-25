import { useEffect, useState } from "react";

import Orb from "../Components/Orb";
import Navbar from "../Components/Navbar";

import { useTheme } from "../Context/ThemeContext";

function Home() {
  const { darkMode } = useTheme();

  const [featuredModels, setFeaturedModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/models")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedModels(data.slice(0, 6));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Orb Background */}
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={2}
            rotateOnHover={true}
            hue={darkMode ? 260 : 180}
            forceHoverState={false}
            backgroundColor={
              darkMode ? "#000000" : "#ffffff"
            }
          />
        </div>

        {/* Overlay */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none ${
            darkMode
              ? "bg-black/50"
              : "bg-white/40"
          }`}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
          {/* Intro */}
          <p
            className={`mb-4 text-sm uppercase tracking-[0.4em] ${
              darkMode
                ? "text-cyan-400"
                : "text-blue-600"
            }`}
          >
            AI Infrastructure Reimagined
          </p>

          {/* Heading */}
          <h1 className="max-w-6xl text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
            The Operating System
            <br />
            For Modern AI Teams
          </h1>

          {/* Description */}
          <p
            className={`mt-6 max-w-3xl text-lg leading-relaxed md:text-xl ${
              darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            Manage AI models, monitor workflows,
            and scale machine learning operations
            through a fast, intelligent, and
            beautifully designed platform built
            for developers, researchers, and
            modern AI ecosystems.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              className={`rounded-2xl px-8 py-4 font-bold transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? "bg-cyan-400 text-black hover:bg-cyan-300"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Explore Models
            </button>

            <button
              className={`rounded-2xl border px-8 py-4 font-semibold backdrop-blur-md transition-all duration-300 ${
                darkMode
                  ? "border-white/20 bg-white/10 hover:bg-white/20"
                  : "border-black/10 bg-black/5 hover:bg-black/10"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured AI Models */}
      <section className="relative z-20 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p
              className={`mb-3 text-sm uppercase tracking-[0.3em] ${
                darkMode
                  ? "text-cyan-400"
                  : "text-blue-600"
              }`}
            >
              Featured Collection
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              Featured AI Models
            </h2>

            <p
              className={`mx-auto mt-4 max-w-2xl text-lg ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              Discover some of the latest AI models
              added to the platform by developers
              and researchers.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredModels.map((model) => (
              <div
                key={model._id}
                className={`rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
                  darkMode
                    ? "border-white/10 bg-white/10"
                    : "border-black/10 bg-white/70"
                }`}
              >
                <h3 className="text-2xl font-black">
                  {model.name}
                </h3>

                <p
                  className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                    darkMode
                      ? "bg-cyan-400/20 text-cyan-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {model.framework}
                </p>

                <p
                  className={`mt-5 leading-relaxed ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About AI Models */}
      <section
        className={`px-6 py-24 ${
          darkMode
            ? "bg-white/5"
            : "bg-black/5"
        }`}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p
            className={`mb-3 text-sm uppercase tracking-[0.3em] ${
              darkMode
                ? "text-cyan-400"
                : "text-blue-600"
            }`}
          >
            About Artificial Intelligence
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            What Are AI Models?
          </h2>

          <p
            className={`mt-8 text-lg leading-relaxed ${
              darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            AI models are systems trained using
            machine learning algorithms to perform
            intelligent tasks such as image
            recognition, natural language
            processing, recommendation systems,
            and chatbots. Modern AI models use
            neural networks and massive datasets
            to learn patterns, make predictions,
            and automate complex decision-making
            processes across industries.
          </p>
        </div>
      </section>

      {/* Get Started */}
      <section className="px-6 py-28">
        <div
          className={`mx-auto max-w-6xl rounded-[40px] border p-12 text-center backdrop-blur-xl ${
            darkMode
              ? "border-white/10 bg-white/10"
              : "border-black/10 bg-white/70"
          }`}
        >
          <p
            className={`mb-3 text-sm uppercase tracking-[0.3em] ${
              darkMode
                ? "text-cyan-400"
                : "text-blue-600"
            }`}
          >
            Start Building
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Get Started With AI Model Management
          </h2>

          <p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${
              darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            Join the platform to organize, monitor,
            and manage your AI ecosystem with
            modern tools built for developers,
            researchers, and machine learning teams.
          </p>

          <button
            className={`mt-10 rounded-2xl px-10 py-5 text-lg font-bold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-cyan-400 text-black hover:bg-cyan-300"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;