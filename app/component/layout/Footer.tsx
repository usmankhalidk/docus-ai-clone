import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import footerData from '../../Json/footer.json'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#F5F8F8] p-5 py-12">
            <div className="mx-auto max-w-7xl lg:px-16">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* Logo and Description Section */}
                    <div className="md:w-1/4 flex flex-col">
                        <img
                            alt="Your Company Logo"
                            src="https://docus.ai/docus-dark-logo.svg"
                            className="h-6 me-auto"
                        />
                        <p className="mt-8 text-gray-600">Improving human health through the combination of cutting-edge technologies and top medical expertise.</p>
                        <div className="flex space-x-4 mt-6">
                            <Link href="/signup" className="text-gray-500 hover:text-green-50" target="_blank">
                                <FaTwitter className='w-6 h-6 p-1 rounded-[4px] text-white bg-black hover:bg-theme_color transition' />
                            </Link>
                            <Link href="/signup" className="text-gray-500 hover:text-green-50" target="_blank">
                                <FaFacebookF className='w-6 h-6 p-1 rounded-[4px] text-white bg-black hover:bg-theme_color transition' />                            </Link>
                            <Link href="/signup" className="text-gray-500 hover:text-green-50" target="_blank">
                                <FaInstagram className='w-6 h-6 p-1 rounded-[4px] text-white bg-black hover:bg-theme_color transition' />                            </Link>
                            <Link href="/signup" className="text-gray-500 hover:text-green-50" target="_blank">
                                <FaLinkedinIn className='w-6 h-6 p-1 rounded-[4px] text-white bg-black hover:bg-theme_color transition' />                            </Link>
                        </div>
                    </div>

                    {/* Footer Sections */}
                    <div className="md:w-3/4 flex flex-wrap justify-between gap-0 gap-y-10">
                        {footerData.sections?.map((section, index) => (
                            <div key={index} className="w-1/2 md:w-1/4 px-2">
                                <h2 className="text-sm sm:text-base font-semibold text-gray-800">{section.title || "Default Title"}</h2>
                                <ul className="mt-4 space-y-2">
                                    {section.links?.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.url || "#"}
                                                className="text-gray-600 hover:text-gray-800 transition text-sm"
                                            >
                                                {link.name || "Default Link"}
                                            </Link>
                                        </li>
                                    )) || <li>No links available</li>}
                                </ul>
                            </div>
                        )) || <p>No sections available</p>}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-300 pt-5 text-left">
                    <p className="text-xs sm:text-sm text-gray-600">{footerData.legal?.copyright || "Default Copyright"}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{footerData.legal?.address || "Default Address"}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer