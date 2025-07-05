'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [search, setSearch] = useState('');
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }

  return (
    <header>
      <nav className="px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow bg-black text-white">
        <Link href="/" className="mr-6 hover:underline">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </Link>
        {isMainPage && (
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
        )}
        <div className="flex items-center gap-4 relative">
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
    </header>
  );
}
