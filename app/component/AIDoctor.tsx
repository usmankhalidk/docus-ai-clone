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
import json from "../Json/Accordion.json";
import AccordionItem from "./Home/Accordion";
import { IoIosStar } from "react-icons/io";
// Main Section
export const AIDoctor = () => {

  const { DoctorAnalysis, MainTitle }: { DoctorAnalysis: LabAnalysis[], MainTitle: MainTitle } = labdata
  const { SafeDataDoctor, DoctorBenefitCards } = homedata

  return (
    <div>
      <div className='flex flex-col md:flex-row items-center mx-auto max-w-6xl mt-10 sm:mt-16 md:mt-28 px-5  lg:px-0'>
        <div className='flex flex-col gap-8 w-full md:w-1/2 pr-5 '>
          <p className='text-4xl sm:text-5xl md:text-5xl font-bold line leading-tight md:leading-snug'>
            <p><span className='text-theme_color'> AI Doctor </span>for</p>
            <p>all your health</p>
            <p >questions</p>
          </p>
          <p className='text-base md:text-lg'>
            Docus AI Doctor can be your first step toward an accurate diagnosis. Get recommendations, validate with top doctors, and stay healthy.
          </p>
          <div className='flex items-center justify-center md:justify-start'>
            <button
              type="submit"
              className="rounded-sm bg-theme_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-theme_color_onHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Try Docus For Free
            </button>
          </div>
          <div className='flex items-center gap-5 justify-center md:justify-start'>
            <p className='font-semibold'>Excellent</p>
            <div className='flex items-center gap-1' title="4.9 out of 5 star rating on Trustpilot">
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
              <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                <IoIosStar className='text-white' />
              </div>
            </div>
            <div className='flex items-center' title="Trustpilot">
              <IoIosStar style={{ color: "#00b67a" }} />
              <p>Trustpilot</p>
            </div>
          </div>

        </div>
        <div className='w-full md:w-1/2 '>
          <img
            src="/images/intro.png"  // Ensure correct path if you use a relative path or provide a full URL
            width="100%"
            height="auto"
            style={{ borderRadius: '8px' }}
          />
        </div>
      </div>
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
        <Benefits BenefitCardsData={DoctorBenefitCards} />
      </section>
      <section className="my-12 sm:my-14 lg:mt-20 lg:mb-4 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
        <Forbes />
      </section>
      <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-[92px] py-6 px-5'>
        <SafeData SafeData={SafeDataDoctor} />
      </section>
      <div className='mx-auto max-w-3xl px-5'>
        <p className='text-4xl font-bold text-center mb-7'>
          {json.HomeAccrodion.MainHeading}
        </p>
        {json.AiDoctor.data?.map((data, index) => (
          <AccordionItem answer={data?.answer} question={data?.question} index={index} />
        ))}
      </div>
      <div className='mx-auto max-w-5xl mb-14'><p className='text-lg font-bold mt-5'>Have more questions? <a href="" className='text-theme_color ml-2 underline'> Contact us</a></p></div>
    </div>
  )
}