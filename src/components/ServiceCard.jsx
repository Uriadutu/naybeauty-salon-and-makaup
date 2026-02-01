const ServiceCard = ({ title, description, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-pink-700">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-bold">{price}</span>
          <button className="btn-primary">Pesan Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;