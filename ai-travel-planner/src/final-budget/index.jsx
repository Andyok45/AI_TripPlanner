import { SelectBudgetOptions } from '@/constants/options';
import React from 'react'

function FinalBudget() {


  return (
    <div>finalBudget


          <div>
            <h2 className='text-xl my-3 font-medium'>What is your budget? <br />
              The budget is exclusively allocated for activities and dining purposes.
            </h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('Budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold pt-4'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.description}</h2>
                </div>
              ))}
            </div>
          </div>
    </div>


  )
}

export default FinalBudget;