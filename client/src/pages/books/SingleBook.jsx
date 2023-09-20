import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {AiOutlineArrowLeft} from 'react-icons/ai'


const SingleBook = () => {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const local = 'http://localhost:8000';
    const base_url = 'https://book-mern-api.onrender.com';
    const urlSlug = useParams();
    const url = `${base_url}/api/book/${urlSlug.slug}`;

    const getData = async() => {
        try {
            const res = await axios(url);
            if(res.status !== 200){
                throw new Error("Failed to fetch.")
            }else{
                setLoading(false);
                setData(res.data);
            }
            console.log(res)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Failed to fetch...");
        }
    }
    useEffect(() => {
        getData();
    }, [])

    function StarRating({numberOfStars}){
        const stars = [];

        for(let i = 0; i < numberOfStars; i++){
            stars.push(<span key={i}>★</span>)
        }

        return (
            <div className='text-xl font-semibold'>Rating: {stars}</div>
        )
    }

    const navigate = useNavigate();
    const backToBookBtn = () => {
        navigate('/books')
    }

    return (
        <section className='px-4 h-full py-16'>
            <button className='mb-5 flex items-center justify-center gap-2' onClick={backToBookBtn}><AiOutlineArrowLeft/> <p>Back</p></button>
            {loading 
            ? 
            <><p>Loading...</p></>
            :
            error 
            ? 
            <><p className='text-red-500 font-semibold'>{error}</p></>
            :
            <div className='w-full flex flex-col sm:flex-row items-start justify-between max-sm:gap-5 gap-10'>
                <div className='w-[40%] max-sm:w-full flex flex-col items-center justify-start gap-5'>
                    <img src={`${base_url}/uploads/${data?.thumbnail}`} alt="" className='h-[400px] max-sm:h-[350px] rounded-xl object-cover'/>
                    <Link to={`/edit-book/${data.slug}`} className='bg-gray-400 bg-opacity-50 px-4 py-1 rounded-xl font-semibold'>Edit book</Link>
                </div>
                <div className='flex-1 w-full mt-4'>
                    <h1 className='font-bold text-2xl'>{data?.title}</h1>
                    <br/>
                    <p className='mt-3 text-lg'>{data?.description}</p>
                    <br/>
                    <StarRating numberOfStars={data?.stars} />
                    <div className='mt-3'>
                        <p className='text-xl font-semibold'>Category:</p>
                        <div className='flex items-start justify-start gap-5 mt-2'>
                        {data?.category?.map((item, index) => (
                            <p key={index} className='bg-slate-300 px-4 py-1.5 rounded-xl text-base'>{item}</p>
                        ))}
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default SingleBook
