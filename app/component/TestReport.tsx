"use client"

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
import blogdata from "../Json/blog.json"
import { SafeData } from "./Home/SafeData";
import { HIPA } from "./Home/HIPA";
import HomeAccordion from "./Home/HomeAccordion";
import { Poster } from "./ui/Poster";
import { Counts } from "./ui/Counts";
import { MainTitle } from "../types/blogInterface";
import { Benefits } from "./Home/Benefits";
import { Forbes } from "./Home/Forbes";

// Main Section
export const TestReport = () => {

    const { TestTypes, BloodTestPoster, LabPoster } = labdata
    const { MainTitle }: { MainTitle: MainTitle } = labdata
    const { SafeDataBloodTest, BloodTestBenefitCards, BloodTestCounts } = homedata

    return (
        <div>

            <section>
                <HIPA />
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <Benefits BenefitCardsData={BloodTestBenefitCards} />
            </section>

            <section className="max-w-6xl mx-auto lg:px-16 py-0 sm:py-8 lg:py-10 px-5">
                <Poster PosterData={BloodTestPoster} buttonColor="Green" />
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-2 px-5 my-14">
                <Counts CountsData={BloodTestCounts} />
            </section>

            <section className="my-14 sm:my-24 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
                <Forbes />
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center m-4 sm:mb-8">
                        Blood Test Types Supported
                    </h2>
                    <p className="text-gray-600 text-center text-base md:text-lg mb-12 lg:px-24">
                        We support numerous essential blood test types, including:
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TestTypes.map((specialist, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg px-4 py-5 hover:shadow-sm flex justify-between items-center border-l-[16px] ${index === 0 || index === 3 || index === 4
                                ? "border-[#A9AAB1] hover:border-[#272A3D] transition duration-300"
                                : "border-[#EDB4A3] hover:border-[#E95D53] transition duration-300"
                                }`}
                        >
                            <div className="flex flex-row">
                                <span className="pe-5">
                                    <h3 className="text-lg sm:text-xl text-left sm:leading-[30px] font-semibold text-gray-800 mb-3">
                                        {specialist.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-2">
                                        {specialist.description}
                                    </p>
                                </span>
                                <span className="text-gray-500 text-xl my-auto">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-20 py-6 px-5'>
                <SafeData SafeData={SafeDataBloodTest} />
            </section>

            <section className="py-12 sm:py-16">
                <Poster PosterData={LabPoster} buttonColor="Red" posterClasses="border-0 p-5 md:p-10 rounded-none lg:px-[188px] lg:py-12" />
            </section>

            <HomeAccordion />

        </div>
    )
}