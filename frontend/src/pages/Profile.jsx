import { useEffect, useState } from "react";
import { Md3Button } from "./components/button";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')
        navigate('/login')
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex items-center justify-center py-24 px-4 bg-indigo-50 h-screen">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
                    Profil Saya
                </h2>

                <div className="flex justify-center mb-6">
                    <img
                        src="https://placehold.co/100x100/E0E7FF/3730A3?text=A"
                        alt="Foto profil"
                        className="w-24 h-24 rounded-full shadow-md object-cover"
                    />
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700">
                            Alamat Email
                        </label>
                        <input
                            type="email"
                            id="profile-email"
                            value={localStorage.getItem('email')}
                            required
                            disabled
                            className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <input
                            type="email"
                            id="profile-role"
                            value={localStorage.getItem('role')}
                            required
                            disabled
                            className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </form>

                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <Md3Button onClick={handleLogout} variant="outline" className="w-full">
                        Logout
                    </Md3Button>
                </div>
            </div>
        </div>
    );
};