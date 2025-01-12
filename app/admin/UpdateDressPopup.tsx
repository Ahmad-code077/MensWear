'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

import { Dress } from './DressList'; // Assuming DressList contains the dress data
import { useShowToast } from '@/components/Toast';

// Validation schema for the Dress object
const dressSchema = z.object({
  name: z.string().min(1, 'Dress Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(1, 'Price is required'), // Coerce strings to numbers
  description: z.string().min(1, 'Description is required'),
  size: z.array(z.string()).min(1, 'At least one size is required'),
  color: z.string().min(1, 'Color is required'),
  availability: z.boolean(),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
});

type DressFormValues = z.infer<typeof dressSchema>;

interface UpdateDressPopupProps {
  dress: Dress;
  onClose: () => void;
  refreshDresses: () => void;
}

const UpdateDressPopup: React.FC<UpdateDressPopupProps> = ({
  dress,
  onClose,
  refreshDresses,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DressFormValues>({
    resolver: zodResolver(dressSchema),
    defaultValues: {
      name: dress.name,
      category: dress.category,
      price: dress.price,
      description: dress.description,
      size: dress.size,
      color: dress.color,
      availability: dress.availability,
      image: dress.image,
    },
  });

  // Handle form submission
  const handleUpdateDress = async (data: DressFormValues) => {
    try {
      const response = await fetch(
        `http://localhost:5000/fashion/${dress.id}`,
        {
          method: 'PATCH', // Use PATCH to update only specific fields
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        showToast({
          title: 'Dress Updated Successfully!',
          description: 'The dress details have been updated.',
        });
        refreshDresses();
        onClose();
      } else {
        showToast({
          title: 'Error Updating Dress',
          description: 'There was an issue updating the dress.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while updating the dress. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-3xl shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Dress
        </h2>
        <form onSubmit={handleSubmit(handleUpdateDress)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter dress name'
              {...register('name')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter category'
              {...register('category')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.category && (
              <p className='text-red-500 text-sm'>
                {String(errors.category.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
              type='number'
              onChange={(e) =>
                setValue('price', parseFloat(e.target.value) || 0)
              }
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
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {String(errors.description.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter color'
              {...register('color')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.color && (
              <p className='text-red-500 text-sm'>
                {String(errors.color.message)}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Size</label>
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
              <p className='text-red-500 text-sm'>
                {String(errors.size.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700 border border-gray-500'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Availability</label>
            <input
              type='checkbox'
              {...register('availability')}
              className='mt-2'
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-primary text-white hover:bg-primary/80'
            >
              Update Dress
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDressPopup;
