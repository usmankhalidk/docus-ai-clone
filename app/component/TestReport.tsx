"use client"

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
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

    const { TestTypes, BloodTestPoster, LabPoster, Tags } = labdata
    const { MainTitle }: { MainTitle: MainTitle } = labdata
    const { SafeDataBloodTest, BloodTestBenefitCards, BloodTestCounts } = homedata

    return (
        <div>

            <div className='flex flex-col md:flex-row items-center mx-auto max-w-6xl mt-10 sm:mt-16 md:mt-28 px-5 lg:px-0'>
                <div className='flex flex-col gap-6 w-full'>
                    <div className="flex flex-col sm:flex-row gap-10 items-center px-2 lg:px-40 xl:px-48 mb-2" >
                        <p className='text-4xl sm:text-5xl md:text-5xl text-center sm:text-right font-bold leading-tight md:leading-snug'>
                            Get Your <span className='text-theme_color'> Blood Work </span> Interpreted Online
                        </p>
                        <img
                            src="../images/blood-hero-img.webp" alt="" className="w-40"
                        />
                    </div>
                    <p className='text-base md:text-lg text-center mb-2'>
                        Effortlessly understand the insights your blood holds with Docus AI Doctor.
                    </p>
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:py-2 md:py-3 gap-4'>
                        <button
                            type="submit"
                            className="rounded-[4px] bg-theme_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-theme_color_onHover"
                        >
                            Start Your Free Analysis
                        </button>
                        <button
                            type="submit"
                            className="rounded-[4px] border border-[#1a847c] px-5 py-3 text-lg text-[#1a847c] hover:text-white font-semibold shadow-sm hover:bg-theme_color"
                        >
                            Join us as a Partner Lab
                        </button>
                    </div>
                    <div className='flex items-center gap-5 justify-center mx-4 mt-2'>
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
            </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-20">
                    {TestTypes.map((specialist, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg px-4 py-5 hover:shadow-sm flex justify-between items-center border-l-[16px] border-[#EDB4A3] hover:border-[#E95D53] transition duration-300`}
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

            <section className="bg-neutral-100 mb-6 md:mb-12 lg:mb-8">
                <div className="mx-auto max-w-7xl lg:px-16 px-5 py-12 sm:py-16 md:py-20 xl:py-24">
                    <h2 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 text-center sm:text-left my-4 sm:mb-8">Blood Biomarker Insights</h2>
                    <p className="text-gray-600 text-center sm:text-left text-base md:text-lg mb-12">
                        We can analyze and explain hundreds of blood biomarkers. Explore key examples:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {Tags.map((item, index) => (
                            <span
                                key={index}
                                className="bg-[#E9F3F2] text-[#408C8B] px-3 py-1 rounded-[4px] text-sm sm:text-base border border-[#D4E8E7]"
                            >
                                {item.tag}
                            </span>
                        ))}
                    </div>
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