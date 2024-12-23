import React from 'react'
import json from "../../Json/Accordion.json"
import AccordionItem from './Accordion'
const HomeAccordion = () => {
    return (
        <div className='mx-auto max-w-3xl'>
            <p className='text-4xl font-bold text-center mb-7'>
                Have questions? Let’s find answers
            </p>
            {json?.map((data, index) => (
                <AccordionItem answer={data?.description} question={data?.title} index={index} />
            ))}
            <p className='text-lg font-bold mt-5'>Have more questions? <a href="" className='text-theme_color ml-2 underline'> Contact us</a></p>
        </div>
    )
}

export default HomeAccordion