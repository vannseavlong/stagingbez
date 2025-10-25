import Image from "next/image";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  image,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col text-left w-[250px]  flex-shrink-0">
      {/* Image */}
      <div className="w-[250px] h-[250px] overflow-hidden  mb-5">
        <Image
          src={image}
          alt={title}
          width={250}
          height={250}
          className="w-[250px] h-[250px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-black text-[18px] md:text-lg font-bold tracking-wide mb-5 font-sans">
        {title}
      </h3>

      {/* Description */}
      <p className="text-black text-[15px] md:text-[16px] leading-snug opacity-80 ">
        {description}
      </p>
    </div>
  );
}
