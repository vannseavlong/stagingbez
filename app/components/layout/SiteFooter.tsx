"use client";

import { useSearchParams } from "next/navigation";
import FooterSection from "../sections/FooterSection";

export default function SiteFooter() {
  // Render the updated FooterSection so layout uses the intended footer UI
  const searchParams = useSearchParams();
  const embed = searchParams.get('embed');
  // console.log('embed: ', embed);
  const isEmbed = embed === 'true';
  if (isEmbed) return null
  return <FooterSection />;
}
