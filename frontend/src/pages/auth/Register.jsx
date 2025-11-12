import { useEffect } from "react";
import { Md3Button } from "../components/button";
import { useNavigate } from 'react-router-dom';
import { config } from "../../config";


export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika registrasi di sini...
        alert('Registrasi berhasil (simulasi)! Silakan login.');
        navigate('/login'); // Arahkan ke login setelah register
    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex items-center justify-center py-24 px-4 bg-indigo-50 h-screen">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                            Alamat Email
                        </label>
                        <input
                            type="email"
                            id="reg-email"
                            required
                            className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="reg-password"
                            required
                            className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                    <Md3Button type="submit" variant="solid" className="w-full">
                        Buat Akun
                    </Md3Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-8">
                    Sudah punya akun?{' '}
                    <button onClick={() => navigate('/login')} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login di sini
                    </button>
                </p>
            </div>
        </div>
    );
};