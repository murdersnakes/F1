import React from 'react'

export default function DateTimeDisplay({days, hours, minutes, seconds}) {
  return (
    <div className='grid grid-cols-4 gap-4'>
        <div className='flex flex-col items-center bg-rose-600 p-3 rounded text-white'>
           <p className='uppercase font-medium text-sm'>Days</p>
           <p className='text-3xl font-black'>{days}</p>
        </div>
        <div className='flex flex-col items-center bg-rose-600 p-3 rounded text-white'>
           <p className='uppercase font-medium text-sm'>Hours</p>
           <p className='text-3xl font-black'>{hours}</p>
        </div>
        <div className='flex flex-col items-center bg-rose-600 p-3 rounded text-white'>
           <p className='uppercase font-medium text-sm'>Mins</p>
           <p className='text-3xl font-black'>{minutes}</p>
        </div>
        <div className='flex flex-col items-center bg-rose-600 p-3 rounded text-white'>
           <p className='uppercase font-medium text-sm'>Secs</p>
           <p className='text-3xl font-black'>{seconds}</p>
        </div>
    </div>
  )
}
