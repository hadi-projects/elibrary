import { Md3Button } from "../components/button";
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    //
    alert('Login berhasil (simulasi)!');
    navigate('/')
  };

  return (
    <div className="flex items-center justify-center py-24 px-4 bg-indigo-50 h-screen">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-2 w-full border-2 border-gray-200 bg-gray-50 rounded-full px-6 py-3 text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <Md3Button type="submit" variant="solid" className="w-full">
            Login
          </Md3Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-8">
          Belum punya akun?{' '}
          <button onClick={() => navigate('/register')} className="font-medium text-indigo-600 hover:text-indigo-500">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};