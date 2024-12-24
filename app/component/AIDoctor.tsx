"use client"

import React from "react";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
import { SafeData } from "./Home/SafeData";
import { AI } from "./ui/AI"
import { LabAnalysis, MainTitle } from "../types/blogInterface";
import { Forbes } from "./Home/Forbes";
import { Benefits } from "./Home/Benefits";
import { HIPA } from "./Home/HIPA";
import HomeAccordion from "./Home/HomeAccordion";

// Main Section
export const AIDoctor = () => {

  const { DoctorAnalysis, MainTitle }: { DoctorAnalysis: LabAnalysis[], MainTitle: MainTitle } = labdata
  const { SafeDataDoctor, DoctorBenefitCards } = homedata

  return (
    <div>

      <section>
        <HIPA />
      </section>

      <section className="max-w-7xl mx-auto lg:px-[108px] py-4 px-5">
        <h1 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center my-4 sm:my-8 lg:mt-16 lg:mb-12">{MainTitle.DoctorAnalysisTitle}</h1>
        {DoctorAnalysis.map((data, index) => (
          <React.Fragment key={index}>
            <AI AnalysisData={data} isImageLeft={index === 1} />
            {index < DoctorAnalysis.length - 1 && (
              <hr className="border-t border-gray-200 my-6" />
            )}
          </React.Fragment>
        ))}
      </section>

      <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
        <Benefits BenefitCardsData={DoctorBenefitCards}/>
      </section>

      <section className="my-12 sm:my-14 lg:mt-20 lg:mb-4 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
        <Forbes />
      </section>

      <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-[92px] py-6 px-5'>
        <SafeData SafeData={SafeDataDoctor} />
      </section>

      <HomeAccordion />

    </div>
  )
}