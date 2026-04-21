import { useEffect, useState } from "react";

const RoomDetailsHero = ({ room }) => {
  const title = room?.name || "Executive Suite";
  const location = room?.location || "Victoria Island, Lagos";
  const rating = room?.rating ?? 4.8;
  const reviews = room?.reviewCount ?? 120;
  const mainImage =
    room?.images?.[0]?.url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCsR8nWRUaNHwAOcuctZkyYOzU-VZihRBy83KiuWArKbGUHFNiKRa2kiYOxcd2jG7xCG4Oc9QAUZCdD4mhBUcHdUpV9SOwv9azSiBuYYxAYbBzXYDtJyGY3Dr4V4uiRA3F6Zp6tanTY9vmQ87gDItTL7cYIEeDldarzWkEN4dvgGNSMjGbgb4CWnMLfVwDSpL6sbIvD38-yg8RVYXXjPQ3OnXO3_pDIZWgjol3E4IafWN3r0Zw7x1-_Cc3G14a6dl8G1VxM76O70dD";
  const allImages =
    room?.images?.filter((img) => img?.url).map((image) => image.url) || [];
  const fallbacks = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBa7_rqOmCFF1G49yNUV8zsWLkc-DQt5brULL2qHHiu4Pyb3iSvL2PUkDekJswwrSFTNhJ3HMfWttjo4LPf_Ft90PKBsXQ4eUQ3cgSKy9A6I1DbTudfM1EwCE5jggXZp_u5P8IZDgNOQNMJsqnUS97TceYL-inHDLUbHnGUyJE7EH7nsu-Kg1JATk5SeRLi5GMeHWI75jzV9lmCxUmEyamKqkNQ0BPkIDn6hPsJmF_-g81afUbThirHhiW6qGkb-dfzrVsCYOUIn3aX",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtm28jhmWl9RlRVqY9rI2kAWKrCEGT-WbwXfQbnum-v5u4PkweJXPJAfVDsyRP1X_J8oC3jC_rIUk6QDkLKu_Tio4xp66cWCagiHspceyRNOISVo2yUoVDYfObXuHpPmaxC3JbxKSz4GMpXxMwiY6wafoBZRFBk1oD_1SD0z82vGjtURL8ycRc2YuMgLvuxzKt631_FBsIcds_hRsQBCthpb9yuHTAygllymlkNPIpd5uBQ9md9MoER4WCyCTTBvF7gaSbrNhf5jVI",
  ];
  const images = allImages.length > 0 ? allImages : fallbacks;
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!showGallery) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowGallery(false);
      }
      if (event.key === "ArrowRight") {
        setGalleryIndex((prev) => (prev + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGallery, images.length]);

  const openGallery = (startIndex = 0) => {
    setGalleryIndex(startIndex);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const showPrevious = () => {
    setGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setGalleryIndex((prev) => (prev + 1) % images.length);
  };
  const thumbnailImages = images.slice(1, 3);
  const thumbnails =
    thumbnailImages.length === 2 ? thumbnailImages : fallbacks.slice(0, 2);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 mb-20 md:mb-0"
      data-purpose="room-gallery"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-125 md:h-150">
        {/* Main Cinematic Image */}
        <div className="md:col-span-3 relative h-125 md:h-150 rounded-2xl overflow-hidden group">
          <img
            alt="Executive Suite Lagos"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl"
            src={mainImage}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <div className="flex items-center space-x-2 text-mutedGold mb-2">
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="font-bold">{rating}</span>
              <span className="text-white/70 text-sm">({reviews} Reviews)</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-1">
              {title}
            </h1>
            <p className="text-white/80 flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              {location}
            </p>
          </div>
        </div>
        {/* Sidebar Thumbnails */}
        <div className="flex md:flex-col gap-4">
          <div className="h-1/2 rounded-2xl overflow-hidden luxury-card-shadow md:h-70">
            <img
              alt={`${title} photo 1`}
              className="w-full h-full object-cover hover:opacity-90 cursor-pointer transition-opacity"
              src={thumbnails[0]}
            />
          </div>
          <div className="h-1/2 relative rounded-2xl overflow-hidden luxury-card-shadow md:h-70">
            <img
              alt={`${title} photo 2`}
              className="w-full h-full object-cover hover:opacity-90 cursor-pointer transition-opacity"
              src={thumbnails[1]}
            />
            <button
              type="button"
              onClick={() => openGallery()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-sm font-bold uppercase tracking-widest backdrop-blur-sm text-white cursor-pointer opacity-100"
            >
              View All Photos
            </button>
          </div>
        </div>
      </div>

      {showGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
              onClick={closeGallery}
              aria-label="Close gallery"
            >
              ×
            </button>
            <div className="flex h-full flex-col md:flex-row">
              <div className="relative flex-1 overflow-hidden bg-black">
                <img
                  src={images[galleryIndex]}
                  alt={`${title} image ${galleryIndex + 1}`}
                  className="h-[60vh] w-full object-cover md:h-[75vh]"
                />
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
              <div className="w-full overflow-auto border-t border-white/10 bg-slate-950 px-4 py-4 md:w-96 md:border-t-0 md:border-l md:px-5 md:py-6">
                <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-[0.24em] text-white/70">
                  <span>{`${galleryIndex + 1} of ${images.length}`}</span>
                  <span className="font-semibold">{title}</span>
                </div>
                <div className="grid gap-3 md:grid-cols-1">
                  {images.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setGalleryIndex(index)}
                      className={`overflow-hidden rounded-2xl border transition ${
                        galleryIndex === index
                          ? "border-mutedGold"
                          : "border-transparent hover:border-white/30"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${title} thumbnail ${index + 1}`}
                        className="h-24 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default RoomDetailsHero;
