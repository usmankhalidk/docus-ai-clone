import React from 'react';
import footerData from '../../Json/footer.json'

export const Footer = () => {
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
                            <a href="" className="text-gray-500 hover:text-green-50" target="_blank">
                                <img src="../images/twitter.png" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href="" className="text-gray-500 hover:text-green-50" target="_blank">
                                <img src="../images/twitter.png" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href="" className="text-gray-500 hover:text-green-50" target="_blank">
                                <img src="../images/twitter.png" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href="" className="text-gray-500 hover:text-green-50" target="_blank">
                                <img src="../images/twitter.png" alt="Twitter" className="w-6 h-6" />
                            </a>
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
                                            <a
                                                href={link.url || "#"}
                                                className="text-gray-600 hover:text-gray-800 transition text-sm"
                                            >
                                                {link.name || "Default Link"}
                                            </a>
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