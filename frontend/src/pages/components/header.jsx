import { useState } from "react";
import { CloseIcon, MenuIcon, SearchIcon } from "./icons/search";
import { Md3Button } from "./button";
import { useNavigate } from 'react-router-dom';
import { AddBookModal } from "./add-modal";
import { createBook } from "../../api/createBook";

export const Header = ({ isLogin, onAdded }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const role = localStorage.getItem('role')

  const handleNavClick = (page) => {
    navigate(page);
    setIsMenuOpen(false);
  };


  const handleAddBook = async (data) => {
    const res = await createBook(data)
    if(res.data){
      alert("Berhasil tambah buku")
      onAdded()
    }else{
      alert("Something went wrong")
    }
   }


  return (
    <div>
      <header className="bg-white/90 sticky top-0 z-50 shadow-md backdrop-blur-lg">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">



            <a onClick={() => handleNavClick('/')} href="#" className="text-3xl font-bold text-indigo-600 cursor-pointer">
              E<span className="text-indigo-400">library</span>
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            <div className={`w-full md:w-auto md:flex md:items-center md:gap-6 ${isMenuOpen ? 'block' : 'hidden'}`}>

              <div className="relative my-4 md:my-0 md:w-64 lg:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari buku"
                  className="w-full border-2 border-gray-200 bg-gray-50 rounded-full pl-12 pr-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                <a href="#katalog" onClick={() => handleNavClick('/')} className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">Katalog</a>
                <a href="#favorit" onClick={() => handleNavClick('/')} className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">Favorit</a>
                <a href="#profile" onClick={() => handleNavClick('/')} className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">Profile</a>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 md:ml-4">
                {
                  !isLogin &&
                  <>
                    <Md3Button onClick={() => handleNavClick('login')} variant="outline" className="w-full md:w-auto">
                      Login
                    </Md3Button>
                    <Md3Button onClick={() => handleNavClick('register')} variant="solid" className="w-full md:w-auto">
                      Register
                    </Md3Button>
                  </>
                }
                {
                  isLogin && role === 'ADMIN' &&
                  <>
                    <Md3Button onClick={() => { setIsModalOpen(true) }} variant="outline" className="w-full md:w-auto">
                      Upload
                    </Md3Button>
                  </>
                }
                {
                  isLogin &&
                  <>
                    <Md3Button onClick={() => { localStorage.removeItem('token'); handleNavClick('login') }} variant="solid" className="w-full md:w-auto">
                      Logout
                    </Md3Button>
                  </>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
}