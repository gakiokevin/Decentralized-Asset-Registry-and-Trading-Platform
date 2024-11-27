import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe2, Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getPrincipal } from '../../features/auth/Account';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLandownerLogin = async () => {
    setIsLoading(true);
    const result = await dispatch(getPrincipal());
    if (getPrincipal.fulfilled.match(result)) {
      setIsLoading(false);
      navigate('/landowner');
    } else {
      alert("Please create an internet identity to access our system");
      setIsLoading(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Globe2 className="h-8 w-8 text-yellow-400" />
              <span className="text-white font-bold text-lg lg:text-xl">DecentrAssets</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </NavLink>
            <NavLink to="/user" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </NavLink>
            <NavLink to="/trader" className="text-gray-300 hover:text-white transition-colors">
              Assets
            </NavLink>
            <NavLink to="/verification" className="text-gray-300 hover:text-white transition-colors">
              Verify
            </NavLink>
            <NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </NavLink>
            <button
              className="px-6 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              onClick={handleLandownerLogin}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => alert('Search coming soon!')}
              className="text-white p-2 hover:bg-blue-800/50 rounded-full"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-blue-800/50 rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-900/95 backdrop-blur-md shadow-md rounded-lg mt-2">
            <div className="flex flex-col px-4 py-3 space-y-2">
              <NavLink to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </NavLink>
              <NavLink to="/user" className="text-gray-300 hover:text-white transition-colors">
                Explore
              </NavLink>
              <NavLink to="/trader" className="text-gray-300 hover:text-white transition-colors">
                Assets
              </NavLink>
              <NavLink to="/verification" className="text-gray-300 hover:text-white transition-colors">
                Verify
              </NavLink>
              <NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </NavLink>
              <button
                className="w-full mt-4 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                onClick={handleLandownerLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
