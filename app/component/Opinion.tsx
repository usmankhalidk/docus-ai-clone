"use client"

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
import blogdata from "../Json/blog.json"
import { SafeData } from "./Home/SafeData";
import HomeAccordion from "./Home/HomeAccordion";
import { Poster } from "./ui/Poster";
import { Counts } from "./ui/Counts";
import { MainTitle } from "../types/blogInterface";
import { Benefits } from "./Home/Benefits";
import { Forbes } from "./Home/Forbes";

// Main Section
export const Opinion = () => {

    const { SpecialistDoctors } = labdata
    const { OpinionPoster } = blogdata
    const { MainTitle }: { MainTitle: MainTitle } = labdata
    const { OpinionHeroSection, SafeDataOpinion, OpinionBenefitCards, Doctors, OpinionCounts } = homedata

    return (
        <div>

            <section className="flex flex-col items-center justify-center py-8 mx-auto max-w-7xl lg:px-16 px-5 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-[46px] leading-[32px] md:leading-[56px] text-center font-bold text-gray-800 mb-4">
                        {OpinionHeroSection.title}
                    </h1>
                    <p className="text-gray-600 text-center text-base md:text-lg">{OpinionHeroSection.subtitle}</p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-2 px-5 mb-12 mt-2">
                <Counts CountsData={OpinionCounts} />
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Doctors.map((doctor, index) => (
                        <div
                            key={index}
                            className="border rounded-lg shadow-sm hover:shadow flex flex-col group cursor-pointer overflow-hidden"
                        >
                            <div>
                                <img src={doctor.image} alt={doctor.name} className="mb-4 object-cover" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg sm:text-xl sm:leading-[30px] group-hover:text-[#1A847C] font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                                <p className="text-gray-600 text-sm">{doctor.country}</p>
                                <p className="text-gray-600 text-base mb-2">{doctor.experience}</p>
                                <p className="text-gray-600 text-base px-1 mb-5">{doctor.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10 mb-12">
                    <button className="bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        Choose Top Doctor
                    </button>
                </div>
            </section>

            <section className="max-w-6xl mx-auto lg:px-16 py-0 sm:py-8 lg:py-10 px-5">
                <Poster PosterData={OpinionPoster} buttonColor="Green" />
            </section>

            <section className="my-14 sm:my-24 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
                <Forbes />
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <Benefits BenefitCardsData={OpinionBenefitCards} />
            </section>

            <section className='flex items-center justify-center max-w-[1128px] mx-auto lg:px-16 lg:py-20 py-6 px-5'>
                <SafeData SafeData={SafeDataOpinion} Warning={"Warning"}/>
            </section>

            <section className="py-12 sm:py-16">
                <div className="text-center py-12" style={{ backgroundColor: "rgb(39, 42, 61)" }}>
                    <img src="./images/ai-assistant.webp" alt="" className="mx-auto" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3 lg:mb-6">Docus AI Doctor</h3>
                    <p className="text-white text-base text-center sm:text-lg mb-6">Our AI-based virtual health assistant has answers to any question related to your health.</p>
                    <button className="bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        Chat with AI Doctor
                    </button>
                </div>
            </section>

            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center m-4 sm:mb-8">
                        Top Specialists for Medical Second Opinions
                    </h2>
                    <p className="text-gray-600 text-center text-base md:text-lg mb-12 lg:px-24">
                        Get a trusted second opinion from top U.S. and European specialists in Cardiology, Neurology, Oncology, Endocrinology, and more. Gain clarity and confidence by seeking an expert second opinion on our secure, user-friendly platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {SpecialistDoctors.map((specialist, index) => (
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

                <div className="text-center mt-10 mb-[84px]">
                    <button className="bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        View All Specialists
                    </button>
                </div>
            </section>

            <HomeAccordion />

        </div>
    )
}