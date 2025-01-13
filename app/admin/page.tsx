'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DressList, { Dress } from './DressList'; // Updated to use DressList
import AddDress from './AddDressPopup'; // Updated to use AddDress
import { Button } from '@/components/ui/button';
import SearchInput from '../../components/SearchInput'; // Updated to use SearchInput

const AdminPage = () => {
  const router = useRouter();

  const [dresses, setDresses] = useState<Dress[]>([]);
  const [filteredDresses, setFilteredDresses] = useState<Dress[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
    try {
      const response = await fetch('http://localhost:5000/fashion'); // Ensure the endpoint is correct
      const data: Dress[] = await response.json();
      setDresses(data);
      setFilteredDresses(data);
    } catch (error) {
      console.error('Error fetching dresses:', error);
    }
  };

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    setFilteredDresses(
      dresses.filter(
        (dress) =>
          dress.name.toLowerCase().includes(lowercasedQuery) ||
          dress.category.toLowerCase().includes(lowercasedQuery) ||
          (lowercasedQuery === 'available' && dress.availability) ||
          (lowercasedQuery === 'unavailable' && !dress.availability)
      )
    );
  }, [searchQuery, dresses]);

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground'>Manage Dresses</h2>
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-2xl rounded-md text-white'
        >
          + Add Dress
        </Button>
      </div>

      {/* Search Section */}
      <div className='p-6'>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Dress List Section */}
      <div className='p-6'>
        <DressList dresses={filteredDresses} refreshDresses={fetchDresses} />
      </div>

      {/* Add Dress Popup */}
      {showAddPopup && (
        <AddDress
          onClose={() => setShowAddPopup(false)}
          refreshDresses={fetchDresses}
        />
      )}
    </div>
  );
};

export default AdminPage;
