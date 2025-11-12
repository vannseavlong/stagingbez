type LabelTextProps = {
  title: string;
  description: string;
};

export default function LabelText({ title, description }: LabelTextProps) {
  return (
    <section className=" text-black">
      <div className=" space-y-6">
        <h2 className="lg:text-[24px] text-[20px] md:text-[24px] mb-6 md:mb-6 lg:mb-6 tracking-wides text-black font-internot-italic font-semibold leading-normal tracking-[4px">
          {title}
        </h2>
        <p className="text-black font-normal leading-[150%] text-[16px] md:text-[18px] lg:text-[18px] opacity-80 w-full h-full lg:w-full lg:h-[104px] md:w-[704px] md:h-[104px]">
          {description}
        </p>
      </div>
    </section>
  );
}
