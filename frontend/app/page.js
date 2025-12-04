"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* ========== HERO SECTION (top) ========== */}
      <section className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white pb-20 md:pb-24">
        {/* Top nav */}
        <header className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
              {/* LOGO IMAGE – put logo.png in /public */}
              <img
                src="/logo.png"
                alt="WhisperBox logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-extrabold drop-shadow-sm">
              WhisperBox
            </span>
          </div>

          {/* Nav links (About + How it works) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium drop-shadow-sm">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#how-it-works" className="hover:underline">
              How it works
            </a>
          </nav>
        </header>

        {/* Hero content (center) */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-4 md:pt-8">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-center">
            {/* Left – big headline + text */}
            <div className="text-center md:text-left">
              <p className="uppercase text-[11px] tracking-[0.25em] mb-3 opacity-80">
                anonymous feedback board
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-md">
                <span className="block">real friends</span>
                <span className="block">real talk</span>
                <span className="block">real fun</span>
              </h1>

              <p className="mt-4 text-sm md:text-base max-w-md mx-auto md:mx-0 opacity-90">
                Let friends, classmates, or teammates send you anonymous
                messages. Honest feedback without the awkwardness or pressure.
              </p>

              {/* Centered main button */}
              <div className="mt-6 flex justify-center md:justify-start">
                <Link
                  href="/feedback"
                  className="inline-flex items-center justify-center rounded-full bg-white text-indigo-600 px-8 py-3 text-sm md:text-base font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
                >
                  Whisper now
                </Link>
              </div>
            </div>

            {/* Right – stacked “message cards” */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {/* Left mock card */}
              <div className="relative w-32 h-44 md:w-40 md:h-56 bg-white/90 rounded-3xl shadow-2xl rotate-[-12deg] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 flex items-center justify-center text-center px-3">
                  <p className="text-xs md:text-sm font-semibold text-slate-900">
                    “Be honest, what do you really think about me in class?”
                  </p>
                </div>
              </div>

              {/* Right mock card */}
              <div className="relative w-32 h-44 md:w-40 md:h-56 bg-white/90 rounded-3xl shadow-2xl rotate-[8deg] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-300 via-indigo-400 to-purple-500 flex items-center justify-center text-center px-3">
                  <p className="text-xs md:text-sm font-semibold text-slate-900">
                    “WhisperBox made our group feedback way more honest.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section
        id="how-it-works"
        className="bg-white py-16 md:py-20"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            How WhisperBox works
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-10 max-w-2xl mx-auto">
            Simple steps to collect anonymous messages from people you know.
          </p>

          {/* 2 steps (share your link removed) */}
          <div className="grid gap-10 md:grid-cols-2">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg mb-4">
                <span className="text-2xl text-white">💌</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Get anonymous messages
              </h3>
              <p className="text-xs md:text-sm text-slate-600 max-w-xs">
                People send anonymous notes—no names, no profile pictures—just
                pure and honest thoughts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg mb-4">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                View everything on your board
              </h3>
              <p className="text-xs md:text-sm text-slate-600 max-w-xs">
                All messages are displayed on a colorful dashboard where you can
                read, search, edit, or delete them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES / ABOUT SECTION ========== */}
      <section
        id="about"
        className="bg-slate-50 py-14 md:py-18"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-center">
            Built for honest feedback
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-8 text-center max-w-2xl mx-auto">
            WhisperBox is designed for school projects, friend groups, and
            teams—simple enough for anyone to use, but powerful enough to show
            real feedback clearly.
          </p>

          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-800">
                🎨 Colorful notes
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Every message appears as a sticky note with colors you can
                customize. It keeps your board fun and easy to scan.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-800">
                🔍 Search &amp; manage
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Quickly search through all anonymous messages. Edit or delete
                any note in just one click.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-800">
                🔐 Fully anonymous
              </h3>
              <p className="text-xs md:text-sm text-slate-600">
                Your board only stores messages and colors—no names, no email,
                no extra details. Just thoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== READY TO START SECTION ========== */}
      <section className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Ready to start?
          </h2>
          <p className="text-sm md:text-base opacity-90 mb-8 max-w-2xl mx-auto">
            Open your WhisperBox board, send yourself a test message, and share
            it with your friends or classmates.
          </p>

          {/* Only one main button now, centered */}
          <div className="flex justify-center">
            <Link
              href="/feedback"
              className="inline-flex items-center justify-center rounded-full bg-white text-indigo-600 px-8 py-3 text-sm md:text-base font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
            >
              Whisper now
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full text-center text-[11px] text-slate-500 py-4">
        WhisperBox • Final Project • Built with Next.js, Express &amp; MySQL
      </footer>
    </div>
  );
}
