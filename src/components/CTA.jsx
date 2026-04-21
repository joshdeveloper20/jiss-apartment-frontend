const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Ready for an Unforgettable <br />
          Nigerian Luxury Experience?
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Join thousands of discerning travelers who choose LuxeNigeria for
          comfort, security, and prestige.
        </p>
        <button className="bg-mutedGold text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-luxuryBrown transition-all scale-100 hover:scale-105 cursor-pointer">
          Book Your Stay Today
        </button>
      </div>
      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-softCream rounded-full z-0"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-softCream rounded-full z-0"></div>
    </section>
  );
};
export default CTA;
