'use client'
import React, { useState } from 'react'
import json from "../Json/Accordion.json"
import AccordionItem from './Home/Accordion'
import { Forbes } from './Home/Forbes'
import { FaPercentage } from "react-icons/fa";
import Cards from '../PricingCard/Cards';
import plans from "../Json/PricingCard.json"
const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
    const handleToggle = () => {
        setIsYearly(prevState => !prevState);
    };

    return (
        <>
            {/* Pricing Cards */}
            <div className='flex flex-col gap-8 mx-auto max-w-6xl mt-16 md:mt-28 px-5 md:px-0'>
                <p className='text-center text-5xl font-bold line leading-snug'>
                    Plans & Pricing
                </p>
                <p className='text-base md:text-lg text-center'>
                    Pay by the month or the year, and cancel at any time.
                </p>
                <div className='flex items-center justify-center flex-col gap-2'>
                    <label htmlFor="filter" className="switch" aria-label="Toggle Filter">
                        <input
                            type="checkbox"
                            id="filter"

                            onChange={handleToggle}
                        />
                        <span>Yearly  %</span>
                        <span>Monthly</span>
                    </label>
                    <p className='text-theme_color font-bold text-sm'>Save up to 45% with Yearly!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"> {plans.map((plan, index) => (<Cards key={index} index={index} name={plan.name} price={plan.price} details={plan.details} yearly={plan.yearly} highlighted={plan.highlighted} isYearly={isYearly} ismiddle={plan.ismiddleCard} />))} </div>
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
