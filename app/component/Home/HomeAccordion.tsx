import React from 'react'
import json from "../../Json/Accordion.json"
import AccordionItem from './Accordion'
import Link from 'next/link'
const HomeAccordion = () => {
    return (
        <>
            <div className='mx-auto max-w-3xl px-5'>
                <p className='text-4xl font-bold text-center mb-7'>
                    {json.HomeAccrodion.MainHeading}
                </p>
                {json.HomeAccrodion.data?.map((data, index) => (
                    <AccordionItem answer={data?.description} question={data?.title} index={index} />
                ))}

            </div>
            <div className='mx-auto max-w-5xl mb-14'><p className='text-lg font-bold mt-5'>Have more questions? <Link href="/contact" className='text-theme_color ml-2 underline'> Contact us</Link></p></div></>
    )
}

export default HomeAccordion