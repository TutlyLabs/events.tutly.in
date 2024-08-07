"use client"
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import {FaMinus} from "react-icons/fa6"

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Frequently Asked Questions / Discussions :</h1>
      <div>
        <h2>
          <button
            className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl gap-3"
            onClick={() => toggleAccordion(1)}>
            <span>What is Flowbite?</span>
            {activeIndex === 1 ? <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaMinus className="h-3 w-3"/></div> : <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaPlus className="h-3 w-3"/></div>}
          </button>
        </h2>
        <div className={`${activeIndex === 1 ? '' : 'hidden'}`}>
          <div className="p-4 border border-b-0 border-gray-200">
            <p className="text-gray-500 dark:text-gray-400">
              Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
            </p>
          </div>
        </div>

        <h2>
          <button
            className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-b-0 border-gray-200 gap-3"
            onClick={() => toggleAccordion(2)}>
            <span>Is there a Figma file available?</span>
            {activeIndex === 2 ? <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaMinus className="h-3 w-3"/></div> : <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaPlus className="h-3 w-3"/></div>}
          </button>
        </h2>
        <div className={`${activeIndex === 2 ? '' : 'hidden'}`}>
          <div className="p-4 border border-b-0 border-gray-200">
            <p className="text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
            </p>
          </div>
        </div>

        <h2>
          <button
            className="flex items-center justify-between w-full p-4 font-medium text-gray-500 border border-gray-200 gap-3"
            onClick={() => toggleAccordion(3)}>
            <span>What are the differences between Flowbite and Tailwind UI?</span>
            {activeIndex === 3 ? <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaMinus className="h-3 w-3"/></div> : <div className="bg-sky-200 h-6 w-6 rounded-full flex justify-center items-center"><FaPlus className="h-3 w-3"/></div>}
          </button>
        </h2>
        <div className={`${activeIndex === 3 ? '' : 'hidden'}`}>
          <div className="p-4 border border-t-0 border-gray-200">
            <p className="text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
