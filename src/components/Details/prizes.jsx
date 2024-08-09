import React from 'react'

function Prizes() {
  return (
    <div>
      <h1 className="font-medium text-xl text-slate-700">Rewards and Prizes</h1>
      <p className="text-sm text-stone-500 mb-4">Attractive prizes to be won along with perks</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 basis-[48%] h-40 border rounded"></div>
        <div className="flex-1 basis-[48%] h-40 border rounded"></div>
        <div className="flex-1 basis-[48%] h-40 border rounded"></div>
        <div className="flex-1 basis-[48%] h-40 border rounded"></div>
      </div>
    </div>
  )
}

export default Prizes
