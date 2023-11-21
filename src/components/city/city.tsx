import { useState } from 'react';
import useCities, { cityQueries } from '../../api/cities/query';
import { cityApi } from '../../api/cities/api';
import { shawError, shawSuccess } from '../../lib/tosts';
import { IconDelete, IconEdit } from '../../icons/icon';
import Modal from './modal';

const City = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [selectedId, setSelectedId] = useState(0);

  const { data: response = [], refetch } = useCities();

  const { data: city, isLoading: isLoadingCity } =
    cityQueries.useGetCity(selectedId);

  console.log('country', city);

  const handleDelete = async (id: number) => {
    try {
      cityApi.deleteCity(id);
      refetch();
      shawSuccess('city deleted successfully');
    } catch (err) {
      console.log('first');
      shawError('error');
    }
  };

  const handleUpdate = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const columns = [
    {
      th: 'Id',
    },
    {
      th: 'Name',
    },
    {
      th: 'Description',
    },
    {
      th: 'Actions',
    },
  ];

  return (
    <div className="p-4 w-full h-screen bg-blue-50">
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-black">My City</h1>
        </div>
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="block font-bold  text-white bg-blue-600 rounded-lg text-md px-5 py-2.5 text-center cursor-pointer"
          type="button"
          onClick={toggleModal}
        >
          Add New City
        </button>
      </div>
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          refetch={refetch}
          selectedId={selectedId}
          city={city}
          isLoadingCity={isLoadingCity}
        />
      )}
      <div className="border-2 border-black">
        <table className="table w-[100%] border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th>{column.th}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {response.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleUpdate(data.id)}
                      className="w-9 h-9 bg-white rounded-full flex justify-center text-center items-center cursor-pointer"
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="w-9 h-9 bg-white rounded-full flex justify-center text-center items-center cursor-pointer"
                    >
                      <IconDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default City;
