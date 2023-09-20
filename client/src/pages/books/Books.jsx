import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AiFillStar} from 'react-icons/ai'

const Books = () => {
    
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState("");
    
    let base_url = 'http://localhost:8000';
    
    const fetchData = async() => {
        try {
            const url = `?category=${categories}`
            
            const respond = await axios.get(`${base_url}/api/books${url}`);
            if(respond.status !== 200){
                throw new Error("Failed to fetch.")
            }
            setBooks(respond.data);
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Failed to fetched Data...")
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [categories, loading]);
    
    const navigate = useNavigate();

    return (
        <section className='w-full flex flex-col items-start justify-center py-3'>
            <div className='w-full'>
                <label className='font-semibold mr-5 py-2 px-5 bg-gray-400 bg-opacity-20 rounded-lg'>Category</label>
                <select 
                    className='font-semibold my-4 mr-5 py-1.5 px-5 bg-transparent border-[1px] border-gray-400 rounded-lg '
                    onChange={(e) => {setCategories(e.target.value)}}
                >
                    <option value="">All</option>
                    <option value="romance">Romance</option>
                    <option value="science">Science</option>
                    <option value="crime">Crime</option>
                    <option value="food">Food</option>
                    <option value="adventure">Adventure</option>
                    <option value="thriller">Thriller</option>
                    <option value="fiction">Fiction</option>
                    <option value="other">Other</option>
                </select>
            <button className='bg-gray-400 font-semibold px-5 py-2 rounded-xl bg-opacity-50' onClick={() => {navigate('/add-book')}}>Add Book</button>
            </div>
            {
            loading 
            ? 
            (
                <p>Loading...</p>
            )
            : error 
                ?
                (
                    <p className='mt-5 font-semibold text-red-500'>{error}</p>
                )
                :
            (
                <ul className='mt-5 w-full flex max-sm:flex-col flex-wrap items-center justify-center gap-5'>
                    {books.map((book, index) => (
                        <li key={index}>
                            <Link to={`/book/${book.slug}`}>
                                <div className='h-[480px] max-sm:w-[260px] flex-1 bg-gray-500 bg-opacity-40 shadow-2xl cursor-pointer hover:bg-opacity-50 hover:scale-105 transition-all duration-150 ease-in rounded-lg px-3 py-6 flex flex-col items-start justify-center gap-2'>
                                    <img src={`http://localhost:8000/uploads/${book.thumbnail}`} alt="" className='rounded-lg w-[260px] h-[90%] object-cover'/>
                                    <p className='flex items-center justify-center gap-1 ml-2'><AiFillStar className='w-5 h-5'/> <span>({book.stars})</span></p>
                                    <h1 className='font-semibold pl-2'>{book.title}</h1>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )
            }
        </section>
    )
}

export default Books
