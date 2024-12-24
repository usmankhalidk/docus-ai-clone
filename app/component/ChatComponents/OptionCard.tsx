import Link from 'next/link';

interface OptionCardProps {
  title: string;
  description: string;
  href: string; // Add a 'href' prop for the link destination
  imageSrc: string; // New prop for the image source
}

const OptionCard = ({ title, description, href, imageSrc }: OptionCardProps) => (
  <Link href={href} passHref>
    <div className="bg-white shadow-lg rounded-lg pt-2 pb-2 sm:pt-3 sm:pb-3 px-4 sm:px-6 w-80 sm:w-96 md:w-112 relative cursor-pointer"> 
      {/* Adjusted width to be more on larger screens and reduced padding on top and bottom */}
      
      {/* Left-aligned Title and Description */}
      <div className="mb-3 sm:mb-4">
        <h2 className="text-xs sm:text-sm md:text-base font-medium text-left text-black">{title}</h2> {/* Reduced font size */}
        <p className="text-xs sm:text-xs md:text-sm text-gray-500 text-left">{description}</p> {/* Smaller font size */}
      </div>

      {/* Circle Image Icon positioned at the Bottom Right */}
      <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full overflow-hidden border-2 border-teal-600">
        <img src={imageSrc} alt="Icon" className="w-full h-full object-cover" />
      </div>
    </div>
  </Link>
);

export default OptionCard;
