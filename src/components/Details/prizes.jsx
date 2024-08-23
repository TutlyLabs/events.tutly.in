"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuPlusCircle } from "react-icons/lu";

function Prizes({ prizes }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleModalOpen = () => setModalIsOpen(true);
  const handleModalClose = () => setModalIsOpen(false);

  const onFormSubmit = (data) => {
    console.log(data);
    handleModalClose();
  };

  return (
    <div className="relative">
      {/* <pre>{JSON.stringify(prizes, null, 2)}</pre> */}
      <div className="flex justify-end">
        <LuPlusCircle className="w-6 h-6 cursor-pointer" onClick={handleModalOpen} />
      </div>

      <h1 className="font-medium text-xl text-slate-700">Rewards and Prizes</h1>
      <p className="text-sm text-stone-500 mb-4">Attractive prizes to be won along with perks</p>
      <div className="flex flex-wrap gap-4">
        {
          prizes.map((prize, index) => (
            <div className="flex-1 basis-[48%] h-40 border rounded p-4" key={index}>
              <div className="flex flex-col justify-center gap-4 h-full">
                <div className="text-3xl font-bold">{prize.position}</div>
                <div className="text-4xl font-black">₹ {prize.prize}</div>
              </div>
            </div>
          ))
        }
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-[60vw] relative">
            <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
              <div className="relative mb-4">
                <label htmlFor="position" className="text-sm font-medium text-gray-600">Position</label>
                <input
                  {...register('position', { required: true })}
                  id="position"
                  className={`mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 ${errors.position ? 'border-red-500' : ''}`}
                />
                {errors.position && <p className="text-red-500 text-xs mt-1">Position is required</p>}
              </div>
              <div className="relative mb-4">
                <label htmlFor="prize" className="text-sm font-medium text-gray-600">Prize Money</label>
                <input
                  type="number"
                  {...register('prize', { required: true })}
                  id="prize"
                  className={`mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 ${errors.prize ? 'border-red-500' : ''}`}
                />
                {errors.prize && <p className="text-red-500 text-xs mt-1">Prize money is required</p>}
              </div>
              <div className="relative mb-4">
                <label htmlFor="description" className="text-sm font-medium text-gray-600">Description</label>
                <textarea
                  {...register('description')}
                  id="description"
                  className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="submit" className="w-full bg-blue-600 rounded-lg text-white py-2 px-4">Submit</button>
                <button type="button" onClick={handleModalClose} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prizes;
