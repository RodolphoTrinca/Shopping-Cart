import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [search, setSearch] = useState('');
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }

  return (
    <nav className={`px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}>
      <Link href="/" className="mr-6 hover:underline">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </Link>
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full px-3 py-1 rounded-full border border-gray-300 text-gray-900 bg-white focus:outline-none pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm focus:outline-none"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 0H3m15.364-6.364l-1.06 1.06m-12.728 0l-1.06-1.06m12.728 12.728l-1.06-1.06m-12.728 0l-1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.627 6.405-9.175a.75.75 0 01.945.945A7.501 7.501 0 0019.81 17.4a.75.75 0 01.945.945z" />
            </svg>
          )}
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
        <Link href="/cart" className="hover:underline relative" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 9.75m-1.644-4.478h13.788c.977 0 1.651.97 1.337 1.893l-2.25 6.75A1.125 1.125 0 0116 15.75H8.25a1.125 1.125 0 01-1.087-.835L4.065 5.272zm0 0L3.11 2.362A.563.563 0 002.25 2.25m0 0v0" />
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="15" cy="20" r="1.25" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute left-0 -bottom-2 bg-purple-600 text-white text-xs rounded-full px-2 py-0.5 font-bold flex items-center justify-center min-w-[22px] min-h-[22px] shadow-md">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
