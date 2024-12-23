import React from 'react'
import { IoIosLock } from "react-icons/io";
import { GrShieldSecurity } from "react-icons/gr";
import { IoKeyOutline } from "react-icons/io5";
const SafeData = () => {
    return (
        <>
            <div className='flex items-center justify-center mx-auto max-w-5xl my-10 md:my-16'>
                <div className='border rounded-2xl flex  p-4 md:p-16 gap-6 md:gap-12 flex-col md:flex-row mx-5' style={{ backgroundColor: "rgb(39, 42, 61)" }}>
                    <div className='flex flex-col justify-center text-center text-white gap-7 w-full md:w-1/2'>
                        <div className='flex items-center justify-center'>
                            <IoIosLock className='size-12' />
                        </div>
                        <p className='text-3xl md:text-5xl font-bold'>Your Health Data</p>
                        <div className='text-3xl md:text-5xl font-bold flex justify-center'>
                            <p className='bg-theme_color py-3 px-9 rounded-lg -rotate-6'>Is safe</p>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <div className='flex p-5 text-white gap-3 font-semibold'>
                            <div>
                                <IoKeyOutline className='size-6 mt-1' /></div>
                            <p className='text-base md:text-lg'>No personally identifiable information is required to utilize the Docus AI Health Assistant and its associated features.</p>
                        </div>
                        <div className='flex p-5 text-white gap-3 font-semibold'>
                            <div>
                                <GrShieldSecurity className='size-6 mt-1' /></div>
                            <p className='text-base md:text-lg'>No personally identifiable information is required to utilize the Docus AI Health Assistant and its associated features.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SafeData