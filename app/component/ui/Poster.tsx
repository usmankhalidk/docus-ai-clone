import React from "react";
import { PosterInterface } from "../../types/blogInterface";

type LocalInterface = {
    PosterData: PosterInterface
    buttonColor: string
    posterClasses?: string
}

export const Poster: React.FC<LocalInterface> = ({ PosterData, buttonColor, posterClasses }) => {

    const { title, button, description, image } = PosterData;
    return (
        <div className={`flex flex-col md:flex-row items-center rounded-lg gap-x-8 lg:gap-x-24 bg-neutral-100 border border-solid p-5 md:p-10 lg:p-20 ${posterClasses}`}>
            <div className="md:w-1/2">
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-800 lg:leading-[56px] mb-6">
                    {title}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-7">{description}</p>
                <button className={`${buttonColor === "Green" ? "bg-theme_color" : "bg-button_color"} ${buttonColor === "Green" ? "hover:bg-theme_color_onHover" : "hover:bg-button_color_onHover"} text-white font-semibold py-3 px-6 rounded-[4px] transition-colors w-full md:w-fit text-center`}>
                    {button.text}
                </button>
            </div>
            <div className="md:w-1/2 content-center mt-6 sm:mt-0">
                <img
                    src={image}
                    alt="Poster"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    )
}