'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useShowToast } from './Toast';

const socialLinks = [
  { id: 1, icon: <Facebook size={24} />, href: 'https://facebook.com' },
  { id: 2, icon: <Instagram size={24} />, href: 'https://instagram.com' },
  { id: 4, icon: <Twitter size={24} />, href: 'https://twitter.com' },
  { id: 5, icon: <Youtube size={24} />, href: 'https://youtube.com' },
];

const contactInfo = {
  email: 'support@menswear.com',
  phone: '+123-456-7890',
  address: '123 Fashion St, Trendy City, 10110',
};

const quickLinks = [
  { id: 1, name: 'Home', href: '/' },
  { id: 3, name: 'About Us', href: '/about' },
  { id: 4, name: 'Contact Us', href: '/contact' },
];

const Footer: React.FC = () => {
  const showToast = useShowToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    if (!email.trim()) {
      showToast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
    } else {
      showToast({
        title: 'Success',
        description:
          'Thank you for your message. We will get back to you shortly.',
      });
    }
  };

  return (
    <footer className='text-black py-8 border-t-2 border-gray-500'>
      <section className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-12'>
          {/* Company Information */}
          <div className='space-y-4 lg:w-1/2'>
            <h3 className='text-xl font-semibold mb-4'>About Us</h3>
            <p className='text-gray-600'>
              Welcome to Men&apos;s Wear, your one-stop shop for the latest
              fashion trends in men&apos;s clothing. We offer high-quality
              garments, accessories, and footwear designed to fit your
              lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {quickLinks.map(({ id, name, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className='hover:text-primary transition-all duration-300'
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold mb-4'>Contact Us</h3>
            <p className='text-gray-600'>
              Email:{' '}
              <a href={`mailto:${contactInfo.email}`} className='text-primary'>
                {contactInfo.email}
              </a>
            </p>
            <p className='text-gray-600'>
              Phone:{' '}
              <a href={`tel:${contactInfo.phone}`} className='text-primary'>
                {contactInfo.phone}
              </a>
            </p>
            <p className='text-gray-600'>Address: {contactInfo.address}</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='mt-6 lg:mt-8'>
          <h3 className='text-xl font-semibold mb-4 text-center '>Follow Us</h3>
          <div className='flex justify-center  items-center space-x-6'>
            {socialLinks.map(({ id, icon, href }) => (
              <a
                key={id}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 text-2xl duration-300 hover:scale-110 transition-all hover:text-primary'
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className='mt-8 text-center'>
          <h3 className='text-xl font-semibold mb-4'>Stay Updated</h3>
          <p className='text-gray-600 mb-4'>
            Subscribe to our newsletter for the latest trends and promotions!
          </p>
          <form className='flex justify-center' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Enter your email'
              value={email} // Bind the input value to the state
              onChange={(e) => setEmail(e.target.value)} // Update the state when input changes
              className='p-2 rounded-l-md border border-gray-300'
            />
            <button
              type='submit'
              className='bg-primary text-white p-2 rounded-r-md'
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className='border-t-2 border-gray-500 h-1 mt-8'></div>

        {/* Copyright */}
        <div className='mt-6 text-center text-gray-600 text-sm'>
          &copy; {new Date().getFullYear()} Men&apos;s Wear. All Rights
          Reserved.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
