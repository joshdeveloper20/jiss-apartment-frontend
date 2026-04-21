const RoomHero = () => {
  return (
    <section className="relative w-full h-153.5 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center room-hero-gradient"
        data-alt="Wide shot of a luxury hotel suite with Lagos city view"
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pb-16 w-full">
        <h1 className="font-heading text-white text-5xl md:text-7xl font-bold mb-4">
          Our Rooms & Suites
        </h1>
        <p className="text-softCream text-lg md:text-xl max-w-2xl font-light">
          Carefully designed spaces for comfort, elegance, and relaxation.
          Experience the pinnacle of Nigerian hospitality.
        </p>
      </div>
    </section>
  );
};
export default RoomHero;
