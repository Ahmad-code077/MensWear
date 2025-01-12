import { useState } from 'react';
import Image from 'next/image';
import UpdateDressPopup from './UpdateDressPopup'; // Update component name accordingly
import DeleteDress from './DeleteDress'; // Update component name accordingly

export interface Dress {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  size: string[];
  color: string;
  availability: boolean;
  image: string;
}

interface DressListProps {
  dresses: Dress[];
  refreshDresses: () => void;
}

const DressList = ({ dresses, refreshDresses }: DressListProps) => {
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);
  return (
    <div className='py-6'>
      {dresses.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {dresses.map((dress) => (
            <div
              key={dress.id}
              className='bg-card text-foreground rounded-lg shadow-lg p-4 border-primary border'
            >
              <div className='flex justify-center mb-4 h-44 w-[80%] mx-auto'>
                <Image
                  src={dress.image}
                  alt={dress.name}
                  width={200}
                  height={200}
                  className='rounded-lg object-cover w-full h-full'
                  unoptimized
                />
              </div>
              <h3 className='text-2xl font-semibold text-center mb-2'>
                {dress.name}
              </h3>
              <p className='text-lg text-center text-muted-foreground'>
                {dress.category}
              </p>
              <div className='flex justify-between mt-4'>
                {dress.size.length > 0 && (
                  <span className='font-semibold'>
                    Size: {dress.size.join(', ')}
                  </span>
                )}
                <span className='font-semibold'>${dress.price}</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span className='font-semibold'>Color: {dress.color}</span>
                <span
                  className={`font-semibold ${
                    dress.availability ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {dress.availability ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className='mt-4 flex justify-between'>
                <button
                  onClick={() => setSelectedDress(dress)}
                  className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark transition-all'
                >
                  Update
                </button>
                <DeleteDress
                  dressId={dress.id}
                  refreshDresses={refreshDresses}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-300 text-center'>No dresses available.</p>
      )}

      {selectedDress && (
        <UpdateDressPopup
          dress={selectedDress}
          onClose={() => setSelectedDress(null)}
          refreshDresses={refreshDresses}
        />
      )}
    </div>
  );
};

export default DressList;
