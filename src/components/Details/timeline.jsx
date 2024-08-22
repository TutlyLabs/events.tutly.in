"use client";
import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

function Timeline({ rounds }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleModalOpen = () => setModalIsOpen(true);
  const handleModalClose = () => setModalIsOpen(false);

  const onFormSubmit = (data) => {
    console.log(data);
    handleModalClose();
  };

  return (
    <div className="relative flex flex-col gap-6 font-oswald">
      <div className="flex w-full justify-end">
        <LuPlusCircle className="w-6 h-6 cursor-pointer" onClick={handleModalOpen} />
      </div>

      {/* Modal Form */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-[60vw] relative">
            <button
              type="button"
              onClick={handleModalClose}
              className="absolute top-4 right-4"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
              <div className="flex flex-wrap gap-6">
                <div className="relative flex-1 min-w-[200px]">
                  <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
                  <input
                    {...register('name', { required: true })}
                    id="name"
                    className={`mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                </div>
                <div className="relative flex-1 min-w-[200px]">
                  <label htmlFor="mode" className="text-sm font-medium text-gray-600">Mode</label>
                  <select
                    {...register('mode', { required: true })}
                    id="mode"
                    className={`mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 ${errors.mode ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Mode</option>
                    <option value="ONSITE">ONSITE</option>
                    <option value="ONLINE">ONLINE</option>
                  </select>
                  {errors.mode && <p className="text-red-500 text-xs mt-1">Mode is required</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="relative flex-1 min-w-[200px]">
                  <label htmlFor="startTime" className="text-sm font-medium text-gray-600">Start Time</label>
                  <input
                    type="datetime-local"
                    {...register('startTime')}
                    id="startTime"
                    className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="relative flex-1 min-w-[200px]">
                  <label htmlFor="endTime" className="text-sm font-medium text-gray-600">End Time</label>
                  <input
                    type="datetime-local"
                    {...register('endTime')}
                    id="endTime"
                    className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="relative flex-1 min-w-[200px]">
                  <label htmlFor="venue" className="text-sm font-medium text-gray-600">Venue</label>
                  <input
                    {...register('venue')}
                    id="venue"
                    className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="relative flex-1">
                  <label htmlFor="description" className="text-sm font-medium text-gray-600">Description</label>
                  <textarea
                    {...register('description')}
                    id="description"
                    className="mt-1 w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-base focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="submit" className="w-full bg-blue-600 rounded-lg text-white py-2 px-4">Submit</button>
                <button type="button" onClick={handleModalClose} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Rounds */}
      {rounds.map((round, index) => (
        <div key={index} className="flex gap-4 flex-1 group">
          <div className="flex flex-col h-full items-center bg-gradient-to-b from-blue-200 to-purple-200 p-4 w-16 rounded-full relative group-hover:from-blue-300 group-hover:to-purple-300 transition duration-300">
            <MdOutlineAccessTime className="h-8 w-8 text-blue-600 group-hover:text-purple-600 transition duration-300" />
          </div>
          <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow-lg group-hover:shadow-xl transition duration-300 w-full">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-blue-600">{round.name}</p>
              <p className="font-semibold text-sm">
                <span className="font-bold text-lg">•</span>{round.mode}
              </p>
            </div>
            <h1 className="text-sm font-medium text-gray-600">
              Start date: {round.startTime ? new Date(round.startTime).toLocaleString() : "-"}
            </h1>
            <h1 className="text-sm font-medium text-gray-600">
              End date: {round.endTime ? new Date(round.endTime).toLocaleString() : "-"}
            </h1>
            <h1 className="text-sm font-medium text-gray-600">
              Venue: {round.venue ? round.venue : "-"}
            </h1>
            <p className="text-gray-500">{round.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
