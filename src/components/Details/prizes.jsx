import React from 'react'

function Prizes(prizes) {
  return (
    <div>
      {/* <pre>{JSON.stringify(prizes, null, 2)}</pre> */}
      <h1 className="font-medium text-xl text-slate-700">Rewards and Prizes</h1>
      <p className="text-sm text-stone-500 mb-4">Attractive prizes to be won along with perks</p>
      <div className="flex flex-wrap gap-4">
        {
          prizes.prizes.map((prize, index) => (
            <div className="flex-1 basis-[48%] h-40 border rounded p-4" key={index}>
              <div className="flex flex-col justify-center gap-4 h-full">
                <div className="text-3xl font-bold">{prize.position}</div>
                <div className="text-4xl font-black">₹ {prize.prize}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Prizes
