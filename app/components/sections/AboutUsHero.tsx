type HeroProps = {
  title?: string;
  description?: string;
  backgroundMobile: string;
  backgroundTablet: string;
  backgroundDesktop: string;
};

export default function AboutUsHero({
  title,
  description,
  backgroundMobile,
  backgroundTablet,
  backgroundDesktop,
}: HeroProps) {
  return (
    <section className="relative min-h-screen bg-cover bg-center bg-white flex items-center justify-center overflow-hidden">
      {/* Responsive Background Image using picture element */}
      <picture>
        {/* Mobile image */}
        <source media="(max-width: 767px)" srcSet={backgroundMobile} />
        {/* Tablet image */}
        <source
          media="(min-width: 768px) and (max-width: 1023px)"
          srcSet={backgroundTablet}
        />
        {/* Desktop image */}
        <source media="(min-width: 1024px)" srcSet={backgroundDesktop} />
        {/* Fallback */}
        <img
          src={backgroundDesktop}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-cover"
        />
      </picture>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>

      {/* Foreground Content */}
      <div className="relative z-10 text-white text-center px-6">
        <h1
          className="text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {title}
        </h1>

        {description && (
          <p
            className="text-base md:text-lg lg:text-xl max-w-[380px] md:max-w-[600px] lg:max-w-[700px] mx-auto font-normal"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
