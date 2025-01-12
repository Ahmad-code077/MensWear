'use client';

import { useShowToast } from '@/components/Toast';
import { useState } from 'react';

interface DeleteDressButtonProps {
  dressId: string;
  refreshDresses: () => void;
}

const DeleteDressButton: React.FC<DeleteDressButtonProps> = ({
  dressId,
  refreshDresses,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeleteDressPopup
          dressId={dressId}
          onClose={handleCloseDeletePopup}
          refreshDresses={refreshDresses}
        />
      )}
    </>
  );
};

interface DeleteDressPopupProps {
  dressId: string;
  onClose: () => void;
  refreshDresses: () => void;
}

const DeleteDressPopup: React.FC<DeleteDressPopupProps> = ({
  dressId,
  onClose,
  refreshDresses,
}) => {
  const showToast = useShowToast();

  const handleDeleteDress = async () => {
    console.log(String(dressId));
    try {
      const response = await fetch(
        `http://localhost:5000/fashion/${String(dressId)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        showToast({
          title: 'Dress Deleted Successfully!',
          description: 'The dress has been removed.',
        });
        refreshDresses();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Dress',
          description: 'There was an issue deleting the dress.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the dress. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-primary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this dress? This action cannot be undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteDress}
            className='px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDressButton;
