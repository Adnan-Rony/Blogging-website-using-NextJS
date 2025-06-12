'use client';

import Link from 'next/link';
import { Search, Edit3, X } from 'lucide-react'; 
import { useState } from 'react';

const Navbar = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
<div className="bg-[#f0f5fa]">
      <div className=" max-w-screen-xl mx-auto px-4 py-2 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex gap-4 items-center">
          <Link href="/blog" className="text-xl font-semibold whitespace-nowrap">
            DevThoughts
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-64">
            <input
              type="text"
              placeholder="   Search blogs..."
              className="input w-full px-4 py-2 pr-10 rounded bg-white border border-gray-300"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
        </div>

        {/* Right Side: Write + Profile + Mobile Search */}
        <div className="flex items-center gap-3">
          {/* Desktop Write Button */}
          <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm">
            <Edit3 className="text-xl" />
            Write
          </Link>

          {/* Mobile Search Toggle Button */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            {mobileSearchOpen ? (
              <X className="text-gray-600 w-5 h-5" />
            ) : (
              <Search className="text-gray-500 w-4 h-4" />
            )}
          </button>

          {/* Profile Icon */}
          <div className="w-8 h-8 rounded-full bg-gray-300 md:w-10 md:h-10" />
        </div>
      </div>

      {/* Mobile Search Input */}
      {mobileSearchOpen && (
        <div className="mt-2 md:hidden">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>
      )}
    </div>
</div> 
  );
};

export default Navbar;
