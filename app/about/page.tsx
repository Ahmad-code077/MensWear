import React from 'react';

// Array to map over for men's wear categories
const mensWearContent = [
  {
    title: 'Men Shirt',
    description:
      'Explore our collection of stylish and comfortable men shirts perfect for any occasion.',
  },
  {
    title: 'Men Jackets',
    description:
      'Stay warm and stylish with our wide range of men jackets designed for modern looks.',
  },
  {
    title: 'Men Casuals',
    description:
      'Check out our casual wear collection, combining comfort and style for daily use.',
  },
];

// Featured Products section content

const MensWearPage: React.FC = () => {
  return (
    <div className='text-gray-900'>
      {/* Hero Section with background image for men's wear */}
      <section
        className='relative bg-cover bg-center text-gray-900 py-24 px-6 sm:px-16'
        style={{
          backgroundImage:
            'url(https://assets.vogue.com/photos/61e9c43c8aa98afba69ec2e8/master/w_2560%2Cc_limit/00_story.jpg)', // Use a men's wear-related image
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl font-semibold text-secondary mb-6'>
            Men’s Wear Collection
          </h1>
          <p className='text-lg text-white sm:text-xl'>
            Discover the latest trends in men&apos;s fashion with our exclusive
            collection of shirts, jackets, and casual wear.
          </p>
        </div>
      </section>

      {/* New Cards Section for Men's Wear */}
      <div className='max-w-7xl mx-auto py-16 sm:px-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          {mensWearContent.map((item, index) => (
            <div
              key={index}
              className='shadow-lg rounded-lg p-8 flex flex-col items-center text-center border border-primary'
            >
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                {item.title}
              </h3>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}

      {/* Additional Content Section for Men's Wear */}
      <div className='max-w-7xl mx-auto pb-16 sm:px-16 bg-gray-50 rounded-lg'>
        <h3 className='text-3xl font-semibold text-primary mb-6 text-center'>
          Explore Our Men’s Wear Collection
        </h3>
        <p className='text-lg text-gray-700 mb-6'>
          Our men&apos;s wear collection combines the latest trends with
          comfort, ensuring you look stylish and feel great every day. From
          classic shirts to casual jackets, we have everything you need to
          elevate your wardrobe.
        </p>
      </div>

      {/* Customer Testimonials Section */}
      <div className='max-w-7xl mx-auto py-16 sm:px-16'>
        <h3 className='text-3xl font-semibold text-primary mb-6 text-center'>
          What Our Customers Say
        </h3>
        <div className='flex flex-col sm:flex-row justify-between gap-8'>
          <div className='bg-gray-50 p-8 rounded-lg shadow-md'>
            <p className='text-lg text-gray-700'>
              &quot;I absolutely love the men&apos;s shirts from this
              collection! The fit is perfect, and the quality is top-notch.
              Highly recommend!&quot;
            </p>
            <div className='mt-4 text-right'>
              <h4 className='text-xl font-semibold text-gray-900'>John Doe</h4>
              <p className='text-sm text-gray-600'>Satisfied Customer</p>
            </div>
          </div>
          <div className='bg-gray-50 p-8 rounded-lg shadow-md'>
            <p className='text-lg text-gray-700'>
              &quot;The jackets are amazing! Stylish and warm, exactly what I
              needed for the winter season.&quot;
            </p>
            <div className='mt-4 text-right'>
              <h4 className='text-xl font-semibold text-gray-900'>
                Jane Smith
              </h4>
              <p className='text-sm text-gray-600'>Fashion Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensWearPage;
