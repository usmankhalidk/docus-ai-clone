<<<<<<< HEAD
import Benefits from "./component/Home/Benefits";
import Carousal from "./component/Home/Carousal";
import Forbes from "./component/Home/Forbes";
=======
import { Benefits } from "./component/Home/Benefits";
import { Forbes } from "./component/Home/Forbes";
>>>>>>> 2e9c812eccd56cfcd9c5ccfa5f77ce73a5a67de8
import HealthInformed from "./component/Home/HealthInformed";
import HeroSection from "./component/Home/HeroSection";
import { HIPA } from "./component/Home/HIPA";
import HomeAccordion from "./component/Home/HomeAccordion";
<<<<<<< HEAD
import HomeCarousal from "./component/Home/HomeCarousal";
import SafeData from "./component/Home/SafeData";
=======
import { SafeData } from "./component/Home/SafeData";

import homedata from "./Json/home.json"
>>>>>>> 2e9c812eccd56cfcd9c5ccfa5f77ce73a5a67de8


export default function HomePage() {

  const { SafeDataHome, HomeBenefitCards } = homedata

  return (
    <>
      <HeroSection />
      <section>
      <HIPA />
      </section>
      <HealthInformed />
<<<<<<< HEAD
      <Forbes />
      <Benefits />
      <SafeData />
      <HomeCarousal />
=======
      <section className="my-14 sm:my-20 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
        <Forbes />
      </section>
      <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
        <Benefits BenefitCardsData={HomeBenefitCards} />
      </section>
      <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-16 py-6 px-5'>
        <SafeData SafeData={SafeDataHome} />
      </section>
>>>>>>> 2e9c812eccd56cfcd9c5ccfa5f77ce73a5a67de8
      <HomeAccordion />
    </>
  );
}