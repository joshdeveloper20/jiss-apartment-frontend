const Footer = () => {
  return (
    <footer className="bg-luxuryText text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://jissapartment.com/wp-content/uploads/2025/08/Folder-1-copy.png"
              className="w-30"
              alt=""
            />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Redefining luxury hospitality across Nigeria with a blend of
            heritage and modern excellence.
          </p>
          <div className="flex gap-4">
            <a
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-mutedGold transition-colors"
              href="#"
            >
              f
            </a>
            <a
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-mutedGold transition-colors"
              href="#"
            >
              in
            </a>
            <a
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-mutedGold transition-colors"
              href="#"
            >
              𝕏
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-mutedGold">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Our Rooms
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Special Offers
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Amenities
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Reservations
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Careers
              </a>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-mutedGold">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                FAQs
              </a>
            </li>
            <li>
              <a className="hover:text-white transition-colors" href="#">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-mutedGold">
            Get in Touch
          </h4>
          <div className="space-y-4 text-sm text-gray-400">
            <p className="flex items-start gap-2">
              <span>📍</span>
              No. 5, Jiss Drive, Industrial Gate, Radio Estate off NTA Road,
              Port Harcourt, Rivers State, Nigeria.
            </p>
            <p className="flex items-start gap-2">
              <span>📞</span>
              +234 916 763 0305
            </p>
            <p className="flex items-start gap-2">
              <span>✉️</span>
              jissapartment@gmail.com
            </p>
            <div className="mt-6">
              <h5 className="text-white font-bold mb-3">Newsletter</h5>
              <div className="flex">
                <input
                  className="bg-white/5 border-none rounded-l-lg text-xs w-full focus:ring-mutedGold"
                  placeholder="Email Address"
                  type="email"
                />
                <button className="bg-mutedGold px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-all">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-10 text-center text-gray-500 text-xs">
        <p>
          © 2024 LuxeNigeria Luxury Hotels. All rights reserved. Designed for
          the African Elite.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
