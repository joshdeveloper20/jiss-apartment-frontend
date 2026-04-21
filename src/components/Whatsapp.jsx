import { IoLogoWhatsapp } from "react-icons/io5";
const Whatsapp = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/2349167630305"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <IoLogoWhatsapp size={24} />
      </a>
    </div>
  );
};
export default Whatsapp;
