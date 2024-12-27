"use client"

import React from "react";
import data from "../Json/blog.json";
import { Poster } from "./ui/Poster";
import { QusetionsBlock } from "../types/blogInterface";

export const Knowledge = () => {
    const { KnowledgeHeroSection, KnowledgePoster } = data;
    const { knowledge }: { knowledge: QusetionsBlock[] } = data;

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col md:flex-row items-center pt-8 mx-auto max-w-6xl lg:px-16 px-5 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-[46px] leading-[32px] md:leading-[56px] text-center font-bold text-gray-800 mb-2">
                        {KnowledgeHeroSection.title}
                    </h1>
                    <p className="text-gray-600 text-center text-base md:text-lg">{KnowledgeHeroSection.subtitle}</p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl lg:px-16 px-5 pt-8 ">
                <div className="flex flex-col gap-7">
                    {knowledge.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:border-[#91C4C0] transition cursor-pointer"
                        >
                            <h2 className="text-base sm:text-lg md:text-xl sm:leading-[30px] font-semibold text-gray-800 mb-4">
                                {item.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-5">{item.description}</p>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="bg-[#E9F3F2] text-[#408C8B] px-4 py-2 rounded-[4px] text-sm border border-[#D4E8E7]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-sm">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Poster Section */}
            <section className="max-w-6xl mx-auto lg:px-16 py-0 sm:py-8 lg:py-16 px-5 mb-12 sm:mb-14">
                <Poster PosterData={KnowledgePoster} buttonColor="Green" />
            </section>

        </div>
    )
}