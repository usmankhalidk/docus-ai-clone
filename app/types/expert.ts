export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    country: string;
    experience: string;
    image: string;
    flag: string;
  }
  
 export interface CountryOption {
    value: string;
    label: string;
  }
  
  export  interface SpecialtyOption {
    value: string;
    label: string;
  }
  export interface DoctorCardProps {
    doctor: Doctor;
    onClick: (id: number) => void;
  }
export interface Experience {
    title: string;
    institution: string;
    location: string;
    period: string;
  }
  
  export interface DoctorData {
    id: string;
    name: string;
    specialty: string;
    country: string;
    experience: string;
    image: string;
    consultationFees: {
      video: number;
    };
    expertise: {
      specialty: string;
      subspecialty: string[];
      diseases: string[];
    };
    experiences: Experience[];
    education: string[];
    biography: string;
    affiliations: string[];
    publications: {
      count: number;
    };
  }