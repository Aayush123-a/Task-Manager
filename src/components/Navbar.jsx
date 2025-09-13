import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-blue-600 text-white p-3'>
        <div className="logo">
            <span className='font-bold text-xl text-white-500 mx-6'> Task  Manager</span>
        </div>
        <ul className='flex gap-8 mx-9' >
            <li className='cursor-pointer hover:text-xl text-lg font-bold'>Home</li>
            <li className='cursor-pointer hover:text-xl text-lg font-bold'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
