'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Card {
    imgSrc: string;
    text: string;
    name: string;
    imageUrl: string;
}

interface CarouselProps {
    cards: Card[];
    title?: string;
    description?: string;
    customSettings?: object; // Allows for additional `react-slick` settings.
}

const Carousel: React.FC<CarouselProps> = ({
    cards,
    title = "Carousel Title",
    description = "Carousel Description",
    customSettings = {}
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const defaultSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        customPaging: (i: number) => (
            <div
                className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-theme_color" : "bg-gray-300"
                    }`}
            />
        ),
        appendDots: (dots: React.ReactNode) => (
            <div className="flex justify-center mt-4">{dots}</div>
        ),
        beforeChange: (_oldIndex: number, newIndex: number) => {
            setCurrentIndex(newIndex / 3);
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        ...customSettings, // Allow overriding default settings with props
    };

    return (
        <div className="mx-auto max-w-6xl px-5 md:px-0 my-20">
            {title && <p className="text-4xl font-bold text-center mb-6">{title}</p>}
            {description && <p className="text-lg text-center mb-6">{description}</p>}
            <Slider {...defaultSettings}>
                {cards.map((card, index) => (
                    <div key={index} className="p-4">
                        <div
                            className="rounded-lg border p-6 flex flex-col gap-6"
                            style={{ backgroundColor: "rgb(233, 243, 242)" }}
                        >
                            <div>
                                <img src={card.imgSrc} alt="quotation" style={{ height: "20px" }} />
                            </div>
                            <div className="h-60 md:h-72">
                                <p className="text-base w-full">{card.text}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-0 md:mt-10">
                                <img
                                    src={card.imageUrl}
                                    alt={card.name}
                                    className="rounded-full w-12 h-12"
                                />
                                <p className="text-base font-bold">{card.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;