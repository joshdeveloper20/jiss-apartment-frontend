import blogImg1 from "../assets/images/blog-1.png";
import blogImg2 from "../assets/images/blog-2.png";
import blogImg3 from "../assets/images/blog-3.png";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate 48-Hour Guide to Luxury in Lagos",
    category: "Travel Guide",
    description:
      "Exploring the most exclusive beach clubs and fine dining spots in VI and Ikoyi.",
    image: blogImg1,
    link: "#",
  },
  {
    id: 2,
    title: "Redefining Nigerian Cuisine: Our New Menu",
    category: "Gastronomy",
    description:
      "How our Executive Chef is fusing traditional spices with modern French techniques.",
    image: blogImg2,
    link: "#",
  },
  {
    id: 3,
    title: "Finding Serenity: The Best Spas in Abuja",
    category: "Lifestyle",
    description:
      "Why our Wellness Center was voted #1 for three consecutive years in the capital.",
    image: blogImg3,
    link: "#",
  },
];

const Blogs = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="blog">
      <div className="flex items-center justify-between mb-16">
        <h2 className="font-heading text-3xl font-bold">Luxe Lifestyle Blog</h2>
        <a
          className="text-mutedGold font-bold flex items-center gap-2 hover:gap-3 transition-all"
          href="#"
        >
          View All Stories
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewbox="0 0 24 24"
          >
            <path
              d="M17 8l4 4m0 0l-4 4m4-4H3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogPosts.map(({ id, title, category, description, image, link }) => (
          <article className="group" key={id}>
            <div className="overflow-hidden rounded-luxury mb-6 h-60">
              <img
                alt={title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                src={image}
              />
            </div>
            <span className="text-xs font-bold text-mutedGold uppercase">
              {category}
            </span>
            <h3 className="font-heading font-bold text-xl my-2 group-hover:text-luxuryBrown transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {description}
            </p>
            <a
              className="text-sm font-bold border-b border-gray-300 pb-1"
              href={link}
            >
              Read More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
export default Blogs;
