import specialOfferImg1 from "../assets/images/special-offer.png";
import specialOfferImg2 from "../assets/images/special-offer-2.png";

const specialOffersData = [
  {
    title: "Lagos Weekend",
    titleBr: "Getaway",
    description: "25% off for residents this weekend.",
    label: "Seasonal Offer",
    image: specialOfferImg1,
    cta: "Claim Discount",
    link: "#",
  },
  {
    title: "Elevated Abuja",
    titleBr: "Meetings",
    description: "Complimentary conference room access.",
    label: "Corporate Package",
    image: specialOfferImg2,
    cta: "Reserve Now",
    link: "#",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {specialOffersData.map(
          ({ title, titleBr, description, label, image, cta, link }) => (
            <div className="relative h-64 rounded-luxury overflow-hidden group cursor-pointer">
              <img
                alt="Business Travel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={image}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent flex flex-col justify-center p-10">
                <span className="text-mutedGold font-bold text-sm mb-2 uppercase">
                  {label}
                </span>
                <h3 className="text-white text-3xl font-bold mb-4">
                  {title}
                  <br />
                  {titleBr}
                </h3>
                <p className="text-white/80 text-sm mb-6">{description}</p>
                <a
                  className="text-white font-bold border-b-2 border-mutedGold w-fit pb-1 hover:text-mutedGold transition-all"
                  href={link}
                >
                  {cta}
                </a>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};
export default SpecialOffers;
