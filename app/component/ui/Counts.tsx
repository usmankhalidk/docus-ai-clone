import React, { FC } from 'react'
import { Count } from "../../types/blogInterface";

type LocalInterface = {
    CountsData: Count[]
}

export const Counts: React.FC<LocalInterface> = ({ CountsData }) => {
    return (
        <div className="flex flex-col md:flex-row text-center justify-center gap-8">
            {CountsData.map((count, index) => (
                <div key={index}>
                    <h2 className="text-4xl font-bold text-[#1A847C] mb-2">{count.value}</h2>
                    <p className="text-gray-500 text-base font-semibold">{count.label}</p>
                </div>
            ))}
        </div>
    )
}