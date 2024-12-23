import React from "react";
import { Card } from "../../types/blogInterface";

export const Cards: React.FC<{ CardsData: Card[], NumOfCards: number }> = ({ CardsData, NumOfCards }) => {
    return (
        <>
            {CardsData.slice(0, NumOfCards).map((card, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start bg-white rounded-lg p-5 hover:shadow-md transition-shadow border border-solid cursor-pointer"
                >
                    {card.image &&
                        <img src={card.image} alt={card.title} className="w-full object-cover mb-5 p-2 sm:p-0" />
                    }
                    {card.category &&
                        <span className="text-xs sm:text-sm text-gray-700 font-medium underline underline-offset-1 hover:no-underline mb-4">
                            {card.category}
                        </span>
                    }
                    {card.title &&
                        <h3 className="text-base sm:text-lg md:text-xl sm:leading-[30px] font-semibold text-gray-800 mb-3">
                            {card.title}
                        </h3>
                    }
                    {card.date &&
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            {card.date} | {card.readTime}
                        </p>
                    }
                    {card.GlossaryCardsImage &&
                        <img src={card.GlossaryCardsImage} alt={card.GlossaryCardstitle} className="w-full object-cover mb-5 lg:mb-6" />
                    }
                    {card.GlossaryCardstitle &&
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-6">
                            {card.GlossaryCardstitle}
                        </h2>
                    }
                    {card.GlossaryCardsDescription &&
                        <p className="text-gray-600 text-base sm:text-lg mb-1">
                            {card.GlossaryCardsDescription}
                        </p>
                    }
                </div>
            ))}
        </>
    )
}