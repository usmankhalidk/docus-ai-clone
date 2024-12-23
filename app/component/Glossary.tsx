import React from "react";
import data from "../Json/blog.json";
import { Poster } from "./ui/Poster";
import { Cards } from "./ui/Cards";
import { BlogCards, Card } from "../types/blogInterface";
export const Glossary = () => {
    const { GlossaryHeroSection, GlossaryPoster } = data;
    const { GlossaryCards }: { GlossaryCards: Card[] } = data;
    const TotalCards = GlossaryCards.length

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col md:flex-row items-center pt-8 mx-auto max-w-7xl lg:px-16 px-5">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-[46px] leading-[32px] md:leading-[56px] text-center font-bold text-gray-800 mb-2">
                        {GlossaryHeroSection.title}
                    </h1>
                    <p className="text-gray-600 text-center text-base md:text-lg">{GlossaryHeroSection.subtitle}</p>
                </div>
            </section>

            {/* AI Cards Section */}
            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Cards CardsData={GlossaryCards} NumOfCards={TotalCards} />
                </div>
            </section>

            {/* Poster Section */}
            <section className="max-w-6xl mx-auto lg:px-16 py-0 sm:py-8 lg:py-16 px-5 mb-12 sm:mb-16">
                <Poster PosterData={GlossaryPoster} />
            </section>

        </div>
    )
}