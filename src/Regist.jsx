import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Regist = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kabupatenKota: '',
    kecamatan: '',
    rtRw: '',
    noRumah: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika registrasi di sini
    console.log('Register:', formData);
    // Bisa redirect ke halaman lain setelah registrasi berhasil
    // navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Card */}
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Daftar Akun</h1>
            <p className="text-slate-400">Buat akun baru untuk bergabung dengan Te-Tome</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="nama@email.com"
                required
              />
            </div>

            {/* Lokasi Section */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Lokasi</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kabupaten/Kota */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kabupaten/Kota
                  </label>
                  <input
                    type="text"
                    name="kabupatenKota"
                    value={formData.kabupatenKota}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: Jakarta Selatan"
                    required
                  />
                </div>

                {/* Kecamatan */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: Kebayoran Baru"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* RT/RW */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    RT/RW
                  </label>
                  <input
                    type="text"
                    name="rtRw"
                    value={formData.rtRw}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: 001/005"
                    required
                  />
                </div>

                {/* No Rumah */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    No. Rumah
                  </label>
                  <input
                    type="text"
                    name="noRumah"
                    value={formData.noRumah}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Contoh: 123"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-lg mt-6"
            >
              Daftar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Masuk di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regist;

