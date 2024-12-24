"use client"

import React, { useState } from "react";
import blogdata from "../Json/blog.json";
import { Poster } from "./ui/Poster";
import { Cards } from "./ui/Cards";
import { BlogCards } from "../types/blogInterface";

export const Blog = () => {
    const { blogHeroSection, BlogPoster } = blogdata;
    const { BlogCards }: { BlogCards: BlogCards[] } = blogdata;
    const TotalCards = BlogCards.length

    const [loadingCards, setLoadingCards] = useState(6);
    const handleLoadingCards = () => {
        if (loadingCards > TotalCards) {
            setLoadingCards(TotalCards)
        }
        else {
            setLoadingCards(loadingCards + 3);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <section className="flex flex-col md:flex-row items-center py-8 mx-auto max-w-7xl lg:px-16 px-5">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-[46px] leading-[32px] md:leading-[56px] text-center font-bold text-gray-800 mb-4">
                        {blogHeroSection.title}
                    </h1>
                    <p className="text-gray-600 mb-4 text-center text-base md:text-lg">{blogHeroSection.subtitle}</p>
                </div>
            </section>
            {/* Hero Section --- featured Article */}
            <section className="flex flex-col md:flex-row gap-10 sm:gap-8 xl:py-4 mx-auto max-w-7xl lg:px-16 px-5">
                <div className="md:w-1/2 content-center">
                    <img
                        src={blogHeroSection.featuredArticle.image}
                        alt="Featured Article"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="md:w-1/2 flex flex-col justify-between">
                    <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-800 leading-[34px] sm:leading-[42px] lg:leading-[56px]">
                        {blogHeroSection.featuredArticle.title}
                    </h1>
                    <p className="text-gray-400 text-sm mt-5">
                        Author
                        <a className="text-gray-700 block font-medium cursor-pointer underline underline-offset-1 hover:no-underline mt-1">
                            {blogHeroSection.featuredArticle.author}
                        </a>
                        <span className="text-gray-700 block font-semibold my-5">
                            {blogHeroSection.featuredArticle.date} | {blogHeroSection.featuredArticle.readTime}
                        </span>
                    </p>
                    <p className="text-gray-600 text-base md:text-lg">{blogHeroSection.featuredArticle.description}</p>
                </div>
            </section>

            {/* AI Cards Section */}
            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-800 my-4 sm:my-8 lg:mt-16 lg:mb-12">Recent articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Cards CardsData={BlogCards} NumOfCards={4} />
                </div>
            </section>

            {/* Poster Section */}
            <section className="max-w-6xl mx-auto lg:px-16 py-0 sm:py-8 lg:py-16 px-5">
                <Poster PosterData={BlogPoster} buttonColor="Green"/>
            </section>

            {/* AI Cards Section */}
            <section className="max-w-7xl mx-auto lg:px-16 py-4 px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Cards CardsData={BlogCards} NumOfCards={loadingCards} />
                </div>
                <div className="text-center mt-10 mb-[84px]">
                    <button className="bg-[#1A847C] text-white font-semibold py-3 px-6 rounded-[4px] hover:bg-[#12635C] transition-colors w-full lg:w-fit"
                        onClick={handleLoadingCards}>
                        Load More
                    </button>
                </div>
            </section>
        </div>
    )
}