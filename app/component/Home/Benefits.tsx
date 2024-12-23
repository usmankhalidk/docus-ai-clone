import React from 'react'
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
const Benefits = () => {
    return (
        <>
            <div className='mx-auto max-w-6xl '>
                <div className='px-5 md:px-0'>
                    <p className='text-4xl font-bold text-center mb-6'>
                        Benefits of Personal AI Health Assistant
                    </p>
                    <p className='text-lg text-center mb-6'>
                        We have all you need to better understand your health and make informed and accurate decisions about your well-being.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <div className='border rounded-md p-5 flex flex-col gap-4' style={{ backgroundColor: "rgb(233, 243, 242)" }}>
                            <FaHandHoldingMedical className='size-8 text-theme_color' />
                            <p className="text-xl font-bold">Proactive Preventive Care</p>
                            <p className='text-lg'>Utilize predictive analytics and expert advice to identify and manage health risks early, ensuring your long-term wellness.</p>
                        </div>
                        <div className='border rounded-md p-5 flex flex-col gap-4' style={{ backgroundColor: "rgb(233, 243, 242)" }}>
                            <FaPerson className='size-8 text-theme_color' />
                            <p className="text-xl font-bold">Tailored Health Solutions
                            </p>
                            <p className='text-lg'>Get health support tailored to your needs with personalized plans and strategies, available 24/7 to seamlessly fit your lifestyle.

                            </p>
                        </div>
                        <div className='border rounded-md p-5 flex flex-col gap-4' style={{ backgroundColor: "rgb(233, 243, 242)" }}>
                            <CgNotes className='size-8 text-theme_color' />
                            <p className="text-xl font-bold">In-Depth Health Insights
                            </p>
                            <p className='text-lg'>Gain a deeper understanding of your health with clear, actionable insights, helping you make informed decisions effortlessly.

                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center my-8'>
                        <button
                            type="submit"
                            className="rounded-sm bg-theme_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-theme_color_onHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Try Docus For Free
                        </button>
                    </div>
                </div>

            </div >

        </>
    )
}

export default Benefits