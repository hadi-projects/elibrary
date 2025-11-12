import { useEffect, useState } from "react";
import { Md3Button } from "../components/button";
import { useNavigate } from 'react-router-dom';
import { config } from "../../config";
import { register } from "../../api/register";
import { Eye, EyeOff, EyeOffIcon } from 'lucide-react';


export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return 'Email wajib diisi';
        }
        if (!emailRegex.test(value)) {
            return 'Format email tidak valid';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'Password wajib diisi';
        }
        if (value.length < 8) {
            return 'Password minimal 8 karakter';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Password harus mengandung huruf besar';
        }
        if (!/[a-z]/.test(value)) {
            return 'Password harus mengandung huruf kecil';
        }
        if (!/[0-9]/.test(value)) {
            return 'Password harus mengandung angka';
        }
        return '';
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            return 'Konfirmasi password wajib diisi';
        }
        if (value !== password) {
            return 'Password tidak cocok';
        }
        return '';
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors(prev => ({ 
            ...prev, 
            password: validatePassword(value),
            confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword) : ''
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);
        
        setErrors({ 
            email: emailError, 
            password: passwordError, 
            confirmPassword: confirmPasswordError 
        });

        if (!emailError && !passwordError && !confirmPasswordError) {

            const res = await register({
                email, password
            })
            if(res.data){
                alert('Registrasi berhasil, Silakan login.');
                navigate('/login');
            }
        }
    };


    return (
        <div className="flex items-center justify-center py-24 px-4 bg-indigo-50 h-screen">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                            Alamat Email
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            id="reg-email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`mt-2 w-full border-2 ${
                                errors.email ? 'border-red-400' : 'border-gray-200'
                            } bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="reg-password"
                                placeholder="••••••••"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`mt-2 w-full border-2 ${
                                    errors.password ? 'border-red-400' : 'border-gray-200'
                                } bg-gray-50 rounded-full px-6 py-3 pr-12 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-1"
                            >
                                {showPassword ? (
                                    <EyeOffIcon size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Minimal 8 karakter, terdiri dari huruf besar, huruf kecil, dan angka
                        </p>
                    </div>

                    <div>
                        <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-gray-700">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                id="reg-confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`mt-2 w-full border-2 ${
                                    errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                                } bg-gray-50 rounded-full px-6 py-3 pr-12 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-1"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <Md3Button type="submit" variant="solid" className="w-full">
                        Buat Akun
                    </Md3Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-8">
                    Sudah punya akun?{' '}
                    <button 
                        type="button"
                        onClick={() => navigate('/login')} 
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Login di sini
                    </button>
                </p>
            </div>
        </div>
    );
}