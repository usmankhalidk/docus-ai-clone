import { CountryOption, Doctor, SpecialtyOption } from "@/app/types/expert";

export const COUNTRY_OPTIONS: CountryOption[] = [
    { value: 'switzerland', label: 'Switzerland' },
    { value: 'germany', label: 'Germany' },
    { value: 'italy', label: 'Italy' },
    { value: 'usa', label: 'United States' },
  ];
  
  export const SPECIALTY_OPTIONS: SpecialtyOption[] = [
    { value: 'oncology', label: 'Oncology' },
    { value: 'neurosurgery', label: 'Neurosurgery' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'pediatrics', label: 'Pediatrics' },
  ];
  
 
  
  // components/DoctorCard.tsx
  interface DoctorCardProps {
    doctor: Doctor;
    onClick: (id: number) => void;
  }
  
  const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
    const getFlagEmoji = (countryCode: string): string => {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    };
  
    return (
        <div 
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick(doctor.id)}
    >
      {/* Image Container with Hover Effect */}
      <div className="relative  w-full">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-contain "
        />
        {/* Flag in top right */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-10">
          <span className="text-lg">{getFlagEmoji(doctor.flag)}</span>
        </div>
        {/* Biography label - hidden by default, shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-center py-2 bg-[#20B2AA]/80">
            View biography
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {doctor.name}
        </h3>
        <p className="text-gray-600 mb-1">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm mb-1">{doctor.country}</p>
        <p className="text-gray-400 text-sm">{doctor.experience}</p>
      </div>
    </div>
    );
  };
  export default DoctorCard;