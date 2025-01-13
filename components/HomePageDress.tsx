'use client';

import React, { useEffect, useState } from 'react';
import DressCard from './DressCard'; // Assume this is the card component for dresses
import SearchInput from './SearchInput'; // Reuse the SearchInput component
import { Dress } from '@/app/admin/DressList';

const HomePageDresses: React.FC = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [filteredDresses, setFilteredDresses] = useState<Dress[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await fetch('http://localhost:5000/fashion');
        if (!response.ok) {
          throw new Error('Failed to fetch dresses.');
        }
        const data: Dress[] = await response.json();
        setDresses(data);
        setFilteredDresses(data); // Initialize filtered dresses
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, []);

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

  if (loading) {
    return <p className='text-center text-xl text-black'>Loading dresses...</p>;
  }

  if (error) {
    return <p className='text-center text-xl text-red-600'>{error}</p>;
  }

  return (
    <section className='text-black py-12'>
      <div>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Explore Our Latest <span className='text-primary'>Fashion</span>
        </h2>

        {/* Search Section */}
        <div className='mb-8'>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Dress List Section */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredDresses.length > 0 ? (
            filteredDresses.map((dress) => (
              <DressCard key={dress.id} dress={dress} />
            ))
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              No dresses match the selected criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePageDresses;
