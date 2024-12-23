'use client'

import { useState, useRef, useEffect } from 'react';
interface AccordionItemProps {
    index: number;
    question: string;
    answer: string;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ index, question, answer }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<string>('0px');

    useEffect(() => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current?.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);
    const downSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
    );
    const upSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
        </svg>
    );
    return (
        <div className="border-b border-slate-200 ">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-5 text-slate-800"
            >
                <span className='text-lg font-bold'>{question}</span>
                <span className="text-slate-800 transition-transform duration-300">
                    {isOpen ? upSVG : downSVG}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight, overflow: 'hidden' }}
                className="transition-all duration-500 ease-in-out"
            >
                <div className="pb-5 text-base text-slate-500">{answer}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
