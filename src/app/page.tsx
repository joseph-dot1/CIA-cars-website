import { SmoothScroll } from "@/components/SmoothScroll";
import { GearProvider } from "@/components/nav/GearContext";
import { TopNav } from "@/components/nav/TopNav";
import { GearProgress } from "@/components/nav/GearProgress";
import { Gear01Hero } from "@/components/gears/Gear01Hero";
import { Gear02TrustStrip } from "@/components/gears/Gear02TrustStrip";
import { Gear03Fleet } from "@/components/gears/Gear03Fleet";
import { Gear04Services } from "@/components/gears/Gear04Services";
import { Gear05WhyCIA } from "@/components/gears/Gear05WhyCIA";
import { Gear06HowTestimonial } from "@/components/gears/Gear06HowTestimonial";
import { Gear07Booking } from "@/components/gears/Gear07Booking";

export default function Home() {
  return (
    <GearProvider>
      <SmoothScroll />
      <TopNav />
      <GearProgress />
      <main>
        <Gear01Hero />
        <Gear02TrustStrip />
        <Gear03Fleet />
        <Gear04Services />
        <Gear05WhyCIA />
        <Gear06HowTestimonial />
        <Gear07Booking />
      </main>
    </GearProvider>
  );
}
