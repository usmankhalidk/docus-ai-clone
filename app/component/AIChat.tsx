import Link from 'next/link'
import React from 'react'
import { IoMdSend } from "react-icons/io";
const AIChat = () => {
    return (
        <>
            <div className='mx-auto max-w-4xl '>
                <div className='px-5 md:px-0'>

                    <p className='text-3xl sm:text-[34px] lg:text-[38px] font-bold text-center mb-3'>
                        Experience AI Doctor in Action

                    </p>
                    <p className='text-lg text-center mb-6'>
                        Chat directly. Ask any health-related question and see real-time AI-driven responses.
                    </p>

                    <div className='rounded-lg flex flex-col justify-center gap-32 ' style={{ backgroundColor: "rgb(245, 245, 245)", border: "1px solid rgb(234, 234, 236)" }}>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-center mt-5 md:mt-15 sm:mt-10 '>   <img src="/images/assistant.png" alt="" className='h-28' /></div>
                            <p className='text-center text-lg'>I'm here to support with any health-related questions you may have.</p>
                            <p className='text-center text-lg font-bold'>How can I help you?</p>
                        </div>
                        <div>
                            <p className='text-center text-lg font-bold'><Link href="/signup"> <span className='text-theme_color underline'>Sign up</span> </Link>To Continue With AI Doctor</p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 py-5'>
                                <Link href="/signup">         <button className='rounded-md flex items-center justify-between text-theme_color text-lg font-bold p-3 border border-theme_color hover:bg-chathoverbg w-full'> I have More Questions  <IoMdSend /></button></Link>
                                <Link href="/signup">         <button className='rounded-md flex items-center justify-between text-theme_color text-lg font-bold p-3 border border-theme_color hover:bg-chathoverbg w-full'> What Should I do Next ?  <IoMdSend /></button></Link>
                                <Link href="/signup">         <button className='rounded-md flex items-center justify-between text-theme_color text-lg font-bold p-3 border border-theme_color hover:bg-chathoverbg w-full'> Can You Analyze my Test Results ? <IoMdSend /></button></Link>
                                <Link href="/signup">         <button className='rounded-md flex items-center justify-between text-theme_color text-lg font-bold p-3 border border-theme_color hover:bg-chathoverbg w-full'> I Need Advice From A top Doctor  <IoMdSend /></button></Link>
                            </div>
                        </div>
                    </div>

                    <p className='text-sm text-center max-w-2xl mx-auto mt-4'><span className='font-bold'> Please Note! </span>This tool is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always consult a professional before taking any action.</p>


                </div>
            </div>
        </>
    )
}

export default AIChat