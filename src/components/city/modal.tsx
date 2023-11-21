import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ICity } from '../../api/cities/interfaces';
import { cityApi } from '../../api/cities/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_city } from '../schema/shcema';

interface ModalProps {
  onClose: () => void;
  refetch: () => void;
  city?: ICity;
  selectedId: number;
  isLoadingCity: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  refetch,
  selectedId,
  city,
  isLoadingCity,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICity>({
    resolver: yupResolver(schema_city),

    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    if (selectedId > 0 && city) {
      setValue('name', city.name);
      setValue('description', city.description);
      setValue('id', city.id);
    }
  }, [selectedId]);

  const handleFormSubmit = async (data: ICity) => {
    try {
      if (selectedId > 0) {
        await cityApi.updateCity({ data: data, id: selectedId });
        shawSuccess('city updated successfully');
      } else {
        await cityApi.postCity({ data });
        shawSuccess('city added successfully');
      }
      refetch();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      shawError('failed');
    }
  };
  const inputs = [
    {
      id: 1,
      label: 'ID',
      placeholder: 'ID',
      register: { ...register('id') },
      error: errors.id && <p className="error">{errors.id.message}</p>,
    },
    {
      id: 1,
      label: 'Name',
      placeholder: 'Name',
      register: { ...register('name') },
      error: errors.name && <p className="error">{errors.name.message}</p>,
    },
    {
      id: 2,
      label: 'Description',
      placeholder: 'Description',
      register: { ...register('description') },
      error: errors.description && (
        <p className="error">{errors.description.message}</p>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[30%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
        <h1 className="text-lg font-bold text-center text-black">
          {selectedId > 0 ? 'Update City' : 'Add New City'}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {inputs.map((_input) => (
            <>
              <label className="mt-2 font-medium text-black dark:text-white  max-sm:text-xs max-sm:mb-2">
                {_input.label}
              </label>
              {isLoadingCity ? (
                <p>loading....</p>
              ) : (
                <>
                  <input
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 max-sm:h-9"
                    type="text"
                    placeholder={_input.placeholder}
                    {..._input.register}
                  />
                  {_input.error}
                </>
              )}
            </>
          ))}

          <div className="flex justify-between">
            <button
              className="mt-4 bg-blue-600  text-white font-medium py-2 px-4 rounded-lg"
              type="submit"
            >
              Submit
            </button>
            <button
              className="mt-4 bg-blue-600  text-white font-medium py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
