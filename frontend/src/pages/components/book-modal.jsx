import { Md3Button } from "./button";
import { CloseIcon } from "./icons/search";

export function BookDetailModal ({ isOpen, onClose, book })  {
  if (!isOpen || !book) return null;

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={handleModalContentClick}
        className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-3xl shadow-xl transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
      >
        <div className="grid md:grid-cols-2 gap-8">
          
          <div>
            <img 
              src={book.img} 
              alt={`Sampul ${book.title}`}
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="relative flex flex-col">
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            <span className="text-sm font-semibold text-indigo-600 mb-2">{book.category}</span>
            
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              {book.title}
            </h2>

            <p className="mt-6 text-gray-700 flex-grow">
              {book.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Md3Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
                Tutup
              </Md3Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};