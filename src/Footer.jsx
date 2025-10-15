import React from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer({ darkMode, onSearchCategory }) {
    const categories = ['Trending', 'Action', 'Comedy', 'Romance', 'Horror', 'Sci-Fi', 'Motivational'];

    return (
        <footer className={`${darkMode ? 'bg-black/30 text-white' : 'bg-white/20 text-gray-900'} backdrop-blur-2xl w-full py-10 px-6 sm:px-12 mt-10 border-t border-gray-600 shadow-inner pb-4 mb-0`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">

                {/* Logo & Description */}
                <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wider">MovieZone</h1>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        Your ultimate destination for trending movies, top-rated classics, and all your favorite genres. Stay updated and inspired!
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between gap-6">
                    <div>
                        <h2 className="font-semibold mb-2 tracking-wide">Explore</h2>
                        <ul className="space-y-1 text-sm sm:text-base">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => onSearchCategory(cat)}
                                        className="hover:text-purple-400 transition font-medium"
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2 tracking-wide">Contact</h2>
                        <ul className="space-y-1 text-sm sm:text-base">
                            <li className="hover:text-purple-400 transition">Developed by Mohit Maurya</li>
                            <li className="hover:text-purple-400 transition">+91 9919736684</li>
                            <li  className="hover:text-purple-400 transition">mohitmauryabbdu@gmail.com</li>
                            <li className="hover:text-purple-400 transition">Lucknow India</li>
                            <h2 className="font-semibold mb-2 mt-4 tracking-wide">Other team members</h2>
                            <li  className="hover:text-purple-400 transition">Piyush Kumar</li>
                            <li  className="hover:text-purple-400 transition">Piyush Shakya</li>
                            <li  className="hover:text-purple-400 transition">Pawan Kushwaha</li>
                            <li  className="hover:text-purple-400 transition">Mohit Kumar</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="font-semibold mb-2 tracking-wide">Connect</h2>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/in/mohitmauryadev" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-blue-600 transition shadow-lg"><FaLinkedinIn /></a>
                        <a href="https://github.com/mohitmauryadev?tab=repositories" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-gray-800 transition shadow-lg"><FaGithub /></a>
                        <a href="mailto:mohitmauryabbdu@gmail.com" className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition shadow-lg"><FaEnvelope /></a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm text-gray-400 backdrop-brightness-90 pb-2">
                &copy; {new Date().getFullYear()} MovieZone. All rights reserved.
            </div>
        </footer>
    );
}
