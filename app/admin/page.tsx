'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DressList, { Dress } from './DressList'; // Updated to use DressList
import AddDress from './AddDressPopup'; // Updated to use AddDress
import { Button } from '@/components/ui/button';
import AvailabilityFilter from '../../components/AvailabilityFilter';

const AdminPage = () => {
  const router = useRouter();

  const [dresses, setDresses] = useState<Dress[]>([]); // Renamed 'cars' to 'dresses'
  const [filteredDresses, setFilteredDresses] = useState<Dress[]>([]); // Renamed 'filteredCars' to 'filteredDresses'
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/');
    } else {
      fetchDresses(); // Changed to fetchDresses
    }
  }, [router]);

  const fetchDresses = async () => {
    // Updated to fetch dresses
    try {
      const response = await fetch('http://localhost:5000/fashion'); // Make sure endpoint matches the backend
      const data: Dress[] = await response.json();
      setDresses(data);
      setFilteredDresses(data);
    } catch (error) {
      console.error('Error fetching dresses:', error);
    }
  };

  useEffect(() => {
    if (availabilityFilter === 'all') {
      setFilteredDresses(dresses);
    } else {
      const isAvailable = availabilityFilter === 'available';
      setFilteredDresses(
        dresses.filter((dress) => dress.availability === isAvailable)
      ); // Updated to filter dresses
    }
  }, [availabilityFilter, dresses]);

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground'>Manage Dresses</h2>{' '}
        {/* Updated title */}
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-2xl rounded-md text-white'
        >
          + Add Dress {/* Updated button label */}
        </Button>
      </div>

      {/* Filter Section */}
      <div className='p-6'>
        <AvailabilityFilter
          value={availabilityFilter}
          onChange={setAvailabilityFilter}
        />
      </div>

      {/* Dress List Section */}
      <div className='p-6'>
        <DressList dresses={filteredDresses} refreshDresses={fetchDresses} />{' '}
        {/* Updated to use DressList */}
      </div>

      {/* Add Dress Popup */}
      {showAddPopup && (
        <AddDress
          onClose={() => setShowAddPopup(false)}
          refreshDresses={fetchDresses} // Updated to refresh dresses
        />
      )}
    </div>
  );
};

export default AdminPage;
