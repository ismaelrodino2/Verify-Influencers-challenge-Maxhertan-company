"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-navy border-b border-gray-800 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z" />
              </svg>
            </div>
            <span className="text-white font-semibold">Verify Influencers</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Leaderboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Products
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Monetization
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Contact
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Admin
            </a>
            <a
              href="/search-claims"
              className="text-gray-300 hover:text-white text-sm flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Claims
            </a>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden py-4 space-y-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            Leaderboard
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            Products
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            Monetization
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            Contact
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-sm py-2"
          >
            Admin
          </a>
          <a
            href="/search-claims"
            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm py-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Claims
          </a>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm py-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
