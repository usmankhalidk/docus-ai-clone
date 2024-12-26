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
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

// Main Section
export const LAB = () => {
  const { LabAnalysis, MainTitle }: { LabAnalysis: LabAnalysis[], MainTitle: MainTitle } = labdata
  const { testTypes }: { testTypes: Feature[] } = labdata
  const { LabPoster } = labdata
  const { SafeDataLab, LabBenefitCards, LabCounts } = homedata
  return (
    <div>

      <div className='flex flex-col md:flex-row items-center mx-auto max-w-6xl mt-10 sm:mt-16 md:mt-28 px-5 xl:px-0'>
        <div className='flex flex-col gap-6 w-full md:w-1/2 lg:pr-8 order-2 md:order-1'>
          <p className='text-4xl sm:text-5xl md:text-5xl font-bold text-center md:text-left leading-tight md:leading-snug'>
            <p>Get Actionable </p>
            <p >Insights from </p>
            <p> Your <span className='text-theme_color'> Lab Tests </span></p>
          </p>
          <p className='text-base md:text-lg text-center md:text-left'>
            Our AI Doctor can easily analyze and interpret your lab tests, providing clear and actionable health information.
          </p>
          <div>
            <p className="text-base md:text-lg mb-2">Upload your lab tests</p>
            <p className="text-base md:text-lg mb-2">Receive valuable insights and recommendations</p>
            <p className="text-base md:text-lg mb-2">Make informed health decisions</p>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-center md:justify-start gap-4'>
            <button
              type="submit"
              className="rounded-[4px] bg-theme_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-theme_color_onHover w-full lg:w-fit"
            >
              Try for Free
            </button>
            <button
              type="submit"
              className="rounded-[4px] border border-[#1a847c] px-5 py-3 text-lg text-[#1a847c] hover:text-white font-semibold shadow-sm hover:bg-theme_color w-full lg:w-fit"
            >
              Join us as a Partner Lab
            </button>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start mx-4 mt-2'>
            <p className='font-medium'>Excellent</p>
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
        <div className='w-full md:w-1/2 order-1 md:order-2 mb-12 md:mb-0'>
          <img
            src="./images/lab-test-intro.webp"  
            // Ensure correct path if you use a relative path or provide a full URL
            width="100%"
            height="auto"
            style={{ borderRadius: '8px' }}
          />
        </div>
      </div>

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
            <Link
              key={index}
              href='/lab-test-interpretation/blood-test'
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
            </Link>
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