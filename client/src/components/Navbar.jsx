import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-evently mb-2 z-10'>
            <p className='flex-1 font-bold text-base sm:text-xl'>LOGO</p>
            <div className='flex text-blue-700 items-center justify-center gap-5 sm:gap-10 text-base sm:text-xl'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/books'>Books</NavLink>
                <NavLink to='/about'>About</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
