import receptionImg from "../assets/images/reception.png";

const info = [
  {
    id: 1,
    title: "Phone",
    icon: "call",
    description: "+234 916 763 0305",
  },
  {
    id: 2,
    title: "Email",
    icon: "mail",
    description: "jissapartment@gmail.com",
  },
  {
    id: 3,
    title: "Address",
    icon: "location_on",
    description:
      "No. 5, Jiss Drive, Industrial Gate, Radio Estate off NTA Road, Port Harcourt, Rivers State, Nigeria.",
  },
  {
    id: 4,
    title: "Working Hours",
    icon: "schedule",
    description: "24/7 Concierge Service",
  },
];

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-softCream">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            "background-image":
              "radial-gradient(#8B5E3C 0.5px, transparent 0.5px); background-size: 24px 24px;",
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-luxuryText text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-luxuryBrown/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            We’re here to assist you anytime with world-className concierge
            service.
          </p>
        </div>
      </section>
      {/* <!-- Contact Info Cards --> */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map(({ id, title, icon, description }) => (
            <div
              className="bg-white p-8 rounded-xl shadow-xl shadow-black/5 border border-accent flex flex-col items-center text-center group hover:border-secondary transition-all"
              key={id}
            >
              <div className="w-14 h-14 bg-softCream rounded-full flex items-center justify-center mb-6 text-luxuryBrown group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  {icon}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-slate-600 font-medium">{description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-accent">
          {/* Image Side */}
          <div className="lg:w-1/3 relative min-h-[300px] lg:min-h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Modern high-end hotel lobby with professional concierge staff"
              style={{ backgroundImage: `url(${receptionImg})` }}
            >
              {/* <div className="absolute inset-0 bg-luxuryBrown/10 backdrop-blur-[2px]"></div> */}
            </div>
            {/* <div className="relative z-10 p-12 h-full flex flex-col justify-end text-white">
              <h4 className="text-2xl font-bold mb-2">Private Concierge</h4>
              <p className="text-white/80 text-sm">
                Our dedicated team is ready to assist you with airport pickups,
                dining reservations, or custom city tours.
              </p>
            </div> */}
          </div>
          {/* Form Side */}
          <div className="lg:w-2/3 p-8 md:p-16">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
              <p className="text-slate-500">
                Our team will get back to you within 24 hours.
              </p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-luxuryBrown">
                  Full Name
                </label>
                <input
                  className="rounded-xl border-accent bg-background-light focus:ring-secondary focus:border-secondary p-4 transition-all"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-luxuryBrown">
                  Email Address
                </label>
                <input
                  className="rounded-xl border-accent bg-background-light focus:ring-secondary focus:border-secondary p-4 transition-all"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-luxuryBrown">
                  Phone Number
                </label>
                <input
                  className="rounded-xl border-accent bg-background-light focus:ring-secondary focus:border-secondary p-4 transition-all"
                  placeholder="+234 ..."
                  type="tel"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-luxuryBrown">
                  Subject
                </label>
                <select className="rounded-xl border-accent bg-background-light focus:ring-secondary focus:border-secondary p-4 transition-all">
                  <option>General Inquiry</option>
                  <option>Reservation Assistance</option>
                  <option>Events &amp; Weddings</option>
                  <option>Corporate Bookings</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-luxuryBrown">
                  Message
                </label>
                <textarea
                  className="rounded-xl border-accent bg-background-light focus:ring-secondary focus:border-secondary p-4 transition-all"
                  placeholder="How can we help you today?"
                  rows="5"
                ></textarea>
              </div>
              <div className="md:col-span-2 mt-4">
                <button
                  className="w-full md:w-auto bg-mutedGold hover:bg-mutedGold/90 text-white font-bold px-12 py-4 rounded-xl shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  type="button"
                >
                  Send Message
                  <span className="material-symbols-outlined text-xl">
                    send
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="w-full h-[500px] relative bg-slate-200">
        <div
          className="absolute inset-0 overflow-hidden"
          data-location="Victoria Island, Lagos, Nigeria"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4234892392315!2d6.948160273966305!3d4.8684982401821655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cf0b6dd4a40d%3A0x2236b42fd74dd95b!2sJiss%20Apartments%20%26%20Hotel!5e0!3m2!1sen!2sng!4v1775222405399!5m2!1sen!2sng"
            className="w-full h-full object-cover filter grayscale opacity-50"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      {/* Quick Support */}

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-luxuryBrown rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-heading font-bold mb-6">
              Need help booking a room?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Skip the queue and secure your luxury experience in Nigeria's
              finest hospitality destination today.
            </p>
            <button className="bg-mutedGold hover:bg-mutedGold/90 text-white font-bold px-10 py-4 rounded-xl shadow-xl transition-all uppercase tracking-widest">
              Book Your Stay Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
