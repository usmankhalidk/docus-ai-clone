import Link from "next/link";
import { Analysis } from "../../types/blogInterface";

type LocalInterface = {
    AnalysisData: Analysis
    isImageLeft: any
}

// Individual component
export const AI: React.FC<LocalInterface> = ({ AnalysisData, isImageLeft }) => {

    const { image, title, description, features, buttonText } = AnalysisData

    return (
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 my-10 sm:my-12 md:my-14 lg:my-20 last:lg:mb-0">
            {isImageLeft && (
                <img
                    src={image}
                    alt={title}
                    className="w-full lg:w-1/2 object-cover lg:pe-[100px] mb-4 sm:mb-6 lg:mb-0 px-2 md:px-16 lg:p-0"
                />
            )}
            <div className="text-center lg:text-left lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-left text-gray-800 mb-3 lg:mb-6">{title}</h2>
                <p className="text-gray-600 text-base text-left sm:text-lg mb-6">{description}</p>
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-teal-500 mt-1">✔</span>
                            <div>
                                <h3 className="text-lg sm:text-xl text-left sm:leading-[30px] font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-base text-left sm:text-lg mb-1">{feature.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link href="/signup">
                    <button className="mt-6 bg-theme_color text-white text-lg font-semibold px-6 py-3 rounded hover:bg-theme_color_onHover transition">
                        {buttonText}
                    </button></Link>
            </div>
            {!isImageLeft && (
                <img
                    src={image}
                    alt={title}
                    className="w-full lg:w-1/2 object-cover order-1 lg:order-2 lg:ps-[100px] mb-4 sm:mb-6 lg:mb-0 px-2 md:px-16 lg:p-0"
                />
            )}
        </div>
    )
}