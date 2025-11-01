'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useStore(state => state.getTotalItems());

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-serif font-bold text-primary-700">
              Sonin
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary-800 hover:text-accent-600 transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-primary-800 hover:text-accent-600 transition-colors">
              Produtos
            </Link>
            <Link href="/sobre" className="text-primary-800 hover:text-accent-600 transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-primary-800 hover:text-accent-600 transition-colors">
              Contato
            </Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/carrinho"
              className="relative p-2 text-primary-800 hover:text-accent-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-primary-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              className="block text-primary-800 hover:text-accent-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/produtos"
              className="block text-primary-800 hover:text-accent-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className="block text-primary-800 hover:text-accent-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="block text-primary-800 hover:text-accent-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
