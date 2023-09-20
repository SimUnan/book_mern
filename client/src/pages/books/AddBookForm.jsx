import React, { useEffect, useState } from 'react'
import LabelInput from './LabelInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddBookForm = () => {

    const navigate = useNavigate();

    const IMG = "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [stars, setStars] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(IMG)
    const [thumbnail, setThumbnail] = useState(null)
    
        const handleCategoryChange = (e) => {
            setCategories(e.target.value.split(",").map((category) => category.trim()));
        }
        
        const onImageChange = (e) => {
            if(e.target.files && e.target.files[0]){
                setImage(URL.createObjectURL(e.target.files[0]));
                setThumbnail(e.target.files[0]);
            }
        }

        const local = "http://localhost:8000"
        const base_url = "https://book-mern-api.onrender.com"
        
            const handleSubmit = async(e) => {
                e.preventDefault();
                
                const formData = new FormData(); 
                formData.append("title", title);
                formData.append("slug", slug);
                formData.append("stars", stars);
                formData.append("description", description);
                formData.append("category", categories);
                formData.append("thumbnail", thumbnail);
        
                // title, slug, stars, description, thumbnail
                try {
        
                    const response = await axios.post(`${base_url}/api/books`, formData);
                    
                    if(response.status === 200){
                        setSlug("")
                        setTitle("") 
                        console.log("Added Book!");
                        navigate('/books')
                    }else{
                        console.log("Failed to add.")
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        
        const textAreaPlaceHolder = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo quam, nostrum, ducimus repellendus laborum eveniet minima quae suscipit "

    return (
        <section className='pt-4 h-auto'>
                <form action="" className='flex flex-col sm:flex-row items-start justify-between gap-5' onSubmit={handleSubmit}>
            <div className='w-3/4 rounded-xl flex flex-col items-center justify-center'>
                <img src={image} alt='noIMG' className='h-[360px] w-[240px] object-cover rounded-xl sm:mr-60'/>
                <input onChange={onImageChange} type="file" accept='image/gif, image/jpeg, image/png' className='mt-5 max-sm:ml-[5rem]'/>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                    <LabelInput Label="Title" InputType="text" InputnName="title" InputPlaceholder="Gate way" InputOnChange={(e) => setTitle(e.target.value)}/>
                    <LabelInput Label="Slug" InputType="text" InputnName="slug" InputPlaceholder="gate-way" InputOnChange={(e) => setSlug(e.target.value)}/>
                    <LabelInput Label="Stars" InputType="text" InputnName="stars" InputPlaceholder="4" InputOnChange={(e) => setStars(e.target.value)}/>
                    <LabelInput Label="Description" TextAreaName="description" TextAreaPlaceholder={textAreaPlaceHolder} TextArea={true} TextAreaOnChange={(e) => setDescription(e.target.value)}/>
                    {/* <LabelInput Label="Category" InputType="text" InputValue={categories} InputnName="category" InputPlaceholder="sceince, romance" InputOnChange={onchangeCategory}/> */}
                    <label>Category:</label>
                    <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
                    <button type='submit' className='bg-gray-400 bg-opacity-40 px-4 py-2 rounded-lg hover:bg-opacity-100 font-semibold'>+ Add book</button>
            </div>
                </form>
        </section>
    )
}

export default AddBookForm
