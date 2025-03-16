import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
            {/* Top Section */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto py-2 px-6">
                {/* Logo */}
                    <Link to="/" className="logo flex items-center justify-center gap-2">
                        <img
                            src="/logo.webp"
                            alt="Logo"
                            className="h-14 w-14 rounded-full cursor-pointer"
                        />
                        <h1 className="">
                            Numbers Predictor
                        </h1>
                    </Link>

                {/* Navigation Links (Hidden below md) */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    <Link to="/editor" className="hover:text-gray-400">
                        Editor
                    </Link>
                    <Link to="/drag-drop" className="hover:text-gray-400">
                        Drag & Drop
                    </Link>
                    <Link to="/upload" className="hover:text-gray-400">
                        Upload
                    </Link>
                </nav>

                {/* Hamburger Menu (Only below md) */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                >
                    <img src="/hamBurger.svg" alt="Menu" className="invert h-8 w-8" />
                </button>
            </div>

            {/* Bottom - Moving Alert */}
            <div className="overflow-hidden w-full bg-gray-800 text-gray-300 text-sm py-2">
                <p className="whitespace-nowrap animate-marquee">
                    ⚠️ This is an experimental AI-powered app. While we strive for
                    accuracy, predictions may sometimes be unexpected. Use with caution. ⚠️
                </p>
            </div>

            {/* Sidebar (Only appears when isOpen is true) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg p-6 flex flex-col space-y-4"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside sidebar from closing it
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="self-end text-white text-lg focus:outline-none"
                            aria-label="Close menu"
                        >
                            ✖
                        </button>
                        <Link
                            to="/editor"
                            className="text-white hover:text-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Editor
                        </Link>
                        <Link
                            to="/drag-drop"
                            className="text-white hover:text-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Drag & Drop
                        </Link>
                        <Link
                            to="/upload"
                            className="text-white hover:text-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Upload
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;