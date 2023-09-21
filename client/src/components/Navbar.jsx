import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../public/nanlogo.png'

const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center justify-between z-10 w-full'>
            <div className='flex sm:ml-10'>  
                <img src={Logo} alt="" className='w-16 h-16'/>
            </div>
                <div className='flex items-center justify-center sm:mr-10  gap-5 sm:gap-10 text-base sm:text-xl text-blue-700'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/books'>Books</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
