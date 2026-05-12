import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { LiveEvents } from "@/components/sections/LiveEvents";
import { Stories } from "@/components/sections/Stories";
import { About } from "@/components/sections/About";
import { Gym } from "@/components/sections/Gym";
import { Reels } from "@/components/sections/Reels";
import { Newsletter } from "@/components/sections/Newsletter";
import { FAQ } from "@/components/sections/FAQ";
import { PulseDivider } from "@/components/ui/PulseDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <PulseDivider className="container-page py-2" />
      <Services />
      <LiveEvents />
      <Stories />
      <About />
      <Gym />
      <Reels />
      <Newsletter />
      <FAQ />
    </>
  );
}
