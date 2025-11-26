import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// Hapus import icon HandHeart, Leaf, dll karena sudah tidak dipakai di About
import { User, X } from 'lucide-react';
import Regist from './Regist'; 

// =========================================
// 1. IMPORT GAMBAR ASSETS
// =========================================
import backgroundImage from './assets/Rectangle.png'; 
import inputImg from './assets/outbox.png'; 
import dailyImg from './assets/Group.png';
import checkImg from './assets/Credit card.png';
import jemputImg from './assets/directions_car (1).png';
// Pastikan gambar ini resolusinya cukup bagus untuk ditampilkan besar
import logoImg from './assets/logo te-tome.png'; 

import AOS from 'aos';
import 'aos/dist/aos.css';

// =========================================
// LOGIN FORM COMPONENT
// =========================================
const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika login di sini
    console.log('Login:', { email, password });
    // Bisa redirect atau set state logged in
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
            <p className="text-slate-400">Masuk ke akun Te-Tome Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-slate-400">
                <input type="checkbox" className="mr-2" />
                Ingat saya
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Masuk
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/regist');
              }}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Daftar sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeTomeLanding = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceCards = [
    { icon: inputImg, title: "Input Sampah" },
    { icon: dailyImg, title: "Daily Poin" },
    { icon: checkImg, title: "Check Poin" },
    { icon: jemputImg, title: "Jemput Sampah" },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col font-sans bg-slate-950 overflow-x-hidden">
      
      {/* ========================================= */}
      {/* 1. NAVBAR                                 */}
      {/* ========================================= */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center px-6 md:px-12 lg:px-20 pt-4">
        <nav 
          data-aos="fade-down"
          className="w-full max-w-[1440px] flex items-center justify-between py-4 px-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg transition-all"
        >
          {/* Logo di Navbar */}
          <div className="flex-1 flex justify-start">
            <div className="text-2xl font-bold tracking-wide text-white cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              Te-Tome
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-200">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-emerald-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-emerald-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('layanan')} className="hover:text-emerald-400 transition-colors">Layanan</button>
            <button className="hover:text-emerald-400 transition-colors">Harga</button>
            <button className="hover:text-emerald-400 transition-colors">Cara Kerja</button>
            <button className="hover:text-emerald-400 transition-colors">Lokasi</button>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <div 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-white/10 group-hover:bg-white/20 transition-colors p-2 rounded-full backdrop-blur-sm">
                <User size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Login</span>
            </div>
          </div>
        </nav>
      </div>

      {/* ========================================= */}
      {/* 2. HERO SECTION                           */}
      {/* ========================================= */}
      <div className="relative w-full h-screen flex flex-col">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div> 
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col px-6 md:px-12 lg:px-20">
          <main className="flex-grow flex flex-col items-center justify-center text-center pb-20 pt-32">
            <h1 data-aos="zoom-in" data-aos-delay="200" className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-5xl drop-shadow-2xl">
              Revolusi Pengelolaan Sampah Digital
            </h1>
            <p data-aos="fade-up" data-aos-delay="400" className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl leading-relaxed drop-shadow-md font-light">
              Te-Tome membantu meningkatkan kesadaran masyarakat dalam budaya membuang sampah plastik
            </p>
            <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
              <button 
                onClick={() => setShowLogin(true)}
                className="group h-14 px-10 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/30 rounded-full text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md shadow-lg hover:shadow-emerald-500/20"
              >
              JOIN NOW <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="h-14 px-10 bg-transparent border border-white hover:bg-white hover:text-slate-950 rounded-full text-white font-semibold tracking-wide transition-all duration-300 shadow-lg">
                LEARN MORE
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. ABOUT SECTION (UPDATED UNTUK GAMBAR FULL) */}
      {/* ========================================= */}
      <section id="about" className="relative w-full py-24 bg-[#01230B] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div data-aos="fade-down" className="flex flex-col items-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
              Tentang Te-Tome
            </h2>
            <div className="w-48 h-[1px] bg-slate-400/50"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
               <div data-aos="fade-right" className="w-full aspect-[4/3] rounded-3xl shadow-2xl relative overflow-hidden group">
               
               {/* Gradient overlay halus di atas gambar (opsional, bisa dihapus jika ingin gambar terlihat jelas) */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>
               
               {/* GAMBAR FULL MENGISI KOTAK */}
               <img 
                 src={logoImg} 
                 alt="Tentang Te-Tome" 
                 className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
               />

            </div>

            <div data-aos="fade-left" className="flex flex-col justify-center space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed text-justify md:text-left font-light">
                Te-Tome merupakan Aplikasi berbasis website yang digunakan untuk membantu meningkatkan kesadaran masyarakat dalam budaya membuang sampah plastik.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed text-justify md:text-left font-light">
                Platform kami menggabungkan teknologi modern dengan pendekatan komunitas untuk menciptakan solusi berkelanjutan dalam pengelolaan sampah plastik.
              </p>
              <div className="flex items-center gap-4 pt-6">
                <button className="px-8 py-3 rounded-full bg-[#2F905A] text-white font-semibold border border-transparent hover:border-emerald-500 hover:bg-[#073d29] transition-all duration-300 shadow-lg">
                  Our Mission
                </button>
                <button className="px-8 py-3 rounded-full bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#011c10] transition-all duration-300">
                  Our Vision
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 4. LAYANAN SECTION                        */}
      {/* ========================================= */}
      <section 
        id="layanan" 
        className="relative w-full py-24"
        style={{ backgroundColor: 'rgba(0, 97, 32, 0.4)' }} 
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div data-aos="fade-down" className="flex flex-col items-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-white">
              Layanan
            </h2>
            <div className="w-48 h-[1px] bg-slate-400/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCards.map((card, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex items-center gap-6 px-10 py-10 rounded-xl transition-transform hover:scale-105 cursor-pointer shadow-lg"
                style={{ backgroundColor: 'rgba(53, 150, 97, 0.48)' }} 
              >
                <div className="flex-shrink-0">
                  <img 
                    src={card.icon} 
                    alt={card.title} 
                    className="w-12 h-12 object-contain" 
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Form Modal */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

    </div>
  );  
};

// =========================================
// MAIN APP COMPONENT WITH ROUTING
// =========================================
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TeTomeLanding />} />
      <Route path="/regist" element={<Regist />} />
    </Routes>
  );
};

export default App;