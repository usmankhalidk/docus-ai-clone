import dynamic from 'next/dynamic';
import React from 'react'
import { IoIosStar } from "react-icons/io";
const HeroSection = () => {

    return (
        <div className='flex flex-row items-center mx-auto max-w-6xl mt-10 sm:mt-16 md:mt-28 px-5  lg:px-0'>
            <div className='flex flex-col gap-8 w-full md:w-1/2 pr-5 '>
                <p className='text-4xl sm:text-5xl md:text-5xl font-bold line leading-tight md:leading-snug'>
                    <p>Your Personal</p>
                    <p>Health Assistant</p>
                    <p className='text-theme_color'>Powered by AI</p>
                </p>
                <p className='text-base md:text-lg'>
                    Prevent potential health issues and effectively manage your health. Gain insights with our AI Doctor and validate them with top US and European doctors.
                </p>
                <div className='flex items-center justify-center md:justify-start'>
                    <button
                        type="submit"
                        className="rounded-sm bg-theme_color px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-theme_color_onHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Try Docus For Free
                    </button>
                </div>
                <div className='flex items-center gap-5 justify-center md:justify-start'>
                    <p className='font-semibold'>Excellent</p>
                    <div className='flex items-center gap-1' title="4.9 out of 5 star rating on Trustpilot">
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                        <div className='size-5  flex items-center justify-center' style={{ backgroundColor: "#00b67a" }}>
                            <IoIosStar className='text-white' />
                        </div>
                    </div>
                    <div className='flex items-center' title="Trustpilot">
                        <IoIosStar style={{ color: "#00b67a" }} />
                        <p>Trustpilot</p>
                    </div>
                </div>

            </div>
            <div className='w-1/2 hidden md:block'>
                <video
                    src="https://docus.ai/home/intro.webm"  // Ensure correct path if you use a relative path or provide a full URL
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    width="100%"
                    height="auto"
                    style={{ borderRadius: '8px' }}
                />
            </div>
        </div>
    )
}

export default HeroSection