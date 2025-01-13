'use client';

import React, { useState } from 'react';
import { useShowToast } from '@/components/Toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactDetails = [
  {
    icon: <Mail className='text-primary' />,
    title: 'Email Address',
    description: 'contact@menswear.com',
    link: 'mailto:contact@menswear.com',
  },
  {
    icon: <Phone className='text-primary' />,
    title: 'Phone Number',
    description: '+1 (234) 567-890',
    link: 'tel:+1234567890',
  },
  {
    icon: <MapPin className='text-primary' />,
    title: 'Our Location',
    description: '123 Fashion Street, City Center, ABC',
    link: 'https://www.google.com/maps?q=123+Fashion+Street,+City+Center,+ABC',
  },
];
const MensWearContactPage: React.FC = () => {
  const showToast = useShowToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      showToast({
        title: 'All Fields are required',
        description: `Please complete all fields before submitting the form.`,
        variant: 'destructive',
      });
      return;
    }

    showToast({
      title: 'Message Sent Successfully',
      description: `We’ve received your message, and someone from our team will reach out soon.`,
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className='py-16 px-6 text-gray-900'>
      <div>
        <h1 className='text-4xl text-center font-semibold mb-8 text-primary'>
          Contact Men&apos;s Wear Support
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          Have any questions, concerns, or feedback about our men&apos;s wear
          collection? Our customer support team is here to help! Whether
          you&apos;re looking for information on sizing, product availability,
          or need assistance with your order, we are always happy to assist you.
        </p>
        <p className='text-lg text-gray-600 mb-8'>
          We value your feedback and strive to provide you with the best
          shopping experience. Please feel free to reach out to us using any of
          the methods listed below, or simply fill out the form, and we&apos;ll
          get back to you as soon as possible.
        </p>
        <p className='text-lg text-gray-600'>
          Our team is available to assist you Monday through Friday from 10:00
          AM to 7:00 PM. We do our best to respond promptly to all inquiries.
        </p>
      </div>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* Contact Form */}
        <div className='bg-white shadow-lg rounded-lg my-4'>
          <h2 className='text-3xl font-semibold text-primary mb-6'>
            Contact Us
          </h2>
          <p className='text-lg mb-8 text-gray-600'>
            For inquiries about our men&apos;s wear collection or any other
            questions, fill out the form, and we will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-lg font-medium mb-2'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Full Name'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-lg font-medium mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Email Address'
              />
            </div>

            <div>
              <label htmlFor='phone' className='block text-lg font-medium mb-2'>
                Phone Number
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Phone Number'
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-lg font-medium mb-2'
              >
                Your Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='What’s on your mind?'
                rows={6}
              />
            </div>

            <button
              type='submit'
              className='w-full bg-primary text-white py-3 px-6 rounded-lg text-lg hover:bg-primary/90 transition-all duration-300'
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Store Location */}
        <div className='bg-gray-50 rounded-lg shadow-lg my-4 '>
          <h2 className='text-3xl font-semibold text-primary mb-6'>
            Visit or Contact Us
          </h2>
          <p className='text-lg mb-8 text-gray-600'>
            Reach out to us via any of the following methods, or stop by our
            store to explore our exclusive men&apos;s wear collection.
          </p>

          {/* Contact Details Map */}
          <div className='space-y-6'>
            {contactDetails.map((item, index) => (
              <div key={index} className='flex items-center space-x-4'>
                <div className='text-xl'>{item.icon}</div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800'>
                    {item.title}
                  </h3>
                  <a
                    href={item.link}
                    target='_blank'
                    className='text-gray-600 hover:text-primary font-medium'
                  >
                    {item.description}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MensWearContactPage;
