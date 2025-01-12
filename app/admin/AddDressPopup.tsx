'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';

// Define validation schema for the dress form using Zod
const dressSchema = z.object({
  name: z.string().min(1, 'Dress Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  size: z.array(z.string()).min(1, 'At least one size is required'),
  color: z.string().min(1, 'Color is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  availability: z.boolean(),
});

type DressFormValues = z.infer<typeof dressSchema>;

interface AddDressPopupProps {
  onClose: () => void;
  refreshDresses: () => void;
}

const AddDressPopup: React.FC<AddDressPopupProps> = ({
  onClose,
  refreshDresses,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DressFormValues>({
    resolver: zodResolver(dressSchema),
  });

  const handleAddDress = async (data: DressFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/fashion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: new Date().getTime().toString(), // Generate unique id for the new dress
          ...data,
        }),
      });

      if (response.ok) {
        showToast({
          title: 'Dress Added Successfully!',
          description: 'The dress has been added.',
        });
        refreshDresses();
        onClose();
        reset(); // Reset form after successful submission
      } else {
        showToast({
          title: 'Error Adding Dress',
          description: 'There was an issue adding the dress.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while adding the dress. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-3xl shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Add New Dress
        </h2>
        <form onSubmit={handleSubmit(handleAddDress)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter dress name'
              {...register('name')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter category'
              {...register('category')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.category && (
              <p className='text-red-500 text-sm'>{errors.category.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700 border border-gray-500'
              type='number'
              min={1}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter description'
              {...register('description')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            <div>
              <label className='block text-gray-600 mt-2'>Availability</label>
              <input
                type='checkbox'
                {...register('availability')}
                className='mt-2'
              />
            </div>
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Sizes</label>
            <div className='flex gap-4'>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div key={size}>
                  <input
                    type='checkbox'
                    value={size}
                    {...register('size')}
                    className='mt-2'
                  />
                  <label className='ml-2'>{size}</label>
                </div>
              ))}
            </div>
            {errors.size && (
              <p className='text-red-500 text-sm'>{errors.size.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter color'
              {...register('color')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.color && (
              <p className='text-red-500 text-sm'>{errors.color.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type='submit' className='bg-primary hover:bg-primary/80'>
              Add Dress
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDressPopup;
