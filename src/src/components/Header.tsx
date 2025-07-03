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
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full max-w-xs px-3 py-1 rounded border border-gray-300 text-black focus:outline-none"
        />
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
        <Link href="/" className="mr-6 hover:underline">Home</Link>
        <Link href="/cart" className="hover:underline relative" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 inline">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 9.75m-1.644-4.478h13.788c.977 0 1.651.97 1.337 1.893l-2.25 6.75A1.125 1.125 0 0116 15.75H8.25a1.125 1.125 0 01-1.087-.835L4.065 5.272zm0 0L3.11 2.362A.563.563 0 002.25 2.25m0 0v0" />
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="15" cy="20" r="1.25" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
