export default function HeroBanner() {
  return (
    <div className="hero-banner relative h-64 md:h-80 flex items-center justify-center text-center">
      <div className="relative z-10 space-y-4 px-4">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          FIRE FIGHT
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow">
          Tactical Combat Arena
        </p>
      </div>
    </div>
  );
}
