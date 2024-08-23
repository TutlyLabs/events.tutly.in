"use client";
import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { MdLocationPin } from "react-icons/md";

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
    <div className="relative flex flex-col gap-12 font-oswald">
      <div className="flex w-full justify-end">
        <LuPlusCircle className="w-6 h-6 cursor-pointer" onClick={handleModalOpen} />
      </div>

      {/* Modal Form */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-[60vw] relative">
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
      {rounds.map((round, index) => {
        return (
          <div key={index} className="flex gap-4 items-start mt-8">
            <div className="relative flex flex-col items-center">
              <div className="bg-blue-500 text-white rounded-full flex items-center justify-center group-hover:bg-blue-600 transition duration-300">
                <MdOutlineAccessTime className="h-5 w-5" />
              </div>
              {index < rounds.length - 1 && (
                <div className="absolute top-full w-0.5 bg-blue-400"></div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-blue-600">{round.name}</p>
                <p className="flex items-center gap-2 text-sm">
                  <span><MdLocationPin className="h-4 w-4 text-red-600"/></span> {round.mode}
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
              <p className="text-gray-500 text-justify">{round.description}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic architecto porro a rem, corrupti laboriosam, libero quod nihil nemo maxime explicabo odio, fugiat pariatur. Eaque totam impedit a molestiae odio temporibus aliquid labore minus! Voluptatem nobis, ipsum fugit quam excepturi optio recusandae praesentium, at nostrum dignissimos ducimus porro, inventore natus? Voluptas nihil sapiente perferendis. Minima deleniti, praesentium incidunt corrupti perferendis exercitationem consequatur, esse magni voluptatum molestias veritatis, placeat eos aliquid assumenda cum provident debitis officiis quod itaque voluptatibus dolore deserunt quasi! Voluptatem tempora, optio veniam illum ducimus, reprehenderit praesentium cumque, qui officiis perferendis illo quis deserunt. Eos sit id doloribus!
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
