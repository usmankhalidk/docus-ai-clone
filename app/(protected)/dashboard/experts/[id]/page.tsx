'use client'

import { FaArrowLeft } from 'react-icons/fa'
import { Button, Card, Form, Input, Modal, Select } from 'antd'
import { DoctorData } from '@/app/types/expert';
import { BiMessageEdit } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp, FaClipboardUser, FaMoneyCheck, FaNotesMedical, FaPeopleGroup, FaSuitcaseMedical } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';



export default function DoctorBiography({ params }: { params: { id: string } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedBio, setExpandedBio] = useState(false);
    const [expandedAffiliations, setExpandedAffiliations] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleBio = () => setExpandedBio(!expandedBio);
    const toggleAffiliations = () => setExpandedAffiliations(!expandedAffiliations);
    const handleConsultation = async () => {
        setLoading(true);
        // Simulate API call or processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setIsModalOpen(true);
      };
      const handlePayment = async () => {
        setPaymentLoading(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentLoading(false);
        setIsModalOpen(false);
        // Add your payment navigation logic here
      };
  // Mock data structure matching the image
  const doctor: DoctorData = {
    id: params.id,
    name: "Dr. Marco Siano",
    specialty: "Oncology",
    country: "Switzerland",
    experience: "22 years of experience",
    image: "/images/doctor-1.webp",
    consultationFees: {
      video: 450,
    },
    expertise: {
      specialty: "Oncology",
      subspecialty: ["Medical Oncology", "Hematological Oncology"],
      diseases: [
        "Skin Cancer",
        "Thyroid disorders",
        "Breast Cancer",
        "Lung Cancer",
        "Leukemia and neck Cancer",
        "Lymphoma",
        "Sarcoma",
        "Leukemia"
      ],
    },
    experiences: [
      {
        title: "Chief Physician and Senior Consultant | Regional Cancer Center",
        institution: "Lymphoma At His Circle",
        location: "Switzerland",
        period: "March 2022 - Present"
      },
      {
        title: "Head of the Hematologische | Dermatology Service",
        institution: "Innere Medicine Hospital",
        location: "Switzerland",
        period: "2015 - 2022"
      }
    ],
    education: [
      "PhD University of Berlin"
    ],
    biography: "Medical school to pursue a career in Radiation Oncology, with specialized internships in oncology, radiation therapy, and hematology. Robert worked and trained actively extensive in a fellowship. He was highly regarded, landed from the University of Berlin in 2002 where he received additional training from Yale University. Dr. Siano has played an important role in overseeing...",
    affiliations: [
      "Member of the Head and Neck Cancer Working Group (since 2016)",
      "Founding Member and Board Member Swiss Head and Neck Society (since 2018)",
      "Swiss Society for Medical Oncology",
      "Swiss Medical Association",
      "Association of Swiss Residents and Senior Physicians"
    ],
    publications: {
      count: 48
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-black">
          <FaArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-xl font-medium mb-1">{doctor.name}</h1>
            <p className="text-gray-600 mb-1">{doctor.specialty}</p>
            <p className="text-gray-500 mb-1">{doctor.experience}</p>
            
            <div className="mt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <BiMessageEdit className="w-7 h-7" />
                <span>Video consultation fee: ${doctor.consultationFees.video}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Area of expertise */}
      <div className="my-6">
        <h2 className="flex items-center gap-2 mb-4">
          <FaNotesMedical  className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Area of expertise</span>
        </h2>
        <Card className="shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Specialty</h3>
              <p className="text-gray-600">{doctor.expertise.specialty}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Subspecialty</h3>
              <p className="text-gray-600">{doctor.expertise.subspecialty.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Diseases</h3>
              <p className="text-gray-600">{doctor.expertise.diseases.join(', ')}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-4">
          <FaSuitcaseMedical  className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Experience</span>
        </h2>
        <Card className="shadow-sm">
          <div className="space-y-6">
            {doctor.experiences.map((exp, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-800">{exp.title}</h3>
                <p className="text-gray-600">{exp.institution}</p>
                <p className="text-gray-500 text-sm">{exp.period}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-4">
        <FaSuitcaseMedical  className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Education</span>
        </h2>
        <Card className="shadow-sm">
          <ul className="list-disc list-inside">
            {doctor.education.map((edu, index) => (
              <li key={index} className="text-gray-600">{edu}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Biography */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-4">
          <FaClipboardUser className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Biography</span>
        </h2>
        <Card className="shadow-sm">
          <p className="text-gray-600">
            {expandedBio ? doctor.biography : `${doctor.biography.slice(0, 150)}...`}
          </p>
          <div className="flex justify-end mt-2">
            <button 
              onClick={toggleBio}
              className="text-blue-600 flex items-center gap-2"
            >
              {expandedBio ? (
                <>Show less <FaChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show more <FaChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </Card>
      </div>

      {/* Affiliations */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-4">
          <FaPeopleGroup className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Affiliations</span>
        </h2>
        <Card className="shadow-sm">
          <ul className="list-disc list-inside space-y-2">
            {doctor.affiliations.slice(0, expandedAffiliations ? undefined : 3).map((affiliation, index) => (
              <li key={index} className="text-gray-600">{affiliation}</li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button 
              onClick={toggleAffiliations}
              className="text-blue-600 flex items-center gap-2"
            >
              {expandedAffiliations ? (
                <>Show less <FaChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show more <FaChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </Card>
      </div>

      {/* Publications */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-4">
          <FaMoneyCheck className="w-7 h-7 text-teal-700" />
          <span className="font-medium text-black">Publications</span>
        </h2>
        <Card className="shadow-sm">
          <p className="text-gray-600">Dr Marco Siano has more than {doctor.publications.count} publications</p>
        </Card>
      </div>
      <Modal
        title="Choose for consultation"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <div className="flex gap-6">
          <div className="w-1/3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full rounded-lg"
            />
            <h3 className="text-xl font-medium mt-4">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
          
          <Form layout="vertical" className="w-2/3">
            <Form.Item label="Choose Consultation Type">
              <Select placeholder="Choose Consultation Type">
                <Select.Option value="video">Video Consultation</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="Full Name">
              <Input placeholder="Enter your full name" />
            </Form.Item>
            
            <Form.Item label="Phone Number">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            
            <Form.Item label="City/Country">
              <Input placeholder="Enter your city and country" />
            </Form.Item>
            
            <Form.Item label="Diagnosis">
              <Input placeholder="Enter your diagnosis" />
            </Form.Item>
            
            <Form.Item label="Disease Description">
              <TextArea rows={4} placeholder="Describe your condition" />
            </Form.Item>
            
            <Button 
              type="primary"
              loading={paymentLoading}
              onClick={handlePayment}
              className=" h-12 bg-teal-600 hover:bg-teal-700"
            >
              Go to Payment
            </Button>

          </Form>
        </div>
      </Modal>

      {/* Book Appointment Button */}
    <div className="flex justify-center items-center">
    <Button 
        type="primary"
        loading={loading}
        onClick={handleConsultation}
        className="px-16 py-10 bg-teal-600 hover:bg-teal-700"
      >
        Choose for Consultation
      </Button>
    </div>
    </div>
  )
}