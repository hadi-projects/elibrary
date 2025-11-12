import { useEffect } from "react";
import { Header } from "./components/header";
import { fetchBook } from "../api/fetchBook";
import { useState } from "react";
import { Md3Button } from "./components/button";
import { useLottie } from "lottie-react";
import books from '../../public/books.json'
import Footer from "./components/footer";
import { deleteBook } from "../api/deleteBook";
import { EditBookModal } from "./components/edit-modal";
import { editBook } from "../api/editBook";
import { HeartIcon } from "./components/icons/search";
import { addfavorite } from "../api/addFavorite";
import { useNavigate } from "react-router-dom";


export default function Favorit() {
    const [isLogin, setIsLogin] = useState(false)
    const [_books, setBooks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [onEditData, setOnEditData] = useState(undefined)
    const navigate = useNavigate()
    const options = {
        animationData: books,
        loop: true
    };
    const { View } = useLottie(options);

    const init = async () => {
        const res = await fetchBook()
        setBooks(res.data)
    }

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        init()

    }, [])

    const handleDeleteBook = async (id) => {
        if (confirm("Yakin hapus buku?")) {
            const res = await deleteBook(id)
            if (res.data) {
                alert("Berhasil hapus buku")
                init()
            } else {
                alert("Something went wrong")
            }
        }
    }

    const handleditBook = async (data, id) => {
        const res = await editBook(data, id)
        if (res.data) {
            alert("Berhasil Edit buku")
            init()
        } else {
            alert("Something went wrong")
        }
    }

    const handleAddFavorit = async (bookId) => {
        if (!isLogin) {
            alert("register dan buat akun untuk fitur favorit")
            navigate('/register')
            return
        }

        const res = await addfavorite(bookId)
        if (res.data) {
            alert("Berhasil Tambah Favorit")
            init()
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <div>
            <Header isLogin={isLogin} onAdded={() => init()} />
            {
                isLogin ?

                <section id="katalog" className="py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900">Buku Favorit Anda</h2>
                            <p className="mt-4 text-lg text-gray-600">Buku-buku yang paling sering dibaca minggu ini.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {_books.map((book, idx) => (
                                <div key={idx} className="bg-white shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                    <img src={book.img} alt="book" className="w-full h-48 object-contain" />
                                    <div className="p-6">
                                        <span className="text-sm font-semibold text-indigo-600">{book.catalog}</span>
                                        <h3 className="mt-2 text-xl font-bold text-gray-900">{book.title.slice(0, 40) + (book.title.length > 30 ? '...' : '')}</h3>
                                        <p className="mt-2 text-gray-600 text-sm">oleh Penulis {book.description.slice(0, 40) + (book.description.length > 50 ? '...' : '')}</p>
                                        <div className="flex justify-end gap-4 mt-6">
                                            {
                                                localStorage.getItem('role') == 'ADMIN' && <>
                                                    <Md3Button onClick={() => { setOnEditData(book); setIsModalOpen(true) }} variant="outline" className="w-full md:w-auto">
                                                        Edit
                                                    </Md3Button>
                                                    <Md3Button onClick={() => { handleDeleteBook(book.id) }} variant="solid" className="w-full md:w-auto">
                                                        Delete
                                                    </Md3Button>
                                                </>
                                            }
                                        </div>
                                        <div className="flex justify-end gap-4 ">
                                            <Md3Button onClick={() => { handleAddFavorit(book.id) }} variant="outline" className="w-full">
                                                <div className="flex justify-center items-center gap-2 ">
                                                    <HeartIcon className={'w-8'} />
                                                    Tambah ke Favorit
                                                </div>
                                            </Md3Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>:
                <div className="flex h-[500px] items-center justify-center w-full">
                <h2 className="text-xl">Login untuk melihat buku favorit anda</h2>
                
                </div>

            }
            <EditBookModal
                data={onEditData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEditBook={(d, i) => { handleditBook(d, i) }}
            />
            <Footer />
        </div>
    )
}