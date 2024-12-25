interface FooterSectionProps {
    onOpenModal: () => void;
  }
  
  const FooterSection = ({ onOpenModal }: FooterSectionProps) => (
    <div className="mt-10 flex gap-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onOpenModal}
      >
        Last Chat
      </button>
      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
        Chat History
      </button>
    </div>
  );
  
  export default FooterSection;
  