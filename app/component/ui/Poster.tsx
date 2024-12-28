'use client'
import React, { useState } from "react";
import { PosterInterface } from "../../types/blogInterface";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import Link from "next/link";
type LocalInterface = {
    PosterData: PosterInterface
    buttonColor: string
    posterClasses?: string
    isAccordion?: boolean
}
interface AccordionTitles {
    [key: number]: string;
}


export const Poster: React.FC<LocalInterface> = ({ PosterData, buttonColor, posterClasses, isAccordion }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeTitles, setActiveTitles] = useState<AccordionTitles>({
        1: "Choose a Doctor",
        2: "Communicate Health Condition",
        3: "Receive a medical Second Opinion",
    });

    const toggleAccordion = (index: number, title: string) => {
        setActiveIndex((prevIndex) => {
            if (prevIndex === index) {
                return null; // Keep it closed
            }
            return index; // Open the clicked section
        });

        // Only update the title when the section is opened (not when it's closed)
        setActiveTitles((prevTitles: any) => ({
            ...prevTitles,
            [index]: activeIndex === index ? prevTitles[index] : title,
        }));
    };
    const { title, button, description, image } = PosterData;
    return (
        <div className={`flex flex-col md:flex-row items-center rounded-lg gap-x-8 lg:gap-x-24 bg-neutral-100 border border-solid p-5 md:p-10 lg:p-20 ${posterClasses}`}>
            <div className="md:w-1/2">
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-800 lg:leading-[56px] mb-6">
                    {title}
                </h2>
                {isAccordion ? <div
                    id="accordion-flush"
                    data-accordion="collapse"
                    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                >
                    <h2 id="accordion-flush-heading-1">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                            onClick={() => toggleAccordion(1, "Choose a Doctor")}
                            aria-expanded={activeIndex === 1 ? "true" : "false"}
                            aria-controls="accordion-flush-body-1"
                        >
                            <span className={`text-black text-lg font-bold flex items-center gap-2 ${activeIndex == 1 ? "text-theme_color" : ""}`}><TbCircleNumber1Filled className="size-6 text-theme_color" /> {activeTitles[1]}</span>
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 rotate-180 shrink-0 ${activeIndex === 1 ? "" : "rotate-180"
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-1"
                        className={`py-1 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${activeIndex === 1 ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                        aria-labelledby="accordion-flush-heading-1"
                    >
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Find the right doctor among 350+ top doctors. Choose your preferred consultation type - written or video.
                        </p>
                    </div>

                    <h2 id="accordion-flush-heading-2">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                            onClick={() => toggleAccordion(2, "Communicate Health Condition")}
                            aria-expanded={activeIndex === 2 ? "true" : "false"}
                            aria-controls="accordion-flush-body-2"
                        >
                            <span className={`text-black text-lg font-bold flex items-center gap-2 ${activeIndex == 2 ? "text-theme_color" : ""}`}><TbCircleNumber2Filled className="size-6 text-theme_color" /> {activeTitles[2]}</span>
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 rotate-180 shrink-0 ${activeIndex === 2 ? "" : "rotate-180"
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-2"
                        className={`py-1 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${activeIndex === 2 ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                        aria-labelledby="accordion-flush-heading-2"
                    >
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Provide details about your symptoms, medical history, test results, and any relevant information about your condition.
                        </p>
                    </div>

                    <h2 id="accordion-flush-heading-3">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                            onClick={() => toggleAccordion(3, "Receive a medical Second Opinion")}
                            aria-expanded={activeIndex === 3 ? "true" : "false"}
                            aria-controls="accordion-flush-body-3"
                        >
                            <span className={`text-black text-lg font-bold flex items-center gap-2 ${activeIndex == 3 ? "text-theme_color" : ""}`}><TbCircleNumber3Filled className="size-6 text-theme_color" /> {activeTitles[3]}</span>
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 rotate-180 shrink-0 ${activeIndex === 3 ? "" : "rotate-180"
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5 5 1 1 5"
                                />
                            </svg>
                        </button>
                    </h2>
                    <div
                        id="accordion-flush-body-3"
                        className={`py-1 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${activeIndex === 3 ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                        aria-labelledby="accordion-flush-heading-3"
                    >
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Based on provided details, the expert will share their medical second opinion during the consultation.
                        </p>
                    </div>
                </div> : <p className="text-gray-600 text-base sm:text-lg mb-7">{description}</p>}
                <Link href="/signup" >
                    <button className={`${buttonColor === "Green" ? "bg-theme_color" : "bg-button_color"} ${buttonColor === "Green" ? "hover:bg-theme_color_onHover" : "hover:bg-button_color_onHover"} text-white font-semibold py-3 px-6 rounded-[4px] transition-colors w-full md:w-fit text-center ${isAccordion ? "mt-6" : ""}`} >
                        {button.text}
                    </button></Link>
            </div>
            <div className="md:w-1/2 content-center mt-6 sm:mt-0">
                <img
                    src={image}
                    alt="Poster"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div >
    )
}