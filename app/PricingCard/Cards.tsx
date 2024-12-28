import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { IoIosCheckmark } from "react-icons/io";
import { WiStars } from "react-icons/wi";
import Link from 'next/link';
interface CardProps {
    name: string;
    price: string;
    details: Detail[];
    highlighted: boolean;
    yearly: string;
    isYearly: boolean;
    index: number;
    ismiddle: boolean;
}
interface Detail { text: string; checked: boolean; bold?: string }

const Cards: React.FC<CardProps> = ({ name, price, details, highlighted, yearly, isYearly, index, ismiddle }) => {
    return (
        <div className={`border rounded-lg p-7 flex flex-col gap-6  `} style={highlighted ? { backgroundColor: "rgb(233, 243, 242)" } : { backgroundColor: "" }}>
            <h2 className='text-4xl font-bold flex items-center '>{ismiddle ? <WiStars className='text-theme_color size-10' /> : " "}   {name}</h2>
            <div className='flex flex-col gap-1'>
                <h4 className='text-lg font-bold text-gray-600'> {isYearly ? yearly : price}</h4>
                <p className='text-[11px]'>{index === 0 ? "No Credit Card Required" : isYearly && index === 1 || index === 2 ? "Cancel Anytime" : ` Billed annually ${index === 1 ? yearly : price}`}</p></div>
            <Link href="/signup"> <button type="submit"
                className={`rounded-sm  px-5 py-3 text-lg font-semibold ${highlighted ? "bg-theme_color hover:bg-theme_color_onHover text-white " : ""} text-theme_color shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-theme_color hover:bg-theme_color hover:text-white w-full my-3 `}>Get Started</button></Link>
            {details.map((object, index) => (
                <p key={index} className='flex items-center text-sm'> {object.checked ? <RxCross2 className='size-3 mr-1' /> : <IoIosCheckmark className='size-5 text-theme_color' />} <b>{object?.bold}</b>{object.text}</p>
            ))}
        </div >
    );
};

export default Cards;
