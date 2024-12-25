"use client"

import React from "react";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
import { SafeData } from "./Home/SafeData";
import { HIPA } from "./Home/HIPA";
import HomeAccordion from "./Home/HomeAccordion";
import { Poster } from "./ui/Poster";
import { AI } from "./ui/AI"
import { LabAnalysis, MainTitle, Feature } from "../types/blogInterface";
import { Benefits } from "./Home/Benefits";
import { Counts } from "./ui/Counts";

// Main Section
export const LAB = () => {
  const { LabAnalysis, MainTitle }: { LabAnalysis: LabAnalysis[], MainTitle: MainTitle } = labdata
  const { testTypes }: { testTypes: Feature[] } = labdata
  const { LabPoster } = labdata
  const { SafeDataLab, LabBenefitCards, LabCounts } = homedata
  return (
    <div>

      <section>
        <HIPA />
      </section>

      <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
        <Benefits BenefitCardsData={LabBenefitCards} />
      </section>

      <section className="max-w-7xl mx-auto lg:px-16 py-2 px-5 mb-12 mt-8">
        <Counts CountsData={LabCounts} />
      </section>

      <section className="max-w-7xl mx-auto lg:px-[108px] py-4 px-5">
        <h1 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center my-4 sm:my-8 lg:mb-12">{MainTitle.LabAnalysisTitle}</h1>
        {LabAnalysis.map((data, index) => (
          <React.Fragment key={index}>
            <AI AnalysisData={data} isImageLeft={index === 1} />
            {index < LabAnalysis.length - 1 && (
              <hr className="border-t border-gray-200 my-6" />
            )}
          </React.Fragment>
        ))}
      </section>

      <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-[92px] py-6 px-5'>
        <SafeData SafeData={SafeDataLab} />
      </section>

      <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
        <div className="text-center">
          <h2 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center m-4 sm:mb-8">Supported Lab Test Types</h2>
          <p className="text-gray-600 text-center text-base md:text-lg mb-12">
            Explore the variety of lab test types we support and analyze to help you make informed decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {testTypes.map((testType, index) => (
            <div
              key={index}
              className="bg-neutral-100 border border-solid px-3 sm:px-4 py-3 sm:py-5 rounded-lg hover:shadow-sm hover:border-[#91C4C0] group cursor-pointer transition duration-200 flex items-center gap-3 sm:gap-4"
            >
              <img
                src={testType.icon}
                alt={testType.title}
                className="w-12 sm:w-14 h-14 object-contain group-hover:scale-105 transition-all"
              />
              <div>
                <h3 className="text-lg sm:text-xl text-left sm:leading-[30px] font-semibold text-gray-800 mb-2 group-hover:text-[#1A847C]">{testType.title}</h3>
                <p className="text-sm text-gray-600">{testType.description}</p>
              </div>
              <span className="ml-auto text-[#1A847C] font-bold text-lg">→</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <Poster PosterData={LabPoster} buttonColor="Red" posterClasses="border-0 p-5 md:p-10 rounded-none lg:px-[188px] lg:py-12" />
      </section>

      <HomeAccordion />

    </div>
  )
}