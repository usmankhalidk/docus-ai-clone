"use client"

import React from "react";
import labdata from "../Json/lab.json"
import homedata from "../Json/home.json"
import blogdata from "../Json/blog.json"
import { SafeData } from "./Home/SafeData";
import { Poster } from "./ui/Poster";
import { Counts } from "./ui/Counts";
import { MainTitle } from "../types/blogInterface";
import { Benefits } from "./Home/Benefits";
import { Forbes } from "./Home/Forbes";
import AccordionItem from "./Home/Accordion";
import json from "../Json/Accordion.json"
import cardData from "../Json/Carousal.json"
import Carousel from "./Home/Carousal";
export const Opinion = () => {

    const { LabPoster } = labdata
    const { OpinionPoster } = blogdata
    const { MainTitle }: { MainTitle: MainTitle } = labdata
    const { OpinionHeroSection, SafeDataOpinion, OpinionBenefitCards, Doctors, OpinionCounts } = homedata

    return (
        <div>

            <section className="flex flex-col items-center justify-center py-8 mx-auto max-w-7xl lg:px-16 px-5">
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
                            className="border rounded-lg shadow-sm hover:shadow flex flex-col group cursor-pointer"
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
                <SafeData SafeData={SafeDataOpinion} />
            </section>
            <Carousel
                cards={cardData?.aidoctor?.data}
                title={cardData?.aidoctor?.title}
                description={cardData?.aidoctor?.description}
            />
            <section className="py-12 sm:py-16">
                <Poster PosterData={LabPoster} buttonColor="Red" posterClasses="border-0 p-5 md:p-10 rounded-none lg:px-[188px] lg:py-12" />
            </section>

            <section className="py-12 sm:py-16">
                <div className="text-center">
                    <img src="" alt="" />
                    <h3>Docus AI Doctor</h3>
                    <h4>Our AI-based virtual health assistant has answers to any question related to your health.</h4>
                    <button className="bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        Chat with AI Doctor
                    </button>
                </div>
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