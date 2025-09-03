import React, { useState } from 'react';
import Link from 'next/link';
import { Home, User, Settings, Mail, Menu, X, LogIn, UserPlus } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavbarProps {
  logo?: string;
  navItems?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ 
  logo = "CakraTre",
  navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Services", href: "/services", icon: Settings },
    { label: "Contact", href: "/contact", icon: Mail }
  ]
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent backdrop-blur sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-[#171717] text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
              {logo}
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8 border border-black/15 p-5 rounded-full">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="text-[#171717] hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out flex items-center space-x-2 hover:scale-105 hover:-translate-y-0.5 group"
                >
                  <IconComponent size={16} className="group-hover:rotate-6 transition-transform duration-300" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-[#171717] hover:text-gray-600 p-5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center space-x-1 hover:scale-105 hover:-translate-y-0.5 group">
              <LogIn size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Login</span>
            </Link>
            <Link href="/auth/register" className="bg-[#171717] text-[#EEEEEE] hover:bg-gray-800 p-5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center space-x-1 hover:scale-105 hover:-translate-y-0.5 transform active:scale-95 group">
              <UserPlus size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#171717] hover:text-gray-600 inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
            >
              <div className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#EEEEEE] border-t border-gray-200 transform transition-transform duration-300">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`text-[#171717] hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out flex items-center space-x-3 hover:translate-x-2 hover:bg-gray-200 group transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <IconComponent size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>{item.label}</span>
              </a>
            );
          })}
          
          {/* Mobile Auth Buttons */}
          <div className={`pt-4 pb-2 border-t border-gray-200 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <Link href="/auth/login" className="text-[#171717] hover:text-gray-600 w-full text-left p-5 rounded-full text-base font-medium transition-all duration-300 ease-in-out flex items-center space-x-3 hover:translate-x-2 hover:bg-gray-200 group">
              <LogIn size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Login</span>
            </Link>
            <Link href="/auth/register" className="bg-[#171717] text-[#EEEEEE] hover:bg-gray-800 w-full text-left p-5 rounded-full text-base font-medium transition-all duration-300 ease-in-out flex items-center space-x-3 hover:translate-x-2 active:scale-95 group">
              <UserPlus size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;