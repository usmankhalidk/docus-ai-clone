import React from 'react'
import json from "../Json/Accordion.json"
import AccordionItem from './Home/Accordion'
import { Forbes } from './Home/Forbes'
import { FaPercentage } from "react-icons/fa";
const Pricing = () => {
    return (
        <>
            {/* Pricing Cards */}
            <div className='flex flex-col gap-6 mx-auto max-w-6xl mt-16 md:mt-28 px-5 md:px-0'>
                <p className='text-center text-5xl font-bold line leading-snug'>
                    Plans & Pricing
                </p>
                <p className='text-base md:text-lg text-center'>
                    Pay by the month or the year, and cancel at any time.
                </p>
                <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
                    <input
                        type="checkbox"
                        id="filter"

                    // onChange={handleChange}
                    />
                    <span>Yearly ٪</span>
                    <span>Monthly</span>
                </label>
            </div>
            <section className="my-14 sm:my-20 flex items-center justify-center gap-8 md:gap-12 lg:gap-28 sm:flex-row flex-col">
                <Forbes />
            </section>
            <div className='mx-auto max-w-3xl px-5'>
                <p className='text-4xl font-bold text-center mb-7'>
                    {json.HomeAccrodion.MainHeading}
                </p>
                {json.Pricing.data?.map((data, index) => (
                    <AccordionItem answer={data?.answer} question={data?.question} index={index} />
                ))}

            </div>
            <div className='mx-auto max-w-5xl mb-14'><p className='text-lg font-bold mt-5'>Have more questions? <a href="" className='text-theme_color ml-2 underline'> Contact us</a></p></div>
        </>
    )
}

export default Pricing
