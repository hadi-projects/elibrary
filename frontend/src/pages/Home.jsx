import { useEffect } from "react";
import { Header } from "./components/header";
import { fetchBook } from "../api/fetchBook";
import { useState } from "react";
import { Md3Button } from "./components/button";
import { useLottie } from "lottie-react";
import books from '../../public/books.json'
import Footer from "./components/footer";

export default function Home() {

    const [isLogin, setIsLogin] = useState(false)
    const [_books, setBooks] = useState([])
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
            init()
        } else {
            setIsLogin(false)
        }

    }, [])

    return (
        <div>
            <Header isLogin={isLogin} onAdded={()=>init()}/>
            <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-28">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                                Temukan Dunia
                                <span className="text-indigo-600"> dalam Kata.</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                                Jelajahi ribuan buku, jurnal, dan koleksi audio terbaik dari seluruh dunia. Perpustakaan digital Anda, selalu ada untuk Anda.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Md3Button onClick={() => onNavigate('register')} variant="solid">
                                    Mulai Menjelajah
                                </Md3Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {View}
                        </div>
                    </div>
                </div>
            </section>

            <section id="katalog" className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">Buku Terbaru</h2>
                        <p className="mt-4 text-lg text-gray-600">Buku-buku yang paling sering dibaca minggu ini.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {_books.map((book, idx) => (
                            <div key={idx} className="bg-white shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                <img src={book.img} alt="book" className="w-full h-48 object-contain"  />
                                <div className="p-6">
                                    <span className="text-sm font-semibold text-indigo-600">{book.catalog}</span>
                                    <h3 className="mt-2 text-xl font-bold text-gray-900">{book.title.slice(0,40)+(book.title.length>30?'...':'')}</h3>
                                    <p className="mt-2 text-gray-600 text-sm">oleh Penulis {book.description.slice(0,40)+(book.description.length>50?'...':'')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="favorit" className="py-24 bg-indigo-50">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900">Apa Kata Mereka?</h2>
                        <p className="mt-4 text-lg text-gray-600">Lihat bagaimana PerpusOnline membantu para pecinta buku.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            { nama: 'Andini Putri', peran: 'Mahasiswa S2', foto: 'A' },
                            { nama: 'Budi Santoso', peran: 'UI/UX Designer', foto: 'B' },
                            { nama: 'Citra Lestari', peran: 'Penulis', foto: 'C' }
                        ].map((testi) => (
                            <div key={testi.nama} className="bg-white p-8 rounded-3xl shadow-lg">
                                <p className="text-gray-700 text-lg">"Koleksinya luar biasa lengkap! Saya bisa menemukan jurnal untuk tesis sekaligus novel untuk bersantai."</p>
                                <div className="mt-6 flex items-center">
                                    <img src={`https://placehold.co/50x50/E0E7FF/3730A3?text=${testi.foto}`} alt="Foto profil" className="w-12 h-12 rounded-full" />
                                    <div className="ml-4">
                                        <p className="font-bold text-gray-900">{testi.nama}</p>
                                        <p className="text-sm text-gray-600">{testi.peran}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}