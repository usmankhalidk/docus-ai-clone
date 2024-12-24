import React from 'react'
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BenefitCardsData } from "../../types/blogInterface"

export const Benefits = ({ BenefitCardsData }: { BenefitCardsData: BenefitCardsData }) => {

    const { title, subtitle, content, buttonText } = BenefitCardsData

    const iconMapping: Record<string, React.ElementType> = {
        firstIcon: FaHandHoldingMedical,
        secondIcon: FaPerson,
        thirdIcon: CgNotes
    }

    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-gray-800 md:text-center m-4 sm:mb-8">{title}</h2>
                <p className="text-gray-600 text-center text-base md:text-lg mb-12">
                    {subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-6">
                {content.map((data, index) => {
                    const Icon = iconMapping[data.icon];
                    console.log(index)
                    return (
                        <div key={index} className='border rounded-md p-[22px] flex flex-col gap-4 shadow-sm' style={{ backgroundColor: "rgb(233, 243, 242)" }}>
                            <Icon className="size-8 text-theme_color mb-1" />
                            <h3 className="text-lg sm:text-xl text-left sm:leading-[30px] font-semibold text-gray-800">{data.cardtitle}</h3>
                            <p className="text-gray-600 text-base text-left sm:text-lg mb-1">{data.text}</p>
                        </div>
                    )
                })}
            </div>
            <div className='flex items-center justify-center my-5'>
                {buttonText &&
                    <button className="mt-6 bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        {buttonText}
                    </button>
                }
            </div>
        </>
    )
}
