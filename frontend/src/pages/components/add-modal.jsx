import { useEffect, useState } from "react";
import { CloseIcon } from "./icons/search";
import { Md3Button } from "./button";

export function AddBookModal({ isOpen, onClose, onAddBook }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({ title, category, description, coverFile });
    setTitle('');
    setCategory('');
    setDescription('');
    setCoverFile(null);
    onClose();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (!coverFile) {
      setCoverPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile]);

  if (!isOpen) return null;


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={handleModalContentClick}
        className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-xl transition-all duration-300 scale-100"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">
            Tambah Buku Baru
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Judul Buku
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Atomic Ha..."
              maxLength={150}
              minLength={1}
              className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="FIKSI">Fiksi</option>
              <option value="SAINS">Sains</option>
              <option value="BISNIS">Bisnis</option>
              <option value="SEJARAH">Sejarah</option>
              <option value="LAINNYA">Lainnya</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Deskripsi Singkat
            </label>
            <textarea
              id="description"
              rows="3"
              maxLength={250}
              minLength={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-3xl px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="coverFile" className="block text-sm font-medium text-gray-700">
              Sampul Buku (Upload)
            </label>

            <input
              type="file"
              id="coverFile"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              required
              className="mt-2 block w-full text-sm text-gray-700 border-2 border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            />

            {coverPreviewUrl && (
              <div className="mt-4 flex justify-center h-48 object-contain">
                <img 
                  src={coverPreviewUrl} 
                  alt="Pratinjau Sampul" 
                  className="w-48 h-auto object-cover rounded-lg shadow-md" 
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <Md3Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
              Batal
            </Md3Button>
            <Md3Button type="submit" variant="solid" className="w-full sm:w-auto">
              Simpan Buku
            </Md3Button>
          </div>
        </form>
      </div>
    </div>
  );
};