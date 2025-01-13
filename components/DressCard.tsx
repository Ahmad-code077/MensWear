import React from 'react';
import Link from 'next/link';
import { Dress } from '@/app/admin/DressList'; // Ensure the Dress interface is correctly imported
import Image from 'next/image';

interface DressCardProps {
  dress: Dress;
}

const DressCard: React.FC<DressCardProps> = ({ dress }) => {
  return (
    <Link href={`/shop/${dress.id}`} passHref>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl duration-300 cursor-pointer border border-gray-200'>
        {/* Image Section */}
        <div className='relative'>
          <Image
            src={dress.image || '/default-dress-image.jpg'} // Fallback image if dress.image is not available
            alt={dress.name}
            className='w-full h-64 object-cover'
            width={500}
            height={300}
            unoptimized={true}
            loading='lazy'
          />
          {/* Badge */}
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
              dress.availability
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {dress.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Details Section */}
        <div className='p-4'>
          <h3 className='text-lg font-semibold text-gray-800 truncate'>
            {dress.name}
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium'>Category:</span> {dress.category}
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium'>Size:</span> {dress.size}
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            <span className='font-medium'>Price:</span> PKR {dress.price}
          </p>
          <div className='flex gap-4 pt-4'>
            {Array.isArray(dress.size) &&
              dress.size.map((size, index) => (
                <button
                  key={index}
                  className={
                    'px-4 py-2 rounded-lg border-2 text-lg font-semibold transition-colors duration-300                    hover:bg-gray-100 hover:text-gray-700 bg-primary text-white'
                  }
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
        {/* Action Section */}
      </div>
    </Link>
  );
};

export default DressCard;
