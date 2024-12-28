import Link from 'next/link';
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

const HealthInformed = () => {
    return (
        <>
            <div className='mx-auto max-w-6xl '>
                <div className='px-5 md:px-0'>
                    <p className='text-3xl sm:text-[34px] lg:text-[38px] font-bold text-center mb-6'>
                        Make Informed Health Decisions
                    </p>
                    <p className='text-lg text-center mb-6'>
                        We have all you need to better understand your health and make informed and accurate decisions about your well-being.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-3 p-6 hover:shadow-lg rounded-md border' style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                            <img src="https://docus.ai/_next/image?url=%2Fhome%2Fservices%2Fhome_ai_doctor.png&w=1920&q=100" alt="" className='size-24' />
                            <p className='text-2xl md:text-3xl font-bold'>Personal AI Doctor</p>
                            <p className='text-lg'>Customize your personal AI Doctor. Simply complete your health profile, ask your health questions, and receive personalized, data-driven advice.</p>
                            <p className='text-base'><span className='text-theme_color'>✓ </span>Get tailored insights</p>
                            <p className='text-base'><span className='text-theme_color'>✓ </span> Discover your health risks</p>
                            <p className='text-base'><span className='text-theme_color'>✓ </span> Get personal checkup plans</p>
                            <p className='text-base'><span className='text-theme_color'>✓ </span> Generate health reports</p>
                            <Link href="ai-doctor" className='flex items-center justify-end text-lg text-theme_color font-bold'>
                                <p className='pr-1'>Chat with AI Doctor </p>
                                <FaLongArrowAltRight />
                            </Link>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='p-6 hover:shadow-md flex flex-col gap-6 rounded-md border' style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                                <div className='flex gap-8 flex-col md:flex-row'>
                                    <img src="https://docus.ai/_next/image?url=%2Fhome%2Fservices%2Fhome_lab_tests.png&w=1920&q=100" alt="" className='size-24 ' />
                                    <div>
                                        <p className="mb-4 text-lg md:text-xl font-bold">Lab Test Interpretation</p>
                                        <p className='text-base md:text-lg'>Upload your lab results to receive in-depth biomarker interpretations and detailed lab test reports.</p>
                                    </div>
                                </div>

                                <Link href="/lab-test-interpretation" className='flex items-center justify-end text-lg text-theme_color font-bold'>
                                    <p className='pr-1'>Go To Lab Test </p>
                                    <FaLongArrowAltRight />
                                </Link>


                            </div>
                            <div className='p-6 hover:shadow-md flex flex-col gap-6 rounded-md border' style={{ backgroundColor: "rgb(245, 245, 245)" }}>
                                <div className='flex gap-8 flex-col md:flex-row'>
                                    <img src="https://docus.ai/_next/image?url=%2Fhome%2Fservices%2Fhome_top_doctors.png&w=1920&q=100" alt="" className='size-24 ' />
                                    <div>
                                        <p className="mb-4 text-lg md:text-xl font-bold">Top Doctors Access</p>
                                        <p className='text-base md:text-lg'>Connect with over 350 top doctors from the US and Europe for expert second opinions and validation of AI-driven health insights.</p>
                                    </div>
                                </div>

                                <Link href="/second-opinion" className='flex items-center justify-end text-lg text-theme_color font-bold'>
                                    <p className='pr-1'>Get Second Opinion </p>
                                    <FaLongArrowAltRight />
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HealthInformed