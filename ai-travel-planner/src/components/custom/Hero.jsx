import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='h-screen flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-bold text-[64px] text-center mt-16'>
        <span className='text-[#f56551]'>
        Discover Your Next Adventure with AI: </span>
        Personalised Itineraries at Your Fingertips
        </h1>
        <p className='text-[30px] text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

        <Link to={'/create-trip'}>
          <Button> Get Started, It's Free </Button>
        </Link>

    </div>
  )
}

export default Hero