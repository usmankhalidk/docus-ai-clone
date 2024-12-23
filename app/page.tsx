import Benefits from "./component/Home/Benefits";
import Forbes from "./component/Home/Forbes";
import HealthInformed from "./component/Home/HealthInformed";
import HeroSection from "./component/Home/HeroSection";
import HIPA from "./component/Home/HIPA";
import HomeAccordion from "./component/Home/HomeAccordion";
import SafeData from "./component/Home/SafeData";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HIPA />
      <HealthInformed />
      <Forbes />
      <Benefits />
      <SafeData />
      <HomeAccordion />

    </>
  );
}