export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Elibrary</h4>
            <p className="text-sm">Membawa jutaan cerita dan pengetahuan ke genggaman Anda. Dimanapun, kapanpun.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Navigasi</h5>
            <ul className="space-y-2">
              <li><a href="#katalog" className="hover:text-white">Katalog</a></li>
              <li><a href="#favorit" className="hover:text-white">Favorit</a></li>
              <li><a href="#" className="hover:text-white">Bantuan</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Ketentuan Layanan</a></li>
              <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Email: info@elibrary.id</a></li>
              <li><a href="#" className="hover:text-white">Telepon: (021) 123-456</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">&copy; 2025 Elibrary. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};