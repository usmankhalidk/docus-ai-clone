import React from "react";
import footerData from '../../Json/footer.json';

export const UpperFooter = () => {
    // Destructure JSON data
    const {
        component: {
            content: { title, button, features },
            styles: { backgroundColor, textColor, buttonTextColor },
        },
    } = footerData;

    return (
        <section
            className="py-8 sm:py-4 lg:py-16"
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
        >
            <div className="mx-auto mt-2 sm:mt-8 sm:mb-4 xl:w-1/2 lg:w-2/3 w-full lg:px-12 text-center">
                {/* Title */}
                <h1 className="text-3xl sm:text-3xl md:text-4xl md:leading-[48px] xl:px-10 lg:px-[72px] sm:px-4 font-bold text-center mb-6 mx-auto w-4/5 sm:w-3/5 lg:w-full">
                    {title}
                </h1>

                {/* Button */}
                <div className="px-5 lg:w-1/2 mx-auto">
                    <button
                        className="rounded-[4px] bg-button_color px-6 py-3 text-lg font-semibold text-white shadow-sm mt-6 w-full lg:w-fit bg-[#E95D53] hover:bg-[#D2544B]"
                        style={{
                            color: buttonTextColor
                        }}
                    >
                        {button.text}
                    </button>
                </div>

                {/* Features */}
                <ul className="flex flex-col lg:flex-row items-center justify-between w-full mt-7 text-sm sm:text-base xl:px-6 lg:px-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 my-1">
                            <span className="text-white">✓</span> {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}


