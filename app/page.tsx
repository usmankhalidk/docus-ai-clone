import { Benefits } from "./component/Home/Benefits";
import { Forbes } from "./component/Home/Forbes";
import HealthInformed from "./component/Home/HealthInformed";
import HeroSection from "./component/Home/HeroSection";
import { HIPA } from "./component/Home/HIPA";
import HomeAccordion from "./component/Home/HomeAccordion";
import { SafeData } from "./component/Home/SafeData";

import homedata from "./Json/home.json"


export default function HomePage() {

  const { SafeDataHome, HomeBenefitCards } = homedata

  return (
    <>
      <HeroSection />
      <section>
        <HIPA />
      </section>
      <HealthInformed />
      <section className="my-14 sm:my-20 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
        <Forbes />
      </section>
      <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
        <Benefits BenefitCardsData={HomeBenefitCards} />
      </section>
      <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-16 py-6 px-5'>
        <SafeData SafeData={SafeDataHome} />
      </section>
      <HomeAccordion />
    </>
  );
}