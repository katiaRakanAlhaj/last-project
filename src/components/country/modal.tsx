import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ICountry } from '../../api/countries/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_country } from '../schema/shcema';
import { countryApi } from '../../api/countries/api';
import { shawError, shawSuccess } from '../../lib/tosts';

interface ModalProps {
  onClose: () => void;
  refetch: () => void;
  country?: ICountry;
  selectedId: number;
  isLoadingCountry: boolean;
  // updateTableData: (data: ICountry) => void;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  refetch,
  selectedId,
  country,
  isLoadingCountry,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICountry>({
    resolver: yupResolver(schema_country),
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    if (selectedId > 0 && country) {
      setValue('name', country.name);
      setValue('description', country.description);
      setValue('id', country.id);
    }
  }, [selectedId]);

  const handleFormSubmit = async (data: ICountry) => {
    try {
      if (selectedId > 0) {
        await countryApi.updateCountry({ data: data, id: selectedId });
        shawSuccess('country updated successfully');
      } else {
        await countryApi.postCountry({ data });
        shawSuccess('country added sucessfully');
      }
      refetch();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      shawError('error');
    }
  };
  const inputs = [
    {
      id: 1,
      label: 'ID',
      placeholder: 'id',
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
          {selectedId > 0 ? 'Update Country' : 'Add New Country'}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {inputs.map((_input) => (
            <>
              <label className="mt-2 font-medium text-black dark:text-white  max-sm:text-xs max-sm:mb-2">
                {_input.label}
              </label>
              {isLoadingCountry ? (
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
