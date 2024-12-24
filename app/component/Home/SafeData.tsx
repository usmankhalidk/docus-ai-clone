import React, { FC } from 'react'
import { PiKey } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { SafeDataPoster } from "../../types/blogInterface";

type LocalInterface = {
    SafeData: SafeDataPoster
}

export const SafeData: React.FC<LocalInterface> = ({ SafeData }) => {

    // const { SafeData }: { SafeData: SafeDataPoster } = data

    const { title, subtitle, content } = SafeData

    const iconMapping: Record<string, React.ElementType> = {
        Warning: IoWarningOutline,
        Key: PiKey,
        Security: IoShieldCheckmarkOutline,
    }

    return (
        <div className='rounded-3xl flex p-5 md:p-16 gap-6 lg:gap-12 flex-col lg:flex-row' style={{ backgroundColor: "rgb(39, 42, 61)" }}>
            <div className='flex flex-col justify-center text-center text-white gap-5 sm:gap-7 w-full lg:w-1/2'>
                <div className='flex items-center justify-center'>
                    <CiLock className='size-12' />
                </div>
                {title &&
                    <p className='text-2xl md:text-[46px] leading-[32px] md:leading-[56px] text-center font-bold'>{title}</p>}
                <div className='text-2xl md:text-[46px] leading-[32px] font-bold flex justify-center'>
                    <p className='bg-theme_color rounded-md -rotate-3 py-3 sm:py-4 px-8 sm:px-10 hover:scale-110 transition-all'>{subtitle}</p>
                </div>
            </div>
            <div className='w-full lg:w-1/2'>
                {content.map((item, index) => {
                    const Icon = iconMapping[item.icon];
                    return (
                        <div key={index} className="flex lg:px-5 mt-6 text-white gap-4 font-semibold">
                            <div><Icon className="size-6 mt-2" /></div>
                            <p className="text-sm sm:text-lg">
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}