export function TravelHero() {
  return (
    <section className="relative max-w-6xl mx-auto w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden mb-12 mt-12 shadow-lg">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      {/* Soft glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Explore Your Next Adventure
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow">
          Discover exciting destinations, plan comfortably, and experience the world
          with confidence and inspiration.
        </p>
      </div>
    </section>
  );
}
