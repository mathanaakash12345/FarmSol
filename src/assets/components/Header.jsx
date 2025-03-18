import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react';
import ic from '../icons/ic2.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when screen size becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-transparent z-10 text-green-600 px-8 py-4 flex justify-between items-center font-pop">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex flex-row items-center">
            <img src={ic} alt="Logo" className="h-10 w-auto" />
            <div className="text-3xl py-4 px-3">
              <Link to="/home" className="inline-flex gap-0">
                <span className="hover:text-sec">Farm</span> 
                <span className="font-bold hover:text-gry">Sol</span> 
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-green-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 px-4">
              <li>
                <Link to="/about" className="hover:text-gry text-xl">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gry text-xl">
                  Contact Us
                </Link>
              </li>
              <li>
                <div className="text-xl inline-flex gap-0">
                  <span className="hover:text-sec">
                    <Link to='/'> SignUp</Link>
                  </span> 
                  <span className="text-gray-800"><strong> &nbsp;|&nbsp; </strong></span>
                  <span className="hover:text-gry">
                    <Link to='/login'>Login</Link>
                  </span> 
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu (Right-Aligned) */}
        {isOpen && (
          <div className="md:hidden absolute right-4 top-16 w-48 flex flex-col items-end space-y-4 bg-white p-4 rounded-lg shadow-lg">
            <Link to="/about" className="hover:text-gray-600 text-lg" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="hover:text-gray-600 text-lg" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <div className="text-lg inline-flex flex-col gap-2">
              <Link to='/' className="hover:text-sec" onClick={() => setIsOpen(false)}>SignUp</Link>
              <span className="text-gray-800">|</span>
              <Link to='/login' className="hover:text-gry" onClick={() => setIsOpen(false)}>Login</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
