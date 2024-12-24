import Link from 'next/link';

interface OptionCardProps {
  title: string;
  description: string;
  href: string; // Add a 'href' prop for the link destination
  imageSrc: string; // New prop for the image source
}

const OptionCard = ({ title, description, href, imageSrc }: OptionCardProps) => (
  <Link href={href} passHref>
    <div className="bg-white shadow-lg rounded-lg pt-2 pb-2 sm:pt-4 sm:pb-4 px-4 sm:px-6 w-72 sm:w-80 relative cursor-pointer"> 
      {/* Reduced top and bottom padding */}
      
      {/* Left-aligned Title and Description */}
      <div className="mb-4">
        <h2 className="text-sm sm:text-lg font-medium text-left text-black">{title}</h2> {/* Smaller font size */}
        <p className="text-xs sm:text-sm text-gray-500 text-left">{description}</p> {/* Smaller font size */}
      </div>

      {/* Circle Image Icon positioned at the Bottom Right */}
      <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full overflow-hidden border-2 border-blue-500">
        <img src={imageSrc} alt="Icon" className="w-full h-full object-cover" />
      </div>
    </div>
  </Link>
);

export default OptionCard;
