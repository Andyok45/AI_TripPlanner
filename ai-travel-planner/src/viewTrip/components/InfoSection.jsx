import React from 'react'

function InfoSection({trip}) {
  return (
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gSKBQCko9MoPCu5ek4Ux2dJqRuPC7UVJw&s"  className='h-[360px] w-auto'/>

      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.Location?.label}</h2>
        <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-lg'> No. Of Peoples visiting: {trip?.userSelection?.TravelList}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-lg'>Days: {trip?.userSelection?.noOfDays}</h2>
        </div>

      </div>
    </div>
  )
}

export default InfoSection