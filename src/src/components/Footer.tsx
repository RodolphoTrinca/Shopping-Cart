import React from 'react';

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Shopping Cart. All rights reserved.
      </p>
    </footer>
  );
}
