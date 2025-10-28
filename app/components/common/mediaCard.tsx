"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface MediaCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
}

export default function MediaCard({
  image,
  date,
  title,
  description,
}: MediaCardProps) {
  return (
    <Card className="text-black bg-transparent shadow-none border-0 overflow-hidden">
      {/* Image */}
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full lg:w-[304px]  lg:h-[181px] object-cover"
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0 ">
        <CardDescription className="font-[Inter] text-sm md:text-sm opacity-80 font-medium text-[#1A1A1A] mb-4">
          {date}
        </CardDescription>

        <CardTitle className="h-[30px] md:lg-[60px] lg:h-[60px] text-black  items-end justify-items-end font-[Inter] text-[20px] md:text-xl font-bold tracking-[1px] mb-4 line-clamp-2">
          {title}
        </CardTitle>

        <p className="text-[#1A1A1A] font-medium font-[Inter] text-[16px] md:text-base leading-relaxed opacity-80 line-clamp-3">
          {description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-0">
        <button
          type="button"
          className="flex items-center text-[14px] gap-2 text-custom-gradient hover:text-blue-900 transition-colors font-medium"
        >
          {"Read More"}
          {/* <img 
    src={arrowright} 
    alt="arrow right" 
    className="w-6 h-6 object-contain" 
  /> */}
        </button>
      </CardFooter>
    </Card>
  );
}
