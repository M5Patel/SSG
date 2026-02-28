import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Members', path: '/members' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Rules', path: '/rules' },
    { name: 'About', path: '/about' },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-cricket-green-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-cricket-gold rounded-full flex items-center justify-center">
                <span className="text-2xl">🏏</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cricket-gold">SSGPL</h3>
                <p className="text-sm text-cricket-gold-light">SSG Premier League</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We're not just a tournament — we're a family. Building unity, discipline, 
              and the spirit that never sleeps through cricket.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-cricket-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-cricket-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-cricket-gold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 bg-cricket-green-light rounded-full flex items-center justify-center 
                           hover:bg-cricket-gold hover:text-cricket-green transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-300">
                <strong>Contact:</strong> ssgpl@society.com
              </p>
              <p className="text-sm text-gray-300 mt-1">
                <strong>Phone:</strong> +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cricket-green mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SSG Premier League. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
