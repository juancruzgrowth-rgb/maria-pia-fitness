import { Hero } from "@/components/sections/Hero";
import { ForWhom } from "@/components/sections/ForWhom";
import { Method } from "@/components/sections/Method";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { About } from "@/components/sections/About";
import { Gym } from "@/components/sections/Gym";
import { Testimonials } from "@/components/sections/Testimonials";
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
      <Method />
      <WhatYouGet />
      <HowItWorks />
      <About />
      <Gym />
      <Testimonials />
      <FAQ />
      <FinalCta />
      <JsonLd data={challengeJsonLd()} />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
