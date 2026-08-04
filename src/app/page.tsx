import { Hero } from "@/components/sections/Hero";
import { ForWhom } from "@/components/sections/ForWhom";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stories } from "@/components/sections/Stories";
import { About } from "@/components/sections/About";
import { Gym } from "@/components/sections/Gym";
import { Guarantee } from "@/components/sections/Guarantee";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";
import { PulseDivider } from "@/components/ui/PulseDivider";
import { JsonLd } from "@/components/JsonLd";
import { challengeJsonLd, faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <Hero />
      <PulseDivider className="container-page py-2" />
      <ForWhom />
      <WhatYouGet />
      <HowItWorks />
      <Stories />
      <About />
      <Gym />
      <Guarantee />
      <FAQ />
      <FinalCta />
      <JsonLd data={challengeJsonLd()} />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
