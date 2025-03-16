import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-gray-400">
              This is an AI-powered numbers predictor app designed to help you analyze and predict numerical patterns. Use the editor, drag-and-drop, or upload features to get started.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/editor" className="hover:text-white">
                  Editor
                </Link>
              </li>
              <li>
                <Link to="/drag-drop" className="hover:text-white">
                  Drag & Drop
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-white">
                  Upload
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@numberspredictor.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 AI Street, Tech City, World</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Numbers Predictor. All rights reserved.
          </p>
          <p className="mt-2">
            Made by{" "}
            <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Sardar Khurram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;